import React, { useState, useEffect } from "react";
import { quotes } from "../data/quotes";
import { Quote } from "lucide-react";

export default function DailyQuote() {
  const [selectedQuote, setSelectedQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    // Pick a random quote
    const rand = quotes[Math.floor(Math.random() * quotes.length)];
    setSelectedQuote(rand);
  }, []);

  return (
    <div style={quoteContainerStyle} className="glass-panel">
      <div style={iconWrapperStyle}>
        <Quote size={20} color="var(--secondary)" style={{ transform: "rotate(180deg)" }} />
      </div>
      <div style={textWrapperStyle}>
        <p style={quoteTextStyle}>"{selectedQuote.text}"</p>
        <span style={authorTextStyle}>&mdash; {selectedQuote.author}</span>
      </div>
    </div>
  );
}

const quoteContainerStyle = {
  display: "flex",
  gap: "16px",
  padding: "20px",
  borderRadius: "16px",
  alignItems: "flex-start",
  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(99, 102, 241, 0.03) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.05)"
};

const iconWrapperStyle = {
  background: "rgba(6, 182, 212, 0.08)",
  borderRadius: "12px",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const textWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const quoteTextStyle = {
  fontSize: "0.95rem",
  fontWeight: "500",
  lineHeight: "1.5",
  color: "var(--text-primary)",
  fontStyle: "italic"
};

const authorTextStyle = {
  fontSize: "0.8rem",
  fontWeight: "600",
  color: "var(--text-muted)",
  alignSelf: "flex-end"
};
