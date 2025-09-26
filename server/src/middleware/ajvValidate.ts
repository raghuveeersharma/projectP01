import { Request, Response, NextFunction } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validate<T>(schema: JSONSchemaType<T>) {
  const validateFn = ajv.compile(schema);

  return (req: Request, res: Response, next: NextFunction) => {
    const valid = validateFn(req.body);

    if (!valid) {
      return res.status(400).json({
        errors: validateFn.errors,
      });
    }

    next();
  };
}
