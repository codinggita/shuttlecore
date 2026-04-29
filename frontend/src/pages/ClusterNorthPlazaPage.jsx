import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ClusterNorthPlazaPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></motion.div>
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="opacity-70">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">Operational Hub</p>
            {menuItems.map((item) => (
              <motion.button key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}>
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg z-30">
          <div className="flex items-center gap-4 flex-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></motion.button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto min-h-[80vh] flex flex-col">
            <motion.div variants={itemVariants} className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <button onClick={() => navigate("/demand-heatmaps")} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest"><span className="material-symbols-outlined text-sm">arrow_back</span> Back to Heatmaps</button>
                <div className="flex items-center gap-4 mb-2">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black text-sm border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">#1</span>
                  <h1 className="text-3xl md:text-5xl font-black text-main tracking-tighter">North Financial Plaza</h1>
                </div>
                <p className="text-muted text-sm md:text-base font-medium">VIP routing corridor active. Financial sector operations nominal.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-10">
              <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-card !p-8 relative overflow-hidden border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 opacity-[0.03] rounded-bl-full pointer-events-none"></div>
                <h3 className="text-xl font-black tracking-tight flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-emerald-500">account_balance</span> VIP Passenger Grid
                </h3>
                <div className="flex items-center justify-between mb-8 p-6 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)]">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted mb-1">Assigned Units</p>
                    <p className="text-3xl font-black text-emerald-500">1</p>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted mb-1">Active Waitlist</p>
                    <p className="text-3xl font-black text-main">12</p>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted mb-1">Avg Wait Time</p>
                    <p className="text-3xl font-black text-main">4m 10s</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="font-bold text-sm">SV-402 (Luxury Class)</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg">Docked at Plaza</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)]">
                <h3 className="text-lg font-black tracking-tight mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-muted">moving</span> Throughput Trend</h3>
                <div className="flex-1 flex flex-col justify-end space-y-4">
                  {[
                    { time: "08:00 AM", load: 80, color: "bg-emerald-500" },
                    { time: "09:00 AM", load: 95, color: "bg-emerald-500" },
                    { time: "10:00 AM", load: 45, color: "bg-emerald-500" },
                    { time: "11:00 AM", load: 20, color: "bg-[var(--primary)]" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted mb-1"><span>{stat.time}</span><span>{stat.load}%</span></div>
                      <div className="h-2 w-full bg-[var(--surface-light)] rounded-full overflow-hidden">
                        <div className={`h-full ${stat.color} w-[${stat.load}%] rounded-full`} style={{ width: `${stat.load}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-6 py-3 btn-primary !text-[10px]">Dispatch Priority Unit</button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
export default ClusterNorthPlazaPage;
