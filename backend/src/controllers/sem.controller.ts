import { Request, Response } from "express";
import mongoose from "mongoose";
import { Sem } from "../models/sem.modals";
import { AppError } from "../utils/AppError";

const getSem = async (req: Request, res: Response): Promise<void> => {
  const { schoolId, courseId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  const matchStage = schoolId
    ? {
        $match: {
          school: new mongoose.Types.ObjectId(schoolId),
          course: new mongoose.Types.ObjectId(courseId),
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

  const result = await Sem.aggregate([
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
    message: "Sem retrieved successfully.",
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

const createSem = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const { schoolId, courseId } = req.params;

  const createdSem = await Sem?.create({
    name,
    description,
    school: schoolId,
    course: courseId,
  });

  res.status(200).json({
    success: true,
    message: "Created sem successfully",
    data: createdSem,
  });
};

const editSem = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const { semId } = req.params;

  const updatedSem = await Sem.findByIdAndUpdate(
    semId,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedSem) {
    throw new AppError("Sem not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Sem updated successfully",
    data: { sem: updatedSem },
  });
};

export { createSem, editSem, getSem };
