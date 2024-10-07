import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const updateUserById = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "user not found",
        data: null,
        success: false,
        error: {},
      });
    }

    const { password, ...userData } = updatedUser._doc;
    return res.status(201).json({
      message: "user updated successfully",
      data: userData,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "something went wrong",
      data: null,
      success: false,
      error: err,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "user not found",
        data: null,
        success: false,
        error: {},
      });
    }

    return res.status(200).json({
      message: "user deleted successfully",
      data: null,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "something went wrong",
      data: null,
      success: false,
      error: err,
    });
  }
};

export const getAdminById = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);

    if (!admin) {
      return res.status(404).json({
        message: "user not found",
        data: null,
        success: false,
        error: {},
      });
    }

    const { password, ...adminData } = admin._doc;
    return res.status(200).json({
      message: "admin data fetched successfully",
      data: adminData,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "something went wrong",
      data: null,
      success: false,
      error: err,
    });
  }
};
