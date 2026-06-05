import jwt from "jsonwebtoken";
import BlogModel from "../models/blogModel";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Credentials!" });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      token,
    });
  } catch (error) {
    console.log("Error in adminLogin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getAllBlogsForAdmin=async(req,res)=>{
  try {
    const blogs=(await BlogModel.find({})).sort({createdAt:-1})
     return res.status(200).json({
      success: true,
      message: "Successfully Fetched All Blogs!",
      blogs,
    });
  } catch (error) {
    console.log("Error in getAllBlogsForAdmin!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
}