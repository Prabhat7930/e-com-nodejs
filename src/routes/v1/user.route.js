import express from "express";
import {
  deleteUserById,
  getAdminById,
  updateUserById,
} from "../../controllers/user.controller.js";
import { verifyJWT } from "../../middlewares/verifyJWT.js";
import { verifyAdmin } from "../../middlewares/verifyAdmin.js";
const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  res.status(200).send("This is user route");
});

userRoutes.put("/update/:id", verifyJWT, updateUserById);
userRoutes.delete("/delete/:id", verifyAdmin, deleteUserById);
userRoutes.get("/get-admin/:id", verifyAdmin, getAdminById);

export default userRoutes;
