import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    blog: { type: mongoose.SchemaTypes.ObjectId, ref: "Blog" },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema, "comments");
