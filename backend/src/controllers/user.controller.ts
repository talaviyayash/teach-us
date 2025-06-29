import jwt from "jsonwebtoken";
import { User } from "../models/user.modals";
import { AppError } from "../utils/AppError";
import { ACCESS_TOKEN_JWT_SECRET } from "../config/env";
import { Request, Response } from "express";

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

export { session };
