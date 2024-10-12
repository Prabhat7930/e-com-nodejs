import Order from "../models/order.model.js";

export const addToOrder = async (req, res) => {
  try {
    const orderItem = new Order(req.body);
    await orderItem.save();

    res.status(201).json({
      message: "Order created successfully",
      data: orderItem,
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

export const updateOrder = async (req, res) => {
  if (!req.body) {
    return res.status(403).json({
      message: "Need data to update",
      data: null,
      success: false,
      error: null,
    });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    return res.status(201).json({
      message: "Order updated successfully",
      data: updatedOrder,
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

export const deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({
        message: "not found",
        data: null,
        success: false,
        error: null,
      });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
      data: deletedOrder,
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

export const getUserOrderItem = async (req, res) => {
  try {
    const orderItem = await Order.findOne({ userId: req.params.id });
    if (!orderItem) {
      return res.status(404).json({
        message: "Order not found",
        data: null,
        success: false,
        error: {},
      });
    }

    return res.status(200).json({
      message: "Order fetched",
      data: orderItem,
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

export const getOrderItems = async (req, res) => {
  try {
    const orderItems = await Order.find();

    if (orderItems.length == 0) {
      return res.status(404).json({
        message: "Order not found",
        data: null,
        success: false,
        error: {},
      });
    }

    return res.status(200).json({
      message: "Order fetched",
      data: orderItems,
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

export const getMonthlySales = async (req, res) => {
  const date = new Date();
  const currentMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(
    new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
  );

  try {
    const monthlySales = await Order.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    return res.status(200).json({
      message: "These are the monthly sales",
      data: monthlySales,
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
