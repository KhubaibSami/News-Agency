import "dotenv/config";

import { UserModel } from "../models/user.js";
import { hash, compare } from "bcrypt";
import UserDTO from "../DTO/user.js";
import jwtservices from "../services/JWTServices.js";
import tokenModel from "../models/token.js";

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
        return res.status(400).json({ message: `UserName is alreay takenx` });
      }

      // Hash password
      const hashedPassword = await hash(password, 10);

      let accessToken;
      let refreshToken;

      // Create new user
      const newUser = await UserModel.create({
        name,
        userName,
        email,
        password: hashedPassword,
      });
      // token generation
      accessToken = jwtservices.signAccessToken(
        {
          _id: newUser._id,
          username: newUser.email,
        },
        "30m"
      );
      refreshToken = jwtservices.signrefreshToken(
        {
          _id: newUser._id,
        },
        "60m"
      );

      // store in db
      await jwtservices.storeRefreshToken(refreshToken, newUser.id);
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      // send token in cookies
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      // res respond
      const userDTO = new UserDTO(newUser);
      return res.status(201).json({
        message: "User created successfully",
        user: userDTO,
        auth: true,
      });
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
      // jwt cookies
      const accessToken = jwtservices.signAccessToken({ _id: user._id }, "30m");
      const refreshToken = jwtservices.signrefreshToken(
        { _id: user._id },
        "60m"
      );

      //update refrsh token
      await tokenModel.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );

      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      const userDTO = new UserDTO(user);
      return res
        .status(200)
        .json({ message: "Login successful", userDTO, auth: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "An error occurred in login controller", error });
    }
  },
  logout: async (req, res) => {
    const { refreshToken } = req.cookies;
    // delete token
    try {
      await tokenModel.deleteOne({ token: refreshToken });
    } catch (error) {
      return res.status(500).json({ message: "error in logout controller" });
    }
    //  delete cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    //response
    return res.status(200).json({ user: null, auth: false });
  },
  refresh: async (req, res) => {
    const originalRefreshToken = req.cookies.refreshToken;
    // get token from cookies
    let id;
    try {
      id = jwtservices.verifyRefreshToken(originalRefreshToken)._id;
      if(!id){
      return res.status(401).json({ message: "Unauthorized user" });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "refresh token expired" });
      }
      return res.status(401).json({ message: "bad happen in refresh token" });
    }
    // verify refreshToken
    try {
      const match = tokenModel.findOne({
        _id: id,
        token: originalRefreshToken,
      });
      if (!match) {
        return res.status(401).json({ message: "Unauthorized user" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "bad happen in refresh matching token" });
    }
    // generate refresh token
    try {
      const accessToken = jwtservices.signAccessToken({ _id: id }, "3m");
      const refreshToken = jwtservices.signrefreshToken({ _id: id }, "3m");

      await tokenModel.updateOne({ _id: id }, { token: refreshToken });
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "bad happen in refresh generating token" });
    }
    const user = await UserModel.findOne({ _id: id });
    const userDto = new UserDTO(user);
    return res.status(200).json({ user: userDto, auth: true });
  },
};

export default authController;
