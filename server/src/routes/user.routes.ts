import express from "express";
import { postUser } from "../controllers/user.controllers";

const router = express.Router();

router.post("/user",postUser);

export default router;