import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Bookmark, CheckCircle, ExternalLink, BookmarkCheck } from "lucide-react";
import { gsap } from "gsap";

export default function ProblemCard({ problem }) {
  const { solvedList, bookmarks, toggleSolved, toggleBookmark } = useContext(AppContext);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const isSolved = solvedList.includes(problem.id);
  const isBookmarked = bookmarks.includes(problem.id);

  // GSAP Hover Animations
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -4,
      borderColor: "rgba(99, 102, 241, 0.35)",
      boxShadow: "0 12px 30px rgba(99, 102, 241, 0.12)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      borderColor: "rgba(255, 255, 255, 0.08)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Badge rendering
  const getDifficultyClass = (diff) => {
    if (diff === "Easy") return "badge-easy";
    if (diff === "Medium") return "badge-medium";
    return "badge-hard";
  };

  const handleCardClick = () => {
    navigate(`/problem/${problem.id}`);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      style={cardStyle}
      className="glass-panel"
    >
      {/* Top row: LC#, Difficulty, Bookmark */}
      <div style={topRowStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={lcNumberStyle}>#{problem.leetcodeNumber}</span>
          <span className={getDifficultyClass(problem.difficulty)}>
            {problem.difficulty}
          </span>
        </div>
        
        {/* Bookmark Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(problem.id);
          }}
          style={{
            ...bookmarkBtnStyle,
            color: isBookmarked ? "var(--secondary)" : "var(--text-muted)"
          }}
          title={isBookmarked ? "Remove Bookmark" : "Bookmark Problem"}
        >
          <Bookmark size={18} style={{ fill: isBookmarked ? "var(--secondary)" : "none" }} />
        </button>
      </div>

      {/* Mid row: Title */}
      <div style={titleAreaStyle}>
        <h4 style={titleStyle}>{problem.title}</h4>
        {isSolved && (
          <CheckCircle size={18} color="var(--easy)" style={{ flexShrink: 0, fill: "rgba(16, 185, 129, 0.1)" }} />
        )}
      </div>

      {/* Bottom info: Pattern, Topic */}
      <div style={infoRowStyle}>
        <span className="topic-tag">{problem.topic}</span>
        <span style={patternTextStyle}>{problem.pattern}</span>
      </div>

      {/* Companies */}
      <div style={companiesContainerStyle}>
        {problem.companies.slice(0, 3).map((comp) => (
          <span key={comp} className="company-tag">{comp}</span>
        ))}
        {problem.companies.length > 3 && (
          <span style={moreCompaniesStyle}>+{problem.companies.length - 3} more</span>
        )}
      </div>

      {/* Action footer */}
      <div style={footerStyle} onClick={(e) => e.stopPropagation()}>
        {/* Solve Status Toggler */}
        <button
          onClick={() => toggleSolved(problem.id)}
          style={{
            ...solvedTogglerStyle,
            borderColor: isSolved ? "var(--easy)" : "var(--border-glass)",
            color: isSolved ? "var(--easy)" : "var(--text-secondary)",
            background: isSolved ? "rgba(16, 185, 129, 0.05)" : "rgba(255, 255, 255, 0.02)"
          }}
        >
          {isSolved ? "Solved" : "Mark Solved"}
        </button>

        {/* Leetcode External Link */}
        <a
          href={problem.leetcodeLink}
          target="_blank"
          rel="noreferrer"
          style={leetcodeLinkStyle}
          className="glass-panel"
        >
          LeetCode <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}

// Styles
const cardStyle = {
  padding: "16px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  cursor: "pointer",
  position: "relative",
  userSelect: "none"
};

const topRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const lcNumberStyle = {
  fontSize: "0.8rem",
  fontWeight: "700",
  color: "var(--text-muted)",
  fontFamily: "'Space Grotesk', monospace"
};

const bookmarkBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s"
};

const titleAreaStyle = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "8px"
};

const titleStyle = {
  fontSize: "1.05rem",
  fontWeight: "700",
  lineHeight: "1.3",
  color: "var(--text-primary)"
};

const infoRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap"
};

const patternTextStyle = {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  fontWeight: "500"
};

const companiesContainerStyle = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
  marginTop: "2px"
};

const moreCompaniesStyle = {
  fontSize: "0.7rem",
  color: "var(--text-muted)",
  fontWeight: "600",
  alignSelf: "center"
};

const footerStyle = {
  display: "flex",
  gap: "10px",
  marginTop: "auto", // Push to bottom of flex container
  paddingTop: "12px",
  borderTop: "1px solid rgba(255, 255, 255, 0.05)"
};

const solvedTogglerStyle = {
  flex: "1",
  padding: "8px 0",
  border: "1px solid",
  borderRadius: "8px",
  fontSize: "0.8rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const leetcodeLinkStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  textDecoration: "none",
  color: "var(--text-secondary)",
  fontSize: "0.8rem",
  fontWeight: "600",
  padding: "8px 12px",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid var(--border-glass)",
  transition: "all 0.2s"
};
