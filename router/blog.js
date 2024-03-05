import { Router } from "express";
import blogController from "../controller/blogcontroller.js";
import blogValidation from "../validators/blog.js";
import auth from "../middleware/auth.js";

const blogRouter = Router();

blogRouter.post("/create", auth, blogValidation.create, blogController.create);
blogRouter.get("/all", auth, blogController.getAll);
blogRouter.get("/:id", auth, blogValidation.getId, blogController.getById);
blogRouter.put("/update", auth, blogController.update);
blogRouter.delete("/:id", auth, blogValidation.delete, blogController.delete);

export default blogRouter;
