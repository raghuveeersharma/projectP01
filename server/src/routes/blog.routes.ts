import express from "express";
import {
  createBlog,
  deleteBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blog.controllers";

const Router = express.Router();

Router.route("/blog").post(createBlog).delete(deleteBlogs);
Router.route("/blog/:id").put(updateBlog).get(getBlog);
export default Router;
