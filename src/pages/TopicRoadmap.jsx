import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { topics } from "../data/topics";
import { Award, BookOpen, Clock, BarChart } from "lucide-react";

export default function TopicRoadmap() {
  const { questions, solvedList } = useContext(AppContext);
  const navigate = useNavigate();

  // Calculate dynamic stats for each topic
  const getTopicStats = (topicId) => {
    // Map BST items correctly
    const matches = questions.filter(q => {
      if (topicId === "BST") {
        // Map BST questions explicitly
        return q.topic === "BST" || q.id === "lowest-common-ancestor-of-a-binary-search-tree" || q.id === "validate-binary-search-tree" || q.id === "kth-smallest-element-in-a-bst";
      }
      if (topicId === "Trees" && (q.id === "lowest-common-ancestor-of-a-binary-search-tree" || q.id === "validate-binary-search-tree" || q.id === "kth-smallest-element-in-a-bst")) {
        return false; // separate tree from BST
      }
      return q.topic === topicId;
    });

    const total = matches.length;
    const solved = matches.filter(q => solvedList.includes(q.id)).length;
    const percent = total > 0 ? Math.round((solved / total) * 100) : 0;

    return { total, solved, percent };
  };

  const handleTopicClick = (topicName) => {
    navigate(`/problems?topic=${encodeURIComponent(topicName)}`);
  };

  // Sort topics by recommended order
  const sortedTopics = [...topics].sort((a, b) => a.recommendedOrder - b.recommendedOrder);

  // Overall prep status
  const solvedCount = solvedList.length;
  const totalCount = questions.length;
  const overallPercent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  return (
    <div style={containerStyle}>
      {/* Overview Banner */}
      <div style={bannerStyle} className="glass-panel">
        <div>
          <span style={badgeStyle}>ROADMAP TRACK</span>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800", marginTop: "4px" }}>
            Pattern Learning Roadmap
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "6px", maxWidth: "600px" }}>
            Master coding topics in a recommended pedagogical order. Click on any category below to explore its specific problems.
          </p>
        </div>

        <div style={summaryProgressStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
            <span style={{ color: "var(--text-secondary)" }}>Total Prep Progress</span>
            <span style={{ fontWeight: "700" }}>{overallPercent}% ({solvedCount}/{totalCount})</span>
          </div>
          <div style={barContainerStyle}>
            <div style={{ ...barFillStyle, width: `${overallPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Grid of Roadmap Categories */}
      <div style={gridStyle}>
        {sortedTopics.map(topic => {
          const stats = getTopicStats(topic.id);
          const solvedPercent = stats.percent;

          return (
            <div
              key={topic.id}
              onClick={() => handleTopicClick(topic.id)}
              style={cardStyle}
              className="glass-panel glass-card-interactive"
            >
              {/* Order index, title, difficulty */}
              <div style={cardHeaderStyle}>
                <div style={orderBadgeStyle} className="code-font">
                  {String(topic.recommendedOrder).padStart(2, '0')}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h3 style={cardTitleStyle}>{topic.name}</h3>
                  <span style={timeEstimateStyle}>
                    <Clock size={12} style={{ marginRight: "3px" }} /> {topic.estimatedTime}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p style={cardDescStyle}>{topic.description}</p>

              {/* Progress and Stats */}
              <div style={progressAreaStyle}>
                <div style={progressLabelRowStyle}>
                  <span style={{ color: "var(--text-secondary)" }}>Solved</span>
                  <span style={{ fontWeight: "700", color: solvedPercent === 100 ? "var(--easy)" : "var(--text-primary)" }}>
                    {stats.solved} / {stats.total}
                  </span>
                </div>

                {/* Micro Progress Bar */}
                <div style={microBarContainerStyle}>
                  <div 
                    style={{ 
                      ...microBarFillStyle, 
                      width: `${solvedPercent}%`,
                      background: solvedPercent === 100 
                        ? "var(--easy)" 
                        : "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)"
                    }} 
                  />
                </div>
              </div>
            </div>
          );
        })}
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
  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px"
};

const badgeStyle = {
  fontSize: "0.7rem",
  fontWeight: "850",
  letterSpacing: "1px",
  color: "var(--secondary)",
  background: "rgba(6, 182, 212, 0.1)",
  padding: "3px 8px",
  borderRadius: "6px"
};

const summaryProgressStyle = {
  flex: "0 0 280px",
  width: "100%"
};

const barContainerStyle = {
  width: "100%",
  height: "8px",
  borderRadius: "4px",
  background: "rgba(255,255,255,0.05)",
  overflow: "hidden"
};

const barFillStyle = {
  height: "100%",
  background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
  borderRadius: "4px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px"
};

const cardStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const cardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const orderBadgeStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: "rgba(99, 102, 241, 0.1)",
  color: "var(--primary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
  fontSize: "0.95rem",
  border: "1px solid rgba(99, 102, 241, 0.2)"
};

const cardTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "750",
  color: "var(--text-primary)",
  lineHeight: "1.2"
};

const timeEstimateStyle = {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  marginTop: "2px"
};

const cardDescStyle = {
  fontSize: "0.85rem",
  color: "var(--text-secondary)",
  lineHeight: "1.5"
};

const progressAreaStyle = {
  marginTop: "auto", // Push progress block to bottom of card
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const progressLabelRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.8rem"
};

const microBarContainerStyle = {
  width: "100%",
  height: "6px",
  borderRadius: "3px",
  background: "rgba(255,255,255,0.04)",
  overflow: "hidden"
};

const microBarFillStyle = {
  height: "100%",
  borderRadius: "3px",
  transition: "width 0.3s ease"
};
