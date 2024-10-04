import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({
  path: "../env/.env.dev",
});

const PORT = process.env.PORT;

try {
  app.listen(PORT || 8080, () => {
    console.log(`server is listening on PORT ${PORT}`);
  });
} catch (err) {
  console.log("error connecting to server");
  console.error(err);
}
