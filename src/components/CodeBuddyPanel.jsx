import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Edit2, Check, Zap, Sparkles } from "lucide-react";

export default function CodeBuddyPanel() {
  const { 
    buddyName, setBuddyName, buddyXp, buddyEnergy 
  } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(buddyName);

  const level = Math.floor(buddyXp / 100) + 1;
  const currentLevelXp = buddyXp % 100;
  
  // Calculate adventure details based on level
  const getAdventureName = (lvl) => {
    const adventures = [
      "Syntax Exploration",
      "Array Traversal Quest",
      "Pointer Collision Mission",
      "Sliding Window Expedition",
      "Stack Overflow Investigation",
      "Binary Search Ascendancy",
      "Tree Canopy Climbing",
      "Graph Connectivity Traverse",
      "Dynamic Program Matrix Ascent",
      "Trie Prefix Routing Quest",
      "Final Code Compiler Run"
    ];
    return adventures[(lvl - 1) % adventures.length];
  };

  const handleSaveName = () => {
    if (nameInput.trim().length > 0) {
      setBuddyName(nameInput.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveName();
    }
  };

  // Get status message based on energy
  const getStatusText = (energy) => {
    if (energy >= 80) return `${buddyName} is fully compiled and ready to code!`;
    if (energy >= 50) return `${buddyName} is feeling motivated. Solve more problems to level up!`;
    if (energy >= 15) return `${buddyName} is getting a bit slow. Solve questions to gain energy.`;
    return `${buddyName} needs to sleep. Write some code to wake him up!`;
  };

  return (
    <div style={containerStyle} className="glass-panel">
      {/* Avatar and Name Editor */}
      <div style={avatarSectionStyle}>
        <div style={avatarWrapperStyle} className="glass-panel">
          <img 
            src="code_buddy_pet.png" 
            alt="Code Buddy Pet" 
            style={avatarStyle} 
            className="floating-element"
          />
          <div style={levelBadgeStyle} className="code-font" title={`Level ${level}`}>
            Lv {level}
          </div>
        </div>

        <div style={nameEditorContainerStyle}>
          {isEditing ? (
            <div style={editRowStyle}>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={handleSaveName}
                onKeyDown={handleKeyDown}
                maxLength={14}
                style={inputStyle}
                autoFocus
              />
              <button onClick={handleSaveName} style={checkButtonStyle}>
                <Check size={16} />
              </button>
            </div>
          ) : (
            <div style={displayRowStyle}>
              <h3 style={buddyNameStyle}>{buddyName}</h3>
              <button onClick={() => setIsEditing(true)} style={editButtonStyle}>
                <Edit2 size={12} />
              </button>
            </div>
          )}
          <span style={adventureNameStyle}>
            Adventure: <span style={{ color: "var(--primary)", fontWeight: "700" }}>{getAdventureName(level)}</span>
          </span>
        </div>
      </div>

      {/* Progress Bars: XP and Energy */}
      <div style={statsSectionStyle}>
        {/* XP Bar */}
        <div style={statRowStyle}>
          <div style={statLabelsStyle}>
            <span style={labelStyle}>Level Progress</span>
            <span style={valueStyle}>{currentLevelXp} / 100 XP</span>
          </div>
          <div style={barBgStyle}>
            <div style={{ ...barFillStyle, width: `${currentLevelXp}%`, background: "linear-gradient(90deg, var(--primary) 0%, #fb923c 100%)" }} />
          </div>
        </div>

        {/* Energy Bar */}
        <div style={statRowStyle}>
          <div style={statLabelsStyle}>
            <span style={labelStyle}>
              <Zap size={12} style={{ display: "inline", marginRight: "3px" }} /> Energy
            </span>
            <span style={valueStyle}>{buddyEnergy} / 100</span>
          </div>
          <div style={barBgStyle}>
            <div style={{ ...barFillStyle, width: `${buddyEnergy}%`, background: "linear-gradient(90deg, var(--secondary) 0%, #38bdf8 100%)" }} />
          </div>
        </div>
      </div>

      {/* Status Box */}
      <div style={statusBoxStyle} className="glass-panel">
        <p style={statusTextStyle}>{getStatusText(buddyEnergy)}</p>
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  padding: "24px",
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(251, 191, 36, 0.05) 100%)",
  border: "1px solid var(--border-glass)"
};

const avatarSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px"
};

const avatarWrapperStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "20px",
  position: "relative",
  background: "rgba(255, 255, 255, 0.03)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const avatarStyle = {
  width: "70px",
  height: "70px",
  objectFit: "contain"
};

const levelBadgeStyle = {
  position: "absolute",
  bottom: "-6px",
  right: "-6px",
  background: "var(--primary)",
  color: "#08141d",
  fontWeight: "800",
  fontSize: "0.75rem",
  padding: "3px 6px",
  borderRadius: "6px",
  boxShadow: "0 2px 8px var(--primary-glow)",
  border: "1px solid rgba(255,255,255,0.15)"
};

const nameEditorContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const editRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px"
};

const inputStyle = {
  background: "rgba(3, 7, 18, 0.3)",
  border: "1px solid var(--border-glass)",
  borderRadius: "8px",
  padding: "4px 8px",
  color: "var(--text-primary)",
  fontSize: "1.1rem",
  fontWeight: "750",
  width: "140px",
  fontFamily: "inherit",
  outline: "none"
};

const checkButtonStyle = {
  background: "var(--secondary)",
  border: "none",
  color: "#040910",
  borderRadius: "6px",
  width: "28px",
  height: "28px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};

const displayRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const buddyNameStyle = {
  fontSize: "1.3rem",
  fontWeight: "800",
  color: "var(--text-primary)"
};

const editButtonStyle = {
  background: "none",
  border: "none",
  color: "var(--text-secondary)",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const adventureNameStyle = {
  fontSize: "0.8rem",
  color: "var(--text-secondary)"
};

const statsSectionStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const statRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const statLabelsStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.8rem"
};

const labelStyle = {
  color: "var(--text-secondary)",
  fontWeight: "600",
  display: "flex",
  alignItems: "center"
};

const valueStyle = {
  fontWeight: "700"
};

const barBgStyle = {
  width: "100%",
  height: "8px",
  borderRadius: "4px",
  background: "rgba(255, 255, 255, 0.03)",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.01)"
};

const barFillStyle = {
  height: "100%",
  borderRadius: "4px"
};

const statusBoxStyle = {
  padding: "12px",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.02)",
  border: "1px solid rgba(255,255,255,0.02)"
};

const statusTextStyle = {
  fontSize: "0.85rem",
  fontWeight: "600",
  lineHeight: "1.4"
};
