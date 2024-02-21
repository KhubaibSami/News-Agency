import user from "../models/user.js";

const authController = {
  async register(req, res, next) {
    const { userName, name, email, password } = req.body;
    try {
      //  before registration check email and userName
      const CheckEmail = user.exists({ email });
      const CheckUserName = user.exists({ userName });
      // check email
      if (CheckEmail) {
        const error = {
          status: 409, // conflict
          message: `${CheckEmail} already register use  other email`,
        };
        return next(error);
      }
      // check userName
      if (CheckUserName) {
        const error = {
          status: 409, // conflict
          message: `${CheckUserName} already register use other name`,
        };
        return next(error);
      }
    } catch (error) {
      return next(error)
    }
  },
  async login() {},
};
export default authController;
