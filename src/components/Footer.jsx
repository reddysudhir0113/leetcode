import React from "react";
import { Heart, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={footerStyle} className="glass-panel">
      <div style={containerStyle}>
        {/* Info Section */}
        <div style={infoSectionStyle}>
          <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "8px" }} className="gradient-text-indigo-cyan">
            CodeCrack
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            A premium developer preparation ecosystem focusing on learning coding patterns, core computational strategies, and interview consistency.
          </p>
        </div>

        {/* Links Section */}
        <div style={linksGridStyle}>
          <div style={linkColStyle}>
            <span style={colTitleStyle}>Resource Tracks</span>
            <a href="/roadmap" style={linkStyle}>Roadmaps</a>
            <a href="/problems" style={linkStyle}>Blind 75</a>
            <a href="/learning" style={linkStyle}>Pattern Guides</a>
          </div>
          
          <div style={linkColStyle}>
            <span style={colTitleStyle}>Project</span>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={linkStyle}>
              <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "4px" }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> GitHub Repo
            </a>
            <a href="#" style={linkStyle}>Contribution Guide</a>
            <a href="#" style={linkStyle}>About Project</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={copyrightStyle}>
        <div>
          &copy; {new Date().getFullYear()} CodeCrack. Developed for portfolio & coding interview prep.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--text-muted)" }}>
          Made with <Heart size={12} color="red" style={{ fill: "red" }} /> by developers, for developers
        </div>
      </div>
    </footer>
  );
}

// Styles
const footerStyle = {
  marginTop: "80px",
  marginBottom: "12px",
  marginLeft: "12px",
  marginRight: "12px",
  padding: "32px 24px 16px 24px",
  borderRadius: "16px",
  border: "1px solid var(--border-glass)"
};

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "32px",
  paddingBottom: "24px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  maxWidth: "1400px",
  margin: "0 auto"
};

const infoSectionStyle = {
  flex: "1 1 300px",
  maxWidth: "400px"
};

const linksGridStyle = {
  display: "flex",
  gap: "48px",
  flexWrap: "wrap"
};

const linkColStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const colTitleStyle = {
  fontSize: "0.85rem",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "var(--text-muted)",
  marginBottom: "4px"
};

const linkStyle = {
  textDecoration: "none",
  color: "var(--text-secondary)",
  fontSize: "0.85rem",
  transition: "color 0.2s",
  display: "flex",
  alignItems: "center",
  ":hover": {
    color: "var(--secondary)"
  }
};

const copyrightStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  paddingTop: "16px",
  fontSize: "0.8rem",
  color: "var(--text-muted)",
  maxWidth: "1400px",
  margin: "0 auto"
};
