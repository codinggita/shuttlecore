import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const DeployUnitsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDeploymentProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity" title="Back to Home">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20 transition-all">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">
              SHUTTLE<span className="text-[var(--text-main)] opacity-70">CORE</span>
            </span>
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
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg transition-colors duration-300 z-30">
          <div className="flex items-center gap-4 flex-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn">
              <span className="material-symbols-outlined">menu</span>
            </motion.button>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn" title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </motion.button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto min-h-[80vh] flex flex-col">
            <motion.div variants={itemVariants} className="mb-10">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Dispatch
              </button>
              <h1 className="text-3xl md:text-5xl font-black text-main mb-2 tracking-tighter">Deployment Sequence</h1>
              <p className="text-muted text-sm md:text-base font-medium">Authorizing 4 idle units for North Sector repositioning.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Deployment Status */}
              <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-card !p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-[0.03] rounded-bl-full pointer-events-none"></div>
                <h3 className="text-xl font-black tracking-tight mb-8">Active Repositioning</h3>
                
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-[var(--border)]" />
                      <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="552" strokeDashoffset={552 - (552 * deploymentProgress) / 100} className="text-[var(--primary)] transition-all duration-300" />
                    </svg>
                    <div className="text-center">
                      <span className="text-4xl font-black tracking-tighter">{deploymentProgress}%</span>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted mt-1">Completion</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-main mb-2">{deploymentProgress === 100 ? "Units Successfully Deployed" : "Routing Units to North Sector..."}</h4>
                  <p className="text-sm text-muted text-center max-w-sm">
                    {deploymentProgress === 100 
                      ? "All 4 units have successfully established connection with the North Sector transponder grid. Ready for operation."
                      : "Establishing secure V2X communication links and vectoring paths through dense zones."}
                  </p>
                </div>
              </motion.div>

              {/* Units List */}
              <motion.div variants={itemVariants} className="dashboard-card !p-6 flex flex-col">
                <h3 className="text-sm font-black tracking-widest uppercase text-muted mb-6">Assigned Units</h3>
                <div className="space-y-4">
                  {[
                    { id: "SV-402", eta: "1m 12s", status: "In Transit", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { id: "SV-405", eta: "Arrived", status: "Docked", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { id: "SV-408", eta: "2m 45s", status: "In Transit", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { id: "SV-412", eta: "Arrived", status: "Docked", color: "text-emerald-500", bg: "bg-emerald-500/10" }
                  ].map((unit, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)]">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${unit.color} ${unit.bg}`}>
                          {unit.id.split('-')[1]}
                        </div>
                        <div>
                          <p className="font-black text-[13px]">{unit.id}</p>
                          <p className={`text-[10px] uppercase tracking-wider font-bold ${unit.color}`}>{unit.status}</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-black opacity-60">{unit.eta}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <footer className="mt-12 border-t border-[var(--border)] py-12 mt-auto">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity">
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

export default DeployUnitsPage;
