import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Target, ChevronUp, ChevronDown, CheckCircle2 } from "lucide-react";

export default function StudyPlanner() {
  const { weeklyGoal, updateWeeklyGoal, activityLog } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  // Calculate solves in the current week (Monday to Sunday)
  const getSolvesThisWeek = () => {
    const today = new Date();
    const day = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday as first day
    
    const monday = new Date(today.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    let count = 0;
    // Keep unique dates solved
    const uniqueSolves = [...new Set(activityLog)];

    uniqueSolves.forEach(dateStr => {
      const solveDate = new Date(dateStr);
      if (solveDate >= monday && solveDate <= sunday) {
        count++;
      }
    });

    return count;
  };

  const solvesThisWeek = getSolvesThisWeek();
  const completionPercentage = Math.min(Math.round((solvesThisWeek / weeklyGoal) * 100), 100);

  const incrementGoal = () => {
    updateWeeklyGoal(Math.min(weeklyGoal + 1, 50));
  };

  const decrementGoal = () => {
    updateWeeklyGoal(Math.max(weeklyGoal - 1, 1));
  };

  return (
    <div style={containerStyle} className="glass-panel">
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Target size={20} color="var(--secondary)" />
          <h4 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Weekly Study Planner</h4>
        </div>
        
        {/* Goal Adjuster */}
        <div style={adjusterStyle} className="glass-panel">
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "600" }}>GOAL:</span>
          <span style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "0.95rem" }}>{weeklyGoal} / wk</span>
          <div style={buttonsGroupStyle}>
            <button onClick={incrementGoal} style={arrowButtonStyle}><ChevronUp size={14} /></button>
            <button onClick={decrementGoal} style={arrowButtonStyle}><ChevronDown size={14} /></button>
          </div>
        </div>
      </div>

      {/* Progress display */}
      <div style={progressAreaStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "8px" }}>
          <span style={{ color: "var(--text-secondary)" }}>Weekly solves</span>
          <span style={{ fontWeight: "700", color: solvesThisWeek >= weeklyGoal ? "var(--easy)" : "var(--secondary)" }}>
            {solvesThisWeek} of {weeklyGoal} solved
          </span>
        </div>

        {/* Progress Bar */}
        <div style={barContainerStyle}>
          <div 
            style={{
              ...barFillStyle,
              width: `${completionPercentage}%`,
              background: solvesThisWeek >= weeklyGoal 
                ? "linear-gradient(90deg, var(--easy) 0%, #34d399 100%)" 
                : "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
              boxShadow: solvesThisWeek >= weeklyGoal
                ? "0 0 12px rgba(16, 185, 129, 0.4)"
                : "0 0 12px rgba(6, 182, 212, 0.4)"
            }} 
          />
        </div>

        {/* Status Message */}
        <div style={statusMessageStyle}>
          {solvesThisWeek >= weeklyGoal ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--easy)", fontWeight: "600" }}>
              <CheckCircle2 size={16} /> Target Achieved! Fantastic work.
            </div>
          ) : (
            <div style={{ color: "var(--text-secondary)" }}>
              Solve <span style={{ color: "var(--secondary)", fontWeight: "700" }}>{weeklyGoal - solvesThisWeek}</span> more to hit your goal. You can do it!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "20px"
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "12px"
};

const adjusterStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "4px 8px 4px 12px",
  borderRadius: "10px",
  border: "1px solid var(--border-glass)",
  background: "rgba(255,255,255,0.02)"
};

const buttonsGroupStyle = {
  display: "flex",
  flexDirection: "column"
};

const arrowButtonStyle = {
  background: "none",
  border: "none",
  color: "var(--text-secondary)",
  cursor: "pointer",
  padding: "1px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "3px",
  ":hover": {
    background: "rgba(255,255,255,0.05)",
    color: "var(--text-primary)"
  }
};

const progressAreaStyle = {
  display: "flex",
  flexDirection: "column"
};

const barContainerStyle = {
  width: "100%",
  height: "10px",
  background: "rgba(255,255,255,0.05)",
  borderRadius: "5px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.03)"
};

const barFillStyle = {
  height: "100%",
  borderRadius: "5px",
  transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
};

const statusMessageStyle = {
  marginTop: "12px",
  fontSize: "0.85rem"
};
