import axios from "axios";
import * as cheerio from "cheerio";   // <-- FIXED
import Article from "../models/Articles.js";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const URL = "https://beyondchats.com/blogs/";

async function scrapeBlogs() {
  console.log("Scraping oldest 5 BeyondChats blogs...");
  const { data } = await axios.get(URL);
  const $ = cheerio.load(data);

  let articles = [];

  $("article").each((i, el) => {
    if (i < 5) {
      const title = $(el).find("h2").text().trim();
      const url = $(el).find("a").attr("href");
      articles.push({ title, url, content: "Pending full scrape" });
    }
  });

  const saved = await Article.insertMany(articles);
  console.log(`Saved ${saved.length} articles to DB`);
  process.exit();
}

scrapeBlogs();
