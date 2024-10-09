import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  if (!req.file) {
    return res.status(403).json({
      message: "send the image",
    });
  }

  try {
    const newProduct = new Product({ ...req.body, image: req.file.path });
    await newProduct.save();

    res.status(201).json({
      message: "Procuct created successfully",
      data: newProduct,
      success: false,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
      error: err,
    });
  }
};
