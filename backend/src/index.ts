import "./config/envConfig";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./db";
import { authRouter } from "./routers/auth.router";

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

app.listen(process.env.PORT, () => {
  console.log(`runing on ${process.env.PORT}`);
});
