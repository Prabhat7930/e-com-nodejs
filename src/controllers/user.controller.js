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

export const getAllUsers = async (req, res) => {
  const query = req.query.latest;

  try {
    const users =
      query != "false" && query != ""
        ? await User.find().limit(2).sort({ createdAt: "desc" })
        : await User.find();

    if (!users) {
      res.status(404).json({
        message: "no users are there",
        success: false,
        error: {},
      });
    }

    const secureUsers = [];
    users.forEach((user) => {
      const { password, ...userData } = user._doc;
      secureUsers.push(userData);
    });

    res.status(200).json({
      message: "All users fetched",
      data: secureUsers,
      sucess: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "internal server error",
      data: null,
      success: false,
      error: err,
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear) - 1);

    const userStats = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      message: "these are the user stats from the last year",
      data: userStats,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "internal server error",
      success: false,
      error: err,
    });
  }
};

const getMonthName = (month) => {
  console.log(month);
  switch (parseInt(month)) {
    case 1:
      return "january";
    case 2:
      return "february";
    case 3:
      return "march";
    case 4:
      return "april";
    case 5:
      return "may";
    case 6:
      return "june";
    case 7:
      return "july";
    case 8:
      return "august";
    case 9:
      return "september";
    case 10:
      return "october";
    case 11:
      return "november";
    case 12:
      return "december";
    default:
      return "";
  }
};
