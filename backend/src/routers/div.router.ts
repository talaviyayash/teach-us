import { Router } from "express";
import { createBatch, getBatch } from "../controllers/batch.controller";

const divRouter = Router();

divRouter.get("/:divId/batch", getBatch);
divRouter.post("/:divId/batch", createBatch);

export { divRouter };
