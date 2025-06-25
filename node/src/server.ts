import dotenv from "dotenv";
import connectDB from "./config/database";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 9000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
  } catch (error) {
    console.error("Server failed to start: ", error);
    process.exit(1);
  }
};

startServer();
