import { Router } from "express";
import authController from "../controller/authController.js";
import userValidator from "../validators/authValidation.js";

const AuthRouter = Router();
AuthRouter.post("/register", userValidator.create, authController.create);
AuthRouter.post("/login", userValidator.login, authController.login);
AuthRouter.post("/logout", authController.logout);

export default AuthRouter;
