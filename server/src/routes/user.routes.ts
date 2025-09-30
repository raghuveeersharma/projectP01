import express from "express";
import {
  deleteUser,
  deleteUsers,
  getUser,
  getUsers,
  postUser,
  updateUser,
} from "../controllers/user.controllers";
import { validate } from "../middleware/ajvValidate";
import { createUserSchema, paramsSchema } from "../models/user.Schema";

const router = express.Router();

router
  .route("/user")
  .post(validate(createUserSchema), postUser)
  .get(getUsers)
  .delete(deleteUsers);
router
  .route("/user/:id")
  .put(updateUser, validate(paramsSchema))
  .delete(deleteUser, validate(paramsSchema))
  .get(getUser);

export default router;
