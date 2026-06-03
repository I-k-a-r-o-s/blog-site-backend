import { Router } from "express";
import { adminLogin } from "../controllers/adminController.js";

const adminRouter = Router();

adminRouter.post("/login", adminLogin);

export default adminRouter;
