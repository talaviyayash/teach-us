import { Router } from "express";
import { getCourse } from "../controllers/course.controller";
import { getSem } from "../controllers/sem.controller";

const courseRouter = Router();

courseRouter.get("/", getCourse);
courseRouter.get("/:courseId/sem", getSem);

export { courseRouter };
