import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function ConsistencyTracker() {
  const { activityLog } = useContext(AppContext);

  // Generate date array for the last 365 days
  const generateYearDates = () => {
    const dates = [];
    const today = new Date();
    // Start from 364 days ago
    for (let i = 364; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      dates.push({
        dateStr,
        dayOfWeek: d.getDay(),
        month: d.getMonth()
      });
    }
    return dates;
  };

  const dates = generateYearDates();
  
  // Calculate frequencies of dates in activityLog
  const activityMap = {};
  activityLog.forEach(date => {
    activityMap[date] = (activityMap[date] || 0) + 1;
  });

  // Group dates into weeks (7 days each)
  const weeks = [];
  let currentWeek = [];
  
  dates.forEach((d, idx) => {
    currentWeek.push(d);
    // If it's Saturday (d.dayOfWeek === 6) or the last item, push the week
    if (d.dayOfWeek === 6 || idx === dates.length - 1) {
      // Pad first week if it doesn't start with Sunday (0)
      if (weeks.length === 0 && currentWeek.length < 7) {
        const paddingCount = 7 - currentWeek.length;
        const padded = Array(paddingCount).fill(null).concat(currentWeek);
        weeks.push(padded);
      } else {
        weeks.push(currentWeek);
      }
      currentWeek = [];
    }
  });

  // Color selection based on solved count
  const getCellColor = (count) => {
    if (count === 0) return "rgba(255, 255, 255, 0.04)"; // Empty
    if (count === 1) return "#064e3b"; // Dark green
    if (count === 2) return "#047857"; // Medium green
    if (count === 3) return "#10b981"; // Emerald green
    return "#34d399"; // Bright green (4+)
  };

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Find month changes to render headers
  const getMonthHeaders = () => {
    const headers = [];
    let prevMonth = -1;
    
    weeks.forEach((week, weekIdx) => {
      // Find first non-null day in week
      const firstDay = week.find(d => d !== null);
      if (firstDay && firstDay.month !== prevMonth) {
        headers.push({ name: monthLabels[firstDay.month], weekIdx });
        prevMonth = firstDay.month;
      }
    });
    return headers;
  };

  const headers = getMonthHeaders();

  return (
    <div style={wrapperStyle} className="glass-panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h4 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Consistency Calendar</h4>
        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
          {activityLog.length} solves registered this year
        </span>
      </div>

      {/* Heatmap Grid Wrapper (Scrollable on mobile) */}
      <div style={scrollContainerStyle}>
        <div style={gridContainerStyle}>
          {/* Month Headers */}
          <div style={monthHeadersRowStyle}>
            <div style={{ width: "24px" }} /> {/* spacer for weekday labels */}
            {headers.map((h, i) => (
              <span key={i} style={{ 
                ...monthLabelStyle, 
                left: `${(h.weekIdx * 15) + 32}px` 
              }}>
                {h.name}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "3px" }}>
            {/* Weekday Labels */}
            <div style={weekdayColStyle}>
              <span style={weekdayLabelStyle}>M</span>
              <span style={weekdayLabelStyle}>W</span>
              <span style={weekdayLabelStyle}>F</span>
            </div>

            {/* Weeks */}
            <div style={weeksContainerStyle}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} style={weekColStyle}>
                  {week.map((day, dIdx) => {
                    if (!day) return <div key={dIdx} style={cellStyle} />;
                    const count = activityMap[day.dateStr] || 0;
                    return (
                      <div
                        key={day.dateStr}
                        style={{
                          ...cellStyle,
                          backgroundColor: getCellColor(count),
                          border: count > 0 ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(255, 255, 255, 0.02)"
                        }}
                        title={`${day.dateStr} : ${count} solved`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={legendStyle}>
        <span>Less</span>
        <div style={{ ...cellStyle, backgroundColor: "rgba(255, 255, 255, 0.04)" }} />
        <div style={{ ...cellStyle, backgroundColor: "#064e3b" }} />
        <div style={{ ...cellStyle, backgroundColor: "#047857" }} />
        <div style={{ ...cellStyle, backgroundColor: "#10b981" }} />
        <div style={{ ...cellStyle, backgroundColor: "#34d399" }} />
        <span>More</span>
      </div>
    </div>
  );
}

// Styles
const wrapperStyle = {
  padding: "20px",
  borderRadius: "16px",
  width: "100%",
  overflow: "hidden"
};

const scrollContainerStyle = {
  overflowX: "auto",
  paddingBottom: "10px",
  width: "100%"
};

const gridContainerStyle = {
  minWidth: "830px", // Fits 53 weeks * 15px width
  position: "relative"
};

const monthHeadersRowStyle = {
  height: "20px",
  position: "relative",
  marginBottom: "4px"
};

const monthLabelStyle = {
  position: "absolute",
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  fontWeight: "600"
};

const weekdayColStyle = {
  display: "grid",
  gridTemplateRows: "repeat(7, 12px)",
  gap: "3px",
  width: "24px",
  paddingTop: "15px", // Match grid alignment
  alignItems: "center"
};

const weekdayLabelStyle = {
  fontSize: "0.7rem",
  color: "var(--text-muted)",
  fontWeight: "500",
  lineHeight: "12px",
  height: "12px"
};

const weeksContainerStyle = {
  display: "flex",
  gap: "3px"
};

const weekColStyle = {
  display: "grid",
  gridTemplateRows: "repeat(7, 12px)",
  gap: "3px"
};

const cellStyle = {
  width: "12px",
  height: "12px",
  borderRadius: "3px",
  transition: "transform 0.1s"
};

const legendStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "4px",
  fontSize: "0.75rem",
  color: "var(--text-muted)",
  marginTop: "16px"
};
