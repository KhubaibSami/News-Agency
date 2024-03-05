import express, { Router } from "express";
import AuthRouter from "./authRouter.js";
import blogRouter from "./blog.js";
import commentRouter from "./comment.js";

const AllRouter = Router();
AllRouter.use("/auth", AuthRouter);
AllRouter.use("/blog", blogRouter);
AllRouter.use("/comment", commentRouter);

export default AllRouter;
