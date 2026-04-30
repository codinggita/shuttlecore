import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ClusterMissionHubPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
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
                  <span className="w-10 h-10 rounded-xl bg-[#5C5C3D]/20 text-[#c2c286] flex items-center justify-center font-black text-sm border border-[#5C5C3D]/30 shadow-[0_0_15px_rgba(92,92,61,0.2)]">#2</span>
                  <h1 className="text-3xl md:text-5xl font-black text-main tracking-tighter">The Mission Hub</h1>
                </div>
                <p className="text-muted text-sm md:text-base font-medium">High volume commuter transit center. Fleet deployment scaled up.</p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 mb-10">
              <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-card !p-8 relative overflow-hidden border border-[#5C5C3D]/30 shadow-[0_0_40px_rgba(92,92,61,0.05)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#5C5C3D] opacity-[0.05] rounded-bl-full pointer-events-none"></div>
                <h3 className="text-xl font-black tracking-tight flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-[#c2c286]">groups</span> Mass Transit Queue
                </h3>
                <div className="flex items-center justify-between mb-8 p-6 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)]">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted mb-1">Assigned Units</p>
                    <p className="text-3xl font-black text-[#c2c286]">3</p>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted mb-1">Active Waitlist</p>
                    <p className="text-3xl font-black text-main">28</p>
                  </div>
                  <div className="w-px h-12 bg-[var(--border)]"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted mb-1">Avg Wait Time</p>
                    <p className="text-3xl font-black text-rose-500">8m 45s</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { id: "SV-112", status: "Boarding", color: "text-[#c2c286]", bg: "bg-[#5C5C3D]/20" },
                    { id: "SV-309", status: "En Route (2m)", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { id: "SV-201", status: "En Route (4m)", color: "text-amber-500", bg: "bg-amber-500/10" }
                  ].map((unit, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-[var(--background)] rounded-xl border border-[var(--border)]">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-muted text-sm">airport_shuttle</span>
                        <span className="font-bold text-sm">{unit.id}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${unit.bg} ${unit.color} px-3 py-1 rounded-lg`}>{unit.status}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)] flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black tracking-tight mb-2">Demand Spike Detected</h3>
                  <p className="text-sm text-muted">A surge of students from the university campus has caused a localized queue buildup.</p>
                </div>
                <div className="py-8 flex justify-center">
                   <div className="w-32 h-32 rounded-full border-[8px] border-[#5C5C3D]/20 flex items-center justify-center border-t-[#c2c286] animate-spin">
                     <span className="material-symbols-outlined text-4xl text-[#c2c286] animate-none">warning</span>
                   </div>
                </div>
                <button onClick={() => navigate('/deploy-units')} className="w-full py-3 btn-secondary !bg-[#5C5C3D]/20 !text-[#c2c286] border-[#5C5C3D]/30 !text-[10px]">Request More Units</button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
export default ClusterMissionHubPage;
