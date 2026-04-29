import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const NotificationsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
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

  const notifications = [
    {
      id: 1,
      type: "urgent",
      title: "Route 405 Congestion Alert",
      desc: "Autonomous shuttle unit SH-402 reports 14-minute delay due to unforeseen roadwork on the Pacific Hwy intersection. Re-routing logic suggested.",
      time: "2 MIN AGO",
      category: "Active Traffic Delay - Tier 2",
      icon: "warning",
      color: "amber",
    },
    {
      id: 2,
      type: "operational",
      title: "Unit SH-209 Handover Complete",
      desc: "Vehicle maintenance cycle concluded. Unit has returned to active duty in the Northern District. Diagnostics: 100% Nominal.",
      time: "15 MIN AGO",
      category: "Fleet Confirmation",
      icon: "airport_shuttle",
      color: "cyan",
    },
    {
      id: 3,
      type: "system",
      title: "New Restricted Zone: Sector 7G",
      desc: "Temporary closure due to VIP transit event. 4 units scheduled for automatic re-routing at 14:00 UTC.",
      time: "1 HOUR AGO",
      category: "Geofence Update",
      icon: "map",
      color: "blue",
      hasMap: true,
    },
    {
      id: 4,
      type: "system",
      title: "Firmware Deployment v4.2.1",
      desc: "Fleet-wide update deployed successfully. Navigation mesh enhanced for night-time visibility operations.",
      time: "2 HOURS AGO",
      category: "Protocol Success",
      icon: "verified",
      color: "slate",
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
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--text-main)] transition-colors text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search Notifications..."
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
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1200px] mx-auto"
          >
            {/* Header Area */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
            >
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-main tracking-tighter">
                  Notification Hub
                </h1>
                <p className="text-[13px] text-muted font-medium mt-1">
                  Real-time telemetry alerts, routing updates, and autonomous
                  fleet status protocols.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-5 py-2.5 border border-[var(--border)] text-muted hover:text-[var(--text-main)] rounded-xl text-[10px] font-black flex items-center gap-2.5 hover:bg-[var(--surface-muted)] transition-all uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">
                    filter_list
                  </span>{" "}
                  FILTER
                </button>
                <button className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-xl text-[10px] font-black flex items-center gap-2.5 hover:opacity-90 transition-all shadow-xl shadow-indigo-500/20 uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">
                    done_all
                  </span>{" "}
                  MARK ALL AS READ
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-12 gap-8">
              {/* Notification List */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {notifications.map((n) => (
                  <motion.div
                    key={n.id}
                    variants={itemVariants}
                    className={`dashboard-card relative overflow-hidden group hover:border-[var(--primary)]/30 transition-all cursor-pointer ${n.type === "urgent" ? "bg-amber-500/5 border-amber-500/20" : ""}`}
                  >
                    {n.type === "urgent" && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-amber-500"></div>
                    )}
                    <div className="flex items-start gap-6">
                      <div
                        className={`p-4 rounded-2xl flex items-center justify-center ${
                          n.color === "amber"
                            ? "bg-amber-500/10 text-amber-500"
                            : n.color === "cyan"
                              ? "bg-cyan-500/10 text-cyan-500"
                              : n.color === "blue"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-slate-500/10 text-slate-500"
                        }`}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {n.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                              n.color === "amber"
                                ? "text-amber-500"
                                : n.color === "cyan"
                                  ? "text-cyan-500"
                                  : n.color === "blue"
                                    ? "text-blue-500"
                                    : "text-slate-500"
                            }`}
                          >
                            {n.category}
                          </span>
                          <span className="text-[10px] font-black text-muted opacity-60">
                            {n.time}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-main tracking-tight mb-2">
                          {n.title}
                        </h3>
                        <p className="text-[13px] text-muted leading-relaxed font-medium mb-4">
                          {n.desc}
                        </p>

                        {n.hasMap && (
                          <div className="relative h-64 rounded-2xl mb-4 overflow-hidden border border-[var(--border)] group/map">
                            {/* Live Map Visualization */}
                            <div className="absolute inset-0 bg-[#0B0E14]">
                              {/* Grid lines */}
                              <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                  backgroundImage:
                                    "radial-gradient(var(--border) 1px, transparent 1px)",
                                  backgroundSize: "30px 30px",
                                }}
                              ></div>

                              {/* Animated Scanning Line */}
                              <motion.div
                                animate={{ top: ["0%", "100%"] }}
                                transition={{
                                  duration: 4,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="absolute left-0 right-0 h-[1px] bg-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10"
                              ></motion.div>

                              {/* Map Content - Abstract City Grid */}
                              <svg
                                className="absolute inset-0 w-full h-full opacity-40"
                                viewBox="0 0 800 400"
                              >
                                <path
                                  d="M0 100 L800 100 M0 200 L800 200 M0 300 L800 300 M100 0 L100 400 M200 0 L200 400 M300 0 L300 400 M400 0 L400 400 M500 0 L500 400 M600 0 L600 400 M700 0 L700 400"
                                  stroke="var(--border)"
                                  strokeWidth="0.5"
                                  fill="none"
                                />
                                <circle
                                  cx="400"
                                  cy="200"
                                  r="120"
                                  fill="none"
                                  stroke="rgba(59, 130, 246, 0.2)"
                                  strokeWidth="40"
                                  className="animate-pulse"
                                />
                                <path
                                  d="M350 150 L450 150 L450 250 L350 250 Z"
                                  fill="rgba(244, 63, 94, 0.1)"
                                  stroke="rose-500"
                                  strokeWidth="2"
                                  strokeDasharray="4 4"
                                />
                              </svg>

                              {/* Active Units */}
                              <div className="absolute top-[40%] left-[45%]">
                                <div className="relative">
                                  <div className="absolute -inset-4 bg-cyan-500/20 rounded-full animate-ping"></div>
                                  <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)] border border-white/20"></div>
                                </div>
                              </div>
                              <div className="absolute top-[60%] left-[30%]">
                                <div className="w-2 h-2 bg-slate-500 rounded-full opacity-50"></div>
                              </div>
                              <div className="absolute top-[25%] left-[70%]">
                                <div className="w-2 h-2 bg-slate-500 rounded-full opacity-50"></div>
                              </div>

                              {/* Map HUD Overlay */}
                              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-20">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                  <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">
                                    Live Sync
                                  </span>
                                </div>
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[9px] font-black text-white/50 uppercase tracking-widest">
                                  LAT: 34.0522° N | LON: 118.2437° W
                                </div>
                              </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none"></div>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex gap-3">
                            {n.type === "urgent" ? (
                              <>
                                <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:brightness-110 transition-all">
                                  Apply Bypass
                                </button>
                                <button className="px-4 py-2 border border-amber-500/30 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-amber-500/5 transition-all">
                                  Ignore
                                </button>
                              </>
                            ) : n.hasMap ? (
                              <div className="flex -space-x-2">
                                {[1, 2, 3].map((i) => (
                                  <div
                                    key={i}
                                    className="w-7 h-7 rounded-full border-2 border-[var(--surface)] bg-[var(--surface-light)] flex items-center justify-center text-[9px] font-black text-muted"
                                  >
                                    V{i}
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                          {n.hasMap && (
                            <button className="text-[10px] font-black text-[var(--primary)] uppercase tracking-widest hover:underline">
                              View Affected Units
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Sidebar Stats Area */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <motion.div variants={itemVariants} className="card-white">
                  <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-6 opacity-60">
                    Alert Summary
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: "Urgent", count: "01", color: "bg-amber-500" },
                      {
                        label: "Operational",
                        count: "12",
                        color: "bg-cyan-500",
                      },
                      {
                        label: "System Logs",
                        count: "48",
                        color: "bg-slate-500",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${stat.color}`}
                          ></div>
                          <span className="text-[13px] font-bold text-main">
                            {stat.label}
                          </span>
                        </div>
                        <span className="text-sm font-black text-main">
                          {stat.count}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-[var(--border)]">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-muted uppercase tracking-wider">
                        Response Time
                      </span>
                      <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">
                        8.2s AVG
                      </span>
                    </div>
                    <div className="h-1.5 bg-[var(--surface-muted)] rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[85%] rounded-full"></div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="card-white !bg-[var(--primary)]/5 !border-[var(--primary)]/20 relative group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-[var(--primary)]">
                      campaign
                    </span>
                    <h3 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.2em]">
                      Global Broadcast
                    </h3>
                  </div>
                  <p className="text-[13px] text-[var(--text-main)] italic leading-relaxed font-medium mb-6">
                    "High visibility required for the downtown core during the
                    upcoming parade event. All units to switch to 'Caution'
                    sensory profiles."
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      className="w-9 h-9 rounded-full border border-[var(--primary)]/30"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDU6J3WXgnjbpqONOkBWsfOv9ejAfu2ULXhSA3RG2Lh5lP9c4LegbF0p2len4YPx_UuuEZljTg679rYX_e62-thpS9H4RmNvw52eYwVVoL6QfMCuf84cBtKanf0rs2QACq01eTPrO8-n7-okNFEbhYBpxuRayuGuS5KYMPe04XbRJKB3b5igOmN9ygROT975I8AhCh4Eq6XSw-Amy2CrW4IMuHzur8BEcKZ6HSLDTmEPQHg5TXfHakc8U3GCpczI--bemJDBdM-ryA"
                    />
                    <div>
                      <p className="text-[12px] font-black text-main leading-none">
                        Commander Elias K.
                      </p>
                      <p className="text-[10px] text-muted uppercase font-bold tracking-wider mt-1">
                        Operations Lead
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="card-white relative overflow-hidden group"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[10px] font-black text-muted uppercase tracking-[0.2em] opacity-60">
                      Alert Frequency
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      <span className="text-[9px] font-black text-cyan-500/80 uppercase tracking-widest">
                        Live Feed
                      </span>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="relative h-40 flex items-end justify-between gap-2.5 px-1">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between py-1 opacity-20 pointer-events-none">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-full h-[1px] bg-slate-500/30 border-t border-dashed border-slate-500/20"
                        ></div>
                      ))}
                    </div>

                    {/* Bars */}
                    {[35, 58, 85, 25, 48, 72, 42].map((h, i) => (
                      <div
                        key={i}
                        className="relative flex-1 group/bar h-full flex flex-col justify-end"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`w-full rounded-t-md transition-all duration-500 relative group-hover/bar:brightness-125 ${
                            i === 2
                              ? "bg-gradient-to-t from-cyan-500/80 to-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                              : "bg-gradient-to-t from-slate-500/10 to-slate-500/20"
                          }`}
                        >
                          {/* Value Tooltip on Hover */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="bg-[var(--surface-light)] border border-[var(--border)] px-2 py-1 rounded text-[9px] font-black text-main whitespace-nowrap shadow-xl uppercase tracking-tighter">
                              {h} Units
                            </div>
                          </div>

                          {/* Inner Shine Effect */}
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                        </motion.div>
                      </div>
                    ))}
                  </div>

                  {/* X-Axis */}
                  <div className="flex justify-between mt-5 px-1 border-t border-[var(--border)] pt-4">
                    <span className="text-[9px] text-muted font-black uppercase tracking-widest opacity-50">
                      08:00
                    </span>
                    <span className="text-[9px] text-muted font-black uppercase tracking-widest opacity-50">
                      12:00
                    </span>
                    <span className="text-[9px] text-muted font-black uppercase tracking-widest opacity-50">
                      16:00
                    </span>
                  </div>

                  {/* Subtle Glow Overlay */}
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
                </motion.div>
              </div>
            </div>
            {/* Footer Area */}
            <footer className="mt-12 border-t border-[var(--border)] py-12 mt-auto">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity">ShuttleCore</Link>
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

export default NotificationsPage;
