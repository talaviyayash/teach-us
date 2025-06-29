import { Router } from "express";
import { session } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/session", session);

export { userRouter };
