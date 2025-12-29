import dotenv from "dotenv";
import axios from "axios";
import { googleSearch } from "./lib/googleSearch.js";
import { scrapeExternal } from "./lib/scrapeExternal.js";
import { rewriteArticle } from "./lib/llmRewrite.js";

dotenv.config();

const { API_BASE, SERP_API_KEY, OPENAI_API_KEY } = process.env;

async function run() {
  console.log("Fetching articles from backend...");
  const { data: articles } = await axios.get(API_BASE);

  for (let article of articles) {
    console.log(`\n🔎 Processing: ${article.title}`);

    // 1) Google search
    const links = await googleSearch(article.title, SERP_API_KEY);
    console.log("Top ranking links:", links);

    // 2) Scrape external content
    const [site1, site2] = await Promise.all([
      scrapeExternal(links[0]),
      scrapeExternal(links[1])
    ]);

    // 3) Rewrite using LLM
    const rewritten = await rewriteArticle(
      article.content,
      site1,
      site2,
      OPENAI_API_KEY
    );

    // 4) Publish updated article
    await axios.put(`${API_BASE}/${article._id}`, {
      updatedVersion: rewritten,
      references: links
    });

    console.log(`✅ Updated & saved: ${article.title}`);
  }

  console.log("\n🎉 ALL ARTICLES UPDATED!");
}

run().catch(console.error);
