import fs from "fs";
import blog from "../models/blog.js";
import { BACKEND_SERVER_PATH } from "../config/index.js";
import blogDTO from "../DTO/blog.js";

const blogController = {
  create: async (req, res) => {
    const { title, author, photo, content } = req.body;
    // photo to buffer
    //read as buffer
    const buffer = Buffer.from(
      photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    //allot a random name
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
  getAll: async (req, res) => {
    try {
      const blogs = await blog.find({});
      const blogsDto = [];
      for (let i = 0; i < blog.length; i++) {
        const dto = new blogDTO(blogs[i]);
        blogsDto.push(dto);
      }
      return res.status(200).json({ blogs: blogsDto });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "bad happen in all read blog controller" });
    }
  },
  getById: async (req, res) => {
    let blog;
    try {
      const id = req.params;
      blog = await blog.FindOne({ _id: id });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "bad happen in id read blog controller" });
    }
    const blogDto = new blogDTO(blog);
    return res.status(200).json({ blog: blogDto });
  },
  update: async (req, res) => {},
  delete: async (req, res) => {},
};
export default blogController;
