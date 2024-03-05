import CommentDTO from "../DTO/comment.js";
import Comment from "../models/comment.js";
const commentController = {
  create: async (req, res) => {
    const { content, author, blog } = req.body;
    try {
      const newComment = await Comment({
        blog,
        author,
        content,
      });
      await newComment.save();
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Error in comment create controller" });
    }
    return res.status(201).json({ msg: "comment Added" });
  },
  getById: async (req, res) => {
    let id;
    try {
      id = req.params.id;
      const comments = await Comment.findById(id).populate("author");

      console.log(comments);
      if (!comments) {
        return res.status(404).json({ message: "comment not found" });
      }
      let commentsDto = [];

      for (let i = 0; i < comments.length; i++) {
        const obj = new CommentDTO(comments[i]);
        commentsDto.push(obj);
      }

      return res.status(200).json({ data: commentsDto });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Error in getById controller" });
    }
  },
};
export default commentController;
