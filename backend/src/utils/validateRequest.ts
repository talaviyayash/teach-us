import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationErrorItem } from "joi";

const validateRequest =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body || {}, { abortEarly: true });

    if (error) {
      const errors = error.details.map(
        (detail: ValidationErrorItem) => detail.message
      );
      res
        .status(400)
        .json({ success: false, errors: errors[0], formErrors: errors });
      return;
    }
    next();
  };

export { validateRequest };
