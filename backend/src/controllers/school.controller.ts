import { Request, Response } from "express";
import { School } from "../models/school.modals";
import { User } from "../models/user.modals";
import { AppError } from "../utils/AppError";

const createSchool = async (req: Request, res: Response): Promise<void> => {
  const { name, description, principalEmail } = req.body;

  let user = await User.findOne({ email: principalEmail });

  if (!user) {
    user = new User({
      name: "principal",
      email: principalEmail,
      role: "principal",
      password: "Test@123",
    });
  }

  const school = await School.create({ name, description });

  user.school.push({
    schoolId: school._id,
    permission: "owner",
  });

  user.role = "principal";

  await user.save();

  res.status(201).json({
    success: true,
    message: "School created and assigned to principal",
    data: school,
  });
};

const editSchool = async (req: Request, res: Response): Promise<void> => {
  const { schoolId } = req.params;
  const { name, description, isActive } = req.body;

  const updatedSchool = await School.findByIdAndUpdate(
    schoolId,
    { name, description, isActive },
    { new: true, runValidators: true }
  );

  if (!updatedSchool) {
    throw new AppError("School not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "School updated successfully",
    data: updatedSchool,
  });
};

const getSchool = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  const result = await School.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      },
    },
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

  const school = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Division retrieved successfully.",
    data: {
      school,
      pagination: {
        page: page,
        rows: school.length,
        size: limit,
        total: total,
      },
    },
  });
};

export { createSchool, editSchool, getSchool };
