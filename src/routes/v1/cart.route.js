import express from "express";
import {
  addToCart,
  deleteCartById,
  getUserCartItem,
  getCartItems,
  updateCart,
} from "../../controllers/cart.controller.js";
import { verifyJWT } from "../../middlewares/verifyJWT.js";
const cartRoutes = express.Router();

cartRoutes.get("/", async (req, res) => {
  res.status(200).send("api is running");
});

cartRoutes.post("/add", verifyJWT, addToCart);
cartRoutes.put("/update/:id", verifyJWT, updateCart);
cartRoutes.delete("/delete/:id", verifyJWT, deleteCartById);
cartRoutes.get("/:id", verifyJWT, getUserCartItem);
cartRoutes.get("/", verifyJWT, getCartItems);

export default cartRoutes;
