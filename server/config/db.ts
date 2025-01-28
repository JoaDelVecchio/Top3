import mongoose from "mongoose";
import { MONGO_URI } from ".";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB:${MONGO_URI}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${MONGO_URI}`, error);
    process.exit(1);
  }
};

export default connectDB;
