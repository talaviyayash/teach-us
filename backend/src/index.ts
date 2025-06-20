import "./config/envConfig";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./db";
import { authRouter } from "./routers/auth.router";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { PORT } from "./config/env";

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

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
