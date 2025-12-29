// ArticleCard.js
import { useState } from "react";
import { FileText, ExternalLink, BookOpen, Sparkles, ChevronRight, ChevronDown } from "lucide-react";

export default function ArticleCard({ article }) {
  const [toggle, setToggle] = useState(false);   // false = original, true = updated
  const [showFull, setShowFull] = useState(false); // view more / less
  const [isHovered, setIsHovered] = useState(false);

  // determine which content to show based on toggle
  const content = toggle
    ? (article.updatedVersion || "No updated version available yet.")
    : (article.content || "No original content available.");

  // split into words
  const words = content.split(" ");
  const wordLimit = 75;
  const isLong = words.length > wordLimit;

  // manage displayed text
  const displayText = showFull
    ? content
    : words.slice(0, wordLimit).join(" ") + (isLong ? "..." : "");

  // when user switches Original/Updated, collapse again
  const handleToggleVersion = () => {
    setToggle(!toggle);
    setShowFull(false);
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2px",
        borderRadius: "20px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(102, 126, 234, 0.4)"
          : "0 10px 30px rgba(0, 0, 0, 0.1)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "18px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* background glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
            pointerEvents: "none"
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* header */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "0.75rem",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FileText size={24} color="white" />
            </div>
            <h2
              style={{
                margin: 0,
                fontSize: "1.75rem",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              {article.title}
            </h2>
          </div>

          {/* source link */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#667eea",
              textDecoration: "none",
              fontSize: "0.95rem",
              marginBottom: "1.5rem",
              padding: "0.5rem 1rem",
              background: "rgba(102, 126, 234, 0.1)",
              borderRadius: "8px",
              transition: "all 0.2s ease"
            }}
          >
            <ExternalLink size={16} />
            <span style={{ fontWeight: "500" }}>View Source</span>
          </a>

          {/* toggle version */}
          <button
            style={{
              padding: "0.875rem 1.75rem",
              marginBottom: "1.5rem",
              background: toggle
                ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
            }}
            onClick={handleToggleVersion}
          >
            {toggle ? <BookOpen size={20} /> : <Sparkles size={20} />}
            {toggle ? "Show Original" : "Show Updated"}
            <ChevronRight size={18} />
          </button>

          {/* content preview / full */}
          <div
            style={{
              background: toggle
                ? "linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
              padding: "1.5rem",
              borderRadius: "12px",
              whiteSpace: "pre-wrap",
              lineHeight: "1.8",
              fontSize: "1.05rem",
              color: "#333",
              border: "1px solid",
              borderColor: toggle ? "rgba(245, 87, 108, 0.2)" : "rgba(102, 126, 234, 0.2)"
            }}
          >
            {displayText}
          </div>

          {/* VIEW MORE / LESS */}
          {isLong && (
            <button
              onClick={() => setShowFull(!showFull)}
              style={{
                background: "transparent",
                border: "none",
                color: "#764ba2",
                fontWeight: "700",
                cursor: "pointer",
                marginTop: "1rem",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem"
              }}
            >
              {showFull ? "View Less" : "View More"}
              <ChevronDown
                size={18}
                style={{
                  transform: showFull ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "all .3s"
                }}
              />
            </button>
          )}

          {/* references */}
          {toggle && article.references?.length > 0 && (
            <div style={{ marginTop: "1.5rem" }}>
              <h4 style={{ marginBottom: "1rem", fontSize: "1.25rem", fontWeight: "600", color: "#667eea" }}>
                <BookOpen size={20} /> References
              </h4>
              <ul style={{ paddingLeft: "1.5rem" }}>
                {article.references.map((ref, i) => (
                  <li key={i} style={{ marginBottom: "0.75rem", fontSize: "0.95rem" }}>
                    <a href={ref} target="_blank" rel="noopener noreferrer" style={{ color: "#667eea" }}>
                      {ref}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
