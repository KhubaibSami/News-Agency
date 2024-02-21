import express, { Router } from "express";
import authController from "../controller/authController.js";

const AuthRouter = Router();
AuthRouter.get("/register" , authController.register)

export default AuthRouter;
