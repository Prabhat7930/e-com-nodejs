import Cart from "../models/cart.model.js";

export const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();

    res.status(201).json({
      message: "Cart created successfully",
      data: cartItem,
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

export const updateCart = async (req, res) => {
  if (!req.body) {
    return res.status(403).json({
      message: "Need data to update",
      data: null,
      success: false,
      error: null,
    });
  }

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: "Cart updated successfully",
      data: updatedCart,
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

export const deleteCartById = async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedCart) {
      return res.status(404).json({
        message: "not found",
        data: null,
        success: false,
        error: null,
      });
    }

    return res.status(200).json({
      message: "Cart deleted successfully",
      data: deletedCart,
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

export const getUserCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        data: null,
        success: false,
        error: {},
      });
    }

    return res.status(200).json({
      message: "Cart fetched",
      data: cart,
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

export const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();

    if (cartItems.length == 0) {
      return res.status(404).json({
        message: "Cart not found",
        data: null,
        success: false,
        error: {},
      });
    }

    return res.status(200).json({
      message: "Cart fetched",
      data: cartItems,
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
