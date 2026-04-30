import React, { useState, useEffect } from "react";
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

  // Real-time telemetry state
  const [distance, setDistance] = useState(2.4);
  const [passengers, setPassengers] = useState(7);
  const [rawEtaSecs, setRawEtaSecs] = useState(300); // 5 minutes in seconds

  const formatEta = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `T−${mins}m ${secs}s`;
  };

  const getExactTime = (seconds) => {
    const now = new Date();
    const future = new Date(now.getTime() + seconds * 1000);
    return future.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Real-time update simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Decrement distance slightly (simulating movement)
      setDistance(prev => Math.max(0, prev - 0.01));
      
      // Decrement ETA
      setRawEtaSecs(prev => Math.max(0, prev - 1));

      // Randomly fluctuate passenger count (simulating live check-ins)
      if (Math.random() > 0.95) {
        setPassengers(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

  const channels = [
    { key: "sms", icon: "sms", label: "SMS Alert", desc: "Text message to stop coordinator: +1 (201) 555-0194", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { key: "push", icon: "notifications_active", label: "Push Notification", desc: `App alert to ${passengers} waiting passengers via ShuttleCore rider app`, color: "text-[var(--primary)]", bg: "bg-[var(--primary)]/10", border: "border-[var(--primary)]/20" },
    { key: "dispatch", icon: "radio", label: "Dispatch Radio", desc: "Automated broadcast to terminal operations center (Channel 7)", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  ];

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 font-sans relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border whitespace-nowrap ${
              toast.type === "success" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-rose-500/20 border-rose-500/30 text-rose-400"
            }`}
          >
            <span className="material-symbols-outlined">{toast.type === "success" ? "check_circle" : "warning"}</span>
            <div><p className="font-black tracking-tight uppercase text-xs">{toast.title}</p><p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-0.5">{toast.desc}</p></div>
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
          <div className="flex items-center gap-3 bg-[var(--surface-muted)] px-4 py-2 rounded-xl border border-[var(--border)]">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Live Vectoring Active</span>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn">
            <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl mx-auto min-h-[80vh] flex flex-col">

            <motion.div variants={itemVariants} className="mb-10">
              <button onClick={() => navigate("/fleet")} className="flex items-center gap-2 text-xs font-black text-muted hover:text-main transition-colors mb-6 uppercase tracking-[0.2em]">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Fleet
              </button>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center shadow-2xl">
                  <span className="material-symbols-outlined text-[var(--primary)] text-3xl animate-pulse">schedule_send</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-main tracking-tighter">Notify Next Stop</h1>
              </div>
              <p className="text-muted text-sm md:text-base font-medium opacity-70">Dispatch an advance arrival notification to the scheduled terminal nodes.</p>
            </motion.div>

            <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--primary)]/20 shadow-[0_0_50px_rgba(var(--primary-rgb),0.05)] mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-muted mb-8 opacity-60">Destination Details</h3>
              <div className="flex items-start gap-6 mb-8 pb-8 border-b border-[var(--border)]">
                <div className="w-16 h-16 rounded-[24px] bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center shadow-xl">
                  <span className="material-symbols-outlined text-[var(--primary)] text-3xl">location_on</span>
                </div>
                <div>
                  <p className="text-2xl font-black text-main tracking-tight">Port Imperial Ferry Terminal</p>
                  <p className="text-sm text-muted font-black uppercase tracking-widest mt-1 opacity-60">Weehawken, NJ · Stop ID: PIF-009</p>
                  <div className="flex gap-3 mt-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-xl border border-emerald-500/20 shadow-lg shadow-emerald-500/5 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Next Vector</span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 px-4 py-1.5 rounded-xl border border-amber-500/20 shadow-lg shadow-amber-500/5">ETA: {getExactTime(rawEtaSecs)}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { label: "Distance", value: `${distance.toFixed(2)} km`, icon: "route" }, 
                  { label: "Passengers", value: `${passengers} Confirmed`, icon: "group" }, 
                  { label: "Time to Arrival", value: formatEta(rawEtaSecs), icon: "timer" }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-[var(--surface-muted)]/50 rounded-2xl border border-[var(--border)] hover:border-muted transition-all">
                    <div className="flex items-center gap-2 mb-2 opacity-50">
                      <span className="material-symbols-outlined text-xs">{item.icon}</span>
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted">{item.label}</p>
                    </div>
                    <p className="text-lg font-black text-main tracking-tighter">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)] mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.25em] text-muted mb-8 opacity-60">Notification Channels</h3>
              <div className="space-y-4">
                {channels.map((ch) => (
                  <div key={ch.key} className={`flex items-center justify-between p-6 rounded-[24px] border ${ch.border} ${ch.bg} transition-all duration-500 hover:scale-[1.01]`}>
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner`}>
                        <span className={`material-symbols-outlined ${ch.color} text-2xl`}>{ch.icon}</span>
                      </div>
                      <div>
                        <p className="font-black text-[15px] text-main tracking-tight">{ch.label}</p>
                        <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5 opacity-70">{ch.desc}</p>
                      </div>
                    </div>
                    {notifStatus[ch.key] ? (
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-lg">verified</span> Dispatched
                      </span>
                    ) : (
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSendChannel(ch.key, ch.label)} className={`text-[10px] font-black uppercase tracking-[0.25em] ${ch.color} border-2 ${ch.border} px-5 py-2.5 rounded-xl hover:bg-white/5 transition-all shadow-xl`}>
                        Send
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 mt-auto">
              <button onClick={() => navigate("/fleet")} className="btn-secondary !px-8 !py-5 flex-1 !rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] border-2">Cancel Sequence</button>
              {!isSent ? (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSendAll}
                  className="flex-1 py-5 bg-[var(--primary)] text-white rounded-2xl flex items-center justify-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-[var(--primary)]/20 hover:opacity-90 transition-all">
                  <span className="material-symbols-outlined animate-bounce">send</span> Dispatch All
                </motion.button>
              ) : (
                <div className="flex-1 py-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center gap-4 text-emerald-400 font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-emerald-500/10">
                  <span className="material-symbols-outlined text-xl">verified</span> Broadcast Successful
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
