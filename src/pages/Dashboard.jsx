import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { 
  Award, Flame, TrendingUp, Compass, AlertCircle, Heart,
  FlameKindling, CheckCircle2, ChevronRight, Zap, Target
} from "lucide-react";
import ConsistencyTracker from "../components/ConsistencyTracker";
import BadgeUnlock from "../components/BadgeUnlock";
import StudyPlanner from "../components/StudyPlanner";
import DailyQuote from "../components/DailyQuote";

export default function Dashboard() {
  const { 
    solvedList, bookmarks, streak, totalQuestions, totalSolved,
    easySolved, mediumSolved, hardSolved, easyTotal, mediumTotal, hardTotal,
    questions
  } = useContext(AppContext);

  const navigate = useNavigate();

  // Calculate dynamic stats
  const overallPercent = totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;
  const easyPercent = easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0;
  const mediumPercent = mediumTotal > 0 ? Math.round((mediumSolved / mediumTotal) * 100) : 0;
  const hardPercent = hardTotal > 0 ? Math.round((hardSolved / hardTotal) * 100) : 0;

  // Calculate Favorite Topics (topics with the most solved questions)
  const getFavoriteAndWeakTopics = () => {
    const topicStats = {};
    
    // Group questions by topic
    questions.forEach(q => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, solved: 0 };
      }
      topicStats[q.topic].total++;
      if (solvedList.includes(q.id)) {
        topicStats[q.topic].solved++;
      }
    });

    const topicList = Object.keys(topicStats).map(name => ({
      name,
      ...topicStats[name],
      percent: topicStats[name].total > 0 ? Math.round((topicStats[name].solved / topicStats[name].total) * 100) : 0
    }));

    // Favorite topics: solved > 0, sorted by solved count desc
    const favorites = [...topicList]
      .filter(t => t.solved > 0)
      .sort((a, b) => b.solved - a.solved || b.percent - a.percent)
      .slice(0, 3);

    // Weak topics: unsolved > 0, sorted by percent solved asc
    const weak = [...topicList]
      .filter(t => t.solved < t.total)
      .sort((a, b) => a.percent - b.percent || b.total - a.total)
      .slice(0, 3);

    return { favorites, weak };
  };

  const { favorites, weak } = getFavoriteAndWeakTopics();

  return (
    <div style={containerStyle}>
      
      {/* Top Welcome Grid */}
      <div style={welcomeRowStyle}>
        <div style={welcomeCardStyle} className="glass-panel">
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Welcome Back, Developer</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
            Track your streak, master interview patterns, and analyze your weak spots.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div style={quickStatsGridStyle}>
          {/* Solved Stat */}
          <div style={quickCardStyle} className="glass-panel">
            <CheckCircle2 size={20} color="var(--secondary)" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={quickLabelStyle}>Overall Solved</span>
              <span style={quickValStyle}>{totalSolved} / {totalQuestions}</span>
            </div>
          </div>

          {/* Streak Stat */}
          <div style={quickCardStyle} className="glass-panel">
            <Flame size={20} color="orange" style={{ fill: streak.current > 0 ? "orange" : "none" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={quickLabelStyle}>Current Streak</span>
              <span style={quickValStyle}>{streak.current} Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div style={mainGridStyle}>
        
        {/* Left Column: Progress Graphs, Heatmap, Achievements */}
        <div style={leftColStyle}>
          
          {/* Progress Circular Gauge Card */}
          <div style={progressOverviewCardStyle} className="glass-panel">
            <h3 style={sectionTitleStyle}>Progress Summary</h3>
            
            <div style={progressGridStyle}>
              {/* Circular SVG Progress */}
              <div style={svgContainerStyle}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="10" />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="url(#indigoCyanGrad)" 
                    strokeWidth="10" 
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - overallPercent / 100)}
                    strokeLinecap="round"
                    style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px", transition: "stroke-dashoffset 0.6s ease" }}
                  />
                  <defs>
                    <linearGradient id="indigoCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--secondary)" />
                    </linearGradient>
                  </defs>
                  <text x="60" y="66" textAnchor="middle" fill="white" fontWeight="800" fontSize="1.3rem" fontFamily="inherit">
                    {overallPercent}%
                  </text>
                </svg>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600" }}>Total Done</span>
              </div>

              {/* Progress bars split */}
              <div style={progressBarsListStyle}>
                {/* Easy */}
                <div style={barRowStyle}>
                  <div style={barLabelsStyle}>
                    <span style={{ fontWeight: "700" }}>Easy</span>
                    <span style={{ color: "var(--easy)", fontWeight: "700" }}>{easyPercent}% ({easySolved}/{easyTotal})</span>
                  </div>
                  <div style={barBgStyle}>
                    <div style={{ ...barFillStyle, width: `${easyPercent}%`, backgroundColor: "var(--easy)" }} />
                  </div>
                </div>

                {/* Medium */}
                <div style={barRowStyle}>
                  <div style={barLabelsStyle}>
                    <span style={{ fontWeight: "700" }}>Medium</span>
                    <span style={{ color: "var(--medium)", fontWeight: "700" }}>{mediumPercent}% ({mediumSolved}/{mediumTotal})</span>
                  </div>
                  <div style={barBgStyle}>
                    <div style={{ ...barFillStyle, width: `${mediumPercent}%`, backgroundColor: "var(--medium)" }} />
                  </div>
                </div>

                {/* Hard */}
                <div style={barRowStyle}>
                  <div style={barLabelsStyle}>
                    <span style={{ fontWeight: "700" }}>Hard</span>
                    <span style={{ color: "var(--hard)", fontWeight: "700" }}>{hardPercent}% ({hardSolved}/{hardTotal})</span>
                  </div>
                  <div style={barBgStyle}>
                    <div style={{ ...barFillStyle, width: `${hardPercent}%`, backgroundColor: "var(--hard)" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Consistency Heatmap Tracker */}
          <ConsistencyTracker />

          {/* Achievements Badges */}
          <BadgeUnlock />
        </div>

        {/* Right Column: Planner, Favorite Topics, Weak Topics, Quotes */}
        <div style={rightColStyle}>
          {/* Study Goal Planner */}
          <StudyPlanner />

          {/* Favorite & Weak Topics Analyzer */}
          <div style={topicsAnalysisCardStyle} className="glass-panel">
            <h3 style={sectionTitleStyle}>Focus Analysis</h3>
            
            {/* Favorites */}
            <div style={analysisBlockStyle}>
              <span style={analysisBlockTitleStyle} className="gradient-text-indigo-cyan">Favorite Areas</span>
              <p style={analysisBlockDescStyle}>Topics where you have solved the most problems.</p>
              
              <div style={topicsProgressListStyle}>
                {favorites.length > 0 ? favorites.map(fav => (
                  <div key={fav.name} style={topicItemStyle}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                      <span style={{ fontWeight: "600" }}>{fav.name}</span>
                      <span style={{ color: "var(--secondary)", fontWeight: "700" }}>{fav.solved} solved</span>
                    </div>
                    <div style={topicBarBgStyle}>
                      <div style={{ ...topicBarFillStyle, width: `${fav.percent}%`, backgroundColor: "var(--secondary)" }} />
                    </div>
                  </div>
                )) : (
                  <div style={emptyTopicsStyle}>Mark problems solved to calculate favorites.</div>
                )}
              </div>
            </div>

            {/* Weak Areas */}
            <div style={analysisBlockStyle}>
              <span style={{ ...analysisBlockTitleStyle, color: "var(--accent)" }}>Focus Needed</span>
              <p style={analysisBlockDescStyle}>Topics with high volume and low solved percentages.</p>
              
              <div style={topicsProgressListStyle}>
                {weak.length > 0 ? weak.map(w => (
                  <div key={w.name} style={topicItemStyle}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                      <span style={{ fontWeight: "600" }}>{w.name}</span>
                      <span style={{ color: "var(--accent)", fontWeight: "700" }}>{w.total - w.solved} left</span>
                    </div>
                    <div style={topicBarBgStyle}>
                      <div style={{ ...topicBarFillStyle, width: `${w.percent}%`, backgroundColor: "var(--accent)" }} />
                    </div>
                  </div>
                )) : (
                  <div style={emptyTopicsStyle}>All topics 100% completed! A real master!</div>
                )}
              </div>
            </div>
          </div>

          {/* Daily Quote Banner */}
          <DailyQuote />
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

const welcomeRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px"
};

const welcomeCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  flex: "1 1 400px"
};

const quickStatsGridStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  flex: "0 0 auto",
  width: "100%",
  // Handled by CSS file classes for alignment
  "@media (min-width: 600px)": {
    width: "auto"
  }
};

// Responsive CSS inject
if (typeof document !== "undefined") {
  const styleId = "dashboard-responsive-css";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @media (min-width: 600px) {
        .quick-grid {
          width: auto !important;
        }
      }
      @media (min-width: 900px) {
        .dashboard-grid {
          grid-template-columns: 1.1fr 0.9fr !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
quickStatsGridStyle.className = "quick-grid";

const quickCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 20px",
  borderRadius: "12px",
  minWidth: "160px",
  flex: "1"
};

const quickLabelStyle = {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  fontWeight: "600",
  textTransform: "uppercase"
};

const quickValStyle = {
  fontSize: "1rem",
  fontWeight: "750",
  color: "var(--text-primary)"
};

const mainGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "24px"
};
mainGridStyle.className = "dashboard-grid";

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

const progressOverviewCardStyle = {
  padding: "20px",
  borderRadius: "16px"
};

const sectionTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "750",
  marginBottom: "16px"
};

const progressGridStyle = {
  display: "flex",
  alignItems: "center",
  gap: "32px",
  flexWrap: "wrap"
};

const svgContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px"
};

const progressBarsListStyle = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  minWidth: "220px"
};

const barRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const barLabelsStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.82rem"
};

const barBgStyle = {
  width: "100%",
  height: "7px",
  borderRadius: "4px",
  background: "rgba(255,255,255,0.03)"
};

const barFillStyle = {
  height: "100%",
  borderRadius: "4px",
  transition: "width 0.4s ease"
};

const topicsAnalysisCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const analysisBlockStyle = {
  display: "flex",
  flexDirection: "column"
};

const analysisBlockTitleStyle = {
  fontSize: "0.95rem",
  fontWeight: "750",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const analysisBlockDescStyle = {
  fontSize: "0.8rem",
  color: "var(--text-muted)",
  marginBottom: "10px"
};

const topicsProgressListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const topicItemStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const topicBarBgStyle = {
  width: "100%",
  height: "5px",
  borderRadius: "3px",
  background: "rgba(255,255,255,0.03)"
};

const topicBarFillStyle = {
  height: "100%",
  borderRadius: "3px"
};

const emptyTopicsStyle = {
  fontSize: "0.8rem",
  color: "var(--text-secondary)",
  fontStyle: "italic",
  padding: "4px 0"
};
