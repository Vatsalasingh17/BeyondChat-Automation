import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  url: String,
  content: String,
  scrapedAt: { type: Date, default: Date.now },
  updatedVersion: String,
  references: [String]
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;   // <-- IMPORTANT
