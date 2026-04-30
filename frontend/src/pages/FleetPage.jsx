import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const FleetPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [waitTimer, setWaitTimer] = useState("03:42");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleFinalizeNoShow = () => {
    navigate("/finalize-no-show");
  };

  const handleAddWaitTime = () => {
    alert("+2 minutes wait time added. Timer extended.");
  };

  const handleManualRecalculate = () => {
    alert("Route manually recalculated based on current fleet positions.");
  };

  const menuItems = [
    {
      id: "simulation",
      label: "Simulation",
      icon: "model_training",
      path: "/dashboard",
    },
    {
      id: "analytics",
      label: "AI Dispatch",
      icon: "query_stats",
      path: "/ai-dispatch",
    },                                                                                                                                                         
    {
      id: "heatmaps",
      label: "Demand Heatmaps",
      icon: "local_fire_department",
      path: "/demand-heatmaps",
    },
    {
      id: "fleet",
      label: "Fleet Management",
      icon: "airport_shuttle",
      path: "/fleet",
    },
    {
      id: "safety",
      label: "Safety & Security",
      icon: "verified_user",
      path: "/safety",
    },
  ];

  const detectionData = [
    {
      label: "Lidar Confirm",
      value: "NO_HUMAN_DETECTED",
      color: "text-emerald-400",
    },
    {
      label: "Mobile Signal",
      value: "STATIONARY_200M_OFFSET",
      color: "text-rose-400",
    },
    { label: "Last Contact", value: "12 mins ago", color: "text-[var(--text-main)]" },
  ];

  const downstreamActions = [
    {
      icon: "schedule_send",
      title: "Notify Next Stop",
      desc: "Scheduled: 14:02 (T-5m)",
      path: "/notify-next-stop",
    },
    {
      icon: "assignment_late",
      title: "Log incident report",
      desc: "Auto-queue for post-op",
      path: "/incident-report",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      {/* Mobile Sidebar Overlay */}
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

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6">
          <Link
            to="/"
            className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity"
            title="Back to Home"
          >
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20 transition-all">
              <span className="material-symbols-outlined text-white text-xl">
                rocket_launch
              </span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">
              SHUTTLE
              <span className="text-[var(--text-main)] opacity-70">CORE</span>
            </span>
          </Link>

          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">
              Operational Hub
            </p>
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}
              >
                <span
                  className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                >
                  {item.icon}
                </span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(244, 63, 94, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              alert("EMERGENCY STOP ACTIVATED: All fleet units halted.")
            }
            className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
          >
            <span className="material-symbols-outlined text-lg animate-pulse">
              emergency_home
            </span>
            Emergency Stop
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border-[var(--border)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFxhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-white/20"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--surface)]"></div>
              </div>
              <div>
                <p className="text-[13px] font-black text-main leading-tight">
                  Cmdr. Operative
                </p>
                <p className="text-[10px] text-muted uppercase font-bold tracking-wider">
                  Systems Lead
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg hover:bg-rose-400/5"
            >
              <span className="material-symbols-outlined text-xs">logout</span>
              Terminate Session
            </motion.button>
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg transition-colors duration-300 z-30">
          <div className="flex items-center gap-4 flex-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden icon-btn"
            >
              <span className="material-symbols-outlined">menu</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[11px] font-black text-muted hover:text-[var(--text-main)] hover:border-[var(--primary)] transition-all"
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              <span className="hidden sm:inline">Dashboard</span>
            </motion.button>
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--text-main)] transition-colors text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search Fleet ID..."
                  className="input-field !pl-11"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="icon-btn"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className="material-symbols-outlined">
                {theme === "dark" ? "light_mode" : "dark_mode"}
              </span>
            </motion.button>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/notifications")}
                className="icon-btn relative"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-emerald-500 rounded-full border-2 border-[var(--background)] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="icon-btn hidden xs:flex"
            >
              <span className="material-symbols-outlined">settings</span>
            </motion.button>

            <div className="h-8 w-[1px] bg-[var(--border)] mx-1"></div>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary !py-2 !px-5 flex items-center gap-2 group shadow-none"
            >
              <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-500">
                emergency
              </span>
              <span className="hidden xs:inline text-xs font-black uppercase tracking-wider">
                Emergency Stop
              </span>
            </motion.button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1600px] mx-auto"
          >
            {/* Header & Context */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-rose-500/10">
                    Boarding Exception
                  </span>
                  <span className="text-muted text-xs font-black opacity-30">
                    •
                  </span>
                  <span className="text-muted text-[10px] font-black uppercase tracking-widest opacity-60">
                    Unit-42-Bravo
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-main tracking-tighter">
                  No-Show Handling
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 border border-[var(--border)] text-muted hover:text-[var(--text-main)] rounded-xl text-[10px] font-black flex items-center gap-2.5 hover:bg-[var(--surface-muted)] transition-all uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">
                    history
                  </span>{" "}
                  History
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleManualRecalculate}
                  className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-xl text-[10px] font-black flex items-center gap-2.5 hover:opacity-90 transition-all shadow-xl uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">
                    sync_alt
                  </span>{" "}
                  Recalculate
                </motion.button>
              </div>
            </motion.div>

            {/* Dashboard Layout (Bento Style) */}
            <div className="grid grid-cols-12 gap-6">
              {/* Active Incident Detail (Large Card) */}
              <div className="col-span-12 xl:col-span-8 space-y-6">
                {/* Incident Card */}
                <motion.div
                  variants={itemVariants}
                  className="dashboard-card !p-0 rounded-[32px] overflow-hidden shadow-2xl border-[var(--border)]"
                >
                  {/* Incident Header */}
                  <div className="p-8 border-b border-[var(--border)] flex items-center justify-between bg-[var(--surface-muted)]">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/10 flex items-center justify-center rounded-2xl shadow-xl transition-all">
                        <span className="material-symbols-outlined text-rose-400 text-2xl">
                          person_off
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-muted uppercase tracking-[0.25em] mb-1 opacity-60">
                          Active Incident #NO-7721
                        </p>
                        <p className="text-xl font-black text-main tracking-tight">
                          Marcus Thorne
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-muted uppercase tracking-[0.25em] mb-1 opacity-60">
                        Wait Duration
                      </p>
                      <p className="text-2xl text-rose-400 font-black tracking-tighter">
                        {waitTimer}
                      </p>
                    </div>
                  </div>

                  {/* Detection Data & Map */}
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.25em] opacity-60">
                        Detection Matrix
                      </h4>
                      <div className="space-y-4">
                        {detectionData.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center text-xs pb-4 border-b border-[var(--border)]"
                          >
                            <span className="text-muted font-bold opacity-60 uppercase tracking-widest text-[9px]">
                              {item.label}
                            </span>
                            <span
                              className={`${item.color} font-black tracking-widest text-[10px]`}
                            >
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-2 relative min-h-[250px] rounded-[24px] overflow-hidden border border-white/5 group shadow-inner">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMBJSljX_tSq-a9fugNeTvEpg4OcRnLJeB62Ca2BG1X2LuRr2LLe8el5KmgKzFd4CwkrMoT8AEakBBmsPMf1gOenSkjL92IY0ha8lGgTi8VVbw7T5fuuBTHy0raMWdHxtcQcKNa5DOZ-TrCWbObegQPPow2JhlW8KjtQq23fj-gI1WcoZ97dktcf5Y7TGTDqyqxSClYGUHMaE5c4bxuNgG6l2LuXPiQ1o10Fjn0b2dxOLqYthiwPqCWmun1ra0N3XcK5-LL1NaUHY"
                        alt="Heatmap"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[10s]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
                        <span className="text-[9px] uppercase font-black tracking-[0.2em] text-white/40">
                          Live Proximity Feed
                        </span>
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                          <span className="text-[10px] font-black text-white tracking-widest">
                            UNIT_POS: 40.7128° N, 74.0060° W
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-8 bg-[var(--surface-muted)] flex flex-wrap gap-4 border-t border-[var(--border)]">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleFinalizeNoShow}
                      className="px-8 py-3.5 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 shadow-2xl shadow-rose-500/20 hover:bg-rose-600 transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">
                        do_not_disturb_on
                      </span>
                      Finalize No-Show
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/rider-details")}
                      className="px-8 py-3.5 border border-[var(--border)] text-[var(--text-main)] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[var(--surface-muted)] transition-all shadow-xl"
                    >
                      <span className="material-symbols-outlined text-lg">
                        call
                      </span>
                      Contact Rider
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddWaitTime}
                      className="px-8 py-3.5 bg-[var(--surface-muted)] text-[var(--text-main)] rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-[var(--surface-light)] ml-auto transition-all border border-[var(--border)]"
                    >
                      <span className="material-symbols-outlined text-lg">
                        more_time
                      </span>
                      +2m Extension
                    </motion.button>
                  </div>
                </motion.div>

                {/* Recalculated Route Card */}
                <motion.div
                  variants={itemVariants}
                  className="dashboard-card !p-10 rounded-[32px] relative overflow-hidden group shadow-2xl border-[var(--border)]"
                >
                  <div className="absolute top-0 right-0 p-6">
                    <span className="flex items-center gap-2 text-[9px] text-[var(--text-main)] font-black bg-[var(--surface-muted)] px-3 py-1.5 rounded-lg border border-[var(--border)] tracking-[0.2em] uppercase backdrop-blur-md">
                      <span className="material-symbols-outlined text-[14px] animate-pulse">
                        auto_awesome
                      </span>
                      Neural_Recalculated
                    </span>
                  </div>
                  <h4 className="text-[10px] font-black text-muted uppercase tracking-[0.3em] mb-10 opacity-60">
                    Optimized Deployment Path
                  </h4>
                  <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 w-full space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                          <div className="w-[2px] h-12 bg-white/5"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] animate-pulse"></div>
                        </div>
                        <div className="flex-1 space-y-8">
                          <div>
                            <p className="text-[9px] text-muted uppercase tracking-[0.2em] font-black opacity-40 mb-1">
                              Skip Node
                            </p>
                            <p className="text-base font-black text-main tracking-tight">
                              12th Ave & W 54th St{" "}
                              <span className="text-rose-400 opacity-60 ml-2 font-bold">
                                (ABORTED)
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] text-muted uppercase tracking-[0.2em] font-black opacity-40 mb-1">
                              Next Vector
                            </p>
                            <p className="text-base font-black text-main tracking-tight">
                              Port Imperial Ferry Terminal
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {[
                        {
                          label: "Time Saved",
                          val: "-08:14",
                          color: "text-white",
                        },
                        {
                          label: "Efficiency",
                          val: "+12.4%",
                          color: "text-amber-400",
                        },
                      ].map((stat, i) => (
                        <div
                          key={i}
                          className="text-center bg-[var(--surface-muted)] p-6 rounded-[24px] border border-[var(--border)] min-w-[140px] shadow-2xl"
                        >
                          <p className="text-[9px] text-muted uppercase font-black tracking-[0.2em] mb-2 opacity-50">
                            {stat.label}
                          </p>
                          <p
                            className={`text-2xl font-black ${stat.color} tracking-tighter`}
                          >
                            {stat.val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Side Panel Widgets */}
              <aside className="col-span-12 xl:col-span-4 space-y-6">
                {/* Fleet Map Widget */}
                <motion.div
                  variants={itemVariants}
                  className="dashboard-card !p-0 rounded-[28px] overflow-hidden h-72 relative border-white/5 shadow-2xl group"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAdmGNZy5TlymWmBFSoyTD7wyVvSJp9_zSihTLHca_01jPZuKALc7domXavR0ohBgSB5SdpR2YZkKGsLHX4WGmkcPgPf5q-NGkTGAukqAkFZDCpKw7Rq0yd4AB7n1thb7mLhOuXkaC0T_ZPsSn3f6xbiRTNUSlgh5eqqylLK0JIc2YBGiV2rBiqQ0WTP2d-PZNztbx-kRLjgLcaftZ5OzXlzienV7YutZWkXa-_Cm7XeoHdJEVDpBnQdJx4Yn0qNG38T6tvOxdV_s"
                    alt="Map"
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:scale-110 transition-transform duration-[10s]"
                  />
                  <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black/80 backdrop-blur-md text-[9px] px-3 py-1.5 rounded-lg border border-white/10 text-white font-black tracking-widest shadow-2xl">
                      COORDS: 40.7128° N
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-white/10 rounded-full border border-white/20 blur-xl"
                    ></motion.div>
                  </div>
                </motion.div>

                {/* Impact Analysis */}
                <motion.div
                  variants={itemVariants}
                  className="dashboard-card !p-8 rounded-[28px] shadow-2xl"
                >
                  <h4 className="text-[10px] font-black text-main mb-8 flex items-center gap-3 uppercase tracking-[0.2em]">
                    <span className="material-symbols-outlined text-slate-400 text-lg">
                      analytics
                    </span>
                    Impact Matrix
                  </h4>
                  <div className="space-y-8">
                    {[
                      {
                        label: "Fleet Saturation",
                        val: "88%",
                        progress: 88,
                        color: "bg-white/40",
                      },
                      {
                        label: "Delay Ripple",
                        val: "Minimal (2m)",
                        progress: 15,
                        color: "bg-amber-500",
                      },
                    ].map((m, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[10px] mb-3 uppercase font-black tracking-widest">
                          <span className="text-muted opacity-60">
                            {m.label}
                          </span>
                          <span className="text-main">{m.val}</span>
                        </div>
                        <div className="h-1.5 bg-[var(--surface-muted)] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${m.progress}%` }}
                            className={`h-full ${m.color} rounded-full`}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/5">
                    <p className="text-[10px] text-muted font-bold leading-relaxed opacity-40 uppercase tracking-widest text-center">
                      "Autonomous rescheduling active. Unit-42-Bravo energy
                      optimal."
                    </p>
                  </div>
                </motion.div>

                {/* Pending Actions */}
                <motion.div
                  variants={itemVariants}
                  className="dashboard-card !p-8 rounded-[28px] shadow-2xl"
                >
                  <h4 className="text-[10px] font-black text-main mb-8 uppercase tracking-[0.2em]">
                    Downstream Chain
                  </h4>
                  <div className="space-y-4">
                    {downstreamActions.map((action, i) => (
                      <motion.div
                        key={i}
                        onClick={() => navigate(action.path)}
                        whileHover={{
                          x: 4,
                          backgroundColor: "rgba(255,255,255,0.02)",
                        }}
                        className="flex items-center gap-5 p-5 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)] hover:border-[var(--text-muted)] transition-all cursor-pointer group"
                      >
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">
                          {action.icon}
                        </span>
                        <div>
                          <p className="text-[11px] font-black text-main tracking-tight group-hover:text-white transition-colors">
                            {action.title}
                          </p>
                          <p className="text-[9px] text-muted font-bold uppercase tracking-widest opacity-60 mt-0.5">
                            {action.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </aside>
            </div>

            {/* Footer Area */}
            <footer className="mt-12 border-t border-[var(--border)] py-12 mt-auto">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity"><span className="material-symbols-outlined text-xl">arrow_back</span> ShuttleCore</Link>
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

export default FleetPage;
