import { Request, Response } from "express";
import { School } from "../models/school.modals";
import { User } from "../models/user.modals";
import { AppError } from "../utils/AppError";

const createSchool = async (req: Request, res: Response): Promise<void> => {
  const { name, description, principalEmail } = req.body;

  const user = await User.findOne({ email: principalEmail });

  if (!user) {
    throw new AppError("User with this email does not exist", 404);
  }

  if (user.role && user.role !== "principal") {
    throw new AppError("User already has a non-principal role", 400);
  }

  if (!user.role) {
    user.role = "principal";
    await user.save();
  }

  const school = await School.create({ name, description });

  user.school.push({
    schoolId: school._id,
    permission: "owner",
  });

  if (!user.role) {
    user.role = "principal";
  }
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

export { createSchool, editSchool };
