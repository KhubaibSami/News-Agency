import Joi from "joi";

// Regular expression pattern for password validation
const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]{8,}$/;

// Joi schema for user validation
const body = req.body;
try {
  const userSchema = Joi.object({
    // Validation for username
    username: Joi.string().min(5).max(30).required().messages({
      "string.empty": "Username is required.",
      "string.min": "Username must be at least {#limit} characters long.",
      "string.max": "Username must be at most {#limit} characters long.",
      "any.required": "Username is required.",
    }),

    // Validation for name
    name: Joi.string().min(5).max(30).required().messages({
      "string.empty": "Name is required.",
      "string.min": "Name must be at least {#limit} characters long.",
      "string.max": "Name must be at most {#limit} characters long.",
      "any.required": "Name is required.",
    }),

    // Validation for email
    email: Joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),

    // Validation for password
    password: Joi.string().pattern(passwordRegex).required().messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one special character.",
      "any.required": "Password is required.",
    }),

    // Validation for confirmPassword
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "Passwords must match.",
        "any.required": "Confirm password is required.",
      }),
  });

  const { error, value } = userSchema.validate(body);
  if (error) {
    return next(error);
  }
} catch (error) {
  return res.status(400).json({
    error,
    messages: "somethingh wrong in validation",
  });
}

export default userSchema;
