import Joi from "joi";

const userValidator = {
  create: (req, res, next) => {
    try {
      const body = req.body;
      const schema = Joi.object({
        userName: Joi.string().min(3).max(10).required(),
        name: Joi.string().min(3).max(10).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .pattern(new RegExp(`^(?=.*\\d)(?=.*\\d)[\\s\\S]{5,}$`))
          .required(),
        confirmPassword: Joi.string()
          .valid(Joi.ref("password"))
          .required()
          .messages({
            "any.only": "Passwords must match.",
            "any.required": "Confirm password is required.",
          }),
      });
      const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({ error, msg: "something went wrong" });
      }
      next();
    } catch (error) {
      return res.status(400).json({ error, msg: "something went wrong" });
    }
  },
  login: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp(`^(?=.*\\d)(?=.*\\d)[\\s\\S]{5,}$`))
        .required(),
    });
    const { error, value } = schema.validate(body);
      if (error) {
        return res.status(400).json({ error, msg: "something went wrong" });
      }
      next();
  },
};

export default userValidator;
