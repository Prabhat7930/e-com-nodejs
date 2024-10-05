import express from "express";
import connectDB from "./config/db.connection.js";
import router from "./routes/index.route.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.status(200).send("API health check");
});

app.use("/", router);

export default app;
