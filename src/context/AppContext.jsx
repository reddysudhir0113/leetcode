import React, { createContext, useState, useEffect } from "react";
import { questions } from "../data/questions";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Helper to read from localStorage
  const getLocalStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      console.error(e);
      return defaultValue;
    }
  };

  // State
  const [solvedList, setSolvedList] = useState(() => getLocalStorage("codecrack_solved", []));
  const [bookmarks, setBookmarks] = useState(() => getLocalStorage("codecrack_bookmarks", []));
  const [notes, setNotes] = useState(() => getLocalStorage("codecrack_notes", {}));
  const [recentlyViewed, setRecentlyViewed] = useState(() => getLocalStorage("codecrack_recent", []));
  const [weeklyGoal, setWeeklyGoal] = useState(() => getLocalStorage("codecrack_weekly_goal", 5));
  
  // Activity log: array of YYYY-MM-DD date strings
  const [activityLog, setActivityLog] = useState(() => getLocalStorage("codecrack_activity", []));
  const [streak, setStreak] = useState(() => getLocalStorage("codecrack_streak", { current: 0, lastDate: "" }));
  
  // Achievement badges states
  const [unlockedBadges, setUnlockedBadges] = useState(() => getLocalStorage("codecrack_badges", []));

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem("codecrack_solved", JSON.stringify(solvedList));
  }, [solvedList]);

  useEffect(() => {
    localStorage.setItem("codecrack_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("codecrack_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("codecrack_recent", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("codecrack_weekly_goal", JSON.stringify(weeklyGoal));
  }, [weeklyGoal]);

  useEffect(() => {
    localStorage.setItem("codecrack_activity", JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem("codecrack_streak", JSON.stringify(streak));
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("codecrack_badges", JSON.stringify(unlockedBadges));
  }, [unlockedBadges]);

  // Recalculate streak based on activityLog on load
  useEffect(() => {
    updateStreakFromActivity(activityLog);
  }, []);

  const getLocalDateString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const updateStreakFromActivity = (logs) => {
    if (!logs || logs.length === 0) {
      setStreak({ current: 0, lastDate: "" });
      return;
    }

    const uniqueLogs = [...new Set(logs)].sort((a, b) => new Date(b) - new Date(a));
    const todayStr = getLocalDateString();
    
    // Check yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let current = 0;
    let tempDate = todayStr;
    
    // If the latest solve was today or yesterday, streak is active
    if (uniqueLogs[0] === todayStr || uniqueLogs[0] === yesterdayStr) {
      current = 1;
      let checkDate = new Date(uniqueLogs[0]);
      
      for (let i = 1; i < uniqueLogs.length; i++) {
        const diffTime = Math.abs(new Date(uniqueLogs[i-1]) - new Date(uniqueLogs[i]));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          current++;
        } else if (diffDays > 1) {
          break; // Streak broken in the past
        }
      }
    } else {
      current = 0; // Streak dead
    }

    setStreak({ current, lastDate: uniqueLogs[0] || "" });
  };

  // Toggle problem solved
  const toggleSolved = (id) => {
    const todayStr = getLocalDateString();
    
    if (solvedList.includes(id)) {
      // Remove
      setSolvedList(prev => prev.filter(x => x !== id));
      // Optionally clean activity log? For simplicity we just keep logs
    } else {
      // Add
      setSolvedList(prev => [...prev, id]);
      
      // Update activity log
      const newLogs = [...activityLog, todayStr];
      setActivityLog(newLogs);
      updateStreakFromActivity(newLogs);
    }
  };

  // Toggle bookmark
  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(prev => prev.filter(x => x !== id));
    } else {
      setBookmarks(prev => [...prev, id]);
    }
  };

  // Save personal notes
  const saveNote = (id, noteText) => {
    setNotes(prev => ({
      ...prev,
      [id]: noteText
    }));
  };

  // Add recently viewed
  const addRecentlyViewed = (id) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(x => x !== id);
      return [id, ...filtered].slice(0, 10); // Keep max 10
    });
  };

  // Reset all progress
  const resetProgress = () => {
    setSolvedList([]);
    setBookmarks([]);
    setNotes({});
    setRecentlyViewed([]);
    setActivityLog([]);
    setStreak({ current: 0, lastDate: "" });
    setUnlockedBadges([]);
    setWeeklyGoal(5);
  };

  // Check achievements dynamically
  useEffect(() => {
    const badges = [];

    // Badge 1: First Step (Solve 1 question)
    if (solvedList.length >= 1) {
      badges.push({
        id: "first_step",
        title: "First Step",
        description: "Marked your first coding problem as solved!",
        icon: "🏆"
      });
    }

    // Badge 2: Consistent (Streak >= 3)
    if (streak.current >= 3) {
      badges.push({
        id: "consistent_coder",
        title: "Consistent Coder",
        description: "Maintained a 3-day problem-solving streak!",
        icon: "🔥"
      });
    }

    // Badge 3: Obsessive Solver (Solve 10 questions)
    if (solvedList.length >= 10) {
      badges.push({
        id: "ten_problems",
        title: "Deca-Solver",
        description: "Successfully solved 10 interview preparation questions.",
        icon: "💪"
      });
    }

    // Badge 4: Topic Specialist (Solved all questions in at least one topic that has questions)
    const topicMap = {};
    questions.forEach(q => {
      if (!topicMap[q.topic]) topicMap[q.topic] = { total: 0, solved: 0 };
      topicMap[q.topic].total++;
      if (solvedList.includes(q.id)) {
        topicMap[q.topic].solved++;
      }
    });

    const hasCompletedTopic = Object.keys(topicMap).some(
      t => topicMap[t].total > 0 && topicMap[t].solved === topicMap[t].total
    );

    if (hasCompletedTopic) {
      badges.push({
        id: "topic_specialist",
        title: "Topic Specialist",
        description: "Completed 100% of all questions in a specific topic category.",
        icon: "⭐"
      });
    }

    // Badge 5: Note Taker (Wrote notes for at least 3 questions)
    const notesCount = Object.values(notes).filter(n => n.trim().length > 0).length;
    if (notesCount >= 3) {
      badges.push({
        id: "noteworthy",
        title: "Master Scholar",
        description: "Added study notes for 3 or more problems for future revision.",
        icon: "📝"
      });
    }

    // Badge 6: Company Analyst (Solved 5 questions asked by Google or Amazon)
    let amazonCount = 0;
    let googleCount = 0;
    solvedList.forEach(id => {
      const q = questions.find(x => x.id === id);
      if (q) {
        if (q.companies.includes("Amazon")) amazonCount++;
        if (q.companies.includes("Google")) googleCount++;
      }
    });

    if (amazonCount >= 5 || googleCount >= 5) {
      badges.push({
        id: "company_analyst",
        title: "FAANG Insider",
        description: "Solved 5+ questions frequently asked by Amazon or Google.",
        icon: "💼"
      });
    }

    // Only update if badges lists are different in length or IDs
    const currentBadgeIds = unlockedBadges.map(b => b.id).sort().join(",");
    const newBadgeIds = badges.map(b => b.id).sort().join(",");
    
    if (currentBadgeIds !== newBadgeIds) {
      setUnlockedBadges(badges);
    }
  }, [solvedList, streak.current, notes]);

  // Dynamic dashboard calculations
  const totalQuestions = questions.length;
  const totalSolved = solvedList.length;
  
  const easySolved = questions.filter(q => q.difficulty === "Easy" && solvedList.includes(q.id)).length;
  const mediumSolved = questions.filter(q => q.difficulty === "Medium" && solvedList.includes(q.id)).length;
  const hardSolved = questions.filter(q => q.difficulty === "Hard" && solvedList.includes(q.id)).length;

  const easyTotal = questions.filter(q => q.difficulty === "Easy").length;
  const mediumTotal = questions.filter(q => q.difficulty === "Medium").length;
  const hardTotal = questions.filter(q => q.difficulty === "Hard").length;

  return (
    <AppContext.Provider
      value={{
        questions,
        solvedList,
        bookmarks,
        notes,
        recentlyViewed,
        weeklyGoal,
        activityLog,
        streak,
        unlockedBadges,
        totalQuestions,
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        easyTotal,
        mediumTotal,
        hardTotal,
        toggleSolved,
        toggleBookmark,
        saveNote,
        addRecentlyViewed,
        updateWeeklyGoal: setWeeklyGoal,
        resetProgress
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
