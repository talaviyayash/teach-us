import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import {
  createSchoolSchema,
  editSchoolSchema,
} from "../validations/school.validation";
import { createSchool, editSchool } from "../controllers/school.controller";

const schoolRouter = Router();

schoolRouter.post("/", validateRequest(createSchoolSchema), createSchool);
schoolRouter.put("/:schoolId", validateRequest(editSchoolSchema), editSchool);

export { schoolRouter };
