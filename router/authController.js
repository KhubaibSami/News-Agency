import express, { Router } from "express";
import authController from "../controller/authController.js";
import userValidator from "../validators/authValidation.js";

const AuthRouter = Router();
AuthRouter.post("/register" , userValidator.create ,authController.create)
AuthRouter.post("/login", userValidator.login, authController.login )

export default AuthRouter;
