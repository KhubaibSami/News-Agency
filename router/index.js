import express, { Router } from "express";
import AuthRouter from "./authController.js";
import blogRouter from "./blog.js";

const AllRouter = Router();
AllRouter.use("/auth", AuthRouter);
AllRouter.use("/blog", blogRouter);

export default AllRouter;
