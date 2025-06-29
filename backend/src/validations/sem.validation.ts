import Joi from "joi";

export const createSemSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Course name is required",
    "string.empty": "Course name cannot be empty",
  }),
  description: Joi.string().trim().optional(),
}).required();

export const editSemSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Course name is required",
    "string.empty": "Course name cannot be empty",
  }),
  description: Joi.string().trim().optional(),
}).required();
