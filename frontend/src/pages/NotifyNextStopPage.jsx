import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const NotifyNextStopPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [notifStatus, setNotifStatus] = useState({ sms: false, push: false, dispatch: false });
  const [isSent, setIsSent] = useState(false);

  const showToast = (title, desc, type = "success") => {
    setToast({ title, desc, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSendAll = () => {
    setNotifStatus({ sms: true, push: true, dispatch: true });
    setIsSent(true);
    showToast("All Notifications Sent", "Port Imperial Ferry Terminal notified across all channels.", "success");
  };

  const handleSendChannel = (key, label) => {
    setNotifStatus(prev => ({ ...prev, [key]: true }));
    showToast(`${label} Sent`, `Notification dispatched via ${label}.`, "success");
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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  const channels = [
    { key: "sms", icon: "sms", label: "SMS Alert", desc: "Text message to stop coordinator: +1 (201) 555-0194", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { key: "push", icon: "notifications_active", label: "Push Notification", desc: "App alert to 7 waiting passengers via ShuttleCore rider app", color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10", border: "border-[var(--primary)]/20" },
    { key: "dispatch", icon: "radio", label: "Dispatch Radio", desc: "Automated broadcast to terminal operations center (Channel 7)", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 font-sans relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border whitespace-nowrap ${
              toast.type === "success" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-rose-500/20 border-rose-500/30 text-rose-400"
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
              <motion.button
                key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}
              >
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg z-30">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn">
            <span className="material-symbols-outlined">menu</span>
          </motion.button>
          <div className="flex-1" />
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn">
            <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl mx-auto min-h-[80vh] flex flex-col">

            {/* Header */}
            <motion.div variants={itemVariants} className="mb-10">
              <button onClick={() => navigate("/fleet")} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Fleet
              </button>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--primary)] text-2xl">schedule_send</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-main tracking-tighter">Notify Next Stop</h1>
              </div>
              <p className="text-muted text-sm md:text-base font-medium">Dispatch an advance arrival notification to the scheduled next stop.</p>
            </motion.div>

            {/* Destination Card */}
            <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--primary)]/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.05)] mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-6">Destination Details</h3>
              <div className="flex items-start gap-5 mb-8 pb-8 border-b border-[var(--border)]">
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--primary)] text-2xl">place</span>
                </div>
                <div>
                  <p className="text-xl font-black text-main">Port Imperial Ferry Terminal</p>
                  <p className="text-sm text-muted font-bold">Weehawken, NJ · Stop ID: PIF-009</p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-lg border border-[var(--primary)]/20">Next Vector</span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg border border-amber-500/20">ETA: 14:02</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[{ label: "Distance", value: "2.4 km" }, { label: "Passengers Waiting", value: "7 confirmed" }, { label: "Time to Arrival", value: "T−5 minutes" }].map((item, i) => (
                  <div key={i} className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-1">{item.label}</p>
                    <p className="text-sm font-black text-main">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notification Channels */}
            <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)] mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-6">Notification Channels</h3>
              <div className="space-y-4">
                {channels.map((ch) => (
                  <div key={ch.key} className={`flex items-center justify-between p-5 rounded-2xl border ${ch.border} ${ch.bg}`}>
                    <div className="flex items-center gap-4">
                      <span className={`material-symbols-outlined ${ch.color}`}>{ch.icon}</span>
                      <div>
                        <p className="font-black text-sm text-main">{ch.label}</p>
                        <p className="text-[10px] text-muted font-medium">{ch.desc}</p>
                      </div>
                    </div>
                    {notifStatus[ch.key] ? (
                      <span className={`text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1`}>
                        <span className="material-symbols-outlined text-sm">check_circle</span> Sent
                      </span>
                    ) : (
                      <button onClick={() => handleSendChannel(ch.key, ch.label)} className={`text-[10px] font-black uppercase tracking-widest ${ch.color} border ${ch.border} px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity`}>
                        Send
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div variants={itemVariants} className="flex gap-4">
              <button onClick={() => navigate("/fleet")} className="btn-secondary !px-8 !py-4 flex-1">Cancel</button>
              {!isSent ? (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSendAll}
                  className="flex-1 py-4 btn-primary flex items-center justify-center gap-3 text-sm shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
                  <span className="material-symbols-outlined">send</span> Send All Notifications
                </motion.button>
              ) : (
                <div className="flex-1 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-3 text-emerald-400 font-black text-sm uppercase tracking-widest">
                  <span className="material-symbols-outlined">verified</span> All Channels Notified
                </div>
              )}
            </motion.div>

          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NotifyNextStopPage;
