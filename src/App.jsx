import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Page Imports
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProblemsExplorer from "./pages/ProblemsExplorer";
import ProblemDetail from "./pages/ProblemDetail";
import TopicRoadmap from "./pages/TopicRoadmap";
import CompanyDetail from "./pages/CompanyDetail";
import DailyChallenge from "./pages/DailyChallenge";
import LearningCenter from "./pages/LearningCenter";
import RevisionCenter from "./pages/RevisionCenter";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div style={appLayoutStyle}>
          {/* Global Header Header */}
          <Navbar />
          
          {/* Page Routing Container */}
          <main style={mainContentStyle}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/problems" element={<ProblemsExplorer />} />
              <Route path="/problem/:id" element={<ProblemDetail />} />
              <Route path="/roadmap" element={<TopicRoadmap />} />
              <Route path="/company" element={<CompanyDetail />} />
              <Route path="/company/:companyName" element={<CompanyDetail />} />
              <Route path="/challenge" element={<DailyChallenge />} />
              <Route path="/learning" element={<LearningCenter />} />
              <Route path="/learning/:patternId" element={<LearningCenter />} />
              <Route path="/revision" element={<RevisionCenter />} />
              <Route path="*" element={<LandingPage />} /> {/* Fallback redirects to Landing */}
            </Routes>
          </main>
          
          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

// Global Layout CSS styling
const appLayoutStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  position: "relative"
};

const mainContentStyle = {
  flex: "1 0 auto",
  width: "100%",
  overflowX: "hidden"
};

export default App;
