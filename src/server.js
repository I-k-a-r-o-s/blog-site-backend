import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./mongodb/mongodb.js";

// to fix a mongodb connection error. Not sure why it happens
import dns from "node:dns/promises"
import adminRouter from "./routes/adminRoutes.js";
dns.setServers(["8.8.8.8","1.1.1.1"]) 

const server = express();

// Midleware
server.use(express.json());
server.use(cors());

//Routes
server.use("/api/auth/",adminRouter)

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToMongoDB()
    server.listen(PORT, () => {
      console.log(`Server is Running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.log("Error in startServer!:",error);
    process.exit(1);
  }
};

startServer();
