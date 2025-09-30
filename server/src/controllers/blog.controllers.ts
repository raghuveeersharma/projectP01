import Blog from "../models/blog.model";
import User from "../models/user.model";
import { Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, authId } = req.body;
    const post = await Blog.create({ title, content, authId });
    if (!authId) {
    }
    await User.findByIdAndUpdate(authId, { $push: { Posts: post._id } });
    res.status(200).json({ message: "post created successfully!!", post });
  } catch (error) {
    throw new ApiError(400, "post creation failed");
  }
};

export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Blog.findById(id).populate(
      "authId",
      "firstName lastName"
    );

    if (!post) {
      throw new ApiError(400, "no post found for this id");
    }
    res.status(200).json({ message: "here is your post", post });
  } catch (error) {
    throw new ApiError(500, "error in get Post");
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!post) {
      throw new ApiError(400, "no post found for this id");
    }
    res.status(200).json({ message: "post updated successfully", post });
  } catch (error) {
    throw new ApiError(500, "error in update Post");
  }
};
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Blog.findByIdAndDelete(id);
    if (!post) {
      throw new ApiError(400, "no post found for this id");
    }
    await User.findByIdAndUpdate(post.authId, { $pull: { Posts: post._id } });
    res.status(200).json({ message: "post deleted successfully", post });
  } catch (error) {
    throw new ApiError(500, "error in delete Post");
  }
};

export const deleteBlogs = async (req: Request, res: Response) => {
  try {
    const posts = await Blog.deleteMany({});
    await User.updateMany({}, { $set: { Posts: [] } });
    if (!posts) {
      throw new ApiError(400, "no posts found to delete");
    }
    res.status(200).json({ message: "all posts deleted successfully", posts });
  } catch (error) {
    throw new ApiError(500, "error in delete Posts");
  }
};
