import mongoose from "mongoose";
import { mongodb_connection_string } from "../config/index.js";

const connectionString =mongodb_connection_string;
const dbconnect = async () => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`database is connected to host ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

export default dbconnect;
