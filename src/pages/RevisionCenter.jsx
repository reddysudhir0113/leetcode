import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { 
  Sparkles, Bookmark, History, FileText, AlertOctagon, CheckCircle2, 
  HelpCircle, ChevronRight, Edit2, CornerDownRight
} from "lucide-react";
import ProblemCard from "../components/ProblemCard";

export default function RevisionCenter() {
  const { 
    questions, solvedList, bookmarks, recentlyViewed, notes 
  } = useContext(AppContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("bookmarks"); // bookmarks, recent, notes, weak

  // Filter bookmarked questions
  const bookmarkedQuestions = questions.filter(q => bookmarks.includes(q.id));

  // Filter recently viewed
  const recentlyViewedQuestions = recentlyViewed
    .map(id => questions.find(q => q.id === id))
    .filter(Boolean); // Clean any nulls

  // Filter questions that have non-empty notes
  const noteQuestions = questions.filter(q => notes[q.id] && notes[q.id].trim().length > 0);

  // Analyze Weak Areas (topics with high unsolved count or low solve ratio)
  const getWeakAreas = () => {
    const topicStats = {};
    questions.forEach(q => {
      if (!topicStats[q.topic]) {
        topicStats[q.topic] = { total: 0, solved: 0, questions: [] };
      }
      topicStats[q.topic].total++;
      topicStats[q.topic].questions.push(q);
      if (solvedList.includes(q.id)) {
        topicStats[q.topic].solved++;
      }
    });

    return Object.keys(topicStats)
      .map(name => {
        const stats = topicStats[name];
        const unsolvedCount = stats.total - stats.solved;
        const ratio = stats.total > 0 ? stats.solved / stats.total : 1;
        return { name, unsolvedCount, ratio, questions: stats.questions };
      })
      // Weak areas: unsolved > 0, sorted by ratio ascending (lowest solved first)
      .filter(t => t.unsolvedCount > 0)
      .sort((a, b) => a.ratio - b.ratio)
      .slice(0, 3);
  };

  const weakAreas = getWeakAreas();

  return (
    <div style={containerStyle}>
      {/* Banner */}
      <div style={bannerStyle} className="glass-panel">
        <Sparkles size={22} color="var(--primary)" />
        <h2 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Revision & Study Hub</h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          Your central study center. Review your bookmarked problems, read personal summaries, trace navigation histories, and target weak topics.
        </p>
      </div>

      {/* Tabs Row */}
      <div style={tabsRowStyle} className="glass-panel">
        <button 
          onClick={() => setActiveTab("bookmarks")}
          style={{
            ...tabButtonStyle,
            color: activeTab === "bookmarks" ? "var(--secondary)" : "var(--text-secondary)",
            background: activeTab === "bookmarks" ? "rgba(6, 182, 212, 0.08)" : "transparent"
          }}
        >
          <Bookmark size={16} /> Bookmarks ({bookmarkedQuestions.length})
        </button>

        <button 
          onClick={() => setActiveTab("recent")}
          style={{
            ...tabButtonStyle,
            color: activeTab === "recent" ? "var(--secondary)" : "var(--text-secondary)",
            background: activeTab === "recent" ? "rgba(6, 182, 212, 0.08)" : "transparent"
          }}
        >
          <History size={16} /> History ({recentlyViewedQuestions.length})
        </button>

        <button 
          onClick={() => setActiveTab("notes")}
          style={{
            ...tabButtonStyle,
            color: activeTab === "recent" ? "var(--secondary)" : "var(--text-secondary)",
            background: activeTab === "notes" ? "rgba(6, 182, 212, 0.08)" : "transparent"
          }}
        >
          <FileText size={16} /> Study Notes ({noteQuestions.length})
        </button>

        <button 
          onClick={() => setActiveTab("weak")}
          style={{
            ...tabButtonStyle,
            color: activeTab === "weak" ? "var(--secondary)" : "var(--text-secondary)",
            background: activeTab === "weak" ? "rgba(6, 182, 212, 0.08)" : "transparent"
          }}
        >
          <AlertOctagon size={16} /> Weak Areas ({weakAreas.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div style={panelContainerStyle}>
        
        {/* Tab 1: Bookmarks */}
        {activeTab === "bookmarks" && (
          <div>
            <h3 style={panelTitleStyle}>Bookmarked Problems</h3>
            {bookmarkedQuestions.length > 0 ? (
              <div style={cardsGridStyle}>
                {bookmarkedQuestions.map(q => (
                  <ProblemCard key={q.id} problem={q} />
                ))}
              </div>
            ) : (
              <div style={emptyStateStyle} className="glass-panel">
                <Bookmark size={36} color="var(--text-muted)" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: "750", marginTop: "12px" }}>No Bookmarked Problems</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Save challenging questions by clicking the bookmark flag on problem cards.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Recent History */}
        {activeTab === "recent" && (
          <div>
            <h3 style={panelTitleStyle}>Recently Viewed History</h3>
            {recentlyViewedQuestions.length > 0 ? (
              <div style={cardsGridStyle}>
                {recentlyViewedQuestions.map(q => (
                  <ProblemCard key={q.id} problem={q} />
                ))}
              </div>
            ) : (
              <div style={emptyStateStyle} className="glass-panel">
                <History size={36} color="var(--text-muted)" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: "750", marginTop: "12px" }}>No Navigation History</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Problems you click to inspect in detail will show up here for easy backtracking.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Study Notes */}
        {activeTab === "notes" && (
          <div>
            <h3 style={panelTitleStyle}>My Personal Study Notes</h3>
            {noteQuestions.length > 0 ? (
              <div style={notesGridStyle}>
                {noteQuestions.map(q => (
                  <div key={q.id} style={noteItemCardStyle} className="glass-panel">
                    <div style={noteItemHeaderStyle}>
                      <div>
                        <h4 style={{ fontWeight: "700", color: "var(--text-primary)" }}>{q.title}</h4>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{q.topic} &bull; #{q.leetcodeNumber}</span>
                      </div>
                      <button onClick={() => navigate(`/problem/${q.id}`)} style={noteEditButtonStyle} className="glass-panel">
                        <Edit2 size={12} /> Edit Notes
                      </button>
                    </div>

                    <div style={noteBodyStyle}>
                      <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--primary)", display: "block", marginBottom: "4px" }}>REVISION NOTES:</span>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>
                        {notes[q.id].length > 180 ? `${notes[q.id].slice(0, 180)}...` : notes[q.id]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={emptyStateStyle} className="glass-panel">
                <FileText size={36} color="var(--text-muted)" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: "750", marginTop: "12px" }}>No Study Notes Found</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Add revision details and notes inside problem pages to review them in bulk here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Weak Areas */}
        {activeTab === "weak" && (
          <div>
            <h3 style={panelTitleStyle}>Target Weak Categories</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
              These topic categories have high unsolved problem counts. Start practicing their remaining questions to cover all gaps.
            </p>

            {weakAreas.length > 0 ? (
              <div style={weakListStyle}>
                {weakAreas.map(wa => {
                  const unsolvedList = wa.questions.filter(q => !solvedList.includes(q.id));
                  return (
                    <div key={wa.name} style={weakCardStyle} className="glass-panel">
                      <div style={weakCardHeaderStyle}>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "750" }}>{wa.name}</h4>
                        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--accent)" }}>
                          {wa.unsolvedCount} remaining
                        </span>
                      </div>
                      
                      {/* Sub-items links */}
                      <div style={weakQuestionsContainerStyle}>
                        {unsolvedList.slice(0, 3).map(q => (
                          <div 
                            key={q.id}
                            onClick={() => navigate(`/problem/${q.id}`)}
                            style={weakLinkItemStyle}
                            className="glass-panel glass-card-interactive"
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <CornerDownRight size={14} color="var(--text-muted)" />
                              <span style={{ fontSize: "0.88rem", fontWeight: "600" }}>{q.title}</span>
                              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>#{q.leetcodeNumber}</span>
                            </div>
                            <ChevronRight size={14} />
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => navigate(`/problems?topic=${encodeURIComponent(wa.name)}&solved=Unsolved`)}
                        className="btn-secondary"
                        style={{ marginTop: "12px", width: "100%", justifyContent: "center", fontSize: "0.85rem" }}
                      >
                        Practice remaining {wa.name} problems
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={emptyStateStyle} className="glass-panel">
                <CheckCircle2 size={36} color="var(--easy)" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: "750", marginTop: "12px" }}>Zero Weak Areas!</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                  All topics are either 100% completed or you have not marked enough solves to generate data.
                </p>
              </div>
            )}
          </div>
        )}

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
  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.06)",
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const tabsRowStyle = {
  display: "flex",
  padding: "6px",
  borderRadius: "12px",
  gap: "4px",
  overflowX: "auto"
};

const tabButtonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  border: "none",
  background: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "0.88rem",
  fontWeight: "600",
  whiteSpace: "nowrap",
  transition: "all 0.2s"
};

const panelContainerStyle = {
  minHeight: "300px"
};

const panelTitleStyle = {
  fontSize: "1.25rem",
  fontWeight: "750",
  marginBottom: "16px",
  color: "var(--text-primary)"
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px"
};

const notesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "16px"
};

const noteItemCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const noteItemHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  paddingBottom: "10px"
};

const noteEditButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "0.75rem",
  fontWeight: "600",
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid var(--border-glass)",
  background: "rgba(255,255,255,0.02)",
  color: "var(--text-secondary)",
  cursor: "pointer",
  transition: "all 0.2s"
};

const noteBodyStyle = {
  background: "rgba(3, 7, 18, 0.2)",
  borderRadius: "10px",
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.02)"
};

const weakListStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "16px"
};

const weakCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const weakCardHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  paddingBottom: "10px"
};

const weakQuestionsContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const weakLinkItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  background: "rgba(255,255,255,0.01)",
  border: "1px solid var(--border-glass)"
};

const emptyStateStyle = {
  padding: "60px 20px",
  borderRadius: "16px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};
