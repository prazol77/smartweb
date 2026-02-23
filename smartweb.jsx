import { useState, useEffect, useRef } from "react";

// ============================================================
// SMARTWEB — AI Website Builder
// Aesthetic: Dark editorial luxury meets brutalist utility
// Fonts: Clash Display + DM Sans
// ============================================================

const TEMPLATES = [
  { id: 1, name: "Startup SaaS", tag: "SaaS", color: "#6EE7B7", preview: "📊", desc: "Convert visitors into paying customers" },
  { id: 2, name: "Personal Portfolio", tag: "Portfolio", color: "#93C5FD", preview: "🎨", desc: "Showcase your work with elegance" },
  { id: 3, name: "Creative Agency", tag: "Agency", color: "#F9A8D4", preview: "✦", desc: "Win clients before they call" },
  { id: 4, name: "Restaurant", tag: "Food", color: "#FCD34D", preview: "🍽", desc: "Make them hungry before they arrive" },
  { id: 5, name: "E-commerce Landing", tag: "Shop", color: "#A78BFA", preview: "🛍", desc: "Drive sales on day one" },
  { id: 6, name: "Fitness Coach", tag: "Health", color: "#6EE7B7", preview: "💪", desc: "Transform visitors into clients" },
  { id: 7, name: "Real Estate", tag: "Property", color: "#FB923C", preview: "🏢", desc: "List, impress, close deals" },
  { id: 8, name: "Consultant", tag: "Business", color: "#60A5FA", preview: "💼", desc: "Position yourself as the expert" },
  { id: 9, name: "Event Landing", tag: "Events", color: "#F472B6", preview: "🎤", desc: "Fill seats and sell tickets" },
  { id: 10, name: "Tech App", tag: "App", color: "#34D399", preview: "⚡", desc: "Launch your app with swagger" },
  { id: 11, name: "Photography", tag: "Creative", color: "#E879F9", preview: "📷", desc: "Let your images do the talking" },
  { id: 12, name: "Online Course", tag: "Education", color: "#FBBF24", preview: "🎓", desc: "Enroll students on autopilot" },
  { id: 13, name: "Crypto Startup", tag: "Web3", color: "#2DD4BF", preview: "◆", desc: "Build trust in a trustless world" },
  { id: 14, name: "AI Product", tag: "AI", color: "#818CF8", preview: "🧠", desc: "Showcase intelligence, convert skeptics" },
  { id: 15, name: "Marketing Agency", tag: "Marketing", color: "#F87171", preview: "🚀", desc: "Prove ROI before hello" },
];

const PRICING = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    features: ["1 website", "SmartWeb branding", "Basic templates", "Community support"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "19",
    period: "month",
    features: ["5 websites", "Custom domain", "AI rewrites (50/mo)", "All 15 templates", "Priority support", "Remove branding"],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "49",
    period: "month",
    features: ["Unlimited websites", "Unlimited AI rewrites", "White-label", "Team collaboration", "API access", "Dedicated support"],
    cta: "Scale Up",
    highlight: false,
  },
];

const STEPS = [
  { num: "01", title: "Pick a Template", desc: "Choose from 15 founder-crafted templates built for conversion." },
  { num: "02", title: "Edit with AI", desc: "Click any section. Rewrite instantly with our AI engine." },
  { num: "03", title: "Publish Live", desc: "One click. Your site goes live on your custom domain." },
];

const TESTIMONIALS = [
  { name: "Aria Chen", role: "Founder, Pulsar SaaS", text: "I built my entire landing page in 22 minutes. Investors were impressed before I even pitched.", avatar: "AC" },
  { name: "Marcus Webb", role: "Creative Director", text: "The AI rewrite feature turned my rough copy into something I'd actually pay a copywriter $2k for.", avatar: "MW" },
  { name: "Sofia Reyes", role: "Fitness Coach", text: "Went from zero to bookings in a single afternoon. SmartWeb pays for itself every month.", avatar: "SR" },
];

const BUILDER_SECTIONS = ["Hero", "About", "Services", "Portfolio", "Pricing", "Contact", "Testimonials", "FAQ"];

const SECTION_CONTENT = {
  Hero: { heading: "Build something people love.", sub: "SmartWeb gives your ideas a home on the internet — in minutes, not months.", cta: "Start building free" },
  About: { heading: "We believe great websites should be accessible to everyone.", sub: "SmartWeb was founded by designers and engineers who were tired of complex tools. We built the builder we always wanted." },
  Services: { heading: "Everything your business needs online.", sub: "From landing pages to full marketing sites — SmartWeb handles it all." },
};

export default function SmartWeb() {
  const [view, setView] = useState("landing"); // landing | dashboard | builder
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("Hero");
  const [editingText, setEditingText] = useState(SECTION_CONTENT.Hero.heading);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTone, setAiTone] = useState("professional");
  const [publishLoading, setPublishLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  const handleAIRewrite = () => {
    setAiLoading(true);
    const rewrites = {
      professional: "Accelerate your digital presence with enterprise-grade website infrastructure.",
      persuasive: "Stop losing customers to competitors with better websites. Build yours in minutes.",
      friendly: "Hey! Building a website doesn't have to be hard. We make it genuinely fun.",
      luxury: "Craft an online presence as refined as your vision. Precision-built for the discerning founder.",
    };
    setTimeout(() => {
      setEditingText(rewrites[aiTone] || rewrites.professional);
      setAiLoading(false);
    }, 1800);
  };

  const handlePublish = () => {
    setPublishLoading(true);
    setTimeout(() => {
      setPublishLoading(false);
      setPublished(true);
    }, 2500);
  };

  const bg = darkMode ? "#0A0A0F" : "#F8F7F4";
  const fg = darkMode ? "#FAFAFA" : "#0A0A0F";
  const card = darkMode ? "#111118" : "#FFFFFF";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const muted = darkMode ? "#666680" : "#888899";
  const accent = "#7C6FFF";
  const accentGlow = "rgba(124,111,255,0.25)";

  const styles = {
    app: { fontFamily: "'DM Sans', sans-serif", background: bg, color: fg, minHeight: "100vh", transition: "background 0.3s, color 0.3s" },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: darkMode ? "rgba(10,10,15,0.85)" : "rgba(248,247,244,0.85)",
      backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2rem", height: "64px",
    },
    logo: { fontFamily: "'Clash Display', 'Georgia', serif", fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.03em", cursor: "pointer", color: fg },
    navLinks: { display: "flex", gap: "2rem", alignItems: "center" },
    navLink: { color: muted, fontSize: "0.875rem", cursor: "pointer", transition: "color 0.2s", background: "none", border: "none", fontFamily: "inherit" },
    btn: {
      background: accent, color: "#fff", border: "none", borderRadius: "8px",
      padding: "0.6rem 1.4rem", fontSize: "0.875rem", fontWeight: 600,
      cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
    },
    btnOutline: {
      background: "transparent", color: fg, border: `1px solid ${border}`,
      borderRadius: "8px", padding: "0.6rem 1.4rem", fontSize: "0.875rem",
      fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
    },
    section: { maxWidth: "1200px", margin: "0 auto", padding: "6rem 2rem" },
    tag: {
      display: "inline-block", background: accentGlow, color: accent,
      fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em",
      textTransform: "uppercase", padding: "0.35rem 0.9rem", borderRadius: "100px",
      marginBottom: "1.5rem",
    },
    h1: { fontFamily: "'Clash Display', 'Georgia', serif", fontSize: "clamp(3rem, 7vw, 6rem)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.04em", margin: "0 0 1.5rem" },
    h2: { fontFamily: "'Clash Display', 'Georgia', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 1rem" },
    h3: { fontFamily: "'Clash Display', 'Georgia', serif", fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 0.5rem" },
    card: { background: card, border: `1px solid ${border}`, borderRadius: "16px", padding: "1.5rem", transition: "all 0.3s" },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" },
    grid4: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" },
    fadeIn: { animation: "fadeUp 0.6s ease forwards", opacity: 0 },
  };

  // ─── VIEWS ────────────────────────────────────────────────

  if (view === "builder") return <BuilderView {...{ darkMode, setDarkMode, setView, activeSection, setActiveSection, editingText, setEditingText, aiLoading, aiTone, setAiTone, handleAIRewrite, publishLoading, published, handlePublish, styles, fg, bg, card, border, muted, accent, accentGlow }} />;

  if (view === "dashboard") return <DashboardView {...{ darkMode, setDarkMode, setView, TEMPLATES, styles, fg, bg, card, border, muted, accent, accentGlow }} />;

  // ─── LANDING PAGE ─────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${accent}; border-radius: 2px; }
        .hover-lift:hover { transform: translateY(-4px) !important; box-shadow: 0 20px 60px rgba(124,111,255,0.2) !important; }
        .nav-link:hover { color: ${fg} !important; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px ${accentGlow}; }
        .btn-outline:hover { background: ${darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} !important; }
        .template-card:hover { border-color: ${accent} !important; transform: translateY(-6px); }
        .section-fade { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .section-fade.visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <div style={styles.app}>
        {/* NAV */}
        <nav style={styles.nav}>
          <div style={styles.logo}>SmartWeb<span style={{ color: accent }}>.</span></div>
          <div style={styles.navLinks}>
            {["Templates", "Pricing", "Features"].map(l => (
              <button key={l} style={styles.navLink} className="nav-link">{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ ...styles.navLink, fontSize: "1.1rem" }}>{darkMode ? "☀️" : "🌙"}</button>
            <button style={{ ...styles.btnOutline }} className="btn-outline">Log in</button>
            <button style={styles.btn} className="btn-primary" onClick={() => setView("dashboard")}>Start free →</button>
          </div>
        </nav>

        {/* HERO */}
        <div ref={heroRef} style={{ paddingTop: "64px", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
          {/* Ambient background */}
          <div style={{ position: "absolute", inset: 0, background: darkMode ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,111,255,0.15) 0%, transparent 70%)" : "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,111,255,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", top: "20%", right: "5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(110,231,183,0.06) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />

          <div style={{ ...styles.section, width: "100%", textAlign: "center", position: "relative" }}>
            <div style={styles.tag}>✦ AI-powered website builder</div>
            <h1 style={styles.h1}>
              Build your website<br />
              <span style={{ background: `linear-gradient(135deg, ${accent} 0%, #A78BFA 50%, #6EE7B7 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                in minutes.
              </span>
            </h1>
            <p style={{ fontSize: "1.25rem", color: muted, maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
              No coding. No designers. No waiting. Pick a template, edit with AI, publish live — before your coffee gets cold.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{ ...styles.btn, padding: "0.9rem 2rem", fontSize: "1rem" }} className="btn-primary" onClick={() => setView("dashboard")}>
                Start building free →
              </button>
              <button style={{ ...styles.btnOutline, padding: "0.9rem 2rem", fontSize: "1rem" }} className="btn-outline">
                ▶ Watch demo
              </button>
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: muted }}>No credit card required · Free forever plan</p>

            {/* Hero mockup */}
            <div style={{ marginTop: "4rem", background: card, border: `1px solid ${border}`, borderRadius: "20px", overflow: "hidden", boxShadow: `0 40px 120px rgba(0,0,0,0.4)`, animation: "float 10s ease-in-out infinite" }}>
              <div style={{ background: darkMode ? "#1A1A2E" : "#F0EEF8", padding: "0.75rem 1rem", display: "flex", gap: "0.4rem", alignItems: "center", borderBottom: `1px solid ${border}` }}>
                {["#FF5F57","#FFBD2E","#28CA41"].map(c => <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />)}
                <div style={{ margin: "0 auto", background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", borderRadius: "6px", padding: "0.2rem 1rem", fontSize: "0.7rem", color: muted }}>
                  mysite.smartweb.io
                </div>
              </div>
              <div style={{ padding: "3rem 2rem", textAlign: "left", background: darkMode ? "linear-gradient(180deg, #0D0D1A 0%, #111118 100%)" : "linear-gradient(180deg, #FAFAFE 0%, #F0EEF8 100%)" }}>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {["🏠 Home","About","Services","Contact"].map(t => <div key={t} style={{ fontSize: "0.7rem", color: muted, padding: "0.2rem 0.6rem", background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", borderRadius: "4px" }}>{t}</div>)}
                </div>
                <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "0.75rem", color: fg }}>
                  We Build Digital<br /><span style={{ color: accent }}>Experiences.</span>
                </div>
                <div style={{ fontSize: "0.85rem", color: muted, marginBottom: "1.5rem", maxWidth: "400px" }}>Award-winning design studio helping startups scale through exceptional digital products.</div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <div style={{ background: accent, color: "#fff", padding: "0.5rem 1.2rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 600 }}>Get Started →</div>
                  <div style={{ border: `1px solid ${border}`, padding: "0.5rem 1.2rem", borderRadius: "6px", fontSize: "0.75rem", color: muted }}>View Work</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how" data-animate className="section-fade" style={{ ...styles.section, borderTop: `1px solid ${border}` }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={styles.tag}>How it works</div>
            <h2 style={styles.h2}>Three steps. One live website.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: border }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ ...styles.card, borderRadius: 0, border: "none", padding: "2.5rem 2rem" }}>
                <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "4rem", fontWeight: 700, color: accent, opacity: 0.3, marginBottom: "1rem", lineHeight: 1 }}>{s.num}</div>
                <h3 style={styles.h3}>{s.title}</h3>
                <p style={{ color: muted, lineHeight: 1.6, marginTop: "0.5rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TEMPLATES */}
        <div id="templates" data-animate className="section-fade" style={{ ...styles.section }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={styles.tag}>15 Templates</div>
            <h2 style={styles.h2}>Find your perfect starting point.</h2>
            <p style={{ color: muted, maxWidth: "480px", margin: "1rem auto 0", lineHeight: 1.6 }}>Every template is built for conversion — not just aesthetics.</p>
          </div>
          <div style={styles.grid4}>
            {TEMPLATES.map((t) => (
              <div key={t.id} className="template-card hover-lift" style={{ ...styles.card, cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
                onClick={() => { setSelectedTemplate(t); setView("dashboard"); }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: t.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "0.75rem" }}>{t.preview}</div>
                <div style={{ fontSize: "0.65rem", color: t.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>{t.tag}</div>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.35rem" }}>{t.name}</div>
                <div style={{ fontSize: "0.78rem", color: muted, lineHeight: 1.5 }}>{t.desc}</div>
                <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: `radial-gradient(circle at top right, ${t.color}11, transparent)` }} />
              </div>
            ))}
          </div>
        </div>

        {/* AI FEATURES */}
        <div id="features" data-animate className="section-fade" style={{ ...styles.section }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div style={styles.tag}>AI Rewrite</div>
              <h2 style={styles.h2}>Your words, upgraded instantly.</h2>
              <p style={{ color: muted, lineHeight: 1.7, margin: "1.5rem 0 2rem" }}>
                Click any section. Choose a tone. Watch our AI transform your rough ideas into polished, conversion-focused copy in seconds.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["✦ Professional & authoritative","✦ Persuasive & conversion-focused","✦ Warm & friendly","✦ Luxury & refined"].map(f => (
                  <div key={f} style={{ fontSize: "0.9rem", color: muted }}>{f}</div>
                ))}
              </div>
            </div>
            <div style={{ ...styles.card, padding: "2rem" }}>
              <div style={{ fontSize: "0.75rem", color: muted, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>AI Rewrite Panel</div>
              <div style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${border}`, borderRadius: "8px", padding: "1rem", marginBottom: "1rem", fontSize: "0.85rem", lineHeight: 1.6, color: muted }}>
                "we make websites and stuff for businesses that need a web presence online"
              </div>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                {["Professional","Persuasive","Friendly","Luxury"].map(t => (
                  <div key={t} style={{ padding: "0.3rem 0.75rem", borderRadius: "100px", border: `1px solid ${t === "Professional" ? accent : border}`, background: t === "Professional" ? accentGlow : "transparent", fontSize: "0.75rem", color: t === "Professional" ? accent : muted, cursor: "pointer" }}>{t}</div>
                ))}
              </div>
              <div style={{ background: darkMode ? "rgba(124,111,255,0.08)" : "rgba(124,111,255,0.05)", border: `1px solid ${accentGlow}`, borderRadius: "8px", padding: "1rem", fontSize: "0.85rem", lineHeight: 1.6, color: fg }}>
                "We craft exceptional digital experiences that help forward-thinking businesses establish powerful online presences and drive measurable growth."
              </div>
              <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: accent }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, animation: "pulse 2s infinite" }} />
                Rewritten in 1.3 seconds
              </div>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div id="pricing" data-animate className="section-fade" style={{ ...styles.section }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={styles.tag}>Pricing</div>
            <h2 style={styles.h2}>Start free. Scale when ready.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
            {PRICING.map((p, i) => (
              <div key={i} className="hover-lift" style={{
                ...styles.card, transition: "all 0.3s",
                border: p.highlight ? `1px solid ${accent}` : `1px solid ${border}`,
                background: p.highlight ? (darkMode ? "linear-gradient(135deg, #111118 0%, #1A1530 100%)" : "linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)") : card,
                position: "relative", overflow: "hidden",
              }}>
                {p.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, ${accent}, #A78BFA, #6EE7B7)` }} />}
                {p.highlight && <div style={{ position: "absolute", top: "1rem", right: "1rem", background: accentGlow, color: accent, fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.5rem", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Popular</div>}
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: muted, marginBottom: "1rem" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.04em" }}>${p.price}</span>
                  {p.price !== "0" && <span style={{ color: muted, fontSize: "0.85rem" }}>/{p.period}</span>}
                </div>
                {p.price === "0" && <div style={{ color: muted, fontSize: "0.85rem", marginBottom: "1.5rem" }}>Free forever</div>}
                <div style={{ height: "1px", background: border, margin: "1.5rem 0" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "2rem" }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: muted }}>
                      <span style={{ color: accent, flexShrink: 0 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <button style={{ ...styles.btn, width: "100%", background: p.highlight ? accent : "transparent", border: p.highlight ? "none" : `1px solid ${border}`, color: p.highlight ? "#fff" : fg }}
                  className="btn-primary" onClick={() => setView("dashboard")}>
                  {p.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div data-animate className="section-fade" style={{ ...styles.section }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={styles.tag}>Testimonials</div>
            <h2 style={styles.h2}>Loved by founders.</h2>
          </div>
          <div style={styles.grid3}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="hover-lift" style={{ ...styles.card, transition: "all 0.3s" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "1rem", color: accent }}>❝</div>
                <p style={{ color: fg, lineHeight: 1.7, fontSize: "0.9rem", marginBottom: "1.5rem" }}>{t.text}</p>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #A78BFA)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{t.name}</div>
                    <div style={{ color: muted, fontSize: "0.75rem" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div data-animate className="section-fade" style={{ ...styles.section, textAlign: "center" }}>
          <div style={{ background: `linear-gradient(135deg, ${darkMode ? "#111118" : "#F5F3FF"} 0%, ${darkMode ? "#1A1530" : "#EDE9FE"} 100%)`, border: `1px solid ${border}`, borderRadius: "24px", padding: "5rem 2rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 50% 100%, ${accentGlow}, transparent)` }} />
            <div style={{ position: "relative" }}>
              <div style={styles.tag}>Get started today</div>
              <h2 style={{ ...styles.h2, fontSize: "clamp(2rem, 5vw, 4rem)" }}>Your website is waiting.<br />Build it now.</h2>
              <p style={{ color: muted, marginBottom: "2.5rem", maxWidth: "400px", margin: "1rem auto 2.5rem", lineHeight: 1.6 }}>
                Join 10,000+ founders who launched with SmartWeb.
              </p>
              <button style={{ ...styles.btn, padding: "1rem 2.5rem", fontSize: "1.05rem" }} className="btn-primary" onClick={() => setView("dashboard")}>
                Start building free — it's fast →
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: `1px solid ${border}`, padding: "3rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div style={styles.logo}>SmartWeb<span style={{ color: accent }}>.</span></div>
            <div style={{ display: "flex", gap: "2rem" }}>
              {["Templates", "Pricing", "Privacy", "Terms"].map(l => (
                <span key={l} style={{ color: muted, fontSize: "0.8rem", cursor: "pointer" }}>{l}</span>
              ))}
            </div>
            <div style={{ color: muted, fontSize: "0.8rem" }}>© 2025 SmartWeb. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </>
  );
}

// ─── DASHBOARD VIEW ────────────────────────────────────────
function DashboardView({ darkMode, setDarkMode, setView, TEMPLATES, styles, fg, bg, card, border, muted, accent, accentGlow }) {
  const [activeTab, setActiveTab] = useState("websites");
  const sideItems = [
    { id: "websites", label: "My Websites", icon: "🌐" },
    { id: "templates", label: "Templates", icon: "🎨" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const myWebsites = [
    { name: "Acme Agency", url: "acme.smartweb.io", status: "live", template: "Agency", updated: "2h ago" },
    { name: "My Portfolio", url: "portfolio.smartweb.io", status: "draft", template: "Personal Portfolio", updated: "Yesterday" },
  ];

  return (
    <>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'); ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: ${accent}; border-radius: 2px; } .side-item:hover { background: rgba(124,111,255,0.08) !important; color: ${fg} !important; } .card-hover:hover { border-color: ${accent} !important; transform: translateY(-2px); } `}</style>
      <div style={{ ...styles.app, display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: "240px", flexShrink: 0, background: card, borderRight: `1px solid ${border}`, display: "flex", flexDirection: "column", padding: "1.5rem 0" }}>
          <div style={{ padding: "0 1.25rem 1.5rem", borderBottom: `1px solid ${border}` }}>
            <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.03em", cursor: "pointer", color: fg }} onClick={() => setView("landing")}>
              SmartWeb<span style={{ color: accent }}>.</span>
            </div>
          </div>
          <nav style={{ flex: 1, padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {sideItems.map(item => (
              <button key={item.id} className="side-item" onClick={() => setActiveTab(item.id)} style={{
                display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0.75rem",
                borderRadius: "8px", border: "none", background: activeTab === item.id ? accentGlow : "transparent",
                color: activeTab === item.id ? accent : muted, fontSize: "0.875rem", fontWeight: 500,
                cursor: "pointer", width: "100%", textAlign: "left", fontFamily: "inherit", transition: "all 0.2s",
              }}>
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "1rem 0.75rem", borderTop: `1px solid ${border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.75rem" }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #A78BFA)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: "#fff" }}>JD</div>
              <div><div style={{ fontSize: "0.8rem", fontWeight: 600 }}>Jane Doe</div><div style={{ fontSize: "0.7rem", color: muted }}>Free Plan</div></div>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem", borderRadius: "8px", border: `1px solid ${border}`, background: "transparent", color: muted, fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit" }}>
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflow: "auto", padding: "2rem" }}>
          {activeTab === "websites" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div><h2 style={{ ...styles.h3, fontSize: "1.5rem" }}>My Websites</h2><p style={{ color: muted, fontSize: "0.85rem", marginTop: "0.25rem" }}>Manage and publish your sites</p></div>
                <button style={styles.btn} className="btn-primary" onClick={() => setActiveTab("templates")}>+ Create New</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
                {myWebsites.map((site, i) => (
                  <div key={i} className="card-hover" style={{ ...styles.card, cursor: "pointer", transition: "all 0.25s" }}>
                    <div style={{ height: "140px", background: `linear-gradient(135deg, ${accent}11, #A78BFA11)`, borderRadius: "8px", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", border: `1px solid ${border}` }}>🌐</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>{site.name}</div>
                        <div style={{ fontSize: "0.75rem", color: muted }}>{site.url}</div>
                      </div>
                      <div style={{ padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", background: site.status === "live" ? "rgba(110,231,183,0.15)" : "rgba(255,189,46,0.15)", color: site.status === "live" ? "#6EE7B7" : "#FFBD2E" }}>{site.status}</div>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                      <button style={{ ...styles.btn, flex: 1, padding: "0.5rem", fontSize: "0.78rem" }} onClick={() => setView("builder")}>Edit →</button>
                      <button style={{ ...styles.btnOutline, padding: "0.5rem 0.75rem", fontSize: "0.78rem" }}>↗</button>
                    </div>
                  </div>
                ))}
                <div className="card-hover" style={{ ...styles.card, cursor: "pointer", transition: "all 0.25s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "250px", border: `2px dashed ${border}` }} onClick={() => setActiveTab("templates")}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem", opacity: 0.4 }}>+</div>
                  <div style={{ fontWeight: 600, color: muted, fontSize: "0.9rem" }}>Create new website</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "templates" && (
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ ...styles.h3, fontSize: "1.5rem" }}>Templates</h2>
                <p style={{ color: muted, fontSize: "0.85rem", marginTop: "0.25rem" }}>Choose your starting point</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
                {TEMPLATES.map((t) => (
                  <div key={t.id} className="card-hover" style={{ ...styles.card, cursor: "pointer", transition: "all 0.3s" }} onClick={() => setView("builder")}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: t.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "0.75rem" }}>{t.preview}</div>
                    <div style={{ fontSize: "0.6rem", color: t.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>{t.tag}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.25rem" }}>{t.name}</div>
                    <div style={{ fontSize: "0.72rem", color: muted, lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div style={{ maxWidth: "700px" }}>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ ...styles.h3, fontSize: "1.5rem" }}>Billing</h2>
                <p style={{ color: muted, fontSize: "0.85rem", marginTop: "0.25rem" }}>Manage your subscription</p>
              </div>
              <div style={{ ...styles.card, marginBottom: "1.5rem", border: `1px solid ${accent}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div><div style={{ fontSize: "0.75rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Current Plan</div>
                    <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "1.75rem", fontWeight: 700 }}>Free</div>
                  </div>
                  <button style={styles.btn}>Upgrade to Pro →</button>
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "2rem" }}>
                  {[["Websites", "1/1"],["AI Rewrites", "0/0"],["Storage", "500MB"]].map(([k,v]) => (
                    <div key={k}><div style={{ fontSize: "0.75rem", color: muted }}>{k}</div><div style={{ fontWeight: 600, marginTop: "0.2rem" }}>{v}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ ...styles.card }}>
                <div style={{ fontWeight: 600, marginBottom: "1rem" }}>Upgrade to Pro — $19/month</div>
                {["5 websites","Custom domain","50 AI rewrites/month","Priority support","Remove SmartWeb branding"].map(f => (
                  <div key={f} style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", color: muted, marginBottom: "0.5rem" }}><span style={{ color: accent }}>✓</span>{f}</div>
                ))}
                <button style={{ ...styles.btn, marginTop: "1.25rem", width: "100%" }}>Upgrade with Stripe →</button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div style={{ maxWidth: "600px" }}>
              <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ ...styles.h3, fontSize: "1.5rem" }}>Settings</h2>
              </div>
              {[["Full Name","Jane Doe","text"],["Email","jane@example.com","email"],["Custom Domain","mysite.com","text"]].map(([label, val, type]) => (
                <div key={label} style={{ ...styles.card, marginBottom: "1rem" }}>
                  <label style={{ fontSize: "0.8rem", color: muted, display: "block", marginBottom: "0.5rem" }}>{label}</label>
                  <input defaultValue={val} type={type} style={{ background: "transparent", border: `1px solid ${border}`, borderRadius: "6px", padding: "0.6rem 0.75rem", color: fg, fontSize: "0.9rem", width: "100%", outline: "none", fontFamily: "inherit" }} />
                </div>
              ))}
              <button style={styles.btn}>Save Changes</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── BUILDER VIEW ──────────────────────────────────────────
function BuilderView({ darkMode, setDarkMode, setView, activeSection, setActiveSection, editingText, setEditingText, aiLoading, aiTone, setAiTone, handleAIRewrite, publishLoading, published, handlePublish, styles, fg, bg, card, border, muted, accent, accentGlow }) {
  const BUILDER_SECTIONS = ["Hero", "About", "Services", "Portfolio", "Pricing", "Contact"];

  return (
    <>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap'); @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } @keyframes shimmer { 0% { left: -100%; } 100% { left: 100%; } } ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: ${accent}; border-radius: 2px; } textarea:focus { outline: 2px solid ${accent} !important; } `}</style>
      <div style={{ ...styles.app, display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Builder Nav */}
        <div style={{ height: "52px", background: card, borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", padding: "0 1rem", gap: "1rem", flexShrink: 0 }}>
          <button onClick={() => setView("dashboard")} style={{ background: "none", border: "none", color: muted, cursor: "pointer", fontSize: "1rem" }}>←</button>
          <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "1rem", fontWeight: 700, color: fg }}>SmartWeb<span style={{ color: accent }}>.</span></div>
          <div style={{ fontSize: "0.8rem", color: muted, padding: "0.2rem 0.6rem", background: `rgba(110,231,183,0.15)`, color: "#6EE7B7", borderRadius: "4px", fontWeight: 600 }}>● Live Preview</div>
          <div style={{ flex: 1 }} />
          <button onClick={() => setDarkMode(!darkMode)} style={{ background: "none", border: "none", color: muted, cursor: "pointer", fontSize: "0.85rem" }}>{darkMode ? "☀️" : "🌙"}</button>
          {published ? (
            <div style={{ padding: "0.4rem 1rem", borderRadius: "6px", background: "rgba(110,231,183,0.15)", color: "#6EE7B7", fontSize: "0.8rem", fontWeight: 600 }}>✓ Published!</div>
          ) : (
            <button style={{ ...styles.btn, padding: "0.4rem 1.2rem", fontSize: "0.82rem", opacity: publishLoading ? 0.7 : 1, position: "relative", overflow: "hidden" }} onClick={handlePublish}>
              {publishLoading ? <span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> : "Publish →"}
            </button>
          )}
        </div>

        {/* Builder Body */}
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "220px 1fr 260px", overflow: "hidden" }}>
          {/* Left Panel */}
          <div style={{ background: card, borderRight: `1px solid ${border}`, overflow: "auto", padding: "1rem" }}>
            <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Sections</div>
            {BUILDER_SECTIONS.map((s) => (
              <button key={s} onClick={() => setActiveSection(s)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", padding: "0.6rem 0.75rem", borderRadius: "8px", border: "none",
                background: activeSection === s ? accentGlow : "transparent",
                color: activeSection === s ? accent : muted, fontSize: "0.85rem", cursor: "pointer",
                fontFamily: "inherit", marginBottom: "0.25rem", transition: "all 0.2s",
              }}>
                <span>{s}</span>
                {activeSection === s && <span style={{ fontSize: "0.6rem" }}>✎</span>}
              </button>
            ))}

            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Content</div>
              <textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                style={{ width: "100%", background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${border}`, borderRadius: "8px", padding: "0.75rem", color: fg, fontSize: "0.78rem", lineHeight: 1.6, resize: "vertical", minHeight: "90px", fontFamily: "inherit" }}
              />
            </div>

            <div style={{ marginTop: "1.25rem" }}>
              <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>AI Rewrite</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginBottom: "0.75rem" }}>
                {["professional", "persuasive", "friendly", "luxury"].map((t) => (
                  <button key={t} onClick={() => { }} style={{ padding: "0.35rem 0.6rem", borderRadius: "6px", border: `1px solid ${aiTone === t ? accent : border}`, background: aiTone === t ? accentGlow : "transparent", color: aiTone === t ? accent : muted, fontSize: "0.72rem", cursor: "pointer", textAlign: "left", fontFamily: "inherit", textTransform: "capitalize" }} onClick={() => setAiTone(t)}>{t}</button>
                ))}
              </div>
              <button style={{ ...styles.btn, width: "100%", padding: "0.55rem", fontSize: "0.78rem", opacity: aiLoading ? 0.7 : 1 }} onClick={handleAIRewrite}>
                {aiLoading ? "✦ Rewriting..." : "✦ Rewrite with AI"}
              </button>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Theme</div>
              {[["#7C6FFF","Violet"],["#6EE7B7","Mint"],["#F472B6","Rose"],["#FBBF24","Amber"]].map(([c,name]) => (
                <button key={c} style={{ width: "24px", height: "24px", borderRadius: "50%", background: c, border: c === accent ? "2px solid #fff" : "2px solid transparent", marginRight: "0.4rem", cursor: "pointer" }} title={name} />
              ))}
            </div>
          </div>

          {/* Center Preview */}
          <div style={{ overflow: "auto", background: darkMode ? "#06060F" : "#F0EEF8", display: "flex", justifyContent: "center", padding: "2rem" }}>
            <div style={{ width: "100%", maxWidth: "800px", background: card, borderRadius: "16px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", border: `1px solid ${border}` }}>
              <div style={{ background: darkMode ? "#1A1A2E" : "#E8E6F0", padding: "0.6rem 1rem", display: "flex", gap: "0.35rem", alignItems: "center" }}>
                {["#FF5F57","#FFBD2E","#28CA41"].map(c => <div key={c} style={{ width: "9px", height: "9px", borderRadius: "50%", background: c }} />)}
                <div style={{ margin: "0 auto", background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", borderRadius: "4px", padding: "0.15rem 1rem", fontSize: "0.65rem", color: muted }}>mysite.smartweb.io</div>
              </div>
              {/* Fake nav */}
              <div style={{ padding: "0.75rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${border}` }}>
                <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontWeight: 700, fontSize: "1rem" }}>Acme<span style={{ color: accent }}>.</span></div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  {["Work","About","Contact"].map(n => <div key={n} style={{ fontSize: "0.72rem", color: muted, cursor: "pointer" }}>{n}</div>)}
                </div>
                <div style={{ background: accent, color: "#fff", padding: "0.3rem 0.75rem", borderRadius: "4px", fontSize: "0.7rem", fontWeight: 600 }}>Let's Talk</div>
              </div>
              {/* Active section content */}
              <div style={{ padding: "3rem 2.5rem" }}>
                {activeSection === "Hero" && (
                  <div>
                    <div style={{ fontSize: "0.7rem", color: accent, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1rem" }}>✦ Award-winning studio</div>
                    <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1rem", transition: "all 0.5s" }}>{editingText || "Build something people love."}</div>
                    <div style={{ color: muted, fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "480px", marginBottom: "1.5rem" }}>We craft exceptional digital experiences that help forward-thinking businesses establish powerful online presences.</div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <div style={{ background: accent, color: "#fff", padding: "0.6rem 1.4rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 600 }}>Start Project →</div>
                      <div style={{ border: `1px solid ${border}`, padding: "0.6rem 1.4rem", borderRadius: "6px", fontSize: "0.8rem", color: muted }}>See Our Work</div>
                    </div>
                  </div>
                )}
                {activeSection !== "Hero" && (
                  <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                      {activeSection === "About" ? "🏢" : activeSection === "Services" ? "⚡" : activeSection === "Portfolio" ? "🎨" : activeSection === "Pricing" ? "💳" : "✉️"}
                    </div>
                    <div style={{ fontFamily: "'Clash Display','Georgia',serif", fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>{activeSection} Section</div>
                    <div style={{ color: muted, fontSize: "0.85rem" }}>Click to edit this section's content in the left panel.</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div style={{ background: card, borderLeft: `1px solid ${border}`, overflow: "auto", padding: "1.25rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>SEO</div>
              {[["Page Title","My Agency — Web Design"], ["Meta Description","Award-winning web design..."], ["Keywords","web design, agency"]].map(([label, placeholder]) => (
                <div key={label} style={{ marginBottom: "0.75rem" }}>
                  <div style={{ fontSize: "0.72rem", color: muted, marginBottom: "0.3rem" }}>{label}</div>
                  <input defaultValue={placeholder} style={{ width: "100%", background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${border}`, borderRadius: "6px", padding: "0.5rem 0.6rem", color: fg, fontSize: "0.75rem", fontFamily: "inherit" }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Domain</div>
              <div style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${border}`, borderRadius: "6px", padding: "0.5rem 0.6rem", fontSize: "0.75rem", color: muted }}>mysite.smartweb.io</div>
              <button style={{ ...styles.btnOutline, width: "100%", marginTop: "0.5rem", padding: "0.4rem", fontSize: "0.72rem" }}>+ Connect custom domain</button>
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Analytics</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {[["Views","1,240"],["Clicks","87"],["CTR","7%"],["Bounce","42%"]].map(([k,v]) => (
                  <div key={k} style={{ background: darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", border: `1px solid ${border}`, borderRadius: "8px", padding: "0.6rem" }}>
                    <div style={{ fontSize: "0.6rem", color: muted }}>{k}</div>
                    <div style={{ fontWeight: 700, fontSize: "1rem", marginTop: "0.1rem" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", color: muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Publish</div>
              {published ? (
                <div style={{ padding: "1rem", background: "rgba(110,231,183,0.1)", border: "1px solid rgba(110,231,183,0.3)", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🎉</div>
                  <div style={{ color: "#6EE7B7", fontWeight: 600, fontSize: "0.85rem" }}>Site is live!</div>
                  <div style={{ color: muted, fontSize: "0.72rem", marginTop: "0.25rem" }}>mysite.smartweb.io</div>
                </div>
              ) : (
                <button style={{ ...styles.btn, width: "100%", opacity: publishLoading ? 0.7 : 1 }} onClick={handlePublish}>
                  {publishLoading ? "Publishing..." : "🚀 Publish Site"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
