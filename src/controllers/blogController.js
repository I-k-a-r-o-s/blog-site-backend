import { v2 as cloudinary } from "cloudinary";
import BlogModel from "../models/blogModel.js";

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
