import express from "express";
import { getAuth, signIn, signUp } from "../../controllers/auth.controller.js";
const authRoutes = express.Router();

authRoutes.get("/", getAuth);
authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);

export default authRoutes;
