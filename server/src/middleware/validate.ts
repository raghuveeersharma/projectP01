// src/middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv({ allErrors: true });

// Generic validator middleware factory
export function validate<T>(schema: JSONSchemaType<T>) {
  const validateFn = ajv.compile(schema);
  return (req: Request, res: Response, next: NextFunction) => {
    if (!validateFn(req.body)) {
      return res.status(400).json({
        errors: validateFn.errors,
      });
    }
    next();
  };
}
