import React from "react";
import { X } from "lucide-react";

export default function KeyboardShortcutsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()} className="glass-panel">
        <div style={modalHeaderStyle}>
          <h3 style={{ fontSize: "1.4rem", fontWeight: "700" }} className="gradient-text-indigo-cyan">
            Keyboard Shortcuts
          </h3>
          <button style={closeButtonStyle} onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <div style={shortcutsListStyle}>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>/</span>
            <span style={shortcutDescStyle}>Focus global search / open Explorer search</span>
          </div>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>Esc</span>
            <span style={shortcutDescStyle}>Close active modals or clear search</span>
          </div>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>G</span> + <span style={shortcutKeyStyle}>D</span>
            <span style={shortcutDescStyle}>Go to Dashboard</span>
          </div>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>G</span> + <span style={shortcutKeyStyle}>P</span>
            <span style={shortcutDescStyle}>Go to Problems Explorer</span>
          </div>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>G</span> + <span style={shortcutKeyStyle}>R</span>
            <span style={shortcutDescStyle}>Go to Topic Roadmap</span>
          </div>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>G</span> + <span style={shortcutKeyStyle}>C</span>
            <span style={shortcutDescStyle}>Go to Daily Challenge</span>
          </div>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>G</span> + <span style={shortcutKeyStyle}>L</span>
            <span style={shortcutDescStyle}>Go to Learning Center</span>
          </div>
          <div style={shortcutRowStyle}>
            <span style={shortcutKeyStyle}>G</span> + <span style={shortcutKeyStyle}>V</span>
            <span style={shortcutDescStyle}>Go to Revision Center</span>
          </div>
        </div>

        <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
          Tip: Pressing <span style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: "4px" }}>G</span> followed by any navigation key will redirect you instantly!
        </div>
      </div>
    </div>
  );
}

// Styling (inline CSS to keep components modular and robust)
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(3, 7, 18, 0.8)",
  backdropFilter: "blur(4px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  padding: "16px"
};

const modalContentStyle = {
  width: "100%",
  maxWidth: "480px",
  padding: "24px",
  position: "relative",
  animation: "scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
};

const modalHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  paddingBottom: "16px",
  marginBottom: "16px"
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  color: "var(--text-secondary)",
  cursor: "pointer",
  padding: "4px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background 0.2s, color 0.2s"
};

const shortcutsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const shortcutRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  fontSize: "0.95rem"
};

const shortcutKeyStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "6px",
  padding: "4px 8px",
  color: "var(--secondary)",
  fontWeight: "700",
  minWidth: "28px",
  textAlign: "center",
  fontSize: "0.85rem",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
};

const shortcutDescStyle = {
  marginLeft: "16px",
  color: "var(--text-secondary)"
};
