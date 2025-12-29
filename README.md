# 🚀 BeyondChat Automation — Automated Article Scraping, Rewriting & Publishing

This project automates the collection of articles from the BeyondChats blog, rewrites them using AI based on top-ranked reference articles, and publishes the updated content — while displaying both original and rewritten versions through a modern UI.
## 📌 Live Demo

| Component | Live URL |
|-----------|----------|
| **Frontend UI** | https://YOUR-CLIENT-URL.onrender.com |
| **Backend API** | https://beyondchat-automation.onrender.com/api/articles |
| **Database** | MongoDB Atlas |

---

## 🎯 Project Goals

- Scrape the **oldest blog articles** from BeyondChats.
- Automatically **fetch top-ranked Google search competitor content**.
- Use AI to **rewrite & enhance articles** based on reference content.
- Publish the improved articles into the same system.
- Display **Original vs Updated articles** in a responsive UI.

---

## 🧠 Features

| Feature | Description |
|---------|-------------|
| Article scraping | Fetches articles from BeyondChats |
| CRUD API | Get / Update / Rewrite / List articles |
| Google results extraction | Retrieves top search competitor links |
| AI rewriting | Uses LLM to rewrite original content |
| Update publishing | Updated versions stored back into DB |
| Web UI | View **Original vs Updated** versions toggle |
| View More toggle | Shows long text progressively |
| Auto rewrite button | Triggers batch rewrite from UI |

---

# 🏗️ Architecture / Data Flow Diagram

```mermaid
flowchart TD

A[🌐 BeyondChats Website] -->|Scrape Oldest Articles| B[📥 Scraper Service]
B -->|Store Originals| C[(MongoDB Atlas DB)]

C -->|Fetch Originals| D[🧠 Updater Script]
D -->|Google Search| E[🔍 SERP API]
E -->|Fetch competitor links| F[🌍 External Blogs]
F -->|Scrape content| D

D -->|Rewrite using AI| G[🤖 OpenAI API]
G -->|Updated content + references| C

C -->|Serve API Data| H[🛠️ Node/Express Backend]
H -->|REST JSON| I[💻 React Frontend]
I -->|Toggle View| User((👤 User))




vatsala
