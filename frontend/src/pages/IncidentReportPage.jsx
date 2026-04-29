import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const IncidentReportPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({ severity: "Medium", category: "No-Show", notes: "" });

  const showToast = (title, desc, type = "success") => {
    setToast({ title, desc, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast("Incident Logged", "Report #INC-7721 queued for post-op review.", "success");
  };

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
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 font-sans relative">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border whitespace-nowrap ${toast.type === "success" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-rose-500/20 border-rose-500/30 text-rose-400"}`}>
            <span className="material-symbols-outlined">{toast.type === "success" ? "check_circle" : "warning"}</span>
            <div><p className="font-black tracking-tight">{toast.title}</p><p className="text-xs font-medium opacity-80">{toast.desc}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{isSidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}</AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg"><span className="material-symbols-outlined text-white text-xl">rocket_launch</span></div>
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
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl mx-auto min-h-[80vh] flex flex-col">
            <motion.div variants={itemVariants} className="mb-10">
              <button onClick={() => navigate("/fleet")} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Fleet
              </button>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-500 text-2xl">assignment_late</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-main tracking-tighter">Incident Report</h1>
              </div>
              <p className="text-muted text-sm md:text-base font-medium">Log this no-show event for post-operational review and analytics.</p>
            </motion.div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-amber-500/20">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-6">Auto-Populated Data</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Report ID", value: "#INC-7721" },
                      { label: "Unit", value: "Unit-42-Bravo" },
                      { label: "Passenger", value: "Marcus Thorne" },
                      { label: "Booking", value: "#TX-9012" },
                      { label: "Location", value: "12th Ave & W 54th St" },
                      { label: "Timestamp", value: "14:00:32 UTC" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">{item.label}</p>
                        <p className="text-sm font-black text-main">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)]">
                  <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-6">Classification</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-widest text-muted mb-3">Severity Level</label>
                      <div className="flex gap-3">
                        {["Low", "Medium", "High", "Critical"].map((level) => (
                          <button type="button" key={level} onClick={() => setForm({ ...form, severity: level })}
                            className={`flex-1 py-2.5 rounded-xl border font-black text-xs uppercase tracking-widest transition-all ${form.severity === level ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]" : "border-[var(--border)] text-muted hover:border-[var(--primary)]/30"}`}>
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-widest text-muted mb-3">Category</label>
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-main focus:outline-none focus:border-[var(--primary)] transition-colors">
                        <option>No-Show</option>
                        <option>Late Arrival</option>
                        <option>Vehicle Malfunction</option>
                        <option>Safety Concern</option>
                        <option>Route Deviation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-widest text-muted mb-3">Operator Notes</label>
                      <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                        placeholder="Add any additional context for post-op review..."
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-main focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" />
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-4">
                  <button type="button" onClick={() => navigate("/fleet")} className="btn-secondary !px-8 !py-4 flex-1">Cancel</button>
                  <button type="submit" className="flex-1 py-4 btn-primary flex items-center justify-center gap-3 text-sm">
                    <span className="material-symbols-outlined">send</span> Submit Report
                  </button>
                </motion.div>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="dashboard-card !p-12 border border-emerald-500/20 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                  <span className="material-symbols-outlined text-5xl text-emerald-500">task_alt</span>
                </div>
                <h2 className="text-2xl font-black text-main mb-2">Report Submitted</h2>
                <p className="text-muted text-sm max-w-md mb-2">Incident #INC-7721 has been logged and queued for post-operational review.</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-8">Severity: {form.severity} · Category: {form.category}</p>
                <button onClick={() => navigate("/fleet")} className="btn-primary !px-10 !py-3">Return to Fleet</button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default IncidentReportPage;
