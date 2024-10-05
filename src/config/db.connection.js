import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "./env/.env.dev",
});

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      dbName: "e-com-database",
      connectTimeoutMS: 20000,
    });
    console.log("connected to DB");
  } catch (err) {
    console.log("DB connection error");
    console.error(err);
  }
};

export default connectDB;
