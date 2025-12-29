import Article from "../models/Articles.js";

// GET all
export const getArticles = async (req, res) => {
  res.json(await Article.find());
};

// GET one
export const getArticleById = async (req, res) => {
  res.json(await Article.findById(req.params.id));
};

// CREATE
export const createArticle = async (req, res) => {
  res.json(await Article.create(req.body));
};

// UPDATE
export const updateArticle = async (req, res) => {
  res.json(await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

// DELETE
export const deleteArticle = async (req, res) => {
  res.json(await Article.findByIdAndDelete(req.params.id));
};
