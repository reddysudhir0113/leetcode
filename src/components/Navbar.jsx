import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { 
  Terminal, Flame, Keyboard, Menu, X, Search, 
  LayoutDashboard, BookOpen, Compass, Award, Clock, Sparkles
} from "lucide-react";
import KeyboardShortcutsModal from "./KeyboardShortcutsModal";

export default function Navbar() {
  const { streak, totalSolved, totalQuestions } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShortcutModalOpen, setIsShortcutModalOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("codecrack_theme") || "finch"); // ghibli vs finch
  
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to theme changes
  useEffect(() => {
    const body = document.body;
    if (themeMode === "finch") {
      // Finch Cozy Light Theme
      body.style.background = "radial-gradient(circle at 50% 0%, #e6f8f7 0%, #f7fdfd 100%)";
      document.documentElement.style.setProperty("--bg-card", "#ffffff");
      document.documentElement.style.setProperty("--bg-dark", "#d5f5f2");
      document.documentElement.style.setProperty("--bg-darker", "#b2ece7");
      document.documentElement.style.setProperty("--border-glass", "rgba(13, 148, 136, 0.15)");
      document.documentElement.style.setProperty("--primary", "#fb923c");
      document.documentElement.style.setProperty("--primary-glow", "rgba(251, 146, 60, 0.3)");
      document.documentElement.style.setProperty("--secondary", "#0d9488");
      document.documentElement.style.setProperty("--secondary-glow", "rgba(13, 148, 136, 0.3)");
      document.documentElement.style.setProperty("--easy", "#06b6d4");
      document.documentElement.style.setProperty("--medium", "#fb923c");
      document.documentElement.style.setProperty("--hard", "#ec4899");
      document.documentElement.style.setProperty("--text-primary", "#0f172a");
      document.documentElement.style.setProperty("--text-secondary", "#475569");
      document.documentElement.style.setProperty("--text-muted", "#64748b");
    } else {
      // Ghibli Forest Theme
      body.style.background = "radial-gradient(circle at 50% 0%, #0c1a16 0%, #040910 100%)";
      document.documentElement.style.setProperty("--bg-card", "rgba(12, 26, 22, 0.7)");
      document.documentElement.style.setProperty("--bg-dark", "#08141d");
      document.documentElement.style.setProperty("--bg-darker", "#040910");
      document.documentElement.style.setProperty("--border-glass", "rgba(251, 191, 36, 0.15)");
      document.documentElement.style.setProperty("--primary", "#fbbf24");
      document.documentElement.style.setProperty("--primary-glow", "rgba(251, 191, 36, 0.4)");
      document.documentElement.style.setProperty("--secondary", "#2dd4bf");
      document.documentElement.style.setProperty("--secondary-glow", "rgba(45, 212, 191, 0.4)");
      document.documentElement.style.setProperty("--easy", "#34d399");
      document.documentElement.style.setProperty("--medium", "#f472b6");
      document.documentElement.style.setProperty("--hard", "#c084fc");
      document.documentElement.style.setProperty("--text-primary", "#fefcfa");
      document.documentElement.style.setProperty("--text-secondary", "#94a3b8");
      document.documentElement.style.setProperty("--text-muted", "#475569");
    }
  }, [themeMode]);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    let lastKey = "";
    let timeoutId;

    const handleKeyDown = (e) => {
      // Ignore key shortcuts if user is typing in inputs or textareas
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable)) {
        // If pressing Escape, blur the search input
        if (e.key === "Escape") {
          activeEl.blur();
        }
        return;
      }

      // Check '/' key to focus search in explorer
      if (e.key === "/") {
        e.preventDefault();
        navigate("/problems?focusSearch=true");
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setIsShortcutModalOpen(true);
        return;
      }

      if (e.key === "Escape") {
        setIsShortcutModalOpen(false);
        setIsMobileMenuOpen(false);
        return;
      }

      const key = e.key.toLowerCase();

      if (lastKey === "g") {
        // Sequence detected: G + key
        if (key === "d") { navigate("/dashboard"); e.preventDefault(); }
        else if (key === "p") { navigate("/problems"); e.preventDefault(); }
        else if (key === "r") { navigate("/roadmap"); e.preventDefault(); }
        else if (key === "c") { navigate("/challenge"); e.preventDefault(); }
        else if (key === "l") { navigate("/learning"); e.preventDefault(); }
        else if (key === "v") { navigate("/revision"); e.preventDefault(); }
        lastKey = "";
      } else if (key === "g") {
        lastKey = "g";
        // Reset lastKey after 1 second if no matching sequence is made
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          lastKey = "";
        }, 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  const toggleTheme = () => {
    setThemeMode(prev => {
      const next = prev === "ghibli" ? "finch" : "ghibli";
      localStorage.setItem("codecrack_theme", next);
      return next;
    });
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/problems", label: "Explorer", icon: Compass },
    { path: "/roadmap", label: "Roadmap", icon: Award },
    { path: "/challenge", label: "Challenge", icon: Clock },
    { path: "/learning", label: "Learn", icon: BookOpen },
    { path: "/revision", label: "Revision", icon: Sparkles }
  ];

  const handleLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav style={navbarStyle} className="glass-panel">
        <div style={navContainerStyle}>
          {/* Logo */}
          <Link to="/" style={logoLinkStyle}>
            <div style={logoContainerStyle}>
              <Terminal size={22} className="gradient-text-indigo-cyan" style={{ filter: "drop-shadow(0 0 8px var(--primary))" }} />
              <span style={logoTextStyle} className="gradient-text-indigo-cyan logo-text">
                CodeCrack
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={desktopLinksStyle} className="desktop-nav">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    ...navLinkStyle,
                    color: isActive ? "var(--secondary)" : "var(--text-secondary)",
                    backgroundColor: isActive ? "rgba(6, 182, 212, 0.08)" : "transparent",
                    borderColor: isActive ? "rgba(6, 182, 212, 0.25)" : "transparent"
                  }}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Actions: Search, Streak, Hotkey, Theme, Menu */}
          <div style={actionsContainerStyle}>
            {/* Quick Search Button */}
            <button 
              onClick={() => navigate("/problems?focusSearch=true")} 
              style={iconButtonStyle} 
              title="Search Problems (Press /)"
            >
              <Search size={18} />
            </button>

            {/* Streak Counter */}
            <div style={streakBadgeStyle} className="glass-panel" title="Daily solved streak">
              <Flame size={16} color={streak.current > 0 ? "orange" : "var(--text-muted)"} style={{ fill: streak.current > 0 ? "orange" : "none" }} />
              <span style={{ fontWeight: "700", color: streak.current > 0 ? "orange" : "var(--text-secondary)" }}>
                {streak.current}
              </span>
            </div>

            {/* Keyboard Shortcuts Trigger */}
            <button 
              onClick={() => setIsShortcutModalOpen(true)} 
              style={iconButtonStyle} 
              title="Keyboard Shortcuts (Press ?)"
              className="keyboard-shortcut-btn"
            >
              <Keyboard size={18} />
            </button>

            {/* Theme Customizer Toggle */}
            <button 
              onClick={toggleTheme} 
              style={themeToggleStyle}
              title={`Switch Theme (Current: ${themeMode === "ghibli" ? "Ghibli Forest" : "Finch Cozy"})`}
            >
              <div style={{
                ...themeDotStyle,
                transform: themeMode === "ghibli" ? "translateX(0px)" : "translateX(18px)",
                backgroundColor: themeMode === "ghibli" ? "var(--primary)" : "var(--secondary)"
              }} />
            </button>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={mobileMenuToggleStyle}
              className="mobile-hamburger"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div style={mobileDrawerStyle} className="glass-panel">
            <div style={mobileLinksContainerStyle}>
              {navLinks.map(link => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleLinkClick(link.path)}
                    style={{
                      ...mobileLinkStyle,
                      color: isActive ? "var(--secondary)" : "var(--text-secondary)",
                      borderLeft: isActive ? "4px solid var(--secondary)" : "4px solid transparent",
                      background: isActive ? "rgba(6, 182, 212, 0.04)" : "transparent"
                    }}
                  >
                    <Icon size={18} />
                    {link.label}
                  </button>
                );
              })}
            </div>
            
            <div style={mobileDrawerStatsStyle}>
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Overall Progress</div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                <span>Solved Problems</span>
                <span style={{ fontWeight: "700", color: "var(--secondary)" }}>
                  {totalSolved} / {totalQuestions}
                </span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Shortcuts Modal */}
      <KeyboardShortcutsModal 
        isOpen={isShortcutModalOpen} 
        onClose={() => setIsShortcutModalOpen(false)} 
      />
    </>
  );
}

// Inline styles for high reliability
const navbarStyle = {
  position: "fixed",
  top: "12px",
  left: "12px",
  right: "12px",
  height: "64px",
  zIndex: 10000,
  borderRadius: "16px",
  padding: "0 20px",
  transform: "translate3d(0, 0, 0)",
  WebkitTransform: "translate3d(0, 0, 0)"
};

const navContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  maxWidth: "1400px",
  margin: "0 auto"
};

const logoLinkStyle = {
  textDecoration: "none",
  color: "inherit",
  flexShrink: 0
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexShrink: 0
};

const logoTextStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: "1.3rem",
  fontWeight: "700",
  letterSpacing: "-0.5px"
};

const desktopLinksStyle = {
  alignItems: "center",
  gap: "8px"
};

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  textDecoration: "none",
  fontSize: "0.9rem",
  fontWeight: "600",
  padding: "6px 12px",
  borderRadius: "8px",
  border: "1px solid transparent",
  transition: "all 0.2s ease"
};

const actionsContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0
};

const iconButtonStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--border-glass)",
  color: "var(--text-secondary)",
  borderRadius: "8px",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  flexShrink: 0,
  transition: "color 0.2s, background 0.2s"
};

const streakBadgeStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  height: "36px",
  padding: "0 12px",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.02)",
  fontSize: "0.85rem",
  border: "1px solid var(--border-glass)",
  flexShrink: 0
};

const themeToggleStyle = {
  width: "42px",
  height: "22px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid var(--border-glass)",
  position: "relative",
  cursor: "pointer",
  padding: "2px",
  display: "flex",
  alignItems: "center",
  flexShrink: 0
};

const themeDotStyle = {
  width: "16px",
  height: "16px",
  borderRadius: "50%",
  transition: "transform 0.2s ease"
};

const mobileMenuToggleStyle = {
  background: "none",
  border: "none",
  color: "var(--text-primary)",
  cursor: "pointer",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0
};

const mobileDrawerStyle = {
  position: "absolute",
  top: "76px",
  left: "0",
  right: "0",
  padding: "16px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)"
};

const mobileLinksContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const mobileLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  border: "none",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  textAlign: "left",
  padding: "12px 16px",
  fontSize: "1rem",
  fontWeight: "600",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s"
};

const mobileDrawerStatsStyle = {
  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  paddingTop: "12px",
  fontSize: "0.9rem",
  color: "var(--text-secondary)"
};
