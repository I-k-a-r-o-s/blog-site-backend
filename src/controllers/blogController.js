import { v2 as cloudinary } from "cloudinary";
import BlogModel from "../models/blogModel.js";
import CommentModel from "../models/commentModel.js";
import { geminiAI } from "../configs/geminiAI.js";

export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog,
    );
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.status(400).json({
        success: false,
        message: "Missing Required Fields!",
      });
    }

    const result = await cloudinary.uploader.upload(imageFile.path);

    await BlogModel.create({
      title,
      subTitle,
      description,
      category,
      image: result.secure_url,
      isPublished,
    });

    return res.status(201).json({
      message: "Blog added successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in addBlog:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find({ isPublished: true });
    if (!blogs) {
      return res
        .status(404)
        .json({ success: false, message: "No Published Blogs Exist!" });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully Fetched All Blogs!",
      blogs,
    });
  } catch (error) {
    console.log("Error in getAllBlogs!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Found!" });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully Fetched the Blog!",
      blog,
    });
  } catch (error) {
    console.log("Error in getBlogById!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await BlogModel.findByIdAndDelete(id);

    //delete comments of the deleted blog
    await CommentModel.deleteMany({ blog: id });

    return res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully!",
    });
  } catch (error) {
    console.log("Error in deleteBlog!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const publishedState = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogModel.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog status updated!",
    });
  } catch (error) {
    console.log("Error in publishedState!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;

    await CommentModel.create({
      blog,
      name,
      content,
    });
    return res.status(200).json({
      success: true,
      message: "Comment added for review!",
    });
  } catch (error) {
    console.log("Error in addComment!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const getCommentsbyBlog = async (req, res) => {
  try {
    const { id } = req.body;

    const comments = await CommentModel.find({
      blog: id,
      isApproved: true,
    }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Comments Fetched Successfully!",
      comments,
    });
  } catch (error) {
    console.log("Error in getComments!:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export const generateBlog = async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiBlog = await geminiAI(prompt);
    res.status(200).json({
      success: true,
      message: "Blog generated successfully!",
      aiBlog,
    });
  } catch (error) {
    console.log("Error in generateBlog!:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
