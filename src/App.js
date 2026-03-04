import { useState, useEffect, useRef } from "react";

// ─── SAMPLE DATA ───────────────────────────────────────────────────────────────
const INVESTORS = [
  {
    id: 1, name: "Elad Gil", photo: "EG", firm: "Color Genomics / Independent", title: "Angel Investor & Operator",
    location: "San Francisco, CA", sectors: ["AI","Biotech","SaaS","Fintech"], stage: ["Seed","Series A","Series B"],
    cheque: "$500K–$5M", equity: "2–8%", email: "elad@eladgil.com", linkedin: "linkedin.com/in/eladgil",
    website: "blog.eladgil.com", portfolio: ["Airbnb","Stripe","Square","Coinbase","Pinterest","Instacart"],
    bio: "Serial entrepreneur and investor. Former VP at Twitter, co-founder of Color. Backed 40+ unicorns.",
    recentInvestments: ["Anyscale","Scale AI","Figma"], lastActivity: "2 hours ago", isNew: true, trending: true,
    gradient: "from-violet-600 to-indigo-500", initials: "EG"
  },
  {
    id: 2, name: "Pejman Nozad", photo: "PN", firm: "Pear VC", title: "Founding Managing Partner",
    location: "Palo Alto, CA", sectors: ["SaaS","Consumer","Enterprise","AI"], stage: ["Pre-seed","Seed"],
    cheque: "$250K–$2M", equity: "5–12%", email: "pejman@pear.vc", linkedin: "linkedin.com/in/pejman",
    website: "pear.vc", portfolio: ["DoorDash","Guardant Health","Branch","Gusto"],
    bio: "From selling rugs in Tehran to backing billion-dollar companies. Known for early-stage conviction bets.",
    recentInvestments: ["Deel","WorkOS","Rippling"], lastActivity: "5 hours ago", isNew: true, trending: false,
    gradient: "from-blue-600 to-cyan-500", initials: "PN"
  },
  {
    id: 3, name: "Aileen Lee", photo: "AL", firm: "Cowboy Ventures", title: "Founder & Managing Partner",
    location: "Palo Alto, CA", sectors: ["Consumer","SaaS","Marketplace","Fintech"], stage: ["Seed","Series A"],
    cheque: "$1M–$5M", equity: "8–15%", email: "aileen@cowboy.vc", linkedin: "linkedin.com/in/aileenlee",
    website: "cowboy.vc", portfolio: ["Dollar Shave Club","Rent the Runway","The RealReal"],
    bio: "Coined the term 'unicorn'. Former Kleiner Perkins partner. Focuses on cultural shifts in consumer behavior.",
    recentInvestments: ["Superhuman","Calm","Figma"], lastActivity: "1 day ago", isNew: false, trending: true,
    gradient: "from-pink-600 to-rose-500", initials: "AL"
  },
  {
    id: 4, name: "Naval Ravikant", photo: "NR", firm: "AngelList", title: "Co-founder & Angel Investor",
    location: "San Francisco, CA", sectors: ["Crypto","AI","Consumer","Philosophy"], stage: ["Pre-seed","Seed"],
    cheque: "$25K–$500K", equity: "1–5%", email: "naval@angel.co", linkedin: "linkedin.com/in/navalr",
    website: "nav.al", portfolio: ["Twitter","Uber","Yammer","Postmates","Wish"],
    bio: "Philosopher-investor. Built AngelList, democratizing startup investing. Known for wisdom on wealth & happiness.",
    recentInvestments: ["OpenAI","Solana","Figma"], lastActivity: "3 hours ago", isNew: false, trending: true,
    gradient: "from-amber-600 to-orange-500", initials: "NR"
  },
  {
    id: 5, name: "Rashmi Kwatra", photo: "RK", firm: "Sixteenth Street Capital", title: "Founder & GP",
    location: "Mumbai, India", sectors: ["Fintech","Consumer","SaaS","Edtech"], stage: ["Pre-seed","Seed"],
    cheque: "$100K–$1M", equity: "5–10%", email: "rashmi@16thst.vc", linkedin: "linkedin.com/in/rashmikwatra",
    website: "16thst.vc", portfolio: ["Razorpay","CRED","Meesho","Slice"],
    bio: "Leading Southeast Asia & India early-stage bets. Ex-Goldman Sachs. Deep network in emerging markets.",
    recentInvestments: ["Setu","Khatabook","BharatPe"], lastActivity: "6 hours ago", isNew: true, trending: false,
    gradient: "from-emerald-600 to-teal-500", initials: "RK"
  },
  {
    id: 6, name: "Brad Feld", photo: "BF", firm: "Foundry Group", title: "Co-founder & Managing Director",
    location: "Boulder, CO", sectors: ["SaaS","Developer Tools","Marketplace"], stage: ["Seed","Series A","Series B"],
    cheque: "$500K–$10M", equity: "10–20%", email: "brad@foundrygroup.com", linkedin: "linkedin.com/in/bfeld",
    website: "feld.com", portfolio: ["Fitbit","MakerBot","Sendgrid","Zynga"],
    bio: "Author of 'Startup Communities'. Builder of the Boulder startup ecosystem. 30 years in VC.",
    recentInvestments: ["Lob","Datalogix","Craftsy"], lastActivity: "2 days ago", isNew: false, trending: false,
    gradient: "from-sky-600 to-blue-500", initials: "BF"
  },
  {
    id: 7, name: "Kirsten Green", photo: "KG", firm: "Forerunner Ventures", title: "Founder & Managing Partner",
    location: "San Francisco, CA", sectors: ["Consumer","Retail","Marketplace","DTC"], stage: ["Seed","Series A"],
    cheque: "$1M–$8M", equity: "10–18%", email: "kirsten@forerunnerventures.com", linkedin: "linkedin.com/in/kirstengreen",
    website: "forerunnerventures.com", portfolio: ["Warby Parker","Dollar Shave Club","Bonobos","Glossier","Chime"],
    bio: "Defining consumer investing for 15 years. Pioneer in DTC and modern commerce. Ex-retail analyst.",
    recentInvestments: ["Oura","Curology","Keeps"], lastActivity: "4 hours ago", isNew: true, trending: true,
    gradient: "from-fuchsia-600 to-purple-500", initials: "KG"
  },
  {
    id: 8, name: "Vinod Khosla", photo: "VK", firm: "Khosla Ventures", title: "Founder",
    location: "Menlo Park, CA", sectors: ["Deeptech","AI","Climate","Healthcare","Energy"], stage: ["Seed","Series A","Series B"],
    cheque: "$1M–$20M", equity: "10–25%", email: "vk@khoslaventures.com", linkedin: "linkedin.com/in/vinodkhosla",
    website: "khoslaventures.com", portfolio: ["OpenAI","Square","Stripe","Impossible Foods","DoorDash"],
    bio: "Co-founder of Sun Microsystems. Contrarian bets on science-driven startups. Believes in 10x improvements.",
    recentInvestments: ["Anthropic","Commonwealth Fusion","Epigenomics"], lastActivity: "1 day ago", isNew: false, trending: true,
    gradient: "from-red-600 to-pink-500", initials: "VK"
  },
];

const SECTORS = ["All","AI","Fintech","SaaS","Consumer","Deeptech","Healthcare","Crypto","Edtech","Climate","Biotech"];
const STAGES = ["All","Pre-seed","Seed","Series A","Series B","Series C+"];
const LOCATIONS = ["All","San Francisco","New York","London","Mumbai","Singapore","Berlin","Tel Aviv"];

const STATS = [
  { label: "Total Investors", value: "12,847", change: "+234 this week", icon: "👥", color: "from-violet-500 to-indigo-600" },
  { label: "New Today", value: "47", change: "+12 vs yesterday", icon: "⚡", color: "from-cyan-500 to-blue-600" },
  { label: "Active VCs", value: "3,291", change: "89% response rate", icon: "🔥", color: "from-rose-500 to-pink-600" },
  { label: "Sectors", value: "28", change: "AI leads with 34%", icon: "🎯", color: "from-amber-500 to-orange-600" },
];

const TRENDING_SECTORS = [
  { name: "AI / ML", pct: 78, color: "#818cf8" },
  { name: "Fintech", pct: 62, color: "#22d3ee" },
  { name: "SaaS", pct: 55, color: "#a78bfa" },
  { name: "Climate", pct: 41, color: "#34d399" },
  { name: "Healthcare", pct: 38, color: "#f472b6" },
];

// ─── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    discover: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    investors: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    saved: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
    profile: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    bell: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    filter: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    bookmark: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
    bookmarkFill: <svg width={size} height={size} fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
    link: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,
    mail: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    trend: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    chevron: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>,
    back: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>,
    sun: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
    spark: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    globe: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    plus: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    close: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  };
  return icons[name] || null;
};

// ─── MINI SPARKLINE ─────────────────────────────────────────────────────────────
const Sparkline = ({ data, color = "#818cf8", height = 40 }) => {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = height - ((v - min) / (max - min || 1)) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(" ");
  const area = `0,${height} ${pts} 100,${height}`;
  return (
    <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" style={{ width: "100%", height }}>
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${color.replace("#","")})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ─── BAR CHART ──────────────────────────────────────────────────────────────────
const BarChart = ({ dark }) => {
  const data = [32,45,28,61,44,78,55,82,67,91,74,88];
  const max = Math.max(...data);
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 64, padding: "0 4px" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%", borderRadius: 4,
            height: `${(v / max) * 56}px`,
            background: i === data.length - 1
              ? "linear-gradient(180deg, #818cf8, #6366f1)"
              : dark ? "rgba(129,140,248,0.25)" : "rgba(99,102,241,0.15)",
            transition: "height 0.8s cubic-bezier(.34,1.56,.64,1)",
          }}/>
        </div>
      ))}
    </div>
  );
};

// ─── AVATAR ────────────────────────────────────────────────────────────────────
const Avatar = ({ investor, size = 48 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%", flexShrink: 0,
    background: `linear-gradient(135deg, var(--${investor.gradient.split("-")[1]}-500, #818cf8), var(--${investor.gradient.split("-")[3]}-600, #6366f1))`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, color: "white",
    fontFamily: "'DM Sans', sans-serif",
    boxShadow: "0 4px 12px rgba(99,102,241,0.35)",
  }}>
    {investor.initials}
  </div>
);

// ─── INVESTOR CARD ─────────────────────────────────────────────────────────────
const InvestorCard = ({ investor, dark, onPress, onBookmark, saved }) => (
  <div
    onClick={() => onPress(investor)}
    style={{
      background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
      borderRadius: 20, padding: "16px", marginBottom: 12,
      cursor: "pointer", transition: "all 0.25s ease",
      boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(99,102,241,0.08)",
      position: "relative", overflow: "hidden",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = dark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(99,102,241,0.15)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = dark ? "0 4px 24px rgba(0,0,0,0.3)" : "0 4px 24px rgba(99,102,241,0.08)"; }}
  >
    {/* Gradient accent */}
    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "0 20px 0 80px", background: "linear-gradient(135deg, rgba(129,140,248,0.15), rgba(99,102,241,0.05))", pointerEvents: "none" }}/>

    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      <div style={{ position: "relative" }}>
        <Avatar investor={investor} size={52} />
        {investor.isNew && (
          <div style={{ position: "absolute", bottom: -2, right: -2, background: "#22d3ee", borderRadius: 6, padding: "1px 5px", fontSize: 8, fontWeight: 700, color: "#0c1929", border: "2px solid " + (dark ? "#1a1f2e" : "#fff") }}>NEW</div>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: dark ? "#f1f5f9" : "#0f172a", display: "flex", alignItems: "center", gap: 6 }}>
              {investor.name}
              {investor.trending && <span style={{ fontSize: 10, background: "linear-gradient(90deg,#f59e0b,#ef4444)", color: "#fff", padding: "1px 6px", borderRadius: 6, fontWeight: 700 }}>🔥 HOT</span>}
            </div>
            <div style={{ fontSize: 12, color: dark ? "rgba(148,163,184,0.9)" : "#64748b", marginTop: 1 }}>{investor.title} · {investor.firm}</div>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onBookmark(investor.id); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: saved ? "#818cf8" : (dark ? "rgba(148,163,184,0.5)" : "#94a3b8"), transition: "color 0.2s" }}
          >
            <Icon name={saved ? "bookmarkFill" : "bookmark"} size={18} color="currentColor" />
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
          {investor.sectors.slice(0,3).map(s => (
            <span key={s} style={{ fontSize: 10, fontWeight: 600, color: "#818cf8", background: "rgba(129,140,248,0.12)", padding: "2px 8px", borderRadius: 20, border: "1px solid rgba(129,140,248,0.2)" }}>{s}</span>
          ))}
          {investor.sectors.length > 3 && <span style={{ fontSize: 10, color: dark ? "#64748b" : "#94a3b8" }}>+{investor.sectors.length - 3}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#64748b" }}>📍 {investor.location}</div>
          <div style={{ fontSize: 11, color: dark ? "#94a3b8" : "#64748b" }}>💰 {investor.cheque}</div>
          <div style={{ fontSize: 11, color: dark ? "rgba(148,163,184,0.5)" : "#94a3b8", marginLeft: "auto" }}>{investor.lastActivity}</div>
        </div>
      </div>
    </div>
  </div>
);

// ─── INVESTOR PROFILE ──────────────────────────────────────────────────────────
const InvestorProfile = ({ investor, dark, onBack, saved, onBookmark }) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div style={{ height: "100%", overflowY: "auto", background: dark ? "#0d1117" : "#f8faff" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(160deg, #312e81, #1e1b4b, #0f172a)`, padding: "48px 20px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 0%, rgba(129,140,248,0.25) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "8px 12px", cursor: "pointer", color: "white", display: "flex", alignItems: "center", gap: 4, marginBottom: 24, backdropFilter: "blur(10px)" }}>
          <Icon name="back" size={16} color="white"/> Back
        </button>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: `linear-gradient(135deg, #818cf8, #6366f1)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "white", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 24px rgba(99,102,241,0.5)", border: "3px solid rgba(255,255,255,0.2)" }}>
            {investor.initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 22, color: "white" }}>{investor.name}</h2>
                <div style={{ fontSize: 13, color: "rgba(165,180,252,0.9)", marginTop: 2 }}>{investor.title}</div>
                <div style={{ fontSize: 12, color: "rgba(129,140,248,0.8)", marginTop: 1 }}>{investor.firm}</div>
              </div>
              <button onClick={() => onBookmark(investor.id)} style={{ background: saved ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.1)", border: "1px solid " + (saved ? "rgba(129,140,248,0.5)" : "rgba(255,255,255,0.15)"), borderRadius: 12, padding: 10, cursor: "pointer", color: saved ? "#818cf8" : "white", transition: "all 0.2s" }}>
                <Icon name={saved ? "bookmarkFill" : "bookmark"} size={18} color="currentColor"/>
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {investor.stage.map(s => (
                <span key={s} style={{ fontSize: 10, fontWeight: 700, color: "#a5f3fc", background: "rgba(34,211,238,0.15)", padding: "3px 10px", borderRadius: 20, border: "1px solid rgba(34,211,238,0.25)" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {[["📍", investor.location], ["💰", investor.cheque], ["📊", investor.equity + " equity"]].map(([icon, val]) => (
            <div key={val} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "6px 10px", fontSize: 11, color: "rgba(226,232,240,0.85)", backdropFilter: "blur(10px)" }}>{icon} {val}</div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, padding: "0 20px", marginTop: -1, background: dark ? "#0d1117" : "#f8faff", paddingTop: 16, borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, paddingBottom: 0 }}>
        {["overview","portfolio","contact"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            background: "none", border: "none", cursor: "pointer", padding: "8px 16px 12px",
            fontSize: 13, fontWeight: activeTab === tab ? 700 : 500, fontFamily: "'DM Sans', sans-serif",
            color: activeTab === tab ? "#818cf8" : (dark ? "#64748b" : "#94a3b8"),
            borderBottom: activeTab === tab ? "2px solid #818cf8" : "2px solid transparent",
            transition: "all 0.2s", textTransform: "capitalize"
          }}>{tab}</button>
        ))}
      </div>

      <div style={{ padding: 20 }}>
        {activeTab === "overview" && (
          <>
            <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "white", borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>About</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: dark ? "#cbd5e1" : "#334155" }}>{investor.bio}</p>
            </div>
            <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "white", borderRadius: 16, padding: 16, marginBottom: 16, border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Investment Focus</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {investor.sectors.map(s => (
                  <span key={s} style={{ fontSize: 12, fontWeight: 600, color: "#818cf8", background: "rgba(129,140,248,0.1)", padding: "5px 12px", borderRadius: 20, border: "1px solid rgba(129,140,248,0.2)" }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "white", borderRadius: 16, padding: 16, border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Recent Investments</div>
              {investor.recentInvestments.map(co => (
                <div key={co} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}` }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #818cf8, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>{co[0]}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: dark ? "#e2e8f0" : "#1e293b" }}>{co}</div>
                    <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8" }}>Recent portfolio add</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}><Icon name="chevron" size={14} color={dark ? "#475569" : "#cbd5e1"}/></div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === "portfolio" && (
          <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "white", borderRadius: 16, padding: 16, border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#818cf8", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>Portfolio Companies ({investor.portfolio.length})</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {investor.portfolio.map(co => (
                <div key={co} style={{ background: dark ? "rgba(129,140,248,0.08)" : "rgba(99,102,241,0.06)", border: `1px solid ${dark ? "rgba(129,140,248,0.2)" : "rgba(99,102,241,0.15)"}`, borderRadius: 12, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: "linear-gradient(135deg, #818cf8, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "white" }}>{co[0]}</div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: dark ? "#e2e8f0" : "#1e293b" }}>{co}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "contact" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "mail", label: "Email", value: investor.email, color: "#818cf8" },
              { icon: "link", label: "LinkedIn", value: investor.linkedin, color: "#0ea5e9" },
              { icon: "globe", label: "Website", value: investor.website, color: "#22d3ee" },
            ].map(({ icon, label, value, color }) => (
              <div key={label} style={{ background: dark ? "rgba(255,255,255,0.04)" : "white", borderRadius: 16, padding: 16, border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`, display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name={icon} size={18} color={color}/>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: dark ? "#64748b" : "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
                  <div style={{ fontSize: 13, color: dark ? "#e2e8f0" : "#1e293b", marginTop: 2 }}>{value}</div>
                </div>
                <div style={{ marginLeft: "auto" }}><Icon name="chevron" size={14} color={dark ? "#475569" : "#cbd5e1"}/></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MAIN APP ───────────────────────────────────────────────────────────────────
export default function InvestorRadar() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("home");
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState(new Set([3, 7]));
  const [filterSector, setFilterSector] = useState("All");
  const [filterStage, setFilterStage] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [notif, setNotif] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { setTimeout(() => setLoaded(true), 600); }, []);

  const bg = dark ? "#0d1117" : "#f0f4ff";
  const cardBg = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)";
  const text = dark ? "#f1f5f9" : "#0f172a";
  const sub = dark ? "#94a3b8" : "#64748b";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  const toggleSave = (id) => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = INVESTORS.filter(inv => {
    const matchSearch = !search || inv.name.toLowerCase().includes(search.toLowerCase()) || inv.firm.toLowerCase().includes(search.toLowerCase()) || inv.sectors.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchSector = filterSector === "All" || inv.sectors.includes(filterSector);
    const matchStage = filterStage === "All" || inv.stage.includes(filterStage);
    return matchSearch && matchSector && matchStage;
  });

  if (selectedInvestor) {
    return (
      <div style={{ width: "100%", maxWidth: 430, margin: "0 auto", height: "100vh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif", background: bg }}>
        <InvestorProfile investor={selectedInvestor} dark={dark} onBack={() => setSelectedInvestor(null)} saved={saved.has(selectedInvestor.id)} onBookmark={toggleSave}/>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: 430, margin: "0 auto", height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif", background: bg, position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <div style={{ position: "fixed", top: -200, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }}/>
      <div style={{ position: "fixed", bottom: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }}/>

      {/* Scrollable content */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden", position: "relative", zIndex: 1, paddingBottom: 80 }}>

        {/* ── HOME ── */}
        {tab === "home" && (
          <div>
            {/* Top bar */}
            <div style={{ padding: "52px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 12, color: sub, fontWeight: 500, marginBottom: 2 }}>Good morning 👋</div>
                <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: text, lineHeight: 1.2 }}>Investor Radar</h1>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setDark(!dark)} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 12, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)" }}>
                  <Icon name={dark ? "sun" : "moon"} size={16} color={sub}/>
                </button>
                <button style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", border: "none", borderRadius: 12, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                  <Icon name="bell" size={16} color="white"/>
                  {notif && <div style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#f43f5e", border: "2px solid " + bg }}/>}
                </button>
              </div>
            </div>

            {/* Hero banner */}
            <div style={{ margin: "20px 20px 0", background: "linear-gradient(135deg, #312e81 0%, #1e1b4b 50%, #0c0a1e 100%)", borderRadius: 24, padding: 20, position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(99,102,241,0.3)" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.3), transparent)", pointerEvents: "none" }}/>
              <div style={{ position: "absolute", bottom: -20, left: 60, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.15), transparent)", pointerEvents: "none" }}/>
              <div style={{ fontSize: 11, color: "rgba(165,180,252,0.8)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>⚡ Live Discovery Engine</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "white", lineHeight: 1.2, marginBottom: 4 }}>12,847</div>
              <div style={{ fontSize: 14, color: "rgba(199,210,254,0.8)", marginBottom: 16 }}>Investors Tracked Globally</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <Sparkline data={[28,35,42,38,55,48,61,54,72,68,84,91]} color="#818cf8" height={36}/>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "8px 12px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "white" }}>+47</div>
                  <div style={{ fontSize: 10, color: "rgba(165,180,252,0.7)" }}>Added today</div>
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "8px 12px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "white" }}>234</div>
                  <div style={{ fontSize: 10, color: "rgba(165,180,252,0.7)" }}>This week</div>
                </div>
                <div style={{ flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "8px 12px", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#22d3ee" }}>AI #1</div>
                  <div style={{ fontSize: 10, color: "rgba(165,180,252,0.7)" }}>Top sector</div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div style={{ padding: "20px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {STATS.map(s => (
                <div key={s.label} style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 18, padding: 16, backdropFilter: "blur(20px)", boxShadow: dark ? "0 4px 16px rgba(0,0,0,0.2)" : "0 4px 16px rgba(99,102,241,0.06)" }}>
                  <div style={{ fontSize: 22 }}>{s.icon}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: text, marginTop: 8 }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: sub, marginTop: 2 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#22d3ee", marginTop: 4 }}>{s.change}</div>
                </div>
              ))}
            </div>

            {/* Investment activity */}
            <div style={{ margin: "20px 20px 0", background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: 16, backdropFilter: "blur(20px)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: text }}>Investment Activity</div>
                  <div style={{ fontSize: 11, color: sub, marginTop: 1 }}>Monthly investor additions</div>
                </div>
                <div style={{ fontSize: 12, color: "#818cf8", fontWeight: 600 }}>2025 ↑</div>
              </div>
              <BarChart dark={dark}/>
              <div style={{ display: "flex", justifyContent: "space-around", marginTop: 8 }}>
                {["J","F","M","A","M","J","J","A","S","O","N","D"].map(m => (
                  <span key={m} style={{ fontSize: 9, color: sub, fontWeight: 500 }}>{m}</span>
                ))}
              </div>
            </div>

            {/* Trending sectors */}
            <div style={{ margin: "20px 20px 0", background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: 16, backdropFilter: "blur(20px)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: text, marginBottom: 4 }}>🔥 Trending Sectors</div>
              <div style={{ fontSize: 11, color: sub, marginBottom: 16 }}>Most active investor categories</div>
              {TRENDING_SECTORS.map(s => (
                <div key={s.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: text }}>{s.name}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.pct}%</span>
                  </div>
                  <div style={{ height: 5, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: loaded ? s.pct + "%" : "0%", background: `linear-gradient(90deg, ${s.color}, ${s.color}99)`, borderRadius: 10, transition: "width 1.2s cubic-bezier(.34,1.56,.64,1)" }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Trending investors */}
            <div style={{ padding: "20px 20px 0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: text }}>🔥 Trending Investors</div>
                <button onClick={() => setTab("investors")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#818cf8", fontWeight: 600 }}>See all</button>
              </div>
              {INVESTORS.filter(i => i.trending).slice(0,3).map(inv => (
                <InvestorCard key={inv.id} investor={inv} dark={dark} onPress={setSelectedInvestor} onBookmark={toggleSave} saved={saved.has(inv.id)}/>
              ))}
            </div>
          </div>
        )}

        {/* ── DISCOVER ── */}
        {tab === "discover" && (
          <div style={{ padding: "52px 20px 0" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: text }}>Discover</h2>
            <p style={{ margin: "0 0 20px", color: sub, fontSize: 14 }}>Find your perfect investor match</p>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}><Icon name="discover" size={16} color={sub}/></div>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search investors, firms, sectors..."
                style={{ width: "100%", boxSizing: "border-box", background: cardBg, border: `1px solid ${border}`, borderRadius: 14, padding: "13px 16px 13px 44px", fontSize: 14, color: text, outline: "none", backdropFilter: "blur(20px)", fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#818cf8"}
                onBlur={e => e.target.style.borderColor = border}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: sub }}>
                  <Icon name="close" size={14} color="currentColor"/>
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button onClick={() => setShowFilter(!showFilter)} style={{ display: "flex", alignItems: "center", gap: 8, background: showFilter ? "rgba(129,140,248,0.15)" : cardBg, border: `1px solid ${showFilter ? "rgba(129,140,248,0.4)" : border}`, borderRadius: 12, padding: "9px 14px", cursor: "pointer", color: showFilter ? "#818cf8" : sub, fontSize: 13, fontWeight: 600, marginBottom: 16, backdropFilter: "blur(10px)", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>
              <Icon name="filter" size={14} color="currentColor"/> Filters
              {(filterSector !== "All" || filterStage !== "All") && (
                <span style={{ background: "#818cf8", color: "white", borderRadius: 20, padding: "1px 7px", fontSize: 10, marginLeft: 4 }}>
                  {[filterSector !== "All", filterStage !== "All"].filter(Boolean).length}
                </span>
              )}
            </button>

            {showFilter && (
              <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: 16, marginBottom: 16, backdropFilter: "blur(20px)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Sector</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {SECTORS.map(s => (
                    <button key={s} onClick={() => setFilterSector(s)} style={{ background: filterSector === s ? "#6366f1" : (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"), border: `1px solid ${filterSector === s ? "#6366f1" : border}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: filterSector === s ? "white" : sub, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif" }}>{s}</button>
                  ))}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Stage</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {STAGES.map(s => (
                    <button key={s} onClick={() => setFilterStage(s)} style={{ background: filterStage === s ? "#6366f1" : (dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"), border: `1px solid ${filterStage === s ? "#6366f1" : border}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: filterStage === s ? "white" : sub, cursor: "pointer", transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif" }}>{s}</button>
                  ))}
                </div>
                <button onClick={() => { setFilterSector("All"); setFilterStage("All"); }} style={{ marginTop: 12, background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#f43f5e", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Clear all filters</button>
              </div>
            )}

            <div style={{ fontSize: 12, color: sub, marginBottom: 12, fontWeight: 500 }}>{filtered.length} investors found</div>
            {filtered.map(inv => (
              <InvestorCard key={inv.id} investor={inv} dark={dark} onPress={setSelectedInvestor} onBookmark={toggleSave} saved={saved.has(inv.id)}/>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: sub }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: text }}>No investors found</div>
                <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
              </div>
            )}
          </div>
        )}

        {/* ── INVESTORS (New Today) ── */}
        {tab === "investors" && (
          <div style={{ padding: "52px 20px 0" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: text }}>⚡ New Today</h2>
            <p style={{ margin: "0 0 6px", color: sub, fontSize: 14 }}>Fresh investors added in last 24 hours</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", boxShadow: "0 0 8px #22d3ee", animation: "pulse 2s infinite" }}/>
              <span style={{ fontSize: 12, color: "#22d3ee", fontWeight: 600 }}>Live • Updated 2 min ago</span>
            </div>

            {/* Today banner */}
            <div style={{ background: "linear-gradient(135deg, #0c4a6e, #0e7490, #06b6d4)", borderRadius: 20, padding: 16, marginBottom: 20, boxShadow: "0 8px 24px rgba(6,182,212,0.25)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(186,230,253,0.8)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>New Investors Today</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: "white", marginTop: 4 }}>47</div>
                  <div style={{ fontSize: 12, color: "rgba(186,230,253,0.8)", marginTop: 2 }}>+12 more than yesterday</div>
                </div>
                <div style={{ fontSize: 56, opacity: 0.6 }}>⚡</div>
              </div>
            </div>

            {INVESTORS.filter(i => i.isNew).map(inv => (
              <div key={inv.id} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -8, top: 16, background: "#22d3ee", borderRadius: 4, padding: "2px 6px", fontSize: 9, fontWeight: 800, color: "#0c1929", zIndex: 2, boxShadow: "0 2px 8px rgba(34,211,238,0.4)" }}>NEW</div>
                <div style={{ marginLeft: 0 }}>
                  <InvestorCard investor={inv} dark={dark} onPress={setSelectedInvestor} onBookmark={toggleSave} saved={saved.has(inv.id)}/>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 8, fontWeight: 700, fontSize: 15, color: text, marginBottom: 14 }}>All Investors</div>
            {INVESTORS.filter(i => !i.isNew).map(inv => (
              <InvestorCard key={inv.id} investor={inv} dark={dark} onPress={setSelectedInvestor} onBookmark={toggleSave} saved={saved.has(inv.id)}/>
            ))}
          </div>
        )}

        {/* ── SAVED ── */}
        {tab === "saved" && (
          <div style={{ padding: "52px 20px 0" }}>
            <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: text }}>Saved</h2>
            <p style={{ margin: "0 0 20px", color: sub, fontSize: 14 }}>{saved.size} investors in your watchlist</p>

            {saved.size === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 20px", color: sub }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🔖</div>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: text }}>No saved investors</div>
                <div style={{ fontSize: 14, marginBottom: 20 }}>Bookmark investors to track them here</div>
                <button onClick={() => setTab("discover")} style={{ background: "linear-gradient(135deg, #6366f1, #818cf8)", border: "none", borderRadius: 14, padding: "12px 24px", fontSize: 14, fontWeight: 700, color: "white", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  Discover Investors
                </button>
              </div>
            ) : (
              <>
                <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 16, padding: 14, marginBottom: 20, backdropFilter: "blur(20px)" }}>
                  <div style={{ display: "flex", gap: 16 }}>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: text }}>{saved.size}</div>
                      <div style={{ fontSize: 10, color: sub }}>Saved</div>
                    </div>
                    <div style={{ width: 1, background: border }}/>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#22d3ee" }}>{INVESTORS.filter(i => saved.has(i.id) && i.isNew).length}</div>
                      <div style={{ fontSize: 10, color: sub }}>New</div>
                    </div>
                    <div style={{ width: 1, background: border }}/>
                    <div style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{INVESTORS.filter(i => saved.has(i.id) && i.trending).length}</div>
                      <div style={{ fontSize: 10, color: sub }}>Trending</div>
                    </div>
                  </div>
                </div>
                {INVESTORS.filter(i => saved.has(i.id)).map(inv => (
                  <InvestorCard key={inv.id} investor={inv} dark={dark} onPress={setSelectedInvestor} onBookmark={toggleSave} saved={true}/>
                ))}
              </>
            )}
          </div>
        )}

        {/* ── PROFILE ── */}
        {tab === "profile" && (
          <div style={{ padding: "52px 20px 0" }}>
            {/* Profile hero */}
            <div style={{ background: "linear-gradient(135deg, #312e81, #1e1b4b)", borderRadius: 24, padding: 24, marginBottom: 20, position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(99,102,241,0.25)" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(129,140,248,0.2), transparent)", pointerEvents: "none" }}/>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg, #818cf8, #22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "white", border: "3px solid rgba(255,255,255,0.2)" }}>R</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 20, color: "white" }}>Radar User</div>
                  <div style={{ fontSize: 13, color: "rgba(165,180,252,0.8)", marginTop: 2 }}>Startup Founder</div>
                  <div style={{ fontSize: 11, color: "rgba(129,140,248,0.7)", marginTop: 2 }}>Joined March 2024</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                {[["12,847", "Tracked"], [saved.size.toString(), "Saved"], ["28", "Sectors"]].map(([v, l]) => (
                  <div key={l} style={{ flex: 1, background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "10px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>{v}</div>
                    <div style={{ fontSize: 10, color: "rgba(165,180,252,0.7)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            {[
              { section: "Preferences", items: [
                { icon: dark ? "moon" : "sun", label: "Dark Mode", action: () => setDark(!dark), value: dark ? "On" : "Off", toggle: true, state: dark },
                { icon: "bell", label: "Notifications", action: () => setNotif(!notif), value: notif ? "On" : "Off", toggle: true, state: notif },
              ]},
              { section: "Discovery", items: [
                { icon: "spark", label: "AI Sector Interest", action: () => {}, value: "AI, Fintech, SaaS" },
                { icon: "trend", label: "Investment Stage", action: () => {}, value: "Seed, Series A" },
                { icon: "globe", label: "Geography", action: () => {}, value: "Global" },
              ]},
              { section: "About", items: [
                { icon: "link", label: "Version", action: () => {}, value: "1.0.0" },
                { icon: "mail", label: "Contact Support", action: () => {}, value: "" },
              ]},
            ].map(({ section, items }) => (
              <div key={section} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>{section}</div>
                <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 18, overflow: "hidden", backdropFilter: "blur(20px)" }}>
                  {items.map((item, idx) => (
                    <button key={item.label} onClick={item.action} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "none", border: "none", cursor: "pointer", borderBottom: idx < items.length - 1 ? `1px solid ${border}` : "none", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(129,140,248,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon name={item.icon} size={16} color="#818cf8"/>
                      </div>
                      <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: text, textAlign: "left" }}>{item.label}</span>
                      {item.value && <span style={{ fontSize: 12, color: sub }}>{item.value}</span>}
                      {item.toggle ? (
                        <div style={{ width: 44, height: 24, borderRadius: 12, background: item.state ? "linear-gradient(90deg, #6366f1, #818cf8)" : (dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"), position: "relative", transition: "background 0.3s", flexShrink: 0 }}>
                          <div style={{ position: "absolute", top: 3, left: item.state ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.3s" }}/>
                        </div>
                      ) : (
                        <Icon name="chevron" size={14} color={sub}/>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430,
        background: dark ? "rgba(13,17,23,0.92)" : "rgba(248,250,255,0.92)",
        backdropFilter: "blur(24px) saturate(180%)",
        borderTop: `1px solid ${border}`,
        display: "flex", alignItems: "center", justifyContent: "space-around",
        padding: "8px 0 20px", zIndex: 100,
        boxShadow: dark ? "0 -8px 32px rgba(0,0,0,0.4)" : "0 -8px 32px rgba(99,102,241,0.08)"
      }}>
        {[
          { id: "home", icon: "home", label: "Home" },
          { id: "discover", icon: "discover", label: "Discover" },
          { id: "investors", icon: "spark", label: "New Today" },
          { id: "saved", icon: "saved", label: "Saved" },
          { id: "profile", icon: "profile", label: "Profile" },
        ].map(({ id, icon, label }) => {
          const active = tab === id;
          return (
            <button key={id} onClick={() => setTab(id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "4px 12px", position: "relative", transition: "transform 0.15s", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {active && <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 32, height: 3, borderRadius: 2, background: "linear-gradient(90deg, #6366f1, #818cf8)" }}/>}
              <div style={{ width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(129,140,248,0.15)" : "transparent", transition: "background 0.2s" }}>
                <Icon name={icon} size={18} color={active ? "#818cf8" : sub}/>
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500, color: active ? "#818cf8" : sub, transition: "color 0.2s" }}>{label}</span>
              {id === "investors" && <div style={{ position: "absolute", top: 0, right: 8, width: 7, height: 7, borderRadius: "50%", background: "#22d3ee", border: "2px solid " + bg }}/>}
            </button>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { -webkit-font-smoothing: antialiased; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        input::placeholder { color: ${sub}; }
      `}</style>
    </div>
  );
}
