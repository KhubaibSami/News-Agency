import { UserModel } from "../models/user.js";
import { hash, compare } from "bcrypt";
import UserDTO from "../DTO/user.js";

const authController = {
  create: async (req, res) => {
    try {
      const { name, userName, email, password } = req.body;

      // Check if user with email exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exists` });
      }
      const existingUserName = await UserModel.findOne({ userName });
      if (existingUserName) {
        return res
          .status(400)
          .json({ message: `UserName is alreay takenx` });
      }

      // Hash password
      const hashedPassword = await hash(password, 10);

      // Create new user
      const newUser = await UserModel.create({
        name,
        userName,
        email,
        password: hashedPassword,
      });

      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred in register controller", error });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user with email exists
      let user = await UserModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: `User with email ${email} not found` });
      }

      // Compare passwords
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const userDTO = new UserDTO(user)
      return res.status(200).json({ message: "Login successful",userDTO });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred in login controller", error });
    }
  },
};

export default authController;
