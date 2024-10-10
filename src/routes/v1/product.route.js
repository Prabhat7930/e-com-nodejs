import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../../controllers/product.controller.js";
import { verifyAdmin } from "../../middlewares/verifyAdmin.js";
import { parser } from "../../utils/cloudinary.js";
import { verifyJWT } from "../../middlewares/verifyJWT.js";
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

productRoutes.put(
  "/update/:id",
  verifyAdmin,
  parser.single("image"),
  updateProduct
);
productRoutes.delete("/delete/:id", verifyAdmin, deleteProductById);
productRoutes.get("/get-product/:id", verifyJWT, getProductById);
productRoutes.get("/get-all", verifyJWT, getAllProducts);

export default productRoutes;
