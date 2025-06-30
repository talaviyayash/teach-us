import { Router } from "express";
import { createDiv, getDiv } from "../controllers/div.controller";

const semRouter = Router();

semRouter.get("/:semId/div", getDiv);
semRouter.post("/:semId/div", createDiv);

export { semRouter };
