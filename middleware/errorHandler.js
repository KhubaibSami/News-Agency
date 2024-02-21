import Joi from "joi";

const { ValidationError } = Joi;

const errorHandler = (error, req, res, next) => {
  let status = 500;
  let data = {
    Message: "internal server error",
  };
  if (error instanceof ValidationError) {
    status = 401;
    data.Message = error.message;

    return res.status(status).json(data);
  }
  if (error.status) {
    status = error.status;
  }
  if (error.message) {
    data.Message = error.Message;
  }
  return res.status(status).json(data);
};

export default errorHandler;
