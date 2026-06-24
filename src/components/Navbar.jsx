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
  const [themeMode, setThemeMode] = useState("obsidian"); // obsidian vs deep-space
  
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to theme changes
  useEffect(() => {
    const body = document.body;
    if (themeMode === "deep-space") {
      body.style.background = "radial-gradient(circle at 50% 0%, #0f172a 0%, #020617 100%)";
      document.documentElement.style.setProperty("--bg-card", "rgba(30, 41, 59, 0.4)");
      document.documentElement.style.setProperty("--bg-darker", "#020617");
    } else {
      // Default Obsidian
      body.style.background = "radial-gradient(circle at 50% 0%, #111827 0%, #030712 100%)";
      document.documentElement.style.setProperty("--bg-card", "rgba(15, 23, 42, 0.45)");
      document.documentElement.style.setProperty("--bg-darker", "#020617");
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
    setThemeMode(prev => prev === "obsidian" ? "deep-space" : "obsidian");
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
              <span style={logoTextStyle} className="gradient-text-indigo-cyan">
                CodeCrack
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={desktopLinksStyle}>
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
            >
              <Keyboard size={18} />
            </button>

            {/* Theme Customizer Toggle */}
            <button 
              onClick={toggleTheme} 
              style={themeToggleStyle}
              title={`Switch dark theme (Current: ${themeMode === "obsidian" ? "Obsidian" : "Deep Space"})`}
            >
              <div style={{
                ...themeDotStyle,
                transform: themeMode === "obsidian" ? "translateX(0px)" : "translateX(18px)",
                backgroundColor: themeMode === "obsidian" ? "var(--primary)" : "var(--secondary)"
              }} />
            </button>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              style={mobileMenuToggleStyle}
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
  zIndex: 999,
  borderRadius: "16px",
  padding: "0 20px"
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
  color: "inherit"
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const logoTextStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: "1.3rem",
  fontWeight: "700",
  letterSpacing: "-0.5px"
};

const desktopLinksStyle = {
  display: "none",
  alignItems: "center",
  gap: "8px",
  // CSS Media Query emulation in react
  "@media (min-width: 900px)": {
    display: "flex"
  }
};

// Fallback logic handled by useEffect/window listeners or responsive display:
// Let's inject a style tag or configure standard responsive flex rules:
const styleTagContent = `
  @media (min-width: 900px) {
    .desktop-links-only {
      display: flex !important;
    }
  }
`;

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
  gap: "10px"
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
  border: "1px solid var(--border-glass)"
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
  alignItems: "center"
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
  justifyContent: "center"
};

// Responsive Styles Inject
if (typeof document !== "undefined") {
  const styleId = "navbar-responsive-css";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
      @media (min-width: 900px) {
        nav button[style*="display: flex"] {
          /* Hide hamburger on desktop */
        }
        nav div[style*="display: none"] {
          display: flex !important;
        }
        .mobile-hamburger {
          display: none !important;
        }
      }
      @media (max-width: 899px) {
        .desktop-nav {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Add Classnames for responsive display
desktopLinksStyle.className = "desktop-nav";
mobileMenuToggleStyle.className = "mobile-hamburger";

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
