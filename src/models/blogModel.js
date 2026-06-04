import { model, models, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
  },
  { timestamps: true },
);

const BlogModel = models.BlogModel || model("BlogModel", blogSchema);

export default BlogModel;
