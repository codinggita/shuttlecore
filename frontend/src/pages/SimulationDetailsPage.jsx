import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SimulationDetailsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [performance, setPerformance] = useState({
    throughput: 98.4,
    latency: 14,
    packetLoss: 0.01
  });
  const [logs, setLogs] = useState([
    { time: "14:02:11", msg: "ROUTE_CALC: Node_Alpha_Active", color: "text-emerald-400" },
    { time: "14:02:14", msg: "V2X_SYNC: Distributing payloads", color: "text-main" },
    { time: "14:02:18", msg: "WARN: Vector_Path_Congested", color: "text-amber-400" },
    { time: "14:02:22", msg: "REROUTE: Executing Swarm Logic", color: "text-main" },
    { time: "14:02:25", msg: "OPTIMIZED: Latency reduced by 14%", color: "text-emerald-400" },
  ]);

  // Real-time update simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      // Fluctuate performance
      setPerformance(prev => ({
        throughput: Math.min(100, Math.max(95, prev.throughput + (Math.random() * 0.4 - 0.2))),
        latency: Math.max(8, Math.min(25, prev.latency + (Math.random() > 0.5 ? 1 : -1))),
        packetLoss: Math.max(0.001, Math.min(0.05, prev.packetLoss + (Math.random() * 0.002 - 0.001)))
      }));

      // Update logs
      setLogs(prev => {
        const lastTime = prev[prev.length - 1].time;
        const [h, m, s] = lastTime.split(':').map(Number);
        const nextDate = new Date();
        nextDate.setHours(h, m, s + Math.floor(Math.random() * 5 + 1));
        const newTime = nextDate.toLocaleTimeString([], { hour12: false });
        
        const possibleMsgs = [
          { msg: "SYNC: Mesh_Node_Handshake", color: "text-main" },
          { msg: "OPTIMIZED: Vector_Cache_Flush", color: "text-emerald-400" },
          { msg: "INFO: Swarm_Expansion_Ready", color: "text-main" },
          { msg: "WARN: Uplink_Jitter_Detected", color: "text-amber-400" }
        ];
        const randomMsg = possibleMsgs[Math.floor(Math.random() * possibleMsgs.length)];
        return [...prev.slice(1), { time: newTime, ...randomMsg }];
      });
    }, 1000);
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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
                Back to Dashboard
              </button>
              <h1 className="text-3xl md:text-5xl font-black text-main mb-2 tracking-tighter">Simulation Features</h1>
              <p className="text-muted text-sm md:text-base font-medium">Advanced routing engine diagnostics and neural mesh telemetry.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
              {/* Telemetry Logs */}
              <motion.div variants={itemVariants} className="dashboard-card !p-8 border-[var(--border)] border shadow-[0_0_30px_rgba(var(--primary-rgb),0.05)] flex flex-col">
                <h3 className="text-xl font-black text-main tracking-tight mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[var(--primary)]">radar</span>
                  Neural Mesh Telemetry
                </h3>
                <div className="bg-[var(--background)] rounded-2xl p-5 font-mono text-[11px] space-y-4 flex-1 border border-[var(--border)] shadow-inner">
                  {logs.map((log, i) => (
                    <p key={i} className="flex gap-4">
                      <span className="text-[var(--text-muted)] opacity-50 w-16">{log.time}</span>
                      <span className={`${log.color} font-bold`}>{log.msg}</span>
                    </p>
                  ))}
                  <p className="flex gap-4"><span className="text-[var(--text-muted)] opacity-50 w-16">LIVE</span><span className="text-main animate-pulse">Awaiting next packet...</span></p>
                </div>
              </motion.div>

              {/* Engine Metrics */}
              <motion.div variants={itemVariants} className="dashboard-card !p-8 border-[var(--border)] border shadow-[0_0_30px_rgba(var(--primary-rgb),0.05)]">
                <h3 className="text-xl font-black text-main tracking-tight mb-6 flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-500">speed</span>
                  Simulation Performance
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-2">
                      <span className="text-muted">Throughput</span>
                      <span className="text-main">{performance.throughput.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000" style={{ width: `${performance.throughput}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-2">
                      <span className="text-muted">Latency Offset</span>
                      <span className="text-main">{performance.latency}ms</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-1000" style={{ width: `${(performance.latency/30)*100}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-2">
                      <span className="text-muted">Packet Loss</span>
                      <span className="text-main">{performance.packetLoss.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${Math.min(100, performance.packetLoss*1000)}%` }}></div>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)] flex justify-between items-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-muted">Active Protocol</p>
                      <p className="text-lg font-black text-main mt-1">SWARM-V4</p>
                    </div>
                    <button onClick={() => navigate("/dashboard")} className="btn-primary !py-2 !px-6 !text-[10px]">Return</button>
                  </div>
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

export default SimulationDetailsPage;
