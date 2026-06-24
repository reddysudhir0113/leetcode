import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { 
  Flame, Zap, CheckCircle2, ChevronRight, Award, Plus, 
  BookOpen, HelpCircle, Trophy, Sparkles, MessageCircle, Moon, Sun,
  Calendar, Compass, Map, Briefcase, ClipboardList, Target, Play, Bookmark, FileText
} from "lucide-react";
import CodeBuddyPanel from "../components/CodeBuddyPanel";

export default function Dashboard() {
  const { 
    solvedList, bookmarks, streak, totalQuestions, totalSolved,
    easySolved, mediumSolved, hardSolved, easyTotal, mediumTotal, hardTotal,
    questions, notes, buddyName, buddyXp, setBuddyXp, buddyEnergy, setBuddyEnergy
  } = useContext(AppContext);

  const navigate = useNavigate();

  // State for buddy speech bubble
  const [buddySpeech, setBuddySpeech] = useState("Hi there! Ready to write some code today?");

  // Seed daily recommended problem
  const [dailyProblem, setDailyProblem] = useState(null);
  useEffect(() => {
    if (questions.length === 0) return;
    const today = new Date();
    const dateNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const index = dateNum % questions.length;
    setDailyProblem(questions[index]);
  }, [questions]);

  // Buddy Level Calculations
  const level = Math.floor(buddyXp / 100) + 1;
  const currentLevelXp = buddyXp % 100;
  const xpNeeded = 100;

  // Count active notes
  const notesCount = Object.values(notes).filter(n => n.trim().length > 0).length;

  // Set up Finch-style Quest items mapped to app events
  const isDailySolved = dailyProblem ? solvedList.includes(dailyProblem.id) : false;
  const hasAddedNote = notesCount > 0;
  const hasBookmarked = bookmarks.length > 0;
  const hasSolvedEasy = easySolved > 0;

  const quests = [
    {
      id: "daily_challenge",
      title: "Today's Recommended Problem",
      subtitle: dailyProblem ? dailyProblem.title : "Daily Challenge",
      xp: 25,
      completed: isDailySolved,
      icon: Target,
      iconColor: "var(--primary)",
      action: () => dailyProblem && navigate(`/problem/${dailyProblem.id}`)
    },
    {
      id: "solve_easy",
      title: "Warm Up Quest (Solve an Easy problem)",
      subtitle: "Get your brain cells compiled and running",
      xp: 15,
      completed: hasSolvedEasy,
      icon: Play,
      iconColor: "var(--easy)",
      action: () => navigate("/problems?difficulty=Easy")
    },
    {
      id: "add_note",
      title: "Revision Sync (Add study notes)",
      subtitle: "Organize edge cases and patterns in notes",
      xp: 10,
      completed: hasAddedNote,
      icon: FileText,
      iconColor: "var(--secondary)",
      action: () => navigate("/revision")
    },
    {
      id: "bookmark_tricky",
      title: "Target Tracking (Bookmark a tricky problem)",
      subtitle: "Star a problem to review tomorrow",
      xp: 5,
      completed: hasBookmarked,
      icon: Bookmark,
      iconColor: "var(--accent)",
      action: () => navigate("/problems")
    }
  ];

  // Calculate remaining goals
  const goalsLeft = quests.filter(q => !q.completed).length;

  const handleBuddyClick = () => {
    const dialogs = [
      `Wow! We have solved ${totalSolved} problems together!`,
      "Remember to take breaks. Code is temporary, health is permanent!",
      "I'm feeling extra compiled today!",
      "Did you know? Turing machine was invented in 1936!",
      "Let's go on a Debug Quest today!",
      "Need a hint? Click on a problem and check the progressive hints!",
      "You're doing great. Keep that daily streak alive!"
    ];
    const rand = dialogs[Math.floor(Math.random() * dialogs.length)];
    setBuddySpeech(rand);
  };

  return (
    <div style={containerStyle}>
      
      {/* Developer Terminal Header Console */}
      <div className="console-header glass-panel">
        {/* Left: Companion avatar */}
        <div className="console-avatar-wrapper" onClick={handleBuddyClick} title="Click Turing to interact">
          <div style={avatarCircleStyle}>
            <img 
              src="code_buddy_pet.png" 
              alt="Code Buddy" 
              style={consoleAvatarStyle}
              className="floating-element"
            />
          </div>
          <div style={consoleLevelStyle}>Lv {level}</div>
        </div>

        {/* Right: Monospace status terminal */}
        <div style={terminalContainerStyle} className="terminal-container">
          <div style={terminalHeaderStyle}>
            <div style={dotGroupStyle}>
              <span style={{ ...dotStyle, backgroundColor: "#ef4444" }} />
              <span style={{ ...dotStyle, backgroundColor: "#f59e0b" }} />
              <span style={{ ...dotStyle, backgroundColor: "#10b981" }} />
            </div>
            <span style={terminalTitleStyle}>buddy_status_console.sh</span>
          </div>
          
          <div style={terminalBodyStyle}>
            <div style={{ color: "var(--secondary)", fontWeight: "600", fontSize: "0.8rem", marginBottom: "6px" }} className="code-font">
              $ cat companion_status.json
            </div>
            <div style={terminalTextStyle} className="code-font">
              "{buddySpeech}"
            </div>
            <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "8px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <span style={terminalStatItemStyle} className="code-font">
                <Flame size={12} color="var(--primary)" style={{ fill: "var(--primary)", display: "inline" }} /> Streak: {streak.current}d
              </span>
              <span style={terminalStatItemStyle} className="code-font">
                <Zap size={12} color="var(--secondary)" style={{ fill: "var(--secondary)", display: "inline" }} /> Energy: {buddyEnergy}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pet Stats Section (Adventure XP bar) */}
      <div style={adventureCardStyle} className="glass-panel">
        <div style={adventureLabelRowStyle}>
          <div style={lightningWrapperStyle}>
            <Zap size={18} fill="var(--primary)" color="var(--primary)" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <span style={adventureTitleStyle}>{level}th Debug Adventure</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
              <div style={barBgStyle}>
                <div style={{ ...barFillStyle, width: `${(currentLevelXp / xpNeeded) * 100}%` }} />
              </div>
              <span style={xpFractionStyle}>{currentLevelXp} / {xpNeeded}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily goals header */}
      <div style={goalsBannerStyle} className="glass-panel">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Calendar size={18} color="var(--secondary)" />
          <span style={goalsLeftTextStyle}>
            {goalsLeft === 0 ? "All goals completed for today!" : `${goalsLeft} goals left for today`}
          </span>
        </div>
        <button onClick={() => navigate("/problems")} style={plusButtonStyle}>
          <Plus size={16} />
        </button>
      </div>

      {/* Task List */}
      <div style={tasksListStyle}>
        {quests.map(quest => {
          const QuestIcon = quest.icon;
          return (
            <div 
              key={quest.id} 
              onClick={quest.action} 
              style={{
                ...taskCardStyle,
                borderLeft: quest.completed ? "6px solid var(--easy)" : "6px solid var(--border-glass)",
                opacity: quest.completed ? 0.75 : 1
              }} 
              className="glass-panel glass-card-interactive"
            >
              {/* Left side: Icon badge */}
              <div style={taskIconWrapperStyle}>
                <QuestIcon size={20} color={quest.iconColor || "var(--text-secondary)"} />
              </div>

              {/* Mid side: text details */}
              <div style={taskInfoStyle}>
                <h4 style={taskTitleStyle}>{quest.title}</h4>
                <span style={taskSubtitleStyle}>{quest.subtitle}</span>
              </div>

              {/* Right side: XP amount + checkbox */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
                <span style={xpLabelStyle} className="code-font">
                  {quest.xp} <Zap size={10} style={{ display: "inline", fill: "var(--primary)" }} color="var(--primary)" />
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    quest.action();
                  }}
                  style={{
                    ...checkButtonStyle,
                    backgroundColor: quest.completed ? "var(--easy)" : "rgba(255, 255, 255, 0.05)",
                    borderColor: quest.completed ? "var(--easy)" : "var(--border-glass)",
                    color: quest.completed ? "#040910" : "var(--text-muted)"
                  }}
                >
                  <CheckCircle2 size={16} style={{ fill: quest.completed ? "rgba(255,255,255,0.2)" : "none" }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="quick-links-grid">
        <div style={quickLinkCardStyle} className="glass-panel glass-card-interactive" onClick={() => navigate("/problems")}>
          <Compass size={20} color="var(--primary)" />
          <span style={quickLinkLabelStyle}>Debug Quests</span>
        </div>
        <div style={quickLinkCardStyle} className="glass-panel glass-card-interactive" onClick={() => navigate("/roadmap")}>
          <Map size={20} color="var(--secondary)" />
          <span style={quickLinkLabelStyle}>Topic Map</span>
        </div>
        <div style={quickLinkCardStyle} className="glass-panel glass-card-interactive" onClick={() => navigate("/company")}>
          <Briefcase size={20} color="var(--accent)" />
          <span style={quickLinkLabelStyle}>Company Hub</span>
        </div>
        <div style={quickLinkCardStyle} className="glass-panel glass-card-interactive" onClick={() => navigate("/revision")}>
          <ClipboardList size={20} color="var(--easy)" />
          <span style={quickLinkLabelStyle}>Bag & Notes</span>
        </div>
      </div>

    </div>
  );
}

// Inline Styles to replicate Finch App Layout exactly
const containerStyle = {
  paddingTop: "100px",
  paddingBottom: "60px",
  maxWidth: "640px", /* Finch is a vertical mobile app! Capped at 640px for ideal desktop view too */
  margin: "0 auto",
  paddingLeft: "16px",
  paddingRight: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "18px"
};

const consoleAvatarStyle = {
  width: "80px",
  height: "80px",
  objectFit: "contain"
};

const avatarCircleStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.03)",
  border: "1px solid var(--border-glass)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden"
};

const consoleLevelStyle = {
  marginTop: "10px",
  background: "var(--primary)",
  color: "#08141d",
  fontWeight: "800",
  fontSize: "0.75rem",
  padding: "3px 10px",
  borderRadius: "20px",
  boxShadow: "0 2px 8px var(--primary-glow)",
  border: "1px solid rgba(255,255,255,0.15)",
  textAlign: "center"
};

const terminalContainerStyle = {
  flex: 1,
  background: "rgba(3, 7, 18, 0.4)",
  borderRadius: "16px",
  border: "1px solid var(--border-glass)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  minHeight: "150px"
};

const terminalHeaderStyle = {
  background: "rgba(255, 255, 255, 0.03)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  padding: "8px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const dotGroupStyle = {
  display: "flex",
  gap: "6px"
};

const dotStyle = {
  width: "8px",
  height: "8px",
  borderRadius: "50%"
};

const terminalTitleStyle = {
  fontSize: "0.7rem",
  color: "var(--text-secondary)",
  fontWeight: "600",
  fontFamily: "Space Grotesk, Courier New, monospace"
};

const terminalBodyStyle = {
  padding: "12px 14px",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const terminalTextStyle = {
  fontSize: "0.85rem",
  lineHeight: "1.45",
  color: "var(--text-primary)",
  fontStyle: "italic",
  margin: "6px 0",
  wordBreak: "break-word"
};

const terminalStatItemStyle = {
  fontSize: "0.75rem",
  color: "var(--text-secondary)",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontWeight: "600"
};

const adventureCardStyle = {
  padding: "12px 16px",
  borderRadius: "16px",
  background: "var(--bg-card)",
  border: "1px solid var(--border-glass)"
};

const adventureLabelRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const lightningWrapperStyle = {
  background: "rgba(251, 191, 36, 0.1)",
  borderRadius: "10px",
  width: "34px",
  height: "34px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const adventureTitleStyle = {
  fontSize: "0.85rem",
  fontWeight: "750",
  color: "var(--text-primary)"
};

const barBgStyle = {
  flex: 1,
  height: "10px",
  borderRadius: "5px",
  background: "rgba(255, 255, 255, 0.05)",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.02)"
};

const barFillStyle = {
  height: "100%",
  background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
  borderRadius: "5px"
};

const xpFractionStyle = {
  fontSize: "0.75rem",
  fontWeight: "700",
  marginLeft: "10px",
  color: "var(--text-secondary)",
  minWidth: "60px",
  textAlign: "right"
};

const goalsBannerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 20px",
  borderRadius: "16px",
  background: "var(--bg-card)",
  border: "1px solid var(--border-glass)"
};

const goalsLeftTextStyle = {
  fontSize: "0.95rem",
  fontWeight: "750",
  color: "var(--text-primary)"
};

const plusButtonStyle = {
  background: "none",
  border: "none",
  color: "var(--text-secondary)",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(255, 255, 255, 0.05)"
};

const tasksListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const taskCardStyle = {
  display: "flex",
  alignItems: "center",
  padding: "16px",
  borderRadius: "18px",
  cursor: "pointer",
  transition: "all 0.2s"
};

const taskIconWrapperStyle = {
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  background: "rgba(255, 255, 255, 0.02)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const taskInfoStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "3px",
  marginLeft: "14px",
  flex: 1
};

const taskTitleStyle = {
  fontSize: "0.92rem",
  fontWeight: "750",
  color: "var(--text-primary)",
  lineHeight: "1.3"
};

const taskSubtitleStyle = {
  fontSize: "0.78rem",
  color: "var(--text-secondary)"
};

const xpLabelStyle = {
  fontSize: "0.85rem",
  fontWeight: "800",
  color: "var(--primary)",
  display: "flex",
  alignItems: "center",
  gap: "3px"
};

const checkButtonStyle = {
  border: "1px solid",
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s"
};

const quickLinkCardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px",
  padding: "12px 6px",
  borderRadius: "16px",
  textAlign: "center",
  cursor: "pointer"
};

const quickLinkLabelStyle = {
  fontSize: "0.72rem",
  fontWeight: "700",
  color: "var(--text-secondary)"
};
