import { Router } from "express";
import { addBlog } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";

const blogRouter = Router();

blogRouter.post("/add", auth, upload.single("image"), addBlog);

export const blogRouter;
