import { Router } from "express";
import {
  createBatch,
  editBatch,
  getBatch,
} from "../controllers/batch.controller";

const batchRouter = Router();

batchRouter.put("/:batchId", editBatch);
batchRouter.get("/", getBatch);
batchRouter.post("/", createBatch);

export { batchRouter };
