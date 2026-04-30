import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ClusterDetailsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [load, setLoad] = useState(74);
  const [latency, setLatency] = useState(12);
  const [syncStatus, setSyncStatus] = useState("Nominal");

  // Real-time update simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setLoad(prev => Math.min(100, Math.max(10, prev + (Math.random() * 2 - 1))));
      setLatency(prev => Math.max(5, Math.min(50, prev + (Math.random() > 0.5 ? 1 : -1))));
      setSyncStatus(Math.random() > 0.95 ? "Syncing..." : "Nominal");
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

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
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg"><span className="material-symbols-outlined text-white text-xl">rocket_launch</span></div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="opacity-70">CORE</span></span>
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
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg transition-colors duration-300 z-30">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
          <div className="flex-1" />
          <motion.button whileHover={{ scale: 1.05 }} onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto min-h-[80vh] flex flex-col">
            
            <motion.div variants={itemVariants} className="mb-10">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black text-muted hover:text-main transition-colors mb-6 uppercase tracking-[0.2em]"><span className="material-symbols-outlined text-sm">arrow_back</span> Back to Simulation</button>
              <h1 className="text-4xl md:text-6xl font-black text-main mb-3 tracking-tighter uppercase">Cluster Diagnostics</h1>
              <p className="text-muted text-sm font-medium opacity-70">In-depth analytics and high-frequency routing telemetry for the selected operation node.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="dashboard-card !p-12 flex-1 relative overflow-hidden group border border-[var(--border)] shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
                {[
                  { label: "Node Load", val: `${load.toFixed(0)}%`, icon: "hub", color: "text-emerald-400" },
                  { label: "Mesh Latency", val: `${latency}ms`, icon: "speed", color: "text-[var(--primary)]" },
                  { label: "Sync Status", val: syncStatus, icon: "sync", color: syncStatus === "Nominal" ? "text-emerald-400" : "text-amber-400" }
                ].map((m, i) => (
                  <div key={i} className="bg-[var(--surface-muted)] p-8 rounded-[32px] border border-[var(--border)] shadow-inner">
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-4 opacity-50">{m.label}</p>
                    <div className="flex items-center gap-4">
                      <span className={`material-symbols-outlined text-3xl ${m.color}`}>{m.icon}</span>
                      <p className={`text-4xl font-black ${m.color} tracking-tighter transition-all duration-500`}>{m.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center text-center py-10 relative z-10">
                <div className="w-28 h-28 bg-[var(--primary)]/10 rounded-[40px] flex items-center justify-center mb-8 border-2 border-[var(--primary)]/20 shadow-2xl group-hover:scale-110 transition-transform duration-700 animate-pulse">
                   <span className="material-symbols-outlined text-6xl text-[var(--primary)]">radar</span>
                </div>
                <h2 className="text-3xl font-black text-main tracking-tight mb-4 uppercase">Live Node Inspection</h2>
                <p className="text-muted text-sm max-w-xl mx-auto mb-10 leading-relaxed font-medium opacity-70">
                  The high-frequency telemetry stream for <span className="text-main font-black">Node_Cluster_77</span> is active. Autonomous mesh stabilization is underway. All local transponders report successful handshake protocols.
                </p>
                <div className="flex gap-4">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/dashboard")} className="btn-primary !px-12 !py-5 !rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-[var(--primary)]/20">Return to Overview</motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} className="btn-secondary !px-10 !py-5 !rounded-2xl text-[11px] font-black uppercase tracking-[0.3em]">Full Analytics</motion.button>
                </div>
              </div>
            </motion.div>

            <footer className="mt-12 border-t border-[var(--border)] py-12 mt-auto">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-[var(--text-main)] font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity">
                  <span className="material-symbols-outlined text-xl">arrow_back</span> ShuttleCore
                </Link>
                <div className="flex flex-wrap justify-center gap-8">
                  {[{ label: "Services", to: "/services" }, { label: "FAQ", to: "/faq" }, { label: "Payments", to: "/payments" }, { label: "Privacy", to: "/privacy" }].map((l) => (
                    <Link key={l.label} to={l.to} className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors uppercase font-black tracking-[0.2em]">{l.label}</Link>
                  ))}
                </div>
                <span className="text-[11px] text-[var(--text-muted)] font-bold opacity-40">© 2024 ShuttleCore Logistics Systems.</span>
              </div>
            </footer>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ClusterDetailsPage;
