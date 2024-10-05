import express from "express";
const authRoutes = express.Router();

authRoutes.get("/", async (req, res) => {
  res.status(200).send("this is auth route");
});

export default authRoutes;
