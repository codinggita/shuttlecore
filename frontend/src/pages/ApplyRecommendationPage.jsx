import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ApplyRecommendationPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [status, setStatus] = useState({
    clusterMoved: false,
    routeOptimized: false,
    fleetRebalanced: false,
    signalSync: false,
  });
  const [impacts, setImpacts] = useState({
    dwellTime: -8.0,
    routingLatency: -14.0,
    fleetCoverage: 22.0,
    queueWait: -6.0
  });

  // Real-time update simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      setImpacts(prev => ({
        dwellTime: prev.dwellTime + (Math.random() * 0.2 - 0.1),
        routingLatency: prev.routingLatency + (Math.random() * 0.4 - 0.2),
        fleetCoverage: prev.fleetCoverage + (Math.random() * 0.6 - 0.3),
        queueWait: prev.queueWait + (Math.random() * 0.2 - 0.1)
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (title, desc, type = "success") => {
    setToast({ title, desc, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleApplyAll = () => {
    setStatus({ clusterMoved: true, routeOptimized: true, fleetRebalanced: true, signalSync: true });
    showToast("All Recommendations Applied", "Cluster #2 repositioned. Routes optimized. Fleet rebalanced. Signals synced.", "success");
  };

  const handleAction = (key, title, desc) => {
    setStatus(prev => ({ ...prev, [key]: true }));
    showToast(title, desc, "success");
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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const allApplied = Object.values(status).every(Boolean);

  const recommendations = [
    {
      key: "clusterMoved",
      icon: "moving",
      color: "text-[var(--primary)]",
      bg: "bg-[var(--primary)]/10",
      border: "border-[var(--primary)]/30",
      title: "Reposition Cluster #2",
      desc: "Move Cluster #2 pickup point 40 meters North to align with peak pedestrian footfall patterns from the university corridor.",
      btnLabel: "Execute Reposition",
      onApply: () => handleAction("clusterMoved", "Cluster #2 Repositioned", "Pickup point moved 40m North. Dwell time reducing."),
    },
    {
      key: "routeOptimized",
      icon: "alt_route",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      title: "Optimize Route Vector",
      desc: "Switch Sector 7 routing from Fixed Corridors to Neural Mesh. Algorithm predicts 14% improvement in delivery latency.",
      btnLabel: "Switch to Neural Mesh",
      onApply: () => handleAction("routeOptimized", "Route Vector Updated", "Sector 7 now running on Neural Mesh protocol."),
    },
    {
      key: "fleetRebalanced",
      icon: "airport_shuttle",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      title: "Rebalance Fleet Density",
      desc: "Redistribute 3 idle units from low-demand West Campus to high-demand North Financial Plaza to improve coverage.",
      btnLabel: "Rebalance Fleet",
      onApply: () => handleAction("fleetRebalanced", "Fleet Rebalanced", "3 units redirected to North Financial Plaza."),
    },
    {
      key: "signalSync",
      icon: "sensors",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      title: "Sync Traffic Signal API",
      desc: "Enable V2X signal priority for designated shuttle lanes on District 2 arterials to reduce intersection hold times.",
      btnLabel: "Enable V2X Sync",
      onApply: () => handleAction("signalSync", "V2X Signal Sync Active", "Shuttle lanes now have traffic signal priority."),
    },
  ];

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 font-sans relative">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border whitespace-nowrap ${
              toast.type === "success"
                ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
                : "bg-rose-500/20 border-rose-500/30 text-rose-400"
            }`}
          >
            <span className="material-symbols-outlined">{toast.type === "success" ? "check_circle" : "warning"}</span>
            <div>
              <p className="font-black tracking-tight">{toast.title}</p>
              <p className="text-xs font-medium opacity-80">{toast.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter">SHUTTLE<span className="opacity-70">CORE</span></span>
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
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
          <div className="flex-1" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn">
            <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto">
            {/* Page Header */}
            <motion.div variants={itemVariants} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Heatmaps
                </button>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                    <span className="material-symbols-outlined text-[var(--primary)] text-2xl">psychology</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-main tracking-tighter">Terra Intelligence</h1>
                </div>
                <p className="text-muted text-sm md:text-base font-medium">AI-generated optimization recommendations for your active fleet network.</p>
              </div>
              {!allApplied ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleApplyAll}
                  className="btn-primary !px-8 !py-4 flex items-center gap-3 text-sm shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]"
                >
                  <span className="material-symbols-outlined">auto_fix_high</span>
                  Apply All Recommendations
                </motion.button>
              ) : (
                <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-2xl">
                  <span className="material-symbols-outlined text-emerald-500">verified</span>
                  <span className="font-black text-emerald-500 text-sm uppercase tracking-widest">All Applied</span>
                </div>
              )}
            </motion.div>

            {/* Impact Summary Bar */}
            <motion.div variants={itemVariants} className="dashboard-card !p-6 mb-8 border border-[var(--primary)]/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.05)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-[var(--border)]">
                {[
                  { label: "Dwell Time Reduction", value: `${impacts.dwellTime.toFixed(1)}%`, icon: "timer", color: "text-[var(--primary)]" },
                  { label: "Routing Latency", value: `${impacts.routingLatency.toFixed(1)}%`, icon: "speed", color: "text-emerald-400" },
                  { label: "Fleet Coverage", value: `+${impacts.fleetCoverage.toFixed(1)}%`, icon: "airport_shuttle", color: "text-amber-400" },
                  { label: "Queue Wait", value: `${impacts.queueWait.toFixed(1)}%`, icon: "queue", color: "text-rose-400" },
                ].map((stat, i) => (
                  <div key={i} className="text-center px-4">
                    <span className={`material-symbols-outlined text-2xl mb-2 block ${stat.color}`}>{stat.icon}</span>
                    <p className={`text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommendation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {recommendations.map((rec) => {
                const isApplied = status[rec.key];
                
                // Get the live impact value based on the key
                let liveImpact = "";
                if (rec.key === "clusterMoved") liveImpact = `${impacts.dwellTime.toFixed(1)}% Dwell Time`;
                if (rec.key === "routeOptimized") liveImpact = `${impacts.routingLatency.toFixed(1)}% Latency`;
                if (rec.key === "fleetRebalanced") liveImpact = `${impacts.fleetCoverage.toFixed(1)}% Coverage`;
                if (rec.key === "signalSync") liveImpact = `${impacts.queueWait.toFixed(1)}% Queue Wait`;

                return (
                  <motion.div
                    key={rec.key}
                    variants={itemVariants}
                    className={`dashboard-card !p-8 border ${rec.border} relative overflow-hidden group`}
                  >
                    <div className={`absolute top-0 right-0 p-6 ${rec.color} font-black text-[10px] uppercase tracking-widest bg-[var(--background)]/40 backdrop-blur-md rounded-bl-2xl border-l border-b ${rec.border}`}>
                      {liveImpact}
                    </div>
                    
                    <div className="flex items-start gap-6 mb-8">
                      <div className={`w-14 h-14 ${rec.bg} ${rec.color} rounded-2xl flex items-center justify-center border ${rec.border} group-hover:scale-110 transition-transform duration-500`}>
                        <span className="material-symbols-outlined text-2xl">{rec.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-main mb-2 tracking-tight">{rec.title}</h3>
                        <p className="text-sm text-muted leading-relaxed font-medium">{rec.desc}</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: isApplied ? 1 : 1.02 }}
                      whileTap={{ scale: isApplied ? 1 : 0.98 }}
                      onClick={rec.onApply}
                      disabled={isApplied}
                      className={`w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                        isApplied 
                        ? "bg-white/5 border-white/10 text-muted opacity-50 cursor-not-allowed" 
                        : `${rec.bg} ${rec.color} ${rec.border} hover:opacity-80`
                      }`}
                    >
                      {isApplied ? "Already Applied" : rec.btnLabel}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            <footer className="mt-12 border-t border-[var(--border)] py-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-[var(--text-main)] font-black tracking-tighter text-2xl hover:opacity-80 transition-opacity">
                  <span className="material-symbols-outlined text-xl">arrow_back</span> ShuttleCore
                </Link>
                <span className="text-[11px] text-[var(--text-muted)] font-bold opacity-40">© 2024 ShuttleCore Logistics Systems.</span>
              </div>
            </footer>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ApplyRecommendationPage;
