import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CELL = 16;          // cell size in px
const GAP  = 3;           // gap between cells in px
const STEP = CELL + GAP;  // 19px per column/row slot
const DAY_COL_W = 36;     // weekday label column width

export default function ConsistencyTracker() {
  const { activityLog } = useContext(AppContext);

  // ── Build 365-day list, oldest first ──────────────────────────────────────
  const today = new Date();
  const dates = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const y  = d.getFullYear();
    const m  = String(d.getMonth() + 1).padStart(2, "0");
    const dy = String(d.getDate()).padStart(2, "0");
    dates.push({
      dateStr:   `${y}-${m}-${dy}`,
      dayOfWeek: d.getDay(),   // 0=Sun … 6=Sat
      month:     d.getMonth(), // 0–11
      date:      d.getDate(),  // 1–31
    });
  }

  // ── Frequency map ─────────────────────────────────────────────────────────
  const actMap = {};
  activityLog.forEach((d) => { actMap[d] = (actMap[d] || 0) + 1; });

  // ── Pad so first column starts on Sunday ─────────────────────────────────
  const firstDow = dates[0].dayOfWeek;
  const padded   = [...Array(firstDow).fill(null), ...dates];

  // ── Slice into columns of 7 (one column = one week, Sunday on top) ────────
  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  // ── Month header positions ────────────────────────────────────────────────
  const MON = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthHeaders = [];
  let prevMonth = -1;
  weeks.forEach((week, wIdx) => {
    const first = week.find((d) => d !== null);
    if (first && first.month !== prevMonth) {
      monthHeaders.push({ label: MON[first.month], wIdx });
      prevMonth = first.month;
    }
  });

  const uniqueDays = new Set(activityLog).size;
  const totalW     = DAY_COL_W + weeks.length * STEP;

  return (
    <div style={wrapper} className="glass-panel">
      {/* ── Title row ── */}
      <div style={titleRow}>
        <h4 style={titleTxt}>Consistency Calendar</h4>
        <span style={subtitleTxt}>{uniqueDays} active day{uniqueDays !== 1 ? "s" : ""} this year</span>
      </div>

      {/* ── Scrollable heatmap ── */}
      <div style={scrollBox}>
        <div style={{ width: `${totalW}px`, position: "relative" }}>

          {/* Month labels */}
          <div style={monthRowStyle}>
            <div style={{ width: `${DAY_COL_W}px`, flexShrink: 0 }} />
            <div style={{ position: "relative", flex: 1, height: "20px" }}>
              {monthHeaders.map((h, i) => (
                <span key={i} style={{ ...monthLabel, left: `${h.wIdx * STEP}px` }}>
                  {h.label}
                </span>
              ))}
            </div>
          </div>

          {/* Grid body */}
          <div style={gridBody}>

            {/* Weekday label column — 7 rows */}
            <div style={dayLabelCol}>
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d, i) => (
                <div key={i} style={dayLabelCell}>
                  <span style={dayLabelTxt}>{d}</span>
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div style={weeksRow}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} style={weekCol}>
                  {week.map((day, dIdx) => {
                    // Invisible spacer for padding cells
                    if (!day) {
                      return <div key={`pad-${wIdx}-${dIdx}`} style={invisCell} />;
                    }

                    const count   = actMap[day.dateStr] || 0;
                    const isToday = day.dateStr === (() => {
                      const t = new Date();
                      return `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,"0")}-${String(t.getDate()).padStart(2,"0")}`;
                    })();

                    return (
                      <div
                        key={day.dateStr}
                        style={getCell(count, isToday)}
                        className="consistency-cell"
                        title={
                          count > 0
                            ? `${day.dateStr} · ${count} problem${count > 1 ? "s" : ""} solved 🐧`
                            : `${day.dateStr} · No activity`
                        }
                      >
                        {/* Penguin visible inside the cell when solved */}
                        {count > 0 && (
                          <img
                            src="cute_penguin.png"
                            alt="🐧"
                            style={penguinImg}
                            draggable={false}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div style={legendRow}>
        <span style={legendTxt}>Less</span>
        <div style={emptyLegendCell} />
        <div style={activeLegendCell}>
          <img src="cute_penguin.png" alt="🐧" style={penguinImg} draggable={false} />
        </div>
        <span style={legendTxt}>More · 🐧 = a solved day</span>
      </div>
    </div>
  );
}

// ── Cell factory ──────────────────────────────────────────────────────────────
function getCell(count, isToday) {
  const base = {
    width:         `${CELL}px`,
    height:        `${CELL}px`,
    borderRadius:  "3px",
    overflow:      "hidden",
    position:      "relative",
    display:       "flex",
    alignItems:    "center",
    justifyContent:"center",
    flexShrink:    0,
  };

  if (isToday) {
    return {
      ...base,
      outline:         "2px solid var(--primary)",
      outlineOffset:   "1px",
      backgroundColor: count > 0 ? "rgba(13,148,136,0.35)" : "rgba(251,191,36,0.08)",
      border:          "1px solid var(--primary)",
      backgroundImage: count > 0 ? "url('cute_penguin.png')" : "none",
      backgroundSize:  "cover",
      backgroundPosition: "center",
      backgroundRepeat:   "no-repeat",
    };
  }

  if (count === 0) {
    return {
      ...base,
      backgroundColor: "var(--cell-empty, rgba(0,0,0,0.08))",
      border:          "1px solid var(--cell-border, rgba(0,0,0,0.10))",
    };
  }

  // Solved day → rich teal background so black penguin contrasts clearly
  return {
    ...base,
    backgroundImage: "url('cute_penguin.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(13,148,136,0.35)",
    border: "1px solid rgba(45,212,191,0.55)",
  };
}

// ── Static styles ─────────────────────────────────────────────────────────────
const wrapper = {
  padding:      "20px",
  borderRadius: "16px",
  width:        "100%",
  overflow:     "hidden",
};

const titleRow = {
  display:        "flex",
  justifyContent: "space-between",
  alignItems:     "center",
  marginBottom:   "14px",
};

const titleTxt = {
  fontSize:   "1rem",
  fontWeight: "700",
  color:      "var(--text-primary)",
};

const subtitleTxt = {
  fontSize: "0.78rem",
  color:    "var(--text-secondary)",
};

const scrollBox = {
  overflowX:     "auto",
  paddingBottom: "8px",
  width:         "100%",
};

const monthRowStyle = {
  display:      "flex",
  alignItems:   "flex-end",
  marginBottom: "5px",
};

const monthLabel = {
  position:   "absolute",
  fontSize:   "0.68rem",
  color:      "var(--text-muted)",
  fontWeight: "600",
  whiteSpace: "nowrap",
  bottom:     "0",
};

const gridBody = {
  display: "flex",
  gap:     "0px",
};

const dayLabelCol = {
  display:             "grid",
  gridTemplateRows:    `repeat(7, ${CELL}px)`,
  gap:                 `${GAP}px`,
  width:               `${DAY_COL_W}px`,
  flexShrink:          0,
};

const dayLabelCell = {
  height:      `${CELL}px`,
  display:     "flex",
  alignItems:  "center",
  paddingRight: "6px",
};

const dayLabelTxt = {
  fontSize:   "0.65rem",
  color:      "var(--text-muted)",
  fontWeight: "600",
  lineHeight: 1,
};

const weeksRow = {
  display:  "flex",
  gap:      `${GAP}px`,
};

const weekCol = {
  display:             "grid",
  gridTemplateRows:    `repeat(7, ${CELL}px)`,
  gap:                 `${GAP}px`,
};

const invisCell = {
  width:     `${CELL}px`,
  height:    `${CELL}px`,
  opacity:   0,
  flexShrink: 0,
};

const penguinImg = {
  width:      "100%",
  height:     "100%",
  objectFit:  "contain",
  display:    "block",
  pointerEvents: "none",
};

const legendRow = {
  display:    "flex",
  alignItems: "center",
  gap:        "6px",
  fontSize:   "0.72rem",
  color:      "var(--text-muted)",
  marginTop:  "14px",
};

const legendTxt = {
  fontSize: "0.72rem",
  color:    "var(--text-muted)",
};

const emptyLegendCell = {
  width:           `${CELL}px`,
  height:          `${CELL}px`,
  borderRadius:    "3px",
  backgroundColor: "var(--cell-empty, rgba(0,0,0,0.08))",
  border:          "1px solid var(--cell-border, rgba(0,0,0,0.10))",
  flexShrink:      0,
};

const activeLegendCell = {
  width:           `${CELL}px`,
  height:          `${CELL}px`,
  borderRadius:    "3px",
  backgroundColor: "rgba(13,148,136,0.35)",
  border:          "1px solid rgba(45,212,191,0.55)",
  overflow:        "hidden",
  display:         "flex",
  alignItems:      "center",
  justifyContent:  "center",
  flexShrink:      0,
};
