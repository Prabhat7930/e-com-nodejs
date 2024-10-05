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

    return res.status(201).json({
      message: "User created successfully!",
      data: userData,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "User not created",
      success: false,
      error: err,
    });
  }
});

authRoutes.post("/sign-in", async (req, res) => {
  if (!req.body) {
    return res.status(401).json({
      message: "Body is null",
      success: false,
    });
  }

  try {
    const { email, passwd } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User with this email not found.....please register",
        success: false,
      });
    }

    if (!compareHash(passwd, existingUser.password)) {
      return res.status(403).json({
        message: "Wrong password",
        success: false,
      });
    }

    const { password, ...userData } = existingUser._doc;

    return res.status(200).json({
      message: "welcome",
      data: userData,
      success: false,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
      error: err,
    });
  }
});

const compareHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export default authRoutes;
