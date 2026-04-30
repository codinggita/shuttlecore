import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SafetySecurityPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [driverView, setDriverView] = useState("top");

  const [safetyScore, setSafetyScore] = useState(92.4);
  const [violations, setViolations] = useState({ speed: 12, braking: 8, activeUnits: 144 });
  const [safetyStats, setSafetyStats] = useState({
    inTraining: 2,
    avgScore: 86.3
  });
  const [user, setUser] = useState({
    firstName: "Cmdr.",
    lastName: "Operative",
    email: "operative@shuttlecore.ai",
    organization: "Systems Command",
    role: "Systems Lead",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  
  const [harshEvents, setHarshEvents] = useState([
    { id: 1, unit: "Unit #8421", type: "Harsh Braking", icon: "emergency_home", color: "red", time: "2M AGO", desc: "Impact force: 0.85g at 45mph. Driver identified." },
    { id: 2, unit: "Unit #9031", type: "Speed Limit +15", icon: "speed", color: "orange", time: "14M AGO", desc: "Observed speed 70mph in a 55mph construction zone." },
    { id: 3, unit: "Unit #1105", type: "Aggressive Turn", icon: "turn_right", color: "slate", time: "42M AGO", desc: "Lateral g-force exceeded safety threshold on exit 14B." },
  ]);

  // Real-time update simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Small fluctuation in safety score
      setSafetyScore(prev => Math.min(100, Math.max(85, prev + (Math.random() * 0.2 - 0.1))));
      
      // Update violation counts
      if (Math.random() > 0.9) {
        setViolations(prev => ({
          ...prev,
          speed: Math.max(0, prev.speed + (Math.random() > 0.7 ? 1 : -1)),
          braking: Math.max(0, prev.braking + (Math.random() > 0.8 ? 1 : -1)),
          activeUnits: Math.max(100, Math.min(200, prev.activeUnits + (Math.random() > 0.5 ? 1 : -1)))
        }));
      }

      // Randomly update event times or add a new one
      if (Math.random() > 0.98) {
        const units = ["Unit #2201", "Unit #4432", "Unit #1092"];
        const types = ["Harsh Braking", "Speeding", "Impact Detect"];
        const icons = ["emergency_home", "speed", "collision"];
        const colors = ["red", "orange", "red"];
        const descs = ["G-force exceeded 0.92g", "15% over sector limit", "Proximity sensor alert"];
        
        const idx = Math.floor(Math.random() * units.length);
        const newEvent = {
          id: Date.now(),
          unit: units[idx],
          type: types[idx],
          icon: icons[idx],
          color: colors[idx],
          time: "JUST NOW",
          desc: descs[idx]
        };
        setHarshEvents(prev => [newEvent, ...prev.slice(0, 2)]);
      }
      // Update safety stats
      setSafetyStats(prev => ({
        inTraining: Math.random() > 0.98 ? (Math.random() > 0.5 ? prev.inTraining + 1 : Math.max(0, prev.inTraining - 1)) : prev.inTraining,
        avgScore: Math.min(100, Math.max(70, prev.avgScore + (Math.random() * 0.4 - 0.2)))
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleExportReport = () => {
    alert("Safety report exported successfully.");
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const [driverRankings, setDriverRankings] = useState([]);

  useEffect(() => {
    const allDrivers = [
      { rank: "01", name: "Marcus Vance", division: "Heavy Haul Div.", alerts: 0, score: 98, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBw7z2R0KH4HAZsobWRb4qGmGVYYjd-k0Dcm_PoYHQoUjLloqkYz3uL6Dj_iAvjjcCHTPOR4w8svAie85uoZaIqMZsvLnGOYKISvT2yZesD0Q4GuLvMfP3AckWIZFjXdzeU6cWSOopx8qlZ8ataQmtJk3GjJ127zpnuNzZhNfIPH1XlnY4cro6dmvlDPuqp5ZTbPTB26Cd0WNMnWn9-L-a19Tsi1krTB5N002-pXP90kHxUypgkg7YRQxwhltEKueNImZNXi01bwY" },
      { rank: "02", name: "Sarah Chen", division: "Regional Express", alerts: 2, score: 94, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkPtYBkrZ1lh4wsjxLGQ5CgWDU2vCTb-sVLnpPYFG6uHymmU7QPwgtCKlHwn0UH5ij6vb8wgvVFVjGH00WRha2mJFeQdBfhJ-qnXwLx7sB63znEJpaQJVbzD0LDobfMK-D74qhY5V949XSk-uF741quEhLNOe8RynMF7FthVA238WUvFJC6wFjV8jKeh93B_ab0y8_IUb1IedudkbQH28cxoq9bVXg1lD6EWGOHeas-td8dWvUWkoX2RXc_gDSzctB-RS5oMcB0ok" },
      { rank: "03", name: "David Miller", division: "Last Mile", alerts: 5, score: 91, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqJ-cs0VYoIQd5_LibrD7tr9DGOxbFSyXXVLs_OVWLZKgD1AHXEDn0JeLdA35ZE0lJgHtS5B6xcsQKrNWF_iPzWimDxn6TPUA_S3iy03L-Jgt4Jjwpt_utu96mCN5unFoBwJea7wEGldUhIoBk5cV3EyiIkO60vjSW7jEQ2eOWEjDfzdYZ7xqGfOzzc9wRzKJsdURU2hHxvvacBh1kvb4-fgH8f58Em4Yp3MwWdxL0wN7atSC5GL7AeHiEhe-AI2wCgn6cLj_JZy0" },
      { rank: "04", name: "Elena Vance", division: "Heavy Haul Div.", alerts: 1, score: 89, img: "https://i.pravatar.cc/150?u=4" },
      { rank: "05", name: "James Thorne", division: "Regional Express", alerts: 3, score: 87, img: "https://i.pravatar.cc/150?u=5" },
      { rank: "06", name: "Maya Sterling", division: "Last Mile", alerts: 0, score: 96, img: "https://i.pravatar.cc/150?u=6" },
      { rank: "07", name: "Lucas Gray", division: "Logistics Core", alerts: 4, score: 85, img: "https://i.pravatar.cc/150?u=7" },
      { rank: "08", name: "Zoe West", division: "Regional Express", alerts: 2, score: 92, img: "https://i.pravatar.cc/150?u=8" },
      { rank: "09", name: "Oliver Pike", division: "Heavy Haul Div.", alerts: 6, score: 82, img: "https://i.pravatar.cc/150?u=9" },
      { rank: "10", name: "Isabella Cruz", division: "Last Mile", alerts: 1, score: 95, img: "https://i.pravatar.cc/150?u=10" },
      { rank: "11", name: "Nathan Drake", division: "Special Ops", alerts: 0, score: 99, img: "https://i.pravatar.cc/150?u=11" },
      { rank: "12", name: "Chloe Frazer", division: "Quick Transit", alerts: 2, score: 93, img: "https://i.pravatar.cc/150?u=12" },
      { rank: "13", name: "Victor Sullivan", division: "Legacy Fleet", alerts: 8, score: 78, img: "https://i.pravatar.cc/150?u=13" },
      { rank: "14", name: "Lara Croft", division: "Expeditionary", alerts: 1, score: 97, img: "https://i.pravatar.cc/150?u=14" },
      { rank: "15", name: "Arthur Morgan", division: "Outlaw Express", alerts: 12, score: 65, img: "https://i.pravatar.cc/150?u=15" },
      { rank: "16", name: "John Marston", division: "Frontier Logistics", alerts: 5, score: 88, img: "https://i.pravatar.cc/150?u=16" },
      { rank: "17", name: "Sadie Adler", division: "Aggressive Ops", alerts: 0, score: 100, img: "https://i.pravatar.cc/150?u=17" },
      { rank: "18", name: "Sam Porter", division: "Bridges", alerts: 0, score: 98, img: "https://i.pravatar.cc/150?u=18" },
      { rank: "19", name: "Fragile", division: "Express Delivery", alerts: 1, score: 94, img: "https://i.pravatar.cc/150?u=19" },
      { rank: "20", name: "Die-Hardman", division: "Command", alerts: 0, score: 91, img: "https://i.pravatar.cc/150?u=20" },
      { rank: "21", name: "Master Chief", division: "Heavy Duty", alerts: 0, score: 100, img: "https://i.pravatar.cc/150?u=21" },
      { rank: "22", name: "Cortana", division: "AI Support", alerts: 0, score: 100, img: "https://i.pravatar.cc/150?u=22" },
      { rank: "23", name: "Arbiter", division: "Elite Force", alerts: 4, score: 86, img: "https://i.pravatar.cc/150?u=23" },
      { rank: "24", name: "Commander Shepard", division: "Alliance", alerts: 2, score: 95, img: "https://i.pravatar.cc/150?u=24" },
      { rank: "25", name: "Garrus Vakarian", division: "Sniper Ops", alerts: 0, score: 99, img: "https://i.pravatar.cc/150?u=25" },
      { rank: "26", name: "Liara T'Soni", division: "Research", alerts: 1, score: 92, img: "https://i.pravatar.cc/150?u=26" },
      { rank: "27", name: "Tali'Zorah", division: "Engineering", alerts: 3, score: 84, img: "https://i.pravatar.cc/150?u=27" },
      { rank: "28", name: "Geralt of Rivia", division: "Witcher Express", alerts: 0, score: 97, img: "https://i.pravatar.cc/150?u=28" },
      { rank: "29", name: "Yennefer", division: "Arcane Logistics", alerts: 1, score: 93, img: "https://i.pravatar.cc/150?u=29" },
      { rank: "30", name: "Triss Merigold", division: "Medic Fleet", alerts: 2, score: 88, img: "https://i.pravatar.cc/150?u=30" },
      { rank: "31", name: "Ezio Auditore", division: "Stealth Transit", alerts: 0, score: 100, img: "https://i.pravatar.cc/150?u=31" },
      { rank: "32", name: "Altair", division: "Legacy Stealth", alerts: 0, score: 98, img: "https://i.pravatar.cc/150?u=32" },
      { rank: "33", name: "Edward Kenway", division: "Maritime", alerts: 15, score: 60, img: "https://i.pravatar.cc/150?u=33" },
      { rank: "34", name: "Kratos", division: "War Fleet", alerts: 20, score: 50, img: "https://i.pravatar.cc/150?u=34" },
      { rank: "35", name: "Atreus", division: "Scout", alerts: 5, score: 85, img: "https://i.pravatar.cc/150?u=35" },
      { rank: "36", name: "Joel Miller", division: "Survivalist", alerts: 4, score: 82, img: "https://i.pravatar.cc/150?u=36" },
      { rank: "37", name: "Ellie Williams", division: "Rogue Ops", alerts: 2, score: 91, img: "https://i.pravatar.cc/150?u=37" },
      { rank: "38", name: "Peter Parker", division: "Quick Delivery", alerts: 1, score: 96, img: "https://i.pravatar.cc/150?u=38" },
      { rank: "39", name: "Miles Morales", division: "Neo Transit", alerts: 0, score: 99, img: "https://i.pravatar.cc/150?u=39" },
      { rank: "40", name: "Bruce Wayne", division: "Knight Express", alerts: 0, score: 100, img: "https://i.pravatar.cc/150?u=40" },
    ];

    if (driverView === "top") {
      setDriverRankings(allDrivers.slice(0, 40).sort((a, b) => b.score - a.score));
    } else {
      // For weekly, we simulate different rankings
      setDriverRankings(allDrivers.slice(0, 40).map(d => ({
        ...d,
        score: Math.max(50, Math.min(100, d.score + (Math.random() * 10 - 5))),
        alerts: Math.max(0, d.alerts + Math.floor(Math.random() * 3))
      })).sort((a, b) => b.score - a.score));
    }
  }, [driverView]);

  const safetyBarData = [60, 75, 70, 85, 92, 100];

  const getEventColorClasses = (color) => {
    const map = {
      red: { bg: "bg-rose-500/10", border: "border-rose-500/20", iconBg: "bg-rose-500/20", iconText: "text-rose-500" },
      orange: { bg: "bg-amber-500/10", border: "border-amber-500/20", iconBg: "bg-amber-500/20", iconText: "text-amber-500" },
      slate: { bg: "bg-slate-500/10", border: "border-slate-500/20", iconBg: "bg-slate-500/20", iconText: "text-slate-400" },
    };
    return map[color] || map.slate;
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20"><span className="material-symbols-outlined text-white text-xl">rocket_launch</span></div>
            <span className="text-xl font-black tracking-tighter">SHUTTLE<span className="opacity-70">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">Operational Hub</p>
            {menuItems.map((item) => (
              <motion.button key={item.id} whileHover={{ x: 4 }} onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}>
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-4">
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => navigate("/emergency-stop")} className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5">
            <span className="material-symbols-outlined text-lg animate-pulse">emergency_home</span> Emergency Stop
          </motion.button>
          <div className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-colors group/sidebar-profile">
            <Link to="/profile" className="flex items-center gap-3 mb-4 group/pcard">
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-white/20 group-hover/pcard:border-[var(--primary)] transition-all" />
              <div><p className="text-[13px] font-black text-main leading-tight group-hover/pcard:text-[var(--primary)] transition-colors">{user.firstName} {user.lastName}</p><p className="text-[10px] text-muted uppercase font-bold tracking-wider">{user.role}</p></div>
            </Link>
            <motion.button onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg">
              <span className="material-symbols-outlined text-xs">logout</span> Terminate Session
            </motion.button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg z-30">
          <div className="flex items-center gap-4 flex-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
            <div className="flex items-center gap-3 bg-[var(--surface-muted)] px-4 py-2 rounded-xl border border-[var(--border)]">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Safety Protocol: active</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></motion.button>
            <motion.button onClick={() => navigate("/notifications")} className="icon-btn relative"><span className="material-symbols-outlined">notifications</span><span className="absolute top-2.5 right-2.5 h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span></motion.button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1600px] mx-auto">
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h1 className="text-3xl font-black text-main mb-2 tracking-tighter uppercase">Safety Analytics</h1>
                <p className="text-sm text-muted font-medium opacity-70">Real-time AI behavioral monitoring and high-frequency risk scoring matrix.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={handleExportReport} className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:opacity-90 transition-all flex items-center gap-3"><span className="material-symbols-outlined text-sm">download</span> Export Report</button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
              <motion.div variants={itemVariants} className="md:col-span-4 dashboard-card p-8 rounded-[32px] flex flex-col justify-between group relative overflow-hidden border border-[var(--border)]">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-3xl" />
                <div>
                  <div className="flex justify-between items-center mb-10"><span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-50">Fleet Safety Score</span><span className="material-symbols-outlined text-[var(--primary)] animate-pulse">verified_user</span></div>
                  <div className="flex items-baseline gap-2"><span className="text-7xl font-black text-main tracking-tighter transition-all duration-1000">{safetyScore.toFixed(1)}</span><span className="text-muted text-lg font-black opacity-30">/ 100</span></div>
                  <div className="mt-4 flex items-center gap-2 text-emerald-400"><span className="material-symbols-outlined text-sm">trending_up</span><span className="text-[10px] font-black uppercase tracking-widest">+4.2% Stability Growth</span></div>
                </div>
                <div className="mt-12 h-24 flex items-end gap-2">
                  {safetyBarData.map((height, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${height}%` }} className={`w-full rounded-t-xl ${i === safetyBarData.length - 1 ? "bg-[var(--primary)] shadow-[0_0_20px_currentColor]" : "bg-[var(--surface-muted)] group-hover:bg-[var(--surface-light)] transition-all"}`} />
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
               <motion.div variants={itemVariants} className="md:col-span-6 dashboard-card p-8 rounded-[32px] border border-[var(--border)] relative overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-50 mb-6">In Training</p>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-amber-500 text-3xl">school</span>
                    <span className="text-6xl font-black text-main tracking-tighter">{safetyStats.inTraining}</span>
                  </div>
               </motion.div>

               <motion.div variants={itemVariants} className="md:col-span-6 dashboard-card p-8 rounded-[32px] border border-[var(--border)] relative overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-50 mb-6">Avg Score</p>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-blue-500 text-3xl">trending_up</span>
                    <span className="text-6xl font-black text-main tracking-tighter">{safetyStats.avgScore.toFixed(1)}%</span>
                  </div>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
               {[
                 {label: "Speed Violations", val: violations.speed, color: "text-amber-400", icon: "speed"},
                 {label: "Harsh Braking", val: violations.braking, color: "text-rose-400", icon: "emergency_home"},
                 {label: "Active Units", val: violations.activeUnits, color: "text-white", icon: "airport_shuttle"}
               ].map((m, i) => (
                 <motion.div key={i} variants={itemVariants} className="dashboard-card p-8 rounded-[32px] border border-[var(--border)] relative overflow-hidden group hover:border-[var(--primary)]/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-50">{m.label}</p>
                       <span className={`material-symbols-outlined ${m.color} group-hover:scale-110 transition-transform`}>{m.icon}</span>
                    </div>
                    <p className={`text-5xl font-black ${m.color} tracking-tighter transition-all duration-1000`}>{m.val}</p>
                 </motion.div>
               ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
              <motion.div variants={itemVariants} className="md:col-span-5 dashboard-card p-10 rounded-[40px] flex flex-col border border-[var(--border)] shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-center mb-10"><h2 className="text-2xl font-black text-main tracking-tight uppercase">Harsh Events</h2><span className="text-[10px] font-black text-muted uppercase tracking-[0.3em] animate-pulse">Live Stream</span></div>
                <div className="space-y-4 flex-1">
                  {harshEvents.map((event, i) => {
                    const colors = getEventColorClasses(event.color);
                    return (
                      <motion.div key={event.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileHover={{ x: 6 }} className={`flex items-center gap-6 p-6 rounded-[32px] ${colors.bg} border ${colors.border} group cursor-pointer transition-all`}>
                        <div className={`${colors.iconBg} w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-white/5 group-hover:scale-110 transition-transform`}><span className={`material-symbols-outlined ${colors.iconText} text-2xl`}>{event.icon}</span></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1"><p className="font-black text-base text-main tracking-tight">{event.unit} <span className="mx-2 opacity-20">•</span> {event.type}</p><span className="text-[9px] font-black text-muted uppercase tracking-[0.2em]">{event.time}</span></div>
                          <p className="text-[12px] text-muted font-medium opacity-70 leading-relaxed">{event.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-7 dashboard-card p-10 rounded-[40px] border border-[var(--border)] shadow-2xl">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-black text-main tracking-tight uppercase">Operator Performance</h2>
                  <div className="flex gap-2 bg-[var(--surface-muted)] p-1.5 rounded-2xl border border-[var(--border)]">
                    {["top", "weekly"].map(v => <button key={v} onClick={() => setDriverView(v)} className={`px-5 py-2 text-[10px] font-black rounded-xl uppercase tracking-widest transition-all ${driverView === v ? "bg-[var(--primary)] text-white shadow-xl" : "text-muted hover:text-main"}`}>{v}</button>)}
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[400px] custom-scrollbar pr-2">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-muted uppercase tracking-[0.3em] border-b border-[var(--border)] opacity-40">
                        <th className="pb-6">Rank</th>
                        <th className="pb-6">Identity</th>
                        <th className="pb-6">Efficiency</th>
                        <th className="pb-6">Alerts</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {driverRankings.map((driver, i) => (
                        <motion.tr key={i} whileHover={{ backgroundColor: "var(--surface-muted)" }} className="border-b border-[var(--border)] transition-colors group cursor-pointer" onClick={() => navigate("/all-drivers")}>
                          <td className="py-6 font-black text-xl text-muted opacity-40 group-hover:text-[var(--primary)] transition-all">{i + 1 < 10 ? `0${i + 1}` : i + 1}</td>
                          <td className="py-6">
                            <div className="flex items-center gap-5">
                              <div className="w-12 h-12 rounded-[20px] bg-white/5 overflow-hidden border-2 border-white/5 group-hover:scale-110 transition-transform"><img className="w-full h-full object-cover" src={driver.img} alt={driver.name} /></div>
                              <div><p className="font-black text-main tracking-tight text-base">{driver.name}</p><p className="text-[10px] text-muted font-black uppercase tracking-widest mt-0.5 opacity-60">{driver.division}</p></div>
                            </div>
                          </td>
                          <td className="py-6">
                             <div className="flex items-center gap-4">
                               <div className="w-24 h-1.5 bg-[var(--surface-muted)] rounded-full overflow-hidden border border-white/5"><motion.div initial={false} animate={{ width: `${driver.score}%` }} className={`h-full ${i < 3 ? "bg-emerald-500" : "bg-[var(--primary)]"} shadow-[0_0_10px_currentColor]`} /></div>
                               <span className="font-black text-sm text-main">{driver.score.toFixed(0)}%</span>
                             </div>
                          </td>
                          <td className="py-6 font-black text-muted tracking-widest">{driver.alerts}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/all-drivers")} className="w-full py-4 bg-[var(--surface-muted)] text-[10px] font-black text-muted hover:text-[var(--primary)] transition-all uppercase tracking-[0.3em] rounded-2xl border border-[var(--border)] flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined text-sm">group</span> View Other Drivers
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="md:col-span-12 dashboard-card !p-12 rounded-[48px] border-2 border-[var(--primary)]/10 shadow-2xl relative overflow-hidden group bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent">
              <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                <div className="bg-[var(--primary)]/10 p-8 rounded-[32px] border-2 border-[var(--primary)]/20 shadow-2xl group-hover:scale-110 transition-transform duration-700 animate-pulse"><span className="material-symbols-outlined text-6xl text-[var(--primary)]">psychology</span></div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black text-main mb-4 tracking-tighter uppercase">AI Predictive Safety Insight</h3>
                  <p className="text-muted text-base font-medium leading-relaxed max-w-4xl opacity-80">Fatigue patterns detected in the <span className="text-main font-black">Northeast Corridor</span>. Operators show a <span className="text-rose-500 font-black">12% increase</span> in delayed reaction times. Recommended action: Adjust mandatory rest intervals for <span className="text-[var(--primary)] font-black">Unit #700 - #750</span> series by 15 minutes.</p>
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/fleet-adjustment")} className="bg-[var(--primary)] text-white font-black px-10 py-5 rounded-[24px] text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-[var(--primary)]/20 hover:opacity-90 transition-all whitespace-nowrap">Apply Fleet Adjustment</motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SafetySecurityPage;
