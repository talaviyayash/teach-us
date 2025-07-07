import { Router } from "express";
import {
  createBatch,
  editBatch,
  getBatch,
  getBatchStudent,
} from "../controllers/batch.controller";

const batchRouter = Router();

batchRouter.put("/:batchId", editBatch);
batchRouter.get("/", getBatch);
batchRouter.post("/", createBatch);
batchRouter.post("/", createBatch);
batchRouter.get("/:batchId/student", getBatchStudent);

export { batchRouter };
