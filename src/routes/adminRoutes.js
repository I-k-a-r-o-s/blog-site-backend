import { Router } from "express";
import {
  adminLogin,
  approveComment,
  deleteComment,
  getAllBlogsForAdmin,
  getAllComments,
  getDashboardContent,
} from "../controllers/adminController.js";
import { auth } from "../middleware/auth.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsForAdmin);
adminRouter.delete("/delete-comment", auth, deleteComment);
adminRouter.post("/approve-comment", auth, approveComment);
adminRouter.get("/dashboard", auth, getDashboardContent);

export default adminRouter;
