import dotenv from "dotenv";
dotenv.config();

if (
  !process.env.CLIENT_ORIGIN_URL ||
  !process.env.MONGO_URI ||
  !process.env.PORT
) {
  console.error("Missing required arguments");
  process.exit(1);
}

export const PORT = process.env.PORT;
export const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
export const MONGO_URI = process.env.MONGO_URI;
export const NODE_ENV = process.env.NODE_ENV || "development";
