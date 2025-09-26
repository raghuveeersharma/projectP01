import { JSONSchemaType } from "ajv";
export enum UserRole {
  ADULT = "adult",
  TEEN = "teen",
  OLD = "old",
}

export interface CreateUserDto {
  name: string;
  age: number;
  status?: UserRole;
}

export const createUserSchema: JSONSchemaType<CreateUserDto> = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    age: { type: "number" },
    status: { type: "string", enum: Object.values(UserRole), nullable: true },
  },
  required: ["name", "age"],
  additionalProperties: false,
};

export const paramsSchema: JSONSchemaType<{ id: string }> = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 1 },
  },
  required: ["id"],
  additionalProperties: false,
};
