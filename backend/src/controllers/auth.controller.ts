import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_JWT_SECRET,
  FORGET_PASSWORD_LINK_EXPIRY,
  FORGET_PASSWORD_TOKEN_EXPIRY,
  FORGET_PASSWORD_TOKEN_JWT_SECRET,
  FRONTEND_URL,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_JWT_SECRET,
} from "../config/env";
import { User } from "../models/user.modals";
import { getForgotPasswordEmailTemplate } from "../template/emailTemplates";
import { AppError } from "../utils/AppError";
import { sendEmail } from "../utils/sendEmail";

const getDomainFromOrigin = (
  origin: string | undefined
): string | undefined => {
  if (!origin) return undefined;
  try {
    const url = new URL(origin);
    const hostname = url.hostname;

    return hostname;
  } catch {
    return undefined;
  }
};

const signUp = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role, isGoogleLogin } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 409);
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
    },
  });
};

const signIn = async (req: Request, res: Response): Promise<void> => {
  const origin = req.headers.origin;
  const { email, password } = req.body;

  console.log("origin", origin);

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await (user?.comparePassword &&
    user?.comparePassword(password));

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = jwt.sign(
    { userId: user._id, email: user.email },
    ACCESS_TOKEN_JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  const refreshToken = jwt.sign(
    { userId: user._id, email: user.email },
    REFRESH_TOKEN_JWT_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  const domain = getDomainFromOrigin(origin);

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      domain: origin,
    })
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      domain: origin,
    })
    .status(200)
    .json({
      success: true,
      message: "Sign in successful",
      data: {
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isGoogleLogin: user.isGoogleLogin,
        },
      },
    });
};

const forgetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (
    user.resetPasswordToken &&
    user.resetPasswordExpires &&
    user.resetPasswordExpires > new Date()
  ) {
    throw new AppError(
      "A reset link has already been sent. Please check your email or wait for the link to expire.",
      429
    );
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    FORGET_PASSWORD_TOKEN_JWT_SECRET,
    { expiresIn: FORGET_PASSWORD_TOKEN_EXPIRY }
  );

  const expiryMs = parseInt(FORGET_PASSWORD_LINK_EXPIRY) * 60 * 1000;

  const expires = new Date(Date.now() + expiryMs);

  user.resetPasswordToken = token;
  user.resetPasswordExpires = expires;
  await user.save();

  await sendEmail({
    to: email,
    subject: "Reset your password",
    text: "",
    html: getForgotPasswordEmailTemplate(
      user.name,
      `${FRONTEND_URL}/reset-password?token=${token}`
    ),
  });

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, password } = req.body;

  let decoded: jwt.JwtPayload | string;
  try {
    decoded = jwt.verify(
      token,
      FORGET_PASSWORD_TOKEN_JWT_SECRET
    ) as jwt.JwtPayload;
  } catch {
    throw new AppError("Invalid or expired token", 400);
  }

  const userId = decoded && (decoded as jwt.JwtPayload).userId;
  if (!userId) {
    throw new AppError("Invalid token.", 400);
  }

  const user = await User.findOne({
    _id: userId,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });
  if (!user) {
    throw new AppError("Invalid or expired reset link.", 400);
  }

  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.status(200).json({
    success: true,
    message:
      "Password reset successful. You can now log in with your new password.",
  });
};

const logOut = async (_: Request, res: Response): Promise<void> => {
  const cookiesToClear = ["accessToken", "refreshToken"];
  cookiesToClear.forEach((cookieName) => {
    res.clearCookie(cookieName, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  });

  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

export { forgetPassword, logOut, resetPassword, signIn, signUp };
