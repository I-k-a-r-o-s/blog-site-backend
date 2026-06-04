import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connected to MongoDB!");
  } catch (error) {
    console.log("Error in connectToMongoDB!:", error);
    process.exit(1);
  }
};
