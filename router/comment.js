import { Router } from "express";
import comment from "../models/comment.js";
import commentValidation from "../validators/commentValidation.js";
import commentController from "../controller/commentController.js";
import auth from "../middleware/auth.js";

const commentRouter = Router();
commentRouter.post("/post",commentValidation.create, auth, commentController.create);
// commentRouter.post("/delete",commentValidation.delete, auth, commentController.delete);

commentRouter.get("/:id", auth, commentController.getById);

export default commentRouter;
