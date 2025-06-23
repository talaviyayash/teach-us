import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import {
  forgetPasswordSchema,
  signInSchema,
  signUpSchema,
  resetPasswordSchema,
} from "../validations/user.validation";
import {
  forgetPassword,
  logOut,
  resetPassword,
  signIn,
  signUp,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateRequest(signUpSchema), signUp);
authRouter.post("/signin", validateRequest(signInSchema), signIn);
authRouter.post("/logout", logOut);
authRouter.post(
  "/forget-password",
  validateRequest(forgetPasswordSchema),
  forgetPassword
);

authRouter.put(
  "/reset-password",
  validateRequest(resetPasswordSchema),
  resetPassword
);

export { authRouter };
