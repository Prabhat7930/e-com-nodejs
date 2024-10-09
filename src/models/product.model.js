import mongoose from "mongoose";
const { Schema } = mongoose;

const productModel = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    price: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    colors: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productModel);
export default Product;
