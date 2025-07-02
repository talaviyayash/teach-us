import { Router } from "express";
import { createAdmin, session, getAdmin } from "../controllers/user.controller";
import { validateRequest } from "../utils/validateRequest";
import { createAdminSchema } from "../validations/user.validation";

const userRouter = Router();

userRouter.get("/session", session);
userRouter.post("/admin", validateRequest(createAdminSchema), createAdmin);
userRouter.get("/admin", getAdmin);

export { userRouter };
