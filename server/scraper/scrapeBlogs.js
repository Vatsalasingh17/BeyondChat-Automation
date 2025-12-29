import axios from "axios";
import * as cheerio from "cheerio";
import Article from "../models/Articles.js";
import dotenv from "dotenv";
import connectDB from "../config/db.js";

dotenv.config();
await connectDB();

const BLOG_URL = "https://beyondchats.com/blogs/";

async function scrapeBlogs() {
  console.log("Scraping BeyondChats full articles...");

  const { data } = await axios.get(BLOG_URL);
  const $ = cheerio.load(data);

  let articles = [];

  // collect first 5 article links
  const links = $("article a")
    .map((i, el) => $(el).attr("href"))
    .get()
    .slice(0, 5);

  // scrape each page fully
  for (const link of links) {
    const { data: page } = await axios.get(link);
    const $$ = cheerio.load(page);

    const title = $$("h1,h2").first().text().trim();
    const content = $$("article, main, .single-content, .post")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    console.log("Scraped:", title);

    articles.push({
      title,
      url: link,
      content,
      updatedVersion: "",
      references: []
    });
  }

  await Article.deleteMany({});
  const saved = await Article.insertMany(articles);
  console.log(`Saved ${saved.length} full articles.`);
  process.exit();
}

scrapeBlogs();
