import { Request, Response } from "express";
import mongoose from "mongoose";
import { Batch } from "../models/batch.modal";
import { AppError } from "../utils/AppError";
import { Division } from "../models/div.modals";

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

export { createBatch, editBatch, getBatch };
