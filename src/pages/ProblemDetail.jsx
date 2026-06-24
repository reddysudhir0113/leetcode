import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { 
  ArrowLeft, Bookmark, CheckCircle, ExternalLink, Play, 
  ChevronRight, Lightbulb, AlertTriangle, FileText, CheckCircle2 
} from "lucide-react";

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    questions, solvedList, bookmarks, notes, 
    toggleSolved, toggleBookmark, saveNote, addRecentlyViewed 
  } = useContext(AppContext);

  const problem = questions.find(q => q.id === id);

  // States
  const [revealedHints, setRevealedHints] = useState({ 0: false, 1: false, 2: false });
  const [localNote, setLocalNote] = useState("");

  // Safety check if problem isn't found
  useEffect(() => {
    if (!problem) {
      navigate("/problems");
      return;
    }
    // Add to recently viewed on mount
    addRecentlyViewed(problem.id);
    
    // Load notes
    if (notes[problem.id]) {
      setLocalNote(notes[problem.id]);
    } else {
      setLocalNote("");
    }

    // Reset hints
    setRevealedHints({ 0: false, 1: false, 2: false });
  }, [id, problem, notes, navigate]);

  if (!problem) return null;

  const isSolved = solvedList.includes(problem.id);
  const isBookmarked = bookmarks.includes(problem.id);

  const toggleHint = (idx) => {
    setRevealedHints(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleNoteChange = (e) => {
    const val = e.target.value;
    setLocalNote(val);
    saveNote(problem.id, val);
  };

  // Get difficulty CSS class
  const getDifficultyClass = (diff) => {
    if (diff === "Easy") return "badge-easy";
    if (diff === "Medium") return "badge-medium";
    return "badge-hard";
  };

  // Common pitfalls associated with topics/patterns
  const getCommonMistakes = (topic) => {
    if (topic === "Arrays" || topic === "Two Pointers" || topic === "Sliding Window") {
      return [
        "Index out of bounds error: check boundaries (especially left/right pointers).",
        "Off-by-one errors when computing indices: remember size - 1 is the last element.",
        "Incorrect variable updates: modifying elements inside a loop while iterating."
      ];
    }
    if (topic === "Dynamic Programming") {
      return [
        "Incorrect base cases: always verify 0/1 inputs are handled.",
        "Stack overflow in recursion: ensure memoization is working properly.",
        "Memory limit exceeded: check if 2D grid DP can be optimized to 1D arrays."
      ];
    }
    if (topic === "Trees" || topic === "BST") {
      return [
        "Forgetting to check if node is null (NullPointerException).",
        "Assuming a binary tree has BST ordering properties when it doesn't.",
        "Infinite loops during traversing due to cycle references (though rare in pure trees)."
      ];
    }
    return [
      "Not handling edge cases: empty strings, empty arrays, single values, negative inputs.",
      "Time Limit Exceeded: check if a hash map lookup can replace nested loops.",
      "Type casting or size overflows: watch for integer divisions in JavaScript."
    ];
  };

  return (
    <div style={containerStyle}>
      {/* Header Navigation */}
      <div style={headerNavStyle}>
        <button onClick={() => navigate(-1)} style={backButtonStyle} className="glass-panel">
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* Bookmark Trigger */}
          <button 
            onClick={() => toggleBookmark(problem.id)} 
            style={{
              ...actionBtnStyle,
              borderColor: isBookmarked ? "var(--secondary)" : "var(--border-glass)",
              color: isBookmarked ? "var(--secondary)" : "var(--text-secondary)"
            }}
            className="glass-panel"
          >
            <Bookmark size={16} style={{ fill: isBookmarked ? "var(--secondary)" : "none" }} />
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          {/* Solved Status Toggler */}
          <button 
            onClick={() => toggleSolved(problem.id)} 
            style={{
              ...actionBtnStyle,
              borderColor: isSolved ? "var(--easy)" : "var(--border-glass)",
              color: isSolved ? "var(--easy)" : "var(--text-secondary)",
              background: isSolved ? "rgba(16, 185, 129, 0.05)" : "transparent"
            }}
            className="glass-panel"
          >
            <CheckCircle2 size={16} style={{ fill: isSolved ? "rgba(16, 185, 129, 0.1)" : "none" }} />
            {isSolved ? "Solved" : "Mark Solved"}
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div style={titleBannerStyle} className="glass-panel">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <span style={lcStyle}>#{problem.leetcodeNumber}</span>
          <span className={getDifficultyClass(problem.difficulty)}>{problem.difficulty}</span>
          <span className="topic-tag">{problem.topic}</span>
          <span style={patternStyle}>{problem.pattern}</span>
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: "800", marginTop: "12px" }}>{problem.title}</h1>
      </div>

      {/* Two-Column Grid Layout */}
      <div className="detail-grid">
        
        {/* Left Column: Problem details, complexity, links & notes */}
        <div style={leftColStyle}>
          {/* Objective */}
          <div style={detailsCardStyle} className="glass-panel">
            <h3 style={cardTitleStyle}>Learning Objective</h3>
            <p style={cardBodyTextStyle}>{problem.learningObjective}</p>
          </div>

          {/* Concepts Badges */}
          <div style={detailsCardStyle} className="glass-panel">
            <h3 style={cardTitleStyle}>Important Concepts</h3>
            <div style={conceptsContainerStyle}>
              {problem.concepts.map(c => (
                <span key={c} style={conceptBadgeStyle} className="glass-panel">{c}</span>
              ))}
            </div>
          </div>

          {/* Complexity Cards */}
          <div style={complexityRowStyle}>
            <div style={{ ...complexityCardStyle, borderLeft: "4px solid var(--primary)" }} className="glass-panel">
              <span style={complexityLabelStyle}>Time Complexity</span>
              <span style={complexityValueStyle} className="code-font">{problem.timeComplexity}</span>
            </div>
            <div style={{ ...complexityCardStyle, borderLeft: "4px solid var(--secondary)" }} className="glass-panel">
              <span style={complexityLabelStyle}>Space Complexity</span>
              <span style={complexityValueStyle} className="code-font">{problem.spaceComplexity}</span>
            </div>
          </div>

          {/* Study Links */}
          <div style={linksCardStyle} className="glass-panel">
            <h3 style={cardTitleStyle}>Resource Explanations</h3>
            <div style={linksGroupStyle}>
              <a 
                href={problem.leetcodeLink} 
                target="_blank" 
                rel="noreferrer" 
                style={linkItemStyle}
                className="glass-panel"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <ExternalLink size={16} color="var(--secondary)" />
                  <span style={{ fontWeight: "600" }}>Official LeetCode Statement</span>
                </div>
                <ChevronRight size={16} />
              </a>

              <a 
                href={problem.youtubeLink} 
                target="_blank" 
                rel="noreferrer" 
                style={linkItemStyle}
                className="glass-panel"
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Play size={16} color="red" style={{ fill: "red" }} />
                  <span style={{ fontWeight: "600" }}>Video Explanation (NeetCode)</span>
                </div>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Personal Revision Notes */}
          <div style={notesCardStyle} className="glass-panel">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <FileText size={18} color="var(--primary)" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Personal Revision Notes</h3>
            </div>
            <textarea
              value={localNote}
              onChange={handleNoteChange}
              placeholder="Record your code structure, edge cases to watch out for, or complexity breakdowns..."
              style={textareaStyle}
            />
            <span style={noteSavingHintStyle}>Notes are saved locally automatically as you type.</span>
          </div>
        </div>

        {/* Right Column: Progressive Hints & Common Pitfalls */}
        <div style={rightColStyle}>
          {/* Hints Section */}
          <div style={hintsCardStyle} className="glass-panel">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Lightbulb size={18} color="var(--medium)" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Progressive Hints</h3>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              Stuck on a problem? Reveal these sequential hints step-by-step to guide your solution logic without spoiling the final answer.
            </p>

            <div style={hintsListStyle}>
              {problem.hints.map((hint, idx) => (
                <div key={idx} style={hintRowStyle}>
                  <button 
                    onClick={() => toggleHint(idx)} 
                    style={{
                      ...revealHintBtnStyle,
                      color: revealedHints[idx] ? "var(--text-primary)" : "var(--medium)",
                      background: revealedHints[idx] ? "rgba(255,255,255,0.03)" : "rgba(245, 158, 11, 0.08)"
                    }}
                  >
                    <span>Hint {idx + 1}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>
                      {revealedHints[idx] ? "COLLAPSE" : "REVEAL HINT"}
                    </span>
                  </button>
                  {revealedHints[idx] && (
                    <div style={hintContentStyle} className="glass-panel">
                      {hint}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes / Pitfalls */}
          <div style={pitfallsCardStyle} className="glass-panel">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <AlertTriangle size={18} color="var(--hard)" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Common Pitfalls</h3>
            </div>
            <ul style={pitfallsListStyle}>
              {getCommonMistakes(problem.topic).map((mistake, idx) => (
                <li key={idx} style={pitfallItemStyle}>
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  paddingTop: "100px",
  paddingBottom: "60px",
  maxWidth: "1400px",
  margin: "0 auto",
  paddingLeft: "16px",
  paddingRight: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "24px"
};

const headerNavStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px"
};

const backButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid var(--border-glass)",
  background: "rgba(255,255,255,0.02)",
  padding: "8px 16px",
  borderRadius: "8px",
  color: "var(--text-secondary)",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s"
};

const actionBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid",
  padding: "8px 16px",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s"
};

const titleBannerStyle = {
  padding: "24px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.05)"
};

const lcStyle = {
  fontSize: "0.85rem",
  fontWeight: "700",
  color: "var(--text-secondary)",
  fontFamily: "'Space Grotesk', monospace"
};

const patternStyle = {
  fontSize: "0.8rem",
  color: "var(--text-muted)",
  fontWeight: "600"
};



const leftColStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "24px"
};

const rightColStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "24px"
};

const detailsCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const cardTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "700",
  marginBottom: "10px",
  color: "var(--text-primary)"
};

const cardBodyTextStyle = {
  fontSize: "0.9rem",
  color: "var(--text-secondary)",
  lineHeight: "1.6"
};

const conceptsContainerStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap"
};

const conceptBadgeStyle = {
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "0.8rem",
  fontWeight: "600",
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid var(--border-glass)",
  color: "var(--text-secondary)"
};

const complexityRowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px"
};

const complexityCardStyle = {
  padding: "16px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const complexityLabelStyle = {
  fontSize: "0.75rem",
  fontWeight: "700",
  color: "var(--text-muted)",
  textTransform: "uppercase"
};

const complexityValueStyle = {
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "var(--text-primary)"
};

const linksCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const linksGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const linkItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderRadius: "10px",
  textDecoration: "none",
  color: "var(--text-secondary)",
  fontSize: "0.9rem",
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid var(--border-glass)",
  transition: "all 0.2s"
};

const notesCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const textareaStyle = {
  width: "100%",
  minHeight: "160px",
  borderRadius: "10px",
  background: "rgba(3, 7, 18, 0.3)",
  border: "1px solid var(--border-glass)",
  padding: "12px",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  fontFamily: "inherit",
  outline: "none",
  resize: "vertical",
  lineHeight: "1.5"
};

const noteSavingHintStyle = {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  marginTop: "6px",
  display: "inline-block"
};

const hintsCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const hintsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const hintRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const revealHintBtnStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  transition: "all 0.2s"
};

const hintContentStyle = {
  padding: "14px",
  borderRadius: "10px",
  fontSize: "0.88rem",
  color: "var(--text-secondary)",
  lineHeight: "1.5",
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  animation: "fadeIn 0.2s ease-out"
};

const pitfallsCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const pitfallsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  paddingLeft: "16px",
  color: "var(--text-secondary)",
  fontSize: "0.88rem"
};

const pitfallItemStyle = {
  lineHeight: "1.5",
  marginBottom: "4px"
};
