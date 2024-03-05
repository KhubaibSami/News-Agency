import Joi from "joi";
import comment from "../models/comment.js";
const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const commentValidation = {
  create: async (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        blog: Joi.string().regex(mongodbIdPattern).required(),
        author: Joi.string().regex(mongodbIdPattern).required(),
        content: Joi.string().required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res
          .status(400)
          .json({
            msg: "something went wrong in comment create validation",
            error,
          });
      }
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ msg: "something went wrong in comment create validator" });
    }
  },
  getById: async (req, res) => {
    try {
      const body = req.params;
      const schema = Joi.object({
        id: Joi.string().regex(mongodbIdPattern).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res
          .status(400)
          .json({
            msg: "something went wrong in blog getid validation",
            error,
          });
      }
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ msg: "something went wrong in blog getid validator" });
    }
  },
};
export default commentValidation;
