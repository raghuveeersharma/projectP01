import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";

export const postUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, age, status } = req.body;
  const user = new User({ name, age, status });
  await user.save().catch((err) => {
    throw new ApiError(400, "user creation failed");
  });
  res
    .status(200)
    .json({ message: `user created successfully ${process.pid}`, user });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id }).catch(() => {
    throw new ApiError(400, "no user found for this id");
  });
  res.status(200).json({ message: `user found ${process.pid}`, user });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  try {
    const users = await User.find().catch(() => {
      throw new ApiError(400, "no users found");
    });
    res.status(200).json({ message: `all users ${process.pid}`, users });
  } catch (error) {
    throw new ApiError(400, "no users found");
  }
});
export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        const error = new ApiError(400, "no user found for this id");
        throw error;
      }
      res.status(200).json({ message: "user deleted successfully", user });
    } catch (error) {
      next(error);
    }
  }
);

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, age, status } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    { name, age, status },
    { new: true }
  );
  if (!user) {
    const error = new ApiError(
      400,
      "no user found for update corrresponding to this id"
    );
    throw error;
  }
  res.status(200).json({ message: "user updated successfully", user });
});
