import "./config/envConfig";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import db from "./db";
import { authRouter } from "./routers/auth.router";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { PORT } from "./config/env";
import { schoolRouter } from "./routers/school.router";
import { userRouter } from "./routers/user.router";
import { courseRouter } from "./routers/course.router";
import { semRouter } from "./routers/sem.router";

db();

const corsOptions = {
  origin: true,
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms ")
);

app.use("/api/auth", authRouter);
app.use("/api/school", schoolRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/sem", semRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
