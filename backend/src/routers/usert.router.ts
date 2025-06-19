import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import { signUpSchema } from "../validations/user.validation";
import { signUp } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", validateRequest(signUpSchema), signUp);
