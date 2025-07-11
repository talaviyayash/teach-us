const MONGO_URI = process.env.MONGO_URI as string;

const ACCESS_TOKEN_JWT_SECRET = process.env.ACCESS_TOKEN_JWT_SECRET as string;

const ACCESS_TOKEN_EXPIRY = process.env
  .ACCESS_TOKEN_EXPIRY as unknown as number;

const REFRESH_TOKEN_JWT_SECRET = process.env.REFRESH_TOKEN_JWT_SECRET as string;

const REFRESH_TOKEN_EXPIRY = process.env
  .REFRESH_TOKEN_EXPIRY as unknown as number;

const PORT = process.env.PORT as unknown as number;

const NODEMAILER_EMAIL_USER = process.env.NODEMAILER_EMAIL_USER as string;
const NODEMAILER_EMAIL_PASS = process.env.NODEMAILER_EMAIL_PASS as string;

const FRONTEND_URL = process.env.FRONTEND_URL as string;

const FORGET_PASSWORD_TOKEN_JWT_SECRET = process.env
  .FORGET_PASSWORD_TOKEN_JWT_SECRET as string;

const FORGET_PASSWORD_TOKEN_EXPIRY = process.env
  .FORGET_PASSWORD_TOKEN_EXPIRY as unknown as number;

const FORGET_PASSWORD_LINK_EXPIRY = process.env
  .FORGET_PASSWORD_LINK_EXPIRY as unknown as string;

const NODE_ENV = process.env.NODE_ENV as unknown as string;

export {
  MONGO_URI,
  ACCESS_TOKEN_JWT_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_JWT_SECRET,
  REFRESH_TOKEN_EXPIRY,
  PORT,
  NODEMAILER_EMAIL_USER,
  NODEMAILER_EMAIL_PASS,
  FRONTEND_URL,
  FORGET_PASSWORD_TOKEN_JWT_SECRET,
  FORGET_PASSWORD_TOKEN_EXPIRY,
  FORGET_PASSWORD_LINK_EXPIRY,
  NODE_ENV,
};
