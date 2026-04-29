import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const AddUnitPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    unitId: "SV-",
    model: "Shuttle Class V",
    route: "",
    status: "Active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call and state update
    setIsSubmitted(true);
    setTimeout(() => {
      // Return after a delay or let user click back
    }, 3000);
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
      {/* Toast Notification for Success */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-[100] bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.2)] flex items-center gap-3 backdrop-blur-md"
          >
            <span className="material-symbols-outlined">check_circle</span>
            <div>
              <p className="font-black tracking-tight">Successfully Added Unit</p>
              <p className="text-xs font-medium opacity-80">{formData.unitId} is now actively registered in the fleet.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl mx-auto min-h-[80vh] flex flex-col">
            <motion.div variants={itemVariants} className="mb-10">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Manage Deployment
              </button>
              <h1 className="text-3xl md:text-5xl font-black text-main mb-2 tracking-tighter">Add New Unit</h1>
              <p className="text-muted text-sm md:text-base font-medium">Register a new fleet asset into the active operational network.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)] relative overflow-hidden flex-1">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-widest text-muted mb-2">Unit ID Identifier</label>
                      <input 
                        type="text" 
                        required
                        value={formData.unitId}
                        onChange={(e) => setFormData({...formData, unitId: e.target.value})}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-main focus:outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black uppercase tracking-widest text-muted mb-2">Vehicle Model</label>
                      <select 
                        value={formData.model}
                        onChange={(e) => setFormData({...formData, model: e.target.value})}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-main focus:outline-none focus:border-[var(--primary)] transition-colors"
                      >
                        <option value="Shuttle Class V">Shuttle Class V</option>
                        <option value="Shuttle Class X (Articulated)">Shuttle Class X (Articulated)</option>
                        <option value="Mini-Pod Transit">Mini-Pod Transit</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-black uppercase tracking-widest text-muted mb-2">Initial Route Vector</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Sector 7 → Alpha Grid"
                        value={formData.route}
                        onChange={(e) => setFormData({...formData, route: e.target.value})}
                        className="w-full bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm font-bold text-main focus:outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-black uppercase tracking-widest text-muted mb-2">Operational Status</label>
                      <div className="flex gap-4">
                        {['Active', 'Standby', 'Maintenance'].map((status) => (
                          <button
                            type="button"
                            key={status}
                            onClick={() => setFormData({...formData, status})}
                            className={`flex-1 py-3 rounded-xl border font-bold text-xs uppercase tracking-widest transition-all ${formData.status === status ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]' : 'border-[var(--border)] bg-[var(--background)] text-muted hover:border-[var(--primary)]/30'}`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-8 mt-4 border-t border-[var(--border)] flex justify-end gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="btn-secondary !px-8 !py-3">Cancel</button>
                    <button type="submit" className="btn-primary !px-8 !py-3 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">add</span> Register Unit
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-12 h-full">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
                    <span className="material-symbols-outlined text-5xl text-emerald-500">done_all</span>
                  </div>
                  <h3 className="text-2xl font-black text-main mb-2">Registration Complete</h3>
                  <p className="text-muted text-sm mb-8 max-w-md">The new unit has been successfully registered into the core system and is broadcasting telemetry.</p>
                  
                  <div className="w-full max-w-md bg-[var(--background)] rounded-2xl border border-[var(--border)] p-6 mb-8 text-left space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--border)]">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Identifier</span>
                      <span className="text-sm font-black text-main">{formData.unitId}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--border)]">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Model</span>
                      <span className="text-sm font-black text-main">{formData.model}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--border)]">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Route</span>
                      <span className="text-sm font-black text-main">{formData.route}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted">Status</span>
                      <span className="text-[10px] uppercase tracking-widest font-black bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-1 rounded">{formData.status}</span>
                    </div>
                  </div>

                  <button onClick={() => navigate('/manage-deployment', { state: { newUnit: formData } })} className="btn-primary !px-8 !py-3">Return to Deployments</button>
                </div>
              )}
            </motion.div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AddUnitPage;
