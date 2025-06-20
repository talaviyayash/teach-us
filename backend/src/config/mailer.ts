import nodemailer from "nodemailer";
import { NODEMAILER_EMAIL_PASS, NODEMAILER_EMAIL_USER } from "./env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_EMAIL_USER,
    pass: NODEMAILER_EMAIL_PASS,
  },
});

export default transporter;
