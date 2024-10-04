import express from "express";
import connectDB from "./config/db.connection.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
