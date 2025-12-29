// Home.js
import { useEffect, useState } from "react";
import { api } from "../services/api";
import ArticleCard from "../components/ArticleCard";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "3rem 2rem"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            animation: "fadeInDown 0.6s ease"
          }}
        >
          <h1
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "3.5rem",
              fontWeight: "800",
              color: "#ffffff",
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              letterSpacing: "-0.02em"
            }}
          >
            BeyondChats Articles
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "1.25rem",
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: "400"
            }}
          >
            Explore original content and enhanced versions
          </p>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px"
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid rgba(255, 255, 255, 0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }}
              />
              Loading articles...
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "2rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 600px), 1fr))"
            }}
          >
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}