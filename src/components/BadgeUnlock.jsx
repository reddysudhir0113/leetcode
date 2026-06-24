import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Award, Lock } from "lucide-react";

export default function BadgeUnlock() {
  const { unlockedBadges } = useContext(AppContext);

  // Complete list of possible badges
  const allBadges = [
    {
      id: "first_step",
      title: "First Step",
      description: "Mark your first coding problem as solved",
      icon: "🏆"
    },
    {
      id: "consistent_coder",
      title: "Consistent Coder",
      description: "Maintain a 3-day problem-solving streak",
      icon: "🔥"
    },
    {
      id: "ten_problems",
      title: "Deca-Solver",
      description: "Solve 10 interview preparation questions",
      icon: "💪"
    },
    {
      id: "topic_specialist",
      title: "Topic Specialist",
      description: "Solve 100% of all questions in any topic",
      icon: "⭐"
    },
    {
      id: "noteworthy",
      title: "Master Scholar",
      description: "Add study notes for 3 or more problems",
      icon: "📝"
    },
    {
      id: "company_analyst",
      title: "FAANG Insider",
      description: "Solve 5+ questions under Google or Amazon",
      icon: "💼"
    }
  ];

  return (
    <div style={containerStyle} className="glass-panel">
      <div style={headerStyle}>
        <Award size={20} color="var(--primary)" />
        <h4 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Unlocked Badges</h4>
      </div>

      <div style={gridStyle}>
        {allBadges.map(badge => {
          const isUnlocked = unlockedBadges.some(b => b.id === badge.id);
          return (
            <div
              key={badge.id}
              style={{
                ...badgeCardStyle,
                background: isUnlocked 
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)" 
                  : "rgba(255, 255, 255, 0.02)",
                opacity: isUnlocked ? 1 : 0.65,
                borderColor: isUnlocked ? "rgba(99, 102, 241, 0.3)" : "var(--border-glass)"
              }}
              className="glass-panel"
            >
              {/* Badge Icon */}
              <div 
                style={{
                  ...badgeIconStyle,
                  filter: isUnlocked ? "none" : "grayscale(100%) blur(0.5px)"
                }}
              >
                {badge.icon}
                {!isUnlocked && (
                  <div style={lockBadgeOverlayStyle}>
                    <Lock size={12} color="var(--text-muted)" />
                  </div>
                )}
              </div>

              {/* Title & Info */}
              <div style={badgeInfoStyle}>
                <span style={{ 
                  fontWeight: "700", 
                  fontSize: "0.9rem", 
                  color: isUnlocked ? "var(--text-primary)" : "var(--text-secondary)"
                }}>
                  {badge.title}
                </span>
                <p style={badgeDescStyle}>{badge.description}</p>
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
  padding: "20px",
  borderRadius: "16px"
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "16px"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "12px"
};

const badgeCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid var(--border-glass)",
  transition: "all 0.3s ease"
};

const badgeIconStyle = {
  fontSize: "2rem",
  width: "48px",
  height: "48px",
  borderRadius: "10px",
  background: "rgba(255, 255, 255, 0.03)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative"
};

const lockBadgeOverlayStyle = {
  position: "absolute",
  bottom: "-2px",
  right: "-2px",
  background: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "50%",
  width: "18px",
  height: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const badgeInfoStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2px"
};

const badgeDescStyle = {
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  lineHeight: "1.3"
};
