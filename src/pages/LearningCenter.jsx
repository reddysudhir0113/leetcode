import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { learningGuides } from "../data/learningGuides";
import { BookOpen, ArrowLeft, Star, ChevronRight, Zap, Target } from "lucide-react";
import ProblemCard from "../components/ProblemCard";

export default function LearningCenter() {
  const { patternId } = useParams();
  const { questions } = useContext(AppContext);
  const navigate = useNavigate();

  // Route 1: List all 8 pattern guides if no patternId is provided
  if (!patternId) {
    return (
      <div style={containerStyle}>
        <div style={bannerStyle} className="glass-panel">
          <BookOpen size={22} color="var(--primary)" />
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Pattern Learning Center</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
            Master coding interviews by learning the core patterns rather than memorizing individual solutions.
          </p>
        </div>

        <div style={guidesGridStyle}>
          {learningGuides.map(guide => (
            <div
              key={guide.id}
              onClick={() => navigate(`/learning/${guide.id}`)}
              style={guideCardStyle}
              className="glass-panel glass-card-interactive"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={iconBadgeStyle}>
                  <Star size={16} color="var(--secondary)" />
                </div>
                <h3 style={cardTitleStyle}>{guide.title}</h3>
              </div>
              
              <p style={cardDescStyle}>{guide.description}</p>
              
              <div style={cardFooterStyle}>
                <span style={{ fontSize: "0.8rem", color: "var(--primary)", fontWeight: "600" }}>
                  View pattern details
                </span>
                <ChevronRight size={14} color="var(--primary)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Route 2: Render specific pattern detail guide
  const activeGuide = learningGuides.find(g => g.id === patternId);
  
  if (!activeGuide) {
    return (
      <div style={containerStyle}>
        <button onClick={() => navigate("/learning")} className="btn-secondary">
          <ArrowLeft size={16} /> Back to Learning Center
        </button>
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <h3>Pattern Guide Not Found</h3>
        </div>
      </div>
    );
  }

  // Find sample problems mapped to this guide
  const sampleProblems = activeGuide.sampleProblems
    .map(pId => questions.find(q => q.id === pId))
    .filter(Boolean);

  return (
    <div style={containerStyle}>
      {/* Back navigation and header */}
      <div>
        <button onClick={() => navigate("/learning")} style={backButtonStyle} className="glass-panel">
          <ArrowLeft size={16} /> Guides Directory
        </button>

        <h1 style={{ fontSize: "2.2rem", fontWeight: "800", marginTop: "24px" }} className="gradient-text-indigo-cyan">
          {activeGuide.title} Guide
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "4px" }}>
          {activeGuide.description}
        </p>
      </div>

      {/* Theory & Visual Blocks */}
      <div style={contentSplitStyle}>
        {/* Left Column: Theory & Visual Illustration */}
        <div style={leftColStyle}>
          <div style={infoCardStyle} className="glass-panel">
            <h3 style={sectionTitleStyle}>Theoretical Concept</h3>
            <p style={theoryTextStyle}>{activeGuide.theory}</p>
          </div>

          <div style={infoCardStyle} className="glass-panel">
            <h3 style={sectionTitleStyle}>Visual Outline</h3>
            <pre style={visualPreStyle} className="code-font">{activeGuide.visualExplanation}</pre>
          </div>
        </div>

        {/* Right Column: Common Tricks & Cheat Sheets */}
        <div style={rightColStyle}>
          <div style={tricksCardStyle} className="glass-panel">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Zap size={18} color="var(--medium)" />
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Pattern Hacks & Tricks</h3>
            </div>
            
            <ul style={tricksListStyle}>
              {activeGuide.commonTricks.map((trick, idx) => (
                <li key={idx} style={trickItemStyle}>
                  {trick}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Sample Problems practice list */}
      <div style={{ marginTop: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Target size={18} color="var(--secondary)" />
          <h3 style={{ fontSize: "1.2rem", fontWeight: "750" }}>Sample Practice Problems</h3>
        </div>

        <div style={problemsGridStyle}>
          {sampleProblems.map(problem => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
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

const bannerStyle = {
  padding: "24px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const guidesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px"
};

const guideCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  height: "100%"
};

const iconBadgeStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "8px",
  background: "rgba(6, 182, 212, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const cardTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "750",
  color: "var(--text-primary)"
};

const cardDescStyle = {
  fontSize: "0.85rem",
  color: "var(--text-secondary)",
  lineHeight: "1.5"
};

const cardFooterStyle = {
  marginTop: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "12px",
  borderTop: "1px solid rgba(255, 255, 255, 0.05)"
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

const contentSplitStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "24px",
  "@media (min-width: 900px)": {
    gridTemplateColumns: "1.1fr 0.9fr"
  }
};

// Responsive Inject
if (typeof document !== "undefined") {
  const styleId = "learningcenter-responsive-css";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @media (min-width: 900px) {
        .learning-split {
          grid-template-columns: 1.1fr 0.9fr !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
contentSplitStyle.className = "learning-split";

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

const infoCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const sectionTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "750",
  marginBottom: "12px"
};

const theoryTextStyle = {
  fontSize: "0.9rem",
  color: "var(--text-secondary)",
  lineHeight: "1.6"
};

const visualPreStyle = {
  background: "rgba(3, 7, 18, 0.3)",
  border: "1px solid var(--border-glass)",
  borderRadius: "10px",
  padding: "16px",
  color: "var(--secondary)",
  fontSize: "0.85rem",
  overflowX: "auto",
  lineHeight: "1.4"
};

const tricksCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const tricksListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  paddingLeft: "16px",
  color: "var(--text-secondary)",
  fontSize: "0.9rem"
};

const trickItemStyle = {
  lineHeight: "1.5",
  marginBottom: "4px"
};

const problemsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px"
};
