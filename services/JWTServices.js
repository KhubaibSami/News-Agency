import  jwt  from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../config/index.js";
import { ACCESS_TOKEN_SECRET } from "../config/index.js";
import tokenSchema from "../models/token.js";

class jwtservices {
  //sign access token
  static signAccessToken(payload, experyTime) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET,  {
      expiresIn: experyTime,
    });
  }
  // sign refresh token
  static signrefreshToken(payload, experyTime) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET,  {
      expiresIn: experyTime,
    });
  }
  // verify access token
  static verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }
  // verify refresh token
  static verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  }
  static async storeRefreshToken(token, userId) {
    try {
      const newToken = new tokenSchema({
        token: token,
        userId: userId,
      });
      // db conect
      await newToken.save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default jwtservices;
