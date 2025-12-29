import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeExternal(url) {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
      }
    });

    const $ = cheerio.load(data);

    return $("article, main, .post, .post-content, #content")
      .text()
      .replace(/\s+/g, " ")
      .trim();
  } catch (err) {
    console.log("❌ Error scraping:", url, "\nReason:", err.message);
    return ""; // return empty so LLM rewrite still works
  }
}
