import pkg from "cloudinary";
export const { v2 } = pkg;
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    folder: "e-com-products",
    resource_type: "image",
    public_id: (req, res) => {},
  },
});

export const parser = multer({ storage: storage });
