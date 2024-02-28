import jwtservices from "../services/JWTServices.js";
import { UserModel } from "../models/user.js";
import UserDTO from "../DTO/user.js";
const auth = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;
    if (!refreshToken || !accessToken) {
    
      return res.status(401).json({message: "unauthorized User"});
    }
    let _id;
    try {
      _id = jwtservices.verifyAccessToken(accessToken);
    } catch (error) {
      return res.status(500).json({ message: "error in auth middleware" });
    }
    let user;
    try {
      user = await UserModel.findOne({ _id: _id });
    } catch (error) {
      return res.status(500).json({ message: "error in user middleware" });
    }
     const userDTO = new UserDTO(user);
    req.user = userDTO;
    next();
  }
    
   catch (error) {
    return res.status(500).json({message: " somethingh went wrong in auth middleware"})
  }
}
export default auth;
