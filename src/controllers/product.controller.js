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

export const updateProduct = async (req, res) => {
  if (!req.body) {
    return res.status(403).json({
      message: "Need data to update",
      data: null,
      success: false,
      error: null,
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: "product updated successfully",
      data: updatedProduct,
      success: true,
      error: null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "not found",
        data: null,
        success: false,
        error: null,
      });
    }

    return res.status(200).json({
      message: "product deleted successfully",
      data: deletedProduct,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err,
    });
  }
};
