import { Request, Response } from "express";
import mongoose from "mongoose";
import { Batch } from "../models/batch.modal";
import { AppError } from "../utils/AppError";
import { Division } from "../models/div.modals";
import { User } from "../models/user.modals";

const getBatch = async (req: Request, res: Response): Promise<void> => {
  const divId = req.query.div as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  const matchStage = divId
    ? {
        $match: {
          division: new mongoose.Types.ObjectId(divId),
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        },
      }
    : {
        $match: {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        },
      };

  const result = await Batch.aggregate([
    matchStage,
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
      },
    },
  ]);

  const sem = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Batch retrieved successfully.",
    data: {
      sem,
      pagination: {
        page: page,
        rows: sem.length,
        size: limit,
        total: total,
      },
    },
  });
};

const createBatch = async (req: Request, res: Response): Promise<void> => {
  const { name, description, divId } = req.body;

  const batchInfo = await Division.findById(divId);

  if (!batchInfo) throw new AppError("Division not found", 404);

  const createdSem = await Batch?.create({
    name,
    description,
    school: batchInfo?.school,
    course: batchInfo?.course,
    sem: batchInfo?.sem,
    division: divId,
  });

  res.status(200).json({
    success: true,
    message: "Created sem successfully",
    data: createdSem,
  });
};

const editBatch = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const { batchId } = req.params;

  const updatedBatch = await Batch.findByIdAndUpdate(
    batchId,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedBatch) {
    throw new AppError("Batch not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Batch updated successfully",
    data: { batch: updatedBatch },
  });
};

const getBatchStudent = async (req: Request, res: Response): Promise<void> => {
  const { batchId } = req.params;

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  if (!mongoose.Types.ObjectId.isValid(batchId)) {
    res.status(400).json({ success: false, message: "Invalid batchId" });
    return;
  }

  const result = await Batch.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(batchId) },
    },
    {
      $lookup: {
        from: "users",
        let: { studentIds: "$student" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$studentIds"] },
              ...(search
                ? { name: { $regex: search as string, $options: "i" } }
                : {}),
            },
          },
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        as: "students",
      },
    },
    {
      $lookup: {
        from: "users",
        let: { studentIds: "$student" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$_id", "$$studentIds"] },
              ...(search
                ? { name: { $regex: search as string, $options: "i" } }
                : {}),
            },
          },
          { $count: "total" },
        ],
        as: "metadata",
      },
    },
    {
      $addFields: {
        total: { $ifNull: [{ $arrayElemAt: ["$metadata.total", 0] }, 0] },
      },
    },
    {
      $project: {
        metadata: 0,
        student: 0,
      },
    },
  ]);
  if (!result || result.length === 0) {
    res.status(404).json({ success: false, message: "Batch not found" });
    return;
  }
  console.log("result", result);
  const batch = result[0];

  res.status(200).json({
    success: true,
    message: "Batch students fetched successfully",
    data: {
      student: batch?.students,
    },
    page: page,
    limit: limit,
  });
};

const addBatchStudent = async (req: Request, res: Response): Promise<void> => {
  const { batchId } = req.params;
  const { students } = req.body;

  if (!Array.isArray(students) || !batchId) {
    res
      .status(400)
      .json({ success: false, message: "Missing required fields." });
    return;
  }

  const batchInfo = await Batch.findById(batchId);

  if (!batchInfo) {
    res.status(400).json({ success: false, message: "Invalid batchId" });
    return;
  }

  const schoolId = batchInfo.school;

  const errors: string[] = [];
  // const addedStudents: any[] = [];

  for (const email of students) {
    let user = await User.findOne({ email });

    if (user) {
      if (user.role !== "student") {
        errors.push(`${email} already exists as ${user.role}`);
        continue;
      }
      if (!user.batchHistory.includes(batchId)) {
        user.batchHistory.push(batchId);
      }
      user.currentBatch = batchId;
      user.currentSchool = schoolId;

      const alreadyInSchool = user.school.some(
        (s) => s.schoolId.toString() === schoolId
      );
      if (!alreadyInSchool) {
        user.school.push({ schoolId, permission: "" });
      }
      await user.save();
    } else {
      const newUser = new User({
        email,
        role: "student",
        currentBatch: batchId,
        currentSchool: schoolId,
        batchHistory: [batchId],
        school: [{ schoolId, permission: "" }],
      });

      await newUser.save();

      user = newUser;
    }
    await Batch.findByIdAndUpdate(batchId, {
      $addToSet: { students: user._id },
    });
  }
  res.status(200).json({
    success: true,
    message: "Students processed",
    data: { errors },
  });
  return;
};

export { createBatch, editBatch, getBatch, getBatchStudent, addBatchStudent };
