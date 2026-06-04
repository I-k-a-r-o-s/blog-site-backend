import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.headers.authorization;

  JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.log("Missing JWT_SECRET!");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    console.log("Error in auth!", error);
    return res.status(500).json({
      success: false,
      message: "Invalid token!",
    });
  }
};
