import { JSONSchemaType } from "ajv";
export enum UserRole {
  ADULT = "adult",
  TEEN = "teen",
  OLD = "old",
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  age: number;
  status?: UserRole;
}

export const createUserSchema: JSONSchemaType<CreateUserDto> = {
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 3 },
    lastName: { type: "string", minLength: 3 },
    age: { type: "number" },
    status: { type: "string", enum: Object.values(UserRole), nullable: true },
  },
  required: ["firstName", "lastName", "age"],
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
