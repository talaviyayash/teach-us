import { Request, Response } from "express";
import mongoose from "mongoose";
import { Division } from "../models/div.modals";
import { AppError } from "../utils/AppError";
import { Sem } from "../models/sem.modals";

const getDiv = async (req: Request, res: Response): Promise<void> => {
  const { semId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  const matchStage = semId
    ? {
        $match: {
          sem: new mongoose.Types.ObjectId(semId),
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

  const result = await Division.aggregate([
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

  const div = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Division retrieved successfully.",
    data: {
      div,
      pagination: {
        page: page,
        rows: div.length,
        size: limit,
        total: total,
      },
    },
  });
};

const createDiv = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const { semId } = req.params;

  const semInfo = await Sem.findById(semId);

  if (!semInfo) throw new AppError("Sem not found", 404);

  const createdDiv = await Division?.create({
    name,
    description,
    school: semInfo?.school,
    course: semInfo?.course,
    sem: semId,
  });

  res.status(200).json({
    success: true,
    message: "Created div successfully",
    data: { div: createdDiv },
  });
};

const editDiv = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;
  const { semId } = req.params;

  const updatedSem = await Division.findByIdAndUpdate(
    semId,
    { name, description },
    { new: true, runValidators: true }
  );

  if (!updatedSem) {
    throw new AppError("Division not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Division updated successfully",
    data: { sem: updatedSem },
  });
};

export { createDiv, editDiv, getDiv };
