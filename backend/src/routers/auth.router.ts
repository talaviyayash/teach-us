import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import { signInSchema, signUpSchema } from "../validations/user.validation";
import { signIn, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", validateRequest(signUpSchema), signUp);
authRouter.post("/signin", validateRequest(signInSchema), signIn);

export { authRouter };
