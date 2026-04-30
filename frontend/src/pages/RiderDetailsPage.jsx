import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const RiderDetailsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [contactStep, setContactStep] = useState("details"); // "details" | "calling" | "done"

  const showToast = (title, desc, type = "success") => {
    setToast({ title, desc, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleContact = () => {
    setContactStep("calling");
    setTimeout(() => {
      setContactStep("done");
      showToast("Call Connected", "Marcus Thorne has been reached. Awaiting response.", "success");
    }, 2500);
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

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 font-sans relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md border whitespace-nowrap ${
              toast.type === "error" ? "bg-rose-500/20 border-rose-500/30 text-rose-400" : "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
            }`}
          >
            <span className="material-symbols-outlined">{toast.type === "error" ? "warning" : "check_circle"}</span>
            <div>
              <p className="font-black tracking-tight">{toast.title}</p>
              <p className="text-xs font-medium opacity-80">{toast.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSidebarOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
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
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-3xl mx-auto min-h-[80vh] flex flex-col">
            <motion.div variants={itemVariants} className="mb-10">
              <button onClick={() => navigate("/fleet")} className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Fleet
              </button>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[var(--primary)] text-2xl">call</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-main tracking-tighter">Rider Details</h1>
              </div>
              <p className="text-muted text-sm md:text-base font-medium">Review passenger profile before initiating contact.</p>
            </motion.div>

            {/* Rider Profile Card */}
            <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)] mb-6">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[var(--border)]">
                <div className="w-20 h-20 rounded-3xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-3xl font-black text-[var(--primary)]">MT</div>
                <div className="flex-1">
                  <p className="text-2xl font-black text-main">Marcus Thorne</p>
                  <p className="text-sm text-muted font-bold mb-2">Booking #TX-9012 · VIP Tier</p>
                  <div className="flex gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg border border-amber-500/20">VIP</span>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-400 px-3 py-1 rounded-lg border border-rose-500/20">No-Show Risk</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { label: "Phone", value: "+1 (212) 555-0183", icon: "call" },
                  { label: "Email", value: "m.thorne@vip.corp", icon: "mail" },
                  { label: "Pickup", value: "North Financial Plaza", icon: "location_on" },
                  { label: "Destination", value: "Central Hub Terminal", icon: "flag" },
                  { label: "Scheduled", value: "14:00 UTC", icon: "schedule" },
                  { label: "Last Contact", value: "12 mins ago", icon: "history" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                    <span className="material-symbols-outlined text-muted text-sm mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted">{item.label}</p>
                      <p className="text-sm font-bold text-main mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Action */}
              {contactStep === "details" && (
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleContact}
                  className="w-full py-4 btn-primary flex items-center justify-center gap-3 text-sm">
                  <span className="material-symbols-outlined">call</span> Contact Rider Now
                </motion.button>
              )}

              {contactStep === "calling" && (
                <div className="w-full py-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center gap-3 text-amber-400 font-black text-sm uppercase tracking-widest">
                  <span className="material-symbols-outlined animate-pulse">wifi_calling_3</span> Dialling Marcus Thorne...
                </div>
              )}

              {contactStep === "done" && (
                <div className="space-y-4">
                  <div className="w-full py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center gap-3 text-emerald-400 font-black text-sm uppercase tracking-widest">
                    <span className="material-symbols-outlined">check_circle</span> Call Connected Successfully
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => navigate("/finalize-no-show")} className="flex-1 py-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 font-black text-[11px] uppercase tracking-widest hover:brightness-125 transition-all">
                      Finalize No-Show
                    </button>
                    <button onClick={() => navigate("/fleet")} className="flex-1 py-3 btn-secondary font-black text-[11px] uppercase tracking-widest">
                      Return to Fleet
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Ride History */}
            <motion.div variants={itemVariants} className="dashboard-card !p-8 border border-[var(--border)]">
              <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-6">Ride History</h3>
              <div className="space-y-3">
                {[
                  { date: "Apr 28, 2024", route: "Airport T2 → Central Hub", status: "Completed", color: "text-emerald-500" },
                  { date: "Apr 26, 2024", route: "North Plaza → West Campus", status: "Completed", color: "text-emerald-500" },
                  { date: "Apr 22, 2024", route: "Downtown → Airport", status: "No-Show", color: "text-rose-500" },
                ].map((ride, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                    <div>
                      <p className="text-xs font-bold text-main">{ride.route}</p>
                      <p className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">{ride.date}</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${ride.color}`}>{ride.status}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default RiderDetailsPage;
