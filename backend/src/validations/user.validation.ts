import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
  isGoogleLogin: Joi.boolean().default(false),
}).required();

const signInSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
}).required();

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
}).required();

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "Token is required",
    "any.required": "Token is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
}).required();

export {
  signUpSchema,
  signInSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
};

export const createAdminSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  name: Joi.string().trim().required().messages({
    "any.required": "School name is required",
    "string.empty": "School name cannot be empty",
  }),
}).required();
