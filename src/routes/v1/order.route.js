import express from "express";
import { verifyJWT } from "../../middlewares/verifyJWT.js";
import {
  addToOrder,
  deleteOrderById,
  getUserOrderItem,
  getOrderItems,
  updateOrder,
  getMonthlySales,
} from "../../controllers/order.controller.js";
import { verifyAdmin } from "../../middlewares/verifyAdmin.js";
const orderRoutes = express.Router();

orderRoutes.get("/", async (req, res) => {
  res.status(200).send("api is running");
});

orderRoutes.post("/add", verifyJWT, addToOrder);
orderRoutes.put("/update/:id", verifyAdmin, updateOrder);
orderRoutes.delete("/delete/:id", verifyJWT, deleteOrderById);
orderRoutes.get("/:id", verifyJWT, getUserOrderItem);
orderRoutes.get("/", verifyJWT, getOrderItems);
orderRoutes.get("/stats/sales", verifyAdmin, getMonthlySales);

export default orderRoutes;
