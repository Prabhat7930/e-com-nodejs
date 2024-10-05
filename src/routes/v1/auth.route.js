import express from "express";
import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
const authRoutes = express.Router();

authRoutes.get("/", async (req, res) => {
  res.status(200).send("this is auth route");
});

authRoutes.post("/sign-up", async (req, res) => {
  if (!req.body) {
    return res.status(401).json({
      message: "Body is null",
      success: false,
    });
  }

  try {
    const securePassword = bcrypt.hashSync(req.body.password, 10);

    const newUser = User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: securePassword,
    });

    await newUser.save();

    const { password, ...userData } = newUser._doc;

    res.status(201).json({
      message: "User created successfully!",
      data: userData,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "User not created",
      success: false,
      error: err,
    });
  }
});

export default authRoutes;
