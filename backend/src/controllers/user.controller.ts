import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_JWT_SECRET } from "../config/env";
import { User } from "../models/user.modals";
import { AppError } from "../utils/AppError";

const session = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new AppError("No token provided", 401);
  }
  const decoded = jwt.verify(token, ACCESS_TOKEN_JWT_SECRET) as {
    userId: string;
  };

  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "User session retrieved successfully.",
    data: { user },
  });
};

const createAdmin = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError("Email already exists", 409);

  const newUser = new User({
    name,
    email,
    role: "admin",
    password: "Test@123",
  });
  await newUser.save();

  res.status(201).json({
    success: true,
    message: "Admin created successfully.",
  });
};

const getAdmin = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  // const search = ((req.query.search || "") as string)?.trim();
  const skip = (page - 1) * limit;

  const matchStage = {
    $match: {
      role: { $regex: "admin", $options: "i" },
    },
  };

  const result = await User.aggregate([
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

  const admin = result[0].data;
  const total = result[0].metadata[0]?.total || 0;

  res.status(200).json({
    success: true,
    message: "Sem retrieved successfully.",
    data: {
      admin,
      pagination: {
        page: page,
        rows: admin.length,
        size: limit,
        total: total,
      },
    },
  });
};

export { createAdmin, getAdmin, session };
