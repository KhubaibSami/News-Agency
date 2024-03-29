import Joi from "joi";

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogValidation = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().regex(mongodbIdPattern).required(),
        content: Joi.string().required(),
        // photo: Joi.string().required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res
          .status(400)
          .json({ msg: "something went wrong in blog create validation",error });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "something went wrong in blog create validator" });
    }
  },
  getId: async (req, res, next) => {
    try {
      const body = req.params;
      const schema = Joi.object({
        id: Joi.string().regex(mongodbIdPattern).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res
          .status(400)
          .json({ msg: "something went wrong in blog getid validation" ,error});
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "something went wrong in blog getid validator" });
    }
  },
  delete: (req, res, next) => {
    try {
      const body = req.params;
      const schema = Joi.object({
        id: Joi.string().regex(mongodbIdPattern).required(),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res
          .status(400)
          .json({ msg: "something went wrong in delete blog validation",error });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "something went wrong in blog delete validator" });
    }
  },
};

export default blogValidation;
