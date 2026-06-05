import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  publishedState,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const blogRouter = Router();

blogRouter.post("/add", auth, upload.single("image"), addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/delete", auth, deleteBlog);
blogRouter.post("/published-state", auth, publishedState);

export default blogRouter;
