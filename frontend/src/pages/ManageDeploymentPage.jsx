import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ManageDeploymentPage = () => {
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

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto min-h-[80vh] flex flex-col">
            <motion.div variants={itemVariants} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Back to Dashboard
                </button>
                <h1 className="text-3xl md:text-5xl font-black text-main mb-2 tracking-tighter">Manage Deployment</h1>
                <p className="text-muted text-sm md:text-base font-medium">Global fleet distribution and active resource vectoring.</p>
              </div>
              <div className="flex gap-4">
                <button className="btn-secondary !px-6 !py-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">pause_circle</span> Suspend All
                </button>
                <button className="btn-primary !px-6 !py-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">add</span> Add Unit
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
              {/* Active Deployment Queue */}
              <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-card !p-8 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)] opacity-[0.03] rounded-bl-full pointer-events-none"></div>
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-3">
                    <span className="material-symbols-outlined text-[var(--primary)]">route</span>
                    Active Deployments
                  </h3>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">Live Sync</span>
                </div>
                
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    { id: "SV-402", route: "Sector 7 → Alpha Grid", status: "En Route", progress: 65, color: "bg-emerald-500", text: "text-emerald-500" },
                    { id: "SV-881", route: "District 2 → North Hub", status: "Vectoring", progress: 20, color: "bg-amber-500", text: "text-amber-500" },
                    { id: "SV-209", route: "Terminal B → Maintenance", status: "Returning", progress: 90, color: "bg-rose-500", text: "text-rose-500" },
                    { id: "SV-553", route: "West Campus → South Hub", status: "En Route", progress: 45, color: "bg-emerald-500", text: "text-emerald-500" }
                  ].map((unit, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] hover:border-[var(--primary)]/30 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm border border-white/5 ${unit.text} bg-white/5 shadow-inner`}>
                            {unit.id.split('-')[1]}
                          </div>
                          <div>
                            <p className="font-black text-base">{unit.id}</p>
                            <p className="text-[11px] text-muted font-bold uppercase tracking-widest">{unit.route}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${unit.text}`}>{unit.status}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                        <div className={`h-full ${unit.color} shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]`} style={{ width: `${unit.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Resource Allocation */}
              <motion.div variants={itemVariants} className="dashboard-card !p-6 flex flex-col">
                <h3 className="text-xl font-black tracking-tight mb-8">Resource Allocation</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-2">
                      <span className="text-muted">Available Units</span>
                      <span className="text-main">24 / 50</span>
                    </div>
                    <div className="h-2 w-full bg-[var(--surface)] rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500 w-[48%]"></div>
                      <div className="h-full bg-amber-500 w-[12%]"></div>
                      <div className="h-full bg-rose-500 w-[40%]"></div>
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-emerald-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active</span>
                      <span className="text-amber-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Maintenance</span>
                      <span className="text-rose-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Offline</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[var(--border)]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mb-4">Urgent Alerts</h4>
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-start gap-3">
                      <span className="material-symbols-outlined text-rose-500 text-lg">warning</span>
                      <div>
                        <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">Sector 4 Demand Spike</p>
                        <p className="text-[10px] text-muted font-medium">3 units required to stabilize queue times.</p>
                        <button className="mt-3 text-[10px] font-black uppercase tracking-widest text-main underline decoration-white/20 underline-offset-4 hover:text-[var(--primary)] transition-colors">Resolve Now</button>
                      </div>
                    </div>
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

export default ManageDeploymentPage;
