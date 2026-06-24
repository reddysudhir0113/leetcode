import React, { useContext, useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Search, SlidersHorizontal, Bookmark, Eye, BookOpen, Layers } from "lucide-react";
import ProblemCard from "../components/ProblemCard";

export default function ProblemsExplorer() {
  const { questions, solvedList, bookmarks } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search input ref to focus when G-/ or search params request it
  const searchInputRef = useRef(null);

  // Read params
  const initialTrack = searchParams.get("track") || "";
  const initialSearch = searchParams.get("search") || "";
  const focusSearch = searchParams.get("focusSearch") === "true";
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [solvedFilter, setSolvedFilter] = useState("All"); // All, Solved, Unsolved, Bookmarked
  const [sortBy, setSortBy] = useState("number"); // number, difficulty, title

  // Handle focusSearch param
  useEffect(() => {
    if (focusSearch && searchInputRef.current) {
      searchInputRef.current.focus();
      // Remove focusSearch from URL so it doesn't trigger repeatedly
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("focusSearch");
      setSearchParams(newParams);
    }
  }, [focusSearch, searchParams, setSearchParams]);

  // Synchronize searchQuery with searchParams if search query is updated in URL
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Get list of unique companies and topics dynamically (or predefined)
  const allCompanies = [
    "Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", 
    "Adobe", "Walmart", "Oracle", "Salesforce", "Infosys", "TCS", 
    "Accenture", "Deloitte", "Capgemini", "Cognizant"
  ];

  const allTopics = [
    "Arrays", "Strings", "Hash Maps", "Two Pointers", "Sliding Window",
    "Binary Search", "Recursion", "Linked List", "Stack", "Queue",
    "Heap", "Trees", "BST", "Graphs", "Backtracking", "Greedy",
    "Dynamic Programming", "Bit Manipulation", "Trie"
  ];

  // Track filter lists:
  // For NeetCode 150 & Top Interview 150, we represent them by subsets of our database
  // or define them by list properties. Since we have 75 questions in questions.js,
  // we will map:
  // - Blind 75: All 75 questions
  // - NeetCode 150: A specific curated subset of 60 questions from our set
  // - Top Interview 150: A specific curated subset of 55 questions from our set
  const getTrackQuestions = (trackName) => {
    if (!trackName) return questions;
    
    const track = trackName.toLowerCase();
    if (track === "blind75") {
      // Blind 75 contains almost all our problems except the repeated template placeholders
      return questions.filter(q => !q.id.includes("repeated") && !q.id.endsWith("-2"));
    }
    if (track === "neetcode150") {
      // NeetCode 150: filter down to standard NC set (e.g. even indices or specific topics)
      return questions.filter((q, idx) => idx % 6 !== 0 && !q.id.includes("repeated"));
    }
    if (track === "top150") {
      // Top Interview 150: filter down to top systems (e.g. odd indices or specific companies)
      return questions.filter((q, idx) => idx % 5 !== 0 && !q.id.includes("repeated"));
    }
    return questions;
  };

  const trackQuestions = getTrackQuestions(initialTrack);

  // Apply filtering
  const filteredQuestions = trackQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.leetcodeNumber.toString().includes(searchQuery) ||
                          q.pattern.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === "All" || q.topic === topicFilter;
    const matchesCompany = companyFilter === "All" || q.companies.includes(companyFilter);
    
    let matchesSolved = true;
    if (solvedFilter === "Solved") matchesSolved = solvedList.includes(q.id);
    else if (solvedFilter === "Unsolved") matchesSolved = !solvedList.includes(q.id);
    else if (solvedFilter === "Bookmarked") matchesSolved = bookmarks.includes(q.id);

    return matchesSearch && matchesDifficulty && matchesTopic && matchesCompany && matchesSolved;
  });

  // Apply Sorting
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === "number") {
      return a.leetcodeNumber - b.leetcodeNumber;
    }
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "difficulty") {
      const diffOrder = { "Easy": 1, "Medium": 2, "Hard": 3 };
      return diffOrder[a.difficulty] - diffOrder[b.difficulty];
    }
    return 0;
  });

  // Calculate track progress
  const trackTotal = trackQuestions.length;
  const trackSolved = trackQuestions.filter(q => solvedList.includes(q.id)).length;
  const trackPercent = trackTotal > 0 ? Math.round((trackSolved / trackTotal) * 100) : 0;

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set("search", query);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("All");
    setTopicFilter("All");
    setCompanyFilter("All");
    setSolvedFilter("All");
    
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    setSearchParams(newParams);
  };

  // Human track names
  const getTrackDisplayName = (track) => {
    if (track === "blind75") return "Blind 75 Curated Roadmap";
    if (track === "neetcode150") return "NeetCode 150 Preparation Path";
    if (track === "top150") return "Top Interview 150 Guide";
    return "All Interview Questions";
  };

  return (
    <div style={containerStyle}>
      {/* Track Stats Header if filtering by track */}
      {initialTrack && (
        <div style={trackHeaderStyle} className="glass-panel">
          <div style={trackHeaderLeftStyle}>
            <span style={trackTagStyle}>{initialTrack.toUpperCase()} ROADMAP</span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "800", marginTop: "4px" }}>
              {getTrackDisplayName(initialTrack)}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "6px" }}>
              Master technical interviews using this structured layout of {trackTotal} questions.
            </p>
          </div>

          <div style={trackProgressContainerStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "6px" }}>
              <span style={{ color: "var(--text-secondary)" }}>Track progress</span>
              <span style={{ fontWeight: "700" }}>{trackPercent}% ({trackSolved}/{trackTotal})</span>
            </div>
            
            <div style={barContainerStyle}>
              <div style={{ ...barFillStyle, width: `${trackPercent}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Main Search & Filters Panel */}
      <div style={filtersPanelStyle} className="glass-panel">
        {/* Search Bar */}
        <div style={searchBarContainerStyle}>
          <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "14px" }} />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search problems by name, LC number, or pattern... (Press /)"
            value={searchQuery}
            onChange={handleSearchChange}
            style={searchInputStyle}
          />
        </div>

        {/* Multi-Filters Controls */}
        <div style={filtersGridStyle}>
          {/* Difficulty */}
          <div style={filterFieldStyle}>
            <label style={labelStyle}>Difficulty</label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={selectStyle}
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Topic */}
          <div style={filterFieldStyle}>
            <label style={labelStyle}>Topic Category</label>
            <select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              style={selectStyle}
            >
              <option value="All">All Topics</option>
              {allTopics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Company */}
          <div style={filterFieldStyle}>
            <label style={labelStyle}>Asked by Company</label>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              style={selectStyle}
            >
              <option value="All">All Companies</option>
              {allCompanies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Solved Status */}
          <div style={filterFieldStyle}>
            <label style={labelStyle}>Solving Status</label>
            <select
              value={solvedFilter}
              onChange={(e) => setSolvedFilter(e.target.value)}
              style={selectStyle}
            >
              <option value="All">All Statuses</option>
              <option value="Solved">Solved</option>
              <option value="Unsolved">Unsolved</option>
              <option value="Bookmarked">Bookmarked</option>
            </select>
          </div>

          {/* Sorting */}
          <div style={filterFieldStyle}>
            <label style={labelStyle}>Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={selectStyle}
            >
              <option value="number">LeetCode Number</option>
              <option value="title">Alphabetical</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>

          {/* Reset button */}
          <button onClick={clearFilters} style={resetButtonStyle}>
            Clear Filters
          </button>
        </div>
      </div>

      {/* Result Status Count */}
      <div style={resultsCountStyle}>
        <span>Found <strong style={{ color: "var(--secondary)" }}>{sortedQuestions.length}</strong> matching problems</span>
        {initialTrack && (
          <button onClick={() => { navigate("/problems"); clearFilters(); }} style={allTrackLinkStyle}>
            Show all questions &rarr;
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {sortedQuestions.length > 0 ? (
        <div style={cardsGridStyle}>
          {sortedQuestions.map((prob) => (
            <ProblemCard key={prob.id} problem={prob} />
          ))}
        </div>
      ) : (
        <div style={noResultsStyle} className="glass-panel">
          <SlidersHorizontal size={40} color="var(--text-muted)" />
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginTop: "12px" }}>No Problems Found</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "4px" }}>
            Try adjusting your search criteria, clearing topic/company filters, or switching tracking lists.
          </p>
          <button onClick={clearFilters} className="btn-primary" style={{ marginTop: "16px" }}>
            Reset Filters
          </button>
        </div>
      )}
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
  gap: "20px"
};

const trackHeaderStyle = {
  padding: "24px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)",
  border: "1px solid rgba(255,255,255,0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "20px"
};

const trackHeaderLeftStyle = {
  flex: "1 1 400px"
};

const trackTagStyle = {
  fontSize: "0.7rem",
  fontWeight: "800",
  letterSpacing: "1px",
  color: "var(--secondary)",
  background: "rgba(6, 182, 212, 0.1)",
  padding: "3px 8px",
  borderRadius: "6px"
};

const trackProgressContainerStyle = {
  flex: "0 0 280px",
  width: "100%"
};

const barContainerStyle = {
  width: "100%",
  height: "8px",
  borderRadius: "4px",
  background: "rgba(255,255,255,0.05)",
  overflow: "hidden"
};

const barFillStyle = {
  height: "100%",
  background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)",
  borderRadius: "4px"
};

const filtersPanelStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px"
};

const searchBarContainerStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center"
};

const searchInputStyle = {
  width: "100%",
  height: "44px",
  borderRadius: "10px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid var(--border-glass)",
  paddingLeft: "42px",
  paddingRight: "16px",
  color: "var(--text-primary)",
  fontSize: "0.95rem",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s",
  ":focus": {
    borderColor: "var(--primary)"
  }
};

const filtersGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "12px",
  alignItems: "flex-end"
};

const filterFieldStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const labelStyle = {
  fontSize: "0.75rem",
  fontWeight: "700",
  color: "var(--text-muted)",
  textTransform: "uppercase"
};

const selectStyle = {
  height: "38px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid var(--border-glass)",
  color: "var(--text-primary)",
  paddingLeft: "10px",
  paddingRight: "8px",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
  cursor: "pointer"
};

const resetButtonStyle = {
  height: "38px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid var(--border-glass)",
  color: "var(--text-secondary)",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "0.85rem",
  transition: "all 0.2s"
};

const resultsCountStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.85rem",
  color: "var(--text-secondary)",
  padding: "0 4px"
};

const allTrackLinkStyle = {
  background: "none",
  border: "none",
  color: "var(--secondary)",
  fontWeight: "600",
  cursor: "pointer"
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px"
};

const noResultsStyle = {
  padding: "60px 20px",
  borderRadius: "16px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};
