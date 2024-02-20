import "dotenv/config";

import express from "express";
import dbconnect from "./database/index.js";
import PORT from "./config/index.js";
const app = express();


dbconnect();
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
