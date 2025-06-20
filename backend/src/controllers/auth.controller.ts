import { Request, Response } from "express";
import { User } from "../models/user.modals";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

const ACCESS_TOKEN_JWT_SECRET =
  process.env.ACCESS_TOKEN_JWT_SECRET || "dev-secret";
const ACCESS_TOKEN_EXPIRY = process.env
  .ACCESS_TOKEN_EXPIRY as unknown as number;

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role, isGoogleLogin } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ success: false, message: "Email already exists" });
      return;
    }

    const newUser = new User({ name, email, password, role, isGoogleLogin });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Sign up successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
    return;
  }

  const isMatch = await (user?.comparePassword &&
    user?.comparePassword(password));

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    ACCESS_TOKEN_JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  // .cookie("accessToken", token, {
  //   httpOnly: true,
  //   secure: true,
  // secure: process.env.NODE_ENV === "production",
  //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  // })

  res.status(200).json({
    success: true,
    message: "Sign in successful",
    accessToken: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isGoogleLogin: user.isGoogleLogin,
    },
  });
};

export { signUp, signIn };
