import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  updateUser,
} from "../controllers/user.controllers";
import { validate } from "../middleware/ajvValidate";
import { createUserSchema, paramsSchema } from "../models/user.Schema";

const router = express.Router();

router.route("/user").post(validate(createUserSchema), postUser).get(getUsers);
router
  .route("/user/:id")
  .get(getUser, validate(paramsSchema))
  .put(updateUser, validate(paramsSchema))
  .delete(deleteUser, validate(paramsSchema));

export default router;
