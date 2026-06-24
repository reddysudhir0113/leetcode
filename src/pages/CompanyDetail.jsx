import React, { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ArrowLeft, Briefcase, ChevronRight, Award, Compass } from "lucide-react";
import ProblemCard from "../components/ProblemCard";

export default function CompanyDetail() {
  const { companyName } = useParams();
  const { questions, solvedList } = useContext(AppContext);
  const navigate = useNavigate();

  const companiesList = [
    { name: "Google", desc: "Focuses on complex graphs, trees, dynamic programming, and creative solutions.", color: "#4285F4" },
    { name: "Amazon", desc: "Heavy emphasis on arrays, heaps, sorting, stack states, and maps.", color: "#FF9900" },
    { name: "Microsoft", desc: "Asks classic data structures, linked lists, binary search, and trees.", color: "#737373" },
    { name: "Meta", desc: "Prioritizes high frequency, two-pointer iterations, and array partitioning.", color: "#0668E1" },
    { name: "Apple", desc: "Evaluates arrays, custom class design, stack operations, and math.", color: "#A3AAAE" },
    { name: "Netflix", desc: "Asks system-focused algorithm questions, lists, maps, and sliding windows.", color: "#E50914" },
    { name: "Adobe", desc: "Focuses on strings, dynamic programming, sorting, and arithmetic puzzles.", color: "#FF0000" },
    { name: "Walmart", desc: "Asks arrays, greedy logic, knapsack DP, and graph traversals.", color: "#007DC6" },
    { name: "Oracle", desc: "Queries trees, string parsing, graph lists, and basic binary search.", color: "#F80000" },
    { name: "Salesforce", desc: "heavy on maps, trees, queues, and interval scheduling.", color: "#00A1E0" },
    { name: "Infosys", desc: "Classic arrays, sorting, string manipulation, and recursive math.", color: "#007CC3" },
    { name: "TCS", desc: "Basic arrays, loops, recursion, and simple dynamic programming.", color: "#1E3A8A" },
    { name: "Accenture", desc: "HashMap complements, string analysis, and standard matrix traversals.", color: "#A100FF" },
    { name: "Deloitte", desc: "Basic arrays, simple binary search, and math calculations.", color: "#86BC25" },
    { name: "Capgemini", desc: "Linked list reversals, array sorting, and basic tree traversals.", color: "#0066A1" },
    { name: "Cognizant", desc: "Palindromes, anagram counters, and standard two-pointer operations.", color: "#0033A0" }
  ];

  // Route 1: List all companies if no companyName parameter is specified
  if (!companyName) {
    return (
      <div style={containerStyle}>
        <div style={bannerStyle} className="glass-panel">
          <Briefcase size={22} color="var(--primary)" />
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800" }}>Company Wise Interview Prep</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "4px" }}>
            Select a target company to view its question distributions, frequently asked topics, and start practicing.
          </p>
        </div>

        <div style={companiesGridStyle}>
          {companiesList.map(comp => {
            const companyQs = questions.filter(q => q.companies.includes(comp.name));
            const companySolved = companyQs.filter(q => solvedList.includes(q.id)).length;
            const solvedPercent = companyQs.length > 0 ? Math.round((companySolved / companyQs.length) * 100) : 0;

            return (
              <div
                key={comp.name}
                onClick={() => navigate(`/company/${comp.name}`)}
                style={compCardStyle}
                className="glass-panel glass-card-interactive"
              >
                <div style={{ display: "flex", alignItems: "center", justifyBetween: "space-between", width: "100%", gap: "10px" }}>
                  <div style={{ ...compIconStyle, backgroundColor: `${comp.color}20`, color: comp.color }}>
                    {comp.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>{comp.name}</h3>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      {companyQs.length} questions mapped
                    </span>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
                
                <p style={compCardDescStyle}>{comp.desc}</p>

                {/* Progress bar */}
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Solved</span>
                    <span style={{ fontWeight: "700" }}>{companySolved} / {companyQs.length}</span>
                  </div>
                  <div style={microBarContainerStyle}>
                    <div style={{ ...microBarFillStyle, width: `${solvedPercent}%`, backgroundColor: comp.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Route 2: Specific Company details
  const activeCompany = companiesList.find(c => c.name.toLowerCase() === companyName.toLowerCase()) || {
    name: companyName,
    desc: `Coding questions frequently asked during technical rounds at ${companyName}.`,
    color: "var(--primary)"
  };

  const companyQs = questions.filter(q => q.companies.includes(activeCompany.name));
  const companySolved = companyQs.filter(q => solvedList.includes(q.id)).length;
  
  // Difficulty Breakdown
  const easyQs = companyQs.filter(q => q.difficulty === "Easy");
  const mediumQs = companyQs.filter(q => q.difficulty === "Medium");
  const hardQs = companyQs.filter(q => q.difficulty === "Hard");

  const easyCount = easyQs.length;
  const mediumCount = mediumQs.length;
  const hardCount = hardQs.length;

  const easySolvedCount = easyQs.filter(q => solvedList.includes(q.id)).length;
  const mediumSolvedCount = mediumQs.filter(q => solvedList.includes(q.id)).length;
  const hardSolvedCount = hardQs.filter(q => solvedList.includes(q.id)).length;

  // Topic distribution counts
  const topicCounts = {};
  companyQs.forEach(q => {
    topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
  });

  const sortedTopics = Object.keys(topicCounts)
    .map(topic => ({ topic, count: topicCounts[topic] }))
    .sort((a, b) => b.count - a.count);

  const maxTopicCount = sortedTopics.length > 0 ? sortedTopics[0].count : 1;

  return (
    <div style={containerStyle}>
      {/* Header and Back navigation */}
      <div style={companyHeaderStyle}>
        <button onClick={() => navigate("/company")} style={backButtonStyle} className="glass-panel">
          <ArrowLeft size={16} /> All Companies
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
          <div style={{ ...compIconLargeStyle, backgroundColor: `${activeCompany.color}20`, color: activeCompany.color }}>
            {activeCompany.name[0]}
          </div>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: "800" }}>{activeCompany.name}</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "4px" }}>
              {activeCompany.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Distribution Charts panel */}
      <div className="charts-grid">
        {/* Difficulty Distribution Chart */}
        <div style={chartCardStyle} className="glass-panel">
          <h3 style={chartTitleStyle}>Difficulty Distribution</h3>
          
          <div style={diffStatsContainerStyle}>
            {/* Easy Bar */}
            <div style={diffRowStyle}>
              <div style={diffLabelStyle}>
                <span className="badge-easy">Easy</span>
                <span style={{ color: "var(--text-secondary)" }}>{easySolvedCount}/{easyCount}</span>
              </div>
              <div style={barBgStyle}>
                <div style={{ ...barFillStyle, width: `${easyCount > 0 ? (easySolvedCount/easyCount)*100 : 0}%`, backgroundColor: "var(--easy)" }} />
              </div>
            </div>

            {/* Medium Bar */}
            <div style={diffRowStyle}>
              <div style={diffLabelStyle}>
                <span className="badge-medium">Medium</span>
                <span style={{ color: "var(--text-secondary)" }}>{mediumSolvedCount}/{mediumCount}</span>
              </div>
              <div style={barBgStyle}>
                <div style={{ ...barFillStyle, width: `${mediumCount > 0 ? (mediumSolvedCount/mediumCount)*100 : 0}%`, backgroundColor: "var(--medium)" }} />
              </div>
            </div>

            {/* Hard Bar */}
            <div style={diffRowStyle}>
              <div style={diffLabelStyle}>
                <span className="badge-hard">Hard</span>
                <span style={{ color: "var(--text-secondary)" }}>{hardSolvedCount}/{hardCount}</span>
              </div>
              <div style={barBgStyle}>
                <div style={{ ...barFillStyle, width: `${hardCount > 0 ? (hardSolvedCount/hardCount)*100 : 0}%`, backgroundColor: "var(--hard)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Topic Distribution Chart */}
        <div style={chartCardStyle} className="glass-panel">
          <h3 style={chartTitleStyle}>Frequently Asked Topics</h3>
          <div style={topicListStyle}>
            {sortedTopics.slice(0, 4).map(({ topic, count }) => {
              const percent = Math.round((count / maxTopicCount) * 100);
              return (
                <div key={topic} style={topicBarRowStyle}>
                  <div style={topicLabelRowStyle}>
                    <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>{topic}</span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{count} asked</span>
                  </div>
                  <div style={barBgStyle}>
                    <div style={{ ...barFillStyle, width: `${percent}%`, background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div style={{ marginTop: "24px" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "750", marginBottom: "16px" }}>
          Frequently Asked Questions ({companyQs.length})
        </h3>
        
        {companyQs.length > 0 ? (
          <div style={cardsGridStyle}>
            {companyQs.map(q => (
              <ProblemCard key={q.id} problem={q} />
            ))}
          </div>
        ) : (
          <div style={emptyStateStyle} className="glass-panel">
            <p>No questions mapped for this company yet.</p>
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

const companiesGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "16px"
};

const compCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
  cursor: "pointer",
  height: "100%"
};

const compIconStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  fontSize: "1.2rem"
};

const compCardDescStyle = {
  fontSize: "0.82rem",
  color: "var(--text-secondary)",
  lineHeight: "1.5"
};

const microBarContainerStyle = {
  width: "100%",
  height: "5px",
  borderRadius: "3px",
  background: "rgba(255,255,255,0.03)",
  overflow: "hidden"
};

const microBarFillStyle = {
  height: "100%",
  borderRadius: "3px"
};

const companyHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start"
};

const backButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  border: "1px solid var(--border-glass)",
  background: "rgba(255,255,255,0.02)",
  padding: "8px 16px",
  borderRadius: "8px",
  color: "var(--text-secondary)",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s"
};

const compIconLargeStyle = {
  width: "56px",
  height: "56px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "800",
  fontSize: "1.8rem"
};



const chartCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px"
};

const chartTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "750"
};

const diffStatsContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "14px"
};

const diffRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const diffLabelStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.85rem"
};

const barBgStyle = {
  width: "100%",
  height: "8px",
  borderRadius: "4px",
  background: "rgba(255,255,255,0.03)"
};

const barFillStyle = {
  height: "100%",
  borderRadius: "4px"
};

const topicListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const topicBarRowStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const topicLabelRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px"
};

const emptyStateStyle = {
  padding: "40px",
  borderRadius: "16px",
  textAlign: "center",
  color: "var(--text-secondary)"
};
