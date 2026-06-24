import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Clock, RefreshCw, Compass, ShieldAlert, Award } from "lucide-react";
import ProblemCard from "../components/ProblemCard";

export default function DailyChallenge() {
  const { questions, solvedList } = useContext(AppContext);
  const navigate = useNavigate();

  // Filter States for custom generator
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [company, setCompany] = useState("All");
  
  const [generatedProblem, setGeneratedProblem] = useState(null);
  const [dailyProblem, setDailyProblem] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Generate consistent daily problem based on calendar date
  useEffect(() => {
    if (questions.length === 0) return;

    const today = new Date();
    const dateNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Seeded random calculation: simple hash modulo questions count
    const index = dateNum % questions.length;
    setDailyProblem(questions[index]);
  }, [questions]);

  // Unique filter items
  const allCompanies = [
    "Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", 
    "Adobe", "Walmart", "Oracle", "Salesforce", "Infosys", "TCS", 
    "Accenture", "Deloitte", "Capgemini", "Cognizant"
  ];

  const allTopics = [
    "Arrays", "Strings", "Hash Maps", "Two Pointers", "Sliding Window",
    "Binary Search", "Recursion", "Linked List", "Stack", "Queue",
    "Heap", "Trees", "BST", "Graphs", "Backtracking", "Greedy",
    "Dynamic Programming", "Bit Manipulation", "Trie"
  ];

  const handleGenerateCustom = () => {
    // Filter questions
    const pool = questions.filter(q => {
      const matchDiff = difficulty === "All" || q.difficulty === difficulty;
      const matchTopic = topic === "All" || q.topic === topic;
      const matchComp = company === "All" || q.companies.includes(company);
      return matchDiff && matchTopic && matchComp;
    });

    setHasSearched(true);

    if (pool.length > 0) {
      const randIdx = Math.floor(Math.random() * pool.length);
      setGeneratedProblem(pool[randIdx]);
    } else {
      setGeneratedProblem(null);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Banner */}
      <div style={bannerStyle} className="glass-panel">
        <Clock size={22} color="var(--primary)" />
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Daily Challenge Arena</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          Solve today's recommended coding problem to maintain your daily streak, or run the Custom Challenge generator.
        </p>
      </div>

      {/* Main split: Daily vs Custom Generator */}
      <div style={splitGridStyle}>
        
        {/* Left Card: Daily Recommended Problem */}
        <div style={challengeCardStyle} className="glass-panel">
          <div style={cardHeaderStyle}>
            <Award size={20} color="var(--secondary)" />
            <h3 style={cardTitleStyle}>Today's Recommended Problem</h3>
          </div>
          <p style={cardDescStyle}>
            Automatically drawn based on today's calendar date. Solve this to update your streak!
          </p>

          {dailyProblem ? (
            <div style={cardWrapperStyle}>
              <ProblemCard problem={dailyProblem} />
            </div>
          ) : (
            <div style={loadingStyle}>Loading today's challenge...</div>
          )}
        </div>

        {/* Right Card: Custom Challenge Generator */}
        <div style={challengeCardStyle} className="glass-panel">
          <div style={cardHeaderStyle}>
            <RefreshCw size={18} color="var(--primary)" />
            <h3 style={cardTitleStyle}>Custom Challenge Draw</h3>
          </div>
          
          <div style={formGridStyle}>
            {/* Difficulty */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} style={selectStyle}>
                <option value="All">Any Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Topic */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Topic</label>
              <select value={topic} onChange={(e) => setTopic(e.target.value)} style={selectStyle}>
                <option value="All">Any Topic</option>
                {allTopics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Company */}
            <div style={fieldStyle}>
              <label style={labelStyle}>Company</label>
              <select value={company} onChange={(e) => setCompany(e.target.value)} style={selectStyle}>
                <option value="All">Any Company</option>
                {allCompanies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button onClick={handleGenerateCustom} className="btn-primary" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>
            Generate Random Problem
          </button>

          {/* Generated Result display */}
          {hasSearched && (
            <div style={resultContainerStyle}>
              {generatedProblem ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={resultTitleStyle}>DRAW RESULT:</span>
                  <ProblemCard problem={generatedProblem} />
                </div>
              ) : (
                <div style={noDrawStyle} className="glass-panel">
                  <ShieldAlert size={24} color="var(--text-muted)" />
                  <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}>
                    No matching problems found in our database.
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    Try expanding filters or selecting 'Any' values.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  paddingTop: "100px",
  paddingBottom: "60px",
  maxWidth: "1200px",
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

const splitGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "24px",
  // Handled responsively
  "@media (min-width: 850px)": {
    gridTemplateColumns: "1fr 1fr"
  }
};

// Responsive CSS inject
if (typeof document !== "undefined") {
  const styleId = "challenge-responsive-css";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @media (min-width: 850px) {
        .challenge-split {
          grid-template-columns: 1fr 1fr !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
splitGridStyle.className = "challenge-split";

const challengeCardStyle = {
  padding: "24px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  height: "100%"
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "8px"
};

const cardTitleStyle = {
  fontSize: "1.15rem",
  fontWeight: "750"
};

const cardDescStyle = {
  fontSize: "0.85rem",
  color: "var(--text-secondary)",
  lineHeight: "1.5",
  marginBottom: "16px"
};

const cardWrapperStyle = {
  marginTop: "auto"
};

const formGridStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: "700",
  color: "var(--text-muted)",
  textTransform: "uppercase"
};

const selectStyle = {
  height: "38px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--border-glass)",
  color: "var(--text-primary)",
  paddingLeft: "10px",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
  cursor: "pointer"
};

const resultContainerStyle = {
  marginTop: "20px",
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  paddingTop: "16px"
};

const resultTitleStyle = {
  fontSize: "0.75rem",
  fontWeight: "700",
  color: "var(--text-muted)",
  display: "block",
  marginBottom: "10px"
};

const noDrawStyle = {
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};

const loadingStyle = {
  textAlign: "center",
  padding: "40px",
  color: "var(--text-muted)"
};
