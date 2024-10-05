import express from "express";
import userRoutes from "./v1/user.route.js";
import authRoutes from "./v1/auth.route.js";
const router = express.Router();

const baseURL = "/api/v1";

router.get(baseURL, async (req, res) => {
  res.status(200).send("API v1 health check");
});

router.use(`${baseURL}/users/`, userRoutes);
router.use(`${baseURL}/auth/`, authRoutes);

export default router;
