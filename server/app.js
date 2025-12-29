import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { exec } from "child_process";
import articleRoutes from "./routes/articleRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/articles", articleRoutes);

// Scrape endpoint (optional call)
app.get("/scrape-blogs", async (req, res) => {
  const { exec } = await import("child_process");
  exec("npm run scrape");
  res.json({ message: "Scraping started..." });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});


app.post("/api/update-articles", (req, res) => {
  exec("cd ../updater && npm run update");
  res.json({ message: "Article update started" });
});
