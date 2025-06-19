import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

console.log("MONGO_URI", MONGO_URI);

const db = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default db;
