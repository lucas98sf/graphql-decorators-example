import app from "./app";
import { config } from "./config";
import { connectToDatabase } from "./db";

app.listen(config.PORT, async () => {
  if (!config.MONGO_URI)
    throw new Error("Please specify a MongoDB URI in .env file");
  await connectToDatabase(config.MONGO_URI);
  console.log(`Server listening on port ${config.PORT}`);
});
