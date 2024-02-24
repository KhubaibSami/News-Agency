import mongoose from "mongoose";

const { schema, model } = mongoose;

const tokenSchema = new schema({
  token: { type: String, required: true },
  author: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
});

export default model("tokenSchema", tokenSchema, "tokens");
