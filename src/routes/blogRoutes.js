import { Router } from "express";
import {
  addBlog,
  addComment,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getCommentsbyBlog,
  publishedState,
} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const blogRouter = Router();

blogRouter.post("/add", auth, upload.single("image"), addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/delete/:id", auth, deleteBlog);
blogRouter.post("/published-state/:id", auth, publishedState);
blogRouter.post("/add-comments",addComment)
blogRouter.post("/comments",getCommentsbyBlog)

export default blogRouter;
