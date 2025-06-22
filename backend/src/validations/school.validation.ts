import Joi from "joi";

export const createSchoolSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "School name is required",
    "string.empty": "School name cannot be empty",
  }),
  description: Joi.string().trim().optional(),
  principalEmail: Joi.string().email().required().messages({
    "string.email": "Principal email must be valid",
    "any.required": "Principal email is required",
  }),
}).required();

export const editSchoolSchema = Joi.object({
  name: Joi.string().trim().optional(),
  description: Joi.string().trim().optional(),
  isActive: Joi.boolean().optional(),
}).required();
