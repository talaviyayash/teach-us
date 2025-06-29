import { Request, Response } from "express";
import { Course } from "../models/course.modals";
import mongoose from "mongoose";
import { AppError } from "../utils/AppError";

const getCourse = async (req: Request, res: Response): Promise<void> => {
  const { schoolId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  const matchStage = schoolId
    ? {
        $match: {
          school: new mongoose.Types.ObjectId(schoolId),
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

  const result = await Course.aggregate([
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

  const courses = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Courses retrieved successfully.",
    data: {
      courses,
      pagination: {
        page: page,
        rows: courses.length,
        size: limit,
        total: total,
      },
    },
  });
};

const createCourse = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const { schoolId } = req.params;

  const createdCourse = await Course?.create({
    name,
    description,
    school: schoolId,
  });

  res.status(200).json({
    success: true,
    message: "School updated successfully",
    data: createdCourse,
  });
};

const editCourse = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const { courseId } = req.params;

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    throw new AppError("Course not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    data: { course: updatedCourse },
  });
};

export { getCourse, createCourse, editCourse };
