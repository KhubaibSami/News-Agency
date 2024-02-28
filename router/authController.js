import { Router } from "express";
import authController from "../controller/authController.js";
import userValidator from "../validators/authValidation.js";
import auth from "../middleware/auth.js";

const AuthRouter = Router();
AuthRouter.post("/register", userValidator.create, authController.create);
AuthRouter.post("/login", userValidator.login, authController.login);
AuthRouter.post("/logout", auth, authController.logout);
AuthRouter.get("/refresh", authController.refresh)

export default AuthRouter;
