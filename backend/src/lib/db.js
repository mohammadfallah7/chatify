import mongoose from "mongoose";
import ENV from "./env.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("DB CONNECTED", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to DB:", error);
    process.exit(1);
  }
};

export { connectDB };
