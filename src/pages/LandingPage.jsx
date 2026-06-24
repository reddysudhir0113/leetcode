import React, { useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { 
  Award, Compass, BookOpen, Clock, Code, Shield, CheckCircle, 
  MapPin, ChevronRight, Zap, Target, ArrowRight 
} from "lucide-react";
import { gsap } from "gsap";

export default function LandingPage() {
  const { totalQuestions, totalSolved } = useContext(AppContext);
  const navigate = useNavigate();
  
  // Refs for animations
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroCtaRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Hero entrance animations
    const tl = gsap.timeline();
    
    tl.fromTo(heroTitleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(heroSubtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(heroCtaRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Stagger feature cards
    gsap.fromTo(featuresRef.current.children,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%"
        }
      }
    );

    // Stagger statistics counters
    gsap.fromTo(statsRef.current.children,
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%"
        }
      }
    );

    // Timeline staggers
    gsap.fromTo(timelineRef.current.children,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%"
        }
      }
    );
  }, []);

  const whyChooseUs = [
    {
      icon: Target,
      title: "Pattern-Based Learning",
      description: "Don't memorize solutions. Master the 8 core patterns that solve over 90% of interview questions."
    },
    {
      icon: Code,
      title: "Curated Content",
      description: "Access Blind 75, NeetCode 150, and Top Interview 150 lists fully integrated with filters."
    },
    {
      icon: Shield,
      title: "No Copy-Paste Limits",
      description: "We explain computational complexity, key tricks, and concepts without copyrighted statements."
    },
    {
      icon: Zap,
      title: "Daily Challenges",
      description: "Stay consistent with daily problem draws, automated trackers, and streak mechanics."
    }
  ];

  const journeySteps = [
    {
      step: "01",
      title: "Learn the Patterns",
      desc: "Study the theory and visual outlines of major patterns like sliding window and tree traversals."
    },
    {
      step: "02",
      title: "Practice Curated Tracks",
      desc: "Tackle lists like the Blind 75, filtering by specific companies like Google, Meta, or Amazon."
    },
    {
      step: "03",
      title: "Track & Revise",
      desc: "Record personal notes, save bookmarks, and use the Revision Center to rebuild weak areas."
    },
    {
      step: "04",
      title: "Ace the Interview",
      desc: "Gain the mental tools to solve new, unseen problems under technical interview pressure."
    }
  ];

  return (
    <div style={pageContainerStyle}>
      {/* Animated Glowing Elements */}
      <div style={glow1Style} className="pulse-glow-bg" />
      <div style={glow2Style} className="pulse-glow-bg" />

      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <div ref={heroTitleRef} style={heroHeaderStyle}>
          <div style={badgeContainerStyle} className="glass-panel">
            <span style={badgeIconStyle}>✨</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "700" }}>The Pattern Prep System</span>
          </div>
          <h1 style={heroTitleStyle}>
            Master Coding Interviews <br />
            <span className="gradient-text-indigo-cyan">One Pattern At A Time</span>
          </h1>
        </div>

        <p ref={heroSubtitleRef} style={heroSubtitleStyle}>
          CodeCrack teaches you how to identify patterns, optimize time/space complexity, and build interview confidence rather than memorizing individual solutions.
        </p>

        <div ref={heroCtaRef} style={ctaGroupStyle}>
          <button onClick={() => navigate("/problems")} className="btn-primary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
            Start Practicing <ArrowRight size={18} />
          </button>
          <button onClick={() => navigate("/roadmap")} className="btn-secondary" style={{ padding: "14px 28px", fontSize: "1rem" }}>
            View Topic Roadmaps
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section style={sectionStyle}>
        <div ref={statsRef} style={statsGridStyle}>
          <div style={statCardStyle} className="glass-panel">
            <span style={statNumberStyle} className="gradient-text-indigo-cyan">{totalQuestions}</span>
            <span style={statLabelStyle}>Curated Questions</span>
          </div>
          <div style={statCardStyle} className="glass-panel">
            <span style={statNumberStyle} className="gradient-text-indigo-cyan">16</span>
            <span style={statLabelStyle}>Top Companies Mapped</span>
          </div>
          <div style={statCardStyle} className="glass-panel">
            <span style={statNumberStyle} className="gradient-text-indigo-cyan">8</span>
            <span style={statLabelStyle}>Core Coding Patterns</span>
          </div>
          <div style={statCardStyle} className="glass-panel">
            <span style={statNumberStyle} className="gradient-text-indigo-cyan">19</span>
            <span style={statLabelStyle}>Topic Categories</span>
          </div>
        </div>
      </section>

      {/* Why CodeCrack Section */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Why Prepare with CodeCrack?</h2>
          <p style={sectionSubtitleStyle}>Ditch the gridlock of random solving and focus on what tech interviewers actually evaluate.</p>
        </div>

        <div ref={featuresRef} style={featuresGridStyle}>
          {whyChooseUs.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} style={featureCardStyle} className="glass-panel">
                <div style={featureIconWrapperStyle}>
                  <Icon size={24} color="var(--secondary)" />
                </div>
                <h3 style={featureTitleStyle}>{feat.title}</h3>
                <p style={featureDescStyle}>{feat.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Roadmaps Explorer Banner */}
      <section style={trackBannerSectionStyle} className="glass-panel">
        <div style={bannerContentStyle}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "12px" }}>Curated Roadmaps</h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: "600px", marginBottom: "24px", lineHeight: "1.6" }}>
            Select from the most popular interview lists globally. Each list is fully mapped to filters, tracking, and revision options.
          </p>
          <div style={tracksGridStyle}>
            <div style={trackCardStyle} className="glass-panel" onClick={() => navigate("/problems?track=blind75")}>
              <h4 style={{ fontWeight: "700", color: "var(--secondary)" }}>Blind 75</h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>The legendary 75 questions to build coding patterns.</p>
            </div>
            <div style={trackCardStyle} className="glass-panel" onClick={() => navigate("/problems?track=neetcode150")}>
              <h4 style={{ fontWeight: "700", color: "var(--primary)" }}>NeetCode 150</h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>An expanded list for deep algorithm coverage.</p>
            </div>
            <div style={trackCardStyle} className="glass-panel" onClick={() => navigate("/problems?track=top150")}>
              <h4 style={{ fontWeight: "700", color: "var(--accent)" }}>Top Interview 150</h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>Classic system structures requested in top roles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Journey Timeline */}
      <section style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Success Preparation Journey</h2>
          <p style={sectionSubtitleStyle}>Follow this step-by-step roadmap to go from syntax beginner to master problem solver.</p>
        </div>

        <div ref={timelineRef} style={timelineContainerStyle}>
          {journeySteps.map((step, idx) => (
            <div key={idx} style={timelineStepStyle} className="glass-panel">
              <span style={timelineStepNumStyle} className="gradient-text-indigo-cyan">{step.step}</span>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "8px 0" }}>{step.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Styles
const pageContainerStyle = {
  paddingTop: "100px",
  paddingBottom: "40px",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingLeft: "16px",
  paddingRight: "16px",
  position: "relative"
};

const glow1Style = {
  position: "absolute",
  top: "100px",
  left: "-100px",
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "var(--primary-glow)",
  filter: "blur(120px)",
  zIndex: -1
};

const glow2Style = {
  position: "absolute",
  top: "400px",
  right: "-100px",
  width: "350px",
  height: "350px",
  borderRadius: "50%",
  background: "var(--secondary-glow)",
  filter: "blur(130px)",
  zIndex: -1
};

const heroSectionStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "60px 0 40px 0"
};

const heroHeaderStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px"
};

const badgeContainerStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "6px 14px",
  borderRadius: "30px",
  border: "1px solid var(--border-glass)"
};

const badgeIconStyle = {
  fontSize: "0.9rem"
};

const heroTitleStyle = {
  fontSize: "clamp(2rem, 5vw, 3.5rem)",
  fontWeight: "800",
  lineHeight: "1.1",
  letterSpacing: "-1px"
};

const heroSubtitleStyle = {
  fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
  color: "var(--text-secondary)",
  maxWidth: "750px",
  marginTop: "24px",
  lineHeight: "1.6"
};

const ctaGroupStyle = {
  display: "flex",
  gap: "16px",
  marginTop: "32px",
  flexWrap: "wrap",
  justifyContent: "center"
};

const sectionStyle = {
  marginTop: "80px"
};

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px"
};

const statCardStyle = {
  padding: "24px",
  borderRadius: "16px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px"
};

const statNumberStyle = {
  fontSize: "2.8rem",
  fontWeight: "800",
  fontFamily: "'Space Grotesk', sans-serif"
};

const statLabelStyle = {
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "var(--text-secondary)"
};

const sectionHeaderStyle = {
  textAlign: "center",
  marginBottom: "40px"
};

const sectionTitleStyle = {
  fontSize: "2rem",
  fontWeight: "800",
  marginBottom: "12px"
};

const sectionSubtitleStyle = {
  color: "var(--text-secondary)",
  fontSize: "1rem",
  maxWidth: "600px",
  margin: "0 auto",
  lineHeight: "1.5"
};

const featuresGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "16px"
};

const featureCardStyle = {
  padding: "24px",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "14px",
  height: "100%"
};

const featureIconWrapperStyle = {
  background: "rgba(6, 182, 212, 0.08)",
  borderRadius: "12px",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const featureTitleStyle = {
  fontSize: "1.2rem",
  fontWeight: "700",
  color: "var(--text-primary)"
};

const featureDescStyle = {
  fontSize: "0.88rem",
  color: "var(--text-secondary)",
  lineHeight: "1.6"
};

const trackBannerSectionStyle = {
  marginTop: "80px",
  padding: "40px",
  borderRadius: "24px",
  background: "linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)",
  border: "1px solid rgba(255, 255, 255, 0.06)"
};

const bannerContentStyle = {
  display: "flex",
  flexDirection: "column"
};

const tracksGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginTop: "8px"
};

const trackCardStyle = {
  padding: "20px",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  border: "1px solid var(--border-glass)"
};

const timelineContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px"
};

const timelineStepStyle = {
  padding: "24px",
  borderRadius: "16px",
  position: "relative"
};

const timelineStepNumStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: "2rem",
  fontWeight: "800"
};
