import fs from "fs";
import blogModel from "../models/blog.js";
import { BACKEND_SERVER_PATH } from "../config/index.js";
import blogDTO from "../DTO/blog.js";
import blogDetailsDto from "../DTO/blodDetailsDto.js";
import Comment from "../models/comment.js";

const blogController = {
  create: async (req, res) => {
    const { title, author, photo, content } = req.body;
    // photo to buffer
    //read as buffer
    // const buffer = Buffer.from(
    //   photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    //   "base64"
    // );

    // //allot a random name
    // const imagePath = `${Date.now()}-${author}.png`;
    //  //save localy
    // try {
    //   fs.writeFileSync(`storage / ${imagePath}`, buffer);
    // } catch (error) {
    //   console.log(error);
    //   return res
    //     .status(400)
    //     .json({ message: "bad happen in create blog controller" });
    // }

    // save blog in db
    let newBlog;
    try {
      newBlog = new blogModel({
        title,
        content,
        author,
        // photoPath: `${BACKEND_SERVER_PATH}/storage/${imagePath}`,
      });
      await newBlog.save();
    } catch (error) {
      console.log(error);
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
      const blogs = await blogModel.find({});
      const blogsDto = [];
      for (let i = 0; i < blogs.length; i++) {
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
    try {
      const id = req.params.id;
      const blog = await blogModel.findOne({ _id: id }).populate("author");

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      const blogDto = new blogDetailsDto(blog);
      return res.status(200).json({ blog: blogDto });
    } catch (error) {
      return res.status(400).json({ message: "Error in getById controller" });
    }
  },
  update: async (req, res) => {},
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await blogModel.findOne({ _id: id }).populate("author");

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      await blogModel.deleteOne({ _id: id });
      await Comment.deleteMany({ blog: id });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Error in delete blog controller" });
    }
    return res.status(200).json({ message: "blog deleted" });
  },
};
export default blogController;
