import express from "express";
import { signIn, signUp } from "../../controllers/auth.controller.js";
const authRoutes = express.Router();

authRoutes.get("/", async (req, res) => {
  res.status(200).send("this is auth route");
});

authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);

export default authRoutes;
