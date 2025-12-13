import dotenv from "dotenv";
dotenv.config(); // Load .env FIRST

import mongoose from "mongoose";
import express from "express";
import cors from "cors";

// Debug test: print env
console.log("Loaded MONGO_URL:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
