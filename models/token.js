import mongoose from "mongoose";

const { Schema, model } = mongoose;

const tokenSchema = new Schema(
  {
    token: { type: String, required: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const tokenModel = model("tokenSchema", tokenSchema, "tokens");

export default tokenModel;
