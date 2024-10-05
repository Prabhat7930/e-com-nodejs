import express from "express";
const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  res.status(200).send("This is user route");
});

export default userRoutes;
