import { Router } from "express";
import { addBlog } from "../controllers/blogController.js";
import upload from "../middleware/multer.js";

const blogRouter = Router();

blogRouter.post("/add",upload.single("image"), addBlog);

export const blogRouter;
