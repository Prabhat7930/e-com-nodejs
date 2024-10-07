import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "./env/.env.dev",
});
const jwt = jsonwebtoken;

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized user",
      data: null,
      success: false,
      error: {},
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Invalid token",
      data: null,
      success: false,
      error: {},
    });
  }
};
