import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: String;
  content: String;
  authId: mongoose.Types.ObjectId;
}

const blogSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IPost>("Blog", blogSchema);
export default Blog;
