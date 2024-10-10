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

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "product not found",
        data: null,
        success: false,
        error: {},
      });
    }

    return res.status(200).json({
      message: "product fetched",
      data: product,
      success: true,
      error: {},
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
      error: err.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  const latest = req.query.latest;
  const category = req.query.category;
  try {
    let products;
    if (latest && category == "") {
      products = await Product.find().sort({ createdAt: "desc" }).limit(2);
    } else if (category) {
      products = await Product.find({
        categories: {
          $in: [category],
        },
      });
    } else {
      products = await Product.find();
    }

    if (products.length == 0) {
      return res.status(404).json({
        message: "product not found",
        data: null,
        success: false,
        error: {},
      });
    }

    return res.status(200).json({
      message: "product fetched",
      data: products,
      success: true,
      error: {},
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      data: null,
      success: false,
      error: err.message,
    });
  }
};
