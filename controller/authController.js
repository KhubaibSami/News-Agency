import { UserModel } from "../models/user.js";
import { hash, compare } from "bcrypt";

const authController = {
  create: async (req, res) => {
    try {
      const { name, userName, email, password } = req.body; // taking values from  postman
      // "Querry" check admin exists or not
      const checkEmail = await UserModel.findOne({
        where: {
          email,
        },
      });
      if (checkEmail) {
        return res.json({
          message: `user with this ${email} exist`,
        });
      }
      const CheckUserName = await UserModel.findOne({
        where: {
          userName,
        },
      });
      if (CheckUserName) {
        return res.json({
          message: `user with this ${CheckUserName} exist`,
        });
      }

      // passowrd hashing for security
      const hpassword = await hash(password, 10);

      // "Querry" create admin
      const adminData = await UserModel.create({
        // both names are same so we can in this way
        name,
        email,
        userName,
        password: hpassword,
      });

      return res.status(200).json({ message: `${adminData} added` }); // satus 200 means ok shown in rankman
      // for keys & values {} added = message is key, we write simple msgs with qoutes without {}
    } catch (error) {
      return res.status(500).json({ message: "bad happen", error });
    }
  },
};
export default authController;
