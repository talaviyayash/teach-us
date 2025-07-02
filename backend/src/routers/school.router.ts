import { Router } from "express";
import { validateRequest } from "../utils/validateRequest";
import {
  createSchoolSchema,
  editSchoolSchema,
} from "../validations/school.validation";
import {
  createSchool,
  editSchool,
  getSchool,
} from "../controllers/school.controller";
import {
  createCourseSchema,
  editCourseSchema,
} from "../validations/course.validation";
import {
  createCourse,
  editCourse,
  getCourse,
} from "../controllers/course.controller";
import { createSem, editSem, getSem } from "../controllers/sem.controller";
import { createSemSchema, editSemSchema } from "../validations/sem.validation";

const schoolRouter = Router();

schoolRouter.post("/", validateRequest(createSchoolSchema), createSchool);
schoolRouter.put("/:schoolId", validateRequest(editSchoolSchema), editSchool);
schoolRouter.get("/", getSchool);

schoolRouter.post(
  "/:schoolId/course",
  validateRequest(createCourseSchema),
  createCourse
);
schoolRouter.get("/:schoolId/course", getCourse);
schoolRouter.put(
  "/:schoolId/course/:courseId",
  validateRequest(editCourseSchema),
  editCourse
);

schoolRouter.get("/:schoolId/course/:courseId/sem", getSem);
schoolRouter.post(
  "/:schoolId/course/:courseId/sem",
  validateRequest(createSemSchema),
  createSem
);
schoolRouter.put(
  "/:schoolId/course/:courseId/sem/:semId",
  validateRequest(editSemSchema),
  editSem
);

schoolRouter.get(
  "/:schoolId/course/:courseId/sem/:semId/batch",
  validateRequest(editSemSchema),
  editSem
);

export { schoolRouter };
