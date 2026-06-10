import jwt from "jsonwebtoken";
import BlogModel from "../models/blogModel.js";
import CommentModel from "../models/commentModel.js";

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

export const getAllBlogsForAdmin = async (req, res) => {
  try {
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
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
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentModel.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Successfully Fetched All Comments!",
      comments,
    });
  } catch (error) {
    console.log("Error in getAllComments!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getDashboardContent = async (req, res) => {
  try {
    const recentBlogs = await BlogModel.find({})
      .sort({ createdAt: -1 })
      .limit(5); // only latest 5
    const blogs = await BlogModel.countDocuments(); //total blogs count
    const comments = await CommentModel.countDocuments(); //total comments
    const drafts = await BlogModel.countDocuments({ isPublised: false }); //total unpublished blogs

    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };
    return res.status(200).json({
      success: true,
      message: "Successfully Fetched Dashboard Data!",
      dashboardData,
    });
  } catch (error) {
    console.log("Error in getDashboardContent!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await CommentModel.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully Deleted Comment!",
    });
  } catch (error) {
    console.log("Error in deleteComment!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const approveComment = async (req, res) => {
  try {
    const { id } = req.params;

    await CommentModel.findByIdAndUpdate(id,{ isApproved: true });
     return res.status(200).json({
      success: true,
      message: "Comment Approved!",
    });
  } catch (error) {
    console.log("Error in approveComment!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
