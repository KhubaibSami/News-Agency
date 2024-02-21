import "dotenv/config";
import express from "express";
import dbconnect from "./database/index.js";
import PORT from "./config/index.js";
import AllRouter from "./router/index.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(AllRouter);

dbconnect();
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
