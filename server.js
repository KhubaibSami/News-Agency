import express from "express";
import dbconnect from "./database/index.js";
import PORT from "./config/index.js";
import AllRouter from "./router/index.js";

const app = express();

app.use(express.json());

app.use("/", AllRouter);

dbconnect();

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
