import express from "express";
import { createProduct } from "../../controllers/product.controller.js";
import { verifyAdmin } from "../../middlewares/verifyAdmin.js";
import { parser } from "../../utils/cloudinary.js";
const productRoutes = express.Router();

productRoutes.get("/", async (req, res) => {
  res.status(200).send("product is running");
});

productRoutes.post(
  "/create",
  verifyAdmin,
  parser.single("image"),
  createProduct
);

export default productRoutes;
