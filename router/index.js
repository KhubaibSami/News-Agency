import express, { Router } from "express";
import AuthRouter from "./authController.js";

const AllRouter = Router();
AllRouter.use("/auth", AuthRouter);

export default AllRouter;
