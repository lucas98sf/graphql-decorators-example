import dotenv from "dotenv";
dotenv.config();

const { PORT, NODE_ENV, MONGO_URI, JWT_SECRET } = process.env;
export const config = {
  PORT: parseInt(PORT ?? "3000", 10),
  NODE_ENV: NODE_ENV ?? "development",
  MONGO_URI,
  JWT_SECRET,
};
