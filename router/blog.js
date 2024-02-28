import { Router } from "express";

const blogRouter = Router();

blogRouter.post("/create", auth, blogController.create);
blogRouter.get("/all", auth, blogController.getAll);
blogRouter.get("/:id", auth, blogContrller.getById);
blogRouter.put("/update", auth, blogContrller.update);
blogContrller.delete("/:id", auth, blogContrller.delete);

export default blogRouter;
