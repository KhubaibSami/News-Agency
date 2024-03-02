import fs from "fs";
import blog from "../models/blog.js";
import { BACKEND_SERVER_PATH } from "../config/index.js";
import blogDTO from "../DTO/blog.js";

const blogController = {
  create: async (req, res) => {
    const { title, author, photo, content } = req.body;
    // photo to buffer
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png\jpeg\jpg);base64,/, ""),
      "base64"
    );
    // buffro to random name
    const imagePath = `${Date.now()}-${author}.png`;
    //save localy
    try {
      fs.writeFileSync(`storage / ${imagePath}`, buffer);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "bad happen in create blog controller" });
    }

    // save blog in db
    let newBlog;
    try {
      newBlog = new blog({
        title,
        content,
        author,
        photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "bad happen in save blog controller" });
    }
    const blogDto = new blogDTO(newBlog);
    return res
      .status(200)
      .json({ message: "blog created successfully", blog: blogDto });
  },
  getAll: async (req, res) => {},
  getById: async (req, res) => {},
  update: async (req, res) => {},
  delete: async (req, res) => {},
};
export default blogController;
