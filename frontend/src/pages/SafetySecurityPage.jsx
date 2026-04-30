import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SafetySecurityPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("24h");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleApplyFleetAdjustment = () => {
    alert(
      "Fleet adjustment applied: Mandatory rest intervals increased by 15 minutes for Unit #700 - #750 series.",
    );
  };

  const handleExportReport = () => {
    alert("Safety report exported successfully.");
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

  const harshEvents = [
    {
      unit: "Unit #8421",
      type: "Harsh Braking",
      icon: "emergency_home",
      color: "red",
      time: "2M AGO",
      desc: "Impact force: 0.85g at 45mph. Driver identified.",
    },
    {
      unit: "Unit #9031",
      type: "Speed Limit +15",
      icon: "speed",
      color: "orange",
      time: "14M AGO",
      desc: "Observed speed 70mph in a 55mph construction zone.",
    },
    {
      unit: "Unit #1105",
      type: "Aggressive Turn",
      icon: "turn_right",
      color: "slate",
      time: "42M AGO",
      desc: "Lateral g-force exceeded safety threshold on exit 14B.",
    },
  ];

  const driverRankings = [
    {
      rank: "01",
      name: "Marcus Vance",
      division: "Heavy Haul Div.",
      miles: "1,244 mi",
      alerts: 0,
      score: 98,
      scoreColor: "green",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBw7z2R0KH4HAZsobWRb4qGmGVYYjd-k0Dcm_PoYHQoUjLloqkYz3uL6Dj_iAvjjcCHTPOR4w8svAie85uoZaIqMZsvLnGOYKISvT2yZesD0Q4GuLvMfP3AckWIZFjXdzeU6cWSOopx8qlZ8ataQmtJk3GjJ127zpnuNzZhNfIPH1XlnY4cro6dmvlDPuqp5ZTbPTB26Cd0WNMnWn9-L-a19Tsi1krTB5N002-pXP90kHxUypgkg7YRQxwhltEKueNImZNXi01bwY",
    },
    {
      rank: "02",
      name: "Sarah Chen",
      division: "Regional Express",
      miles: "982 mi",
      alerts: 2,
      score: 94,
      scoreColor: "cyan",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkPtYBkrZ1lh4wsjxLGQ5CgWDU2vCTb-sVLnpPYFG6uHymmU7QPwgtCKlHwn0UH5ij6vb8wgvVFVjGH00WRha2mJFeQdBfhJ-qnXwLx7sB63znEJpaQJVbzD0LDobfMK-D74qhY5V949XSk-uF741quEhLNOe8RynMF7FthVA238WUvFJC6wFjV8jKeh93B_ab0y8_IUb1IedudkbQH28cxoq9bVXg1lD6EWGOHeas-td8dWvUWkoX2RXc_gDSzctB-RS5oMcB0ok",
    },
    {
      rank: "03",
      name: "David Miller",
      division: "Last Mile",
      miles: "2,105 mi",
      alerts: 5,
      score: 91,
      scoreColor: "cyan",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqJ-cs0VYoIQd5_LibrD7tr9DGOxbFSyXXVLs_OVWLZKgD1AHXEDn0JeLdA35ZE0lJgHtS5B6xcsQKrNWF_iPzWimDxn6TPUA_S3iy03L-Jgt4Jjwpt_utu96mCN5unFoBwJea7wEGldUhIoBk5cV3EyiIkO60vjSW7jEQ2eOWEjDfzdYZ7xqGfOzzc9wRzKJsdURU2hHxvvacBh1kvb4-fgH8f58Em4Yp3MwWdxL0wN7atSC5GL7AeHiEhe-AI2wCgn6cLj_JZy0",
    },
  ];

  const safetyBarData = [60, 75, 70, 85, 92, 100];

  const getEventColorClasses = (color) => {
    const map = {
      red: {
        bg: "bg-rose-500/10",
        border: "border-rose-500",
        iconBg: "bg-rose-500/20",
        iconText: "text-rose-500",
      },
      orange: {
        bg: "bg-amber-500/10",
        border: "border-amber-500",
        iconBg: "bg-amber-500/20",
        iconText: "text-amber-500",
      },
      slate: {
        bg: "bg-slate-500/10",
        border: "border-slate-500",
        iconBg: "bg-slate-500/20",
        iconText: "text-slate-400",
      },
    };
    return map[color];
  };

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
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--text-main)] transition-colors text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search safety logs..."
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
            {/* Header Section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
            >
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-main mb-2 tracking-tighter">
                  Safety Analytics
                </h1>
                <p className="text-sm text-muted font-medium">
                  Real-time AI behavioral monitoring and fleet risk scoring
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setTimeFilter(timeFilter === "24h" ? "7d" : "24h")
                  }
                  className="bg-[var(--surface-muted)] border border-[var(--border)] px-5 py-2.5 rounded-xl text-[10px] font-black flex items-center gap-2.5 text-main hover:bg-[var(--surface-light)] transition-all uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">
                    calendar_today
                  </span>
                  {timeFilter === "24h" ? "Last 24 Hours" : "Last 7 Days"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExportReport}
                  className="bg-[var(--primary)] text-white px-5 py-2.5 rounded-xl text-[10px] font-black flex items-center gap-2.5 hover:opacity-90 transition-all shadow-xl uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>
                  Export Report
                </motion.button>
              </div>
            </motion.div>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              {/* Safety Score Large Card */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-4 card-white p-8 rounded-[24px] flex flex-col justify-between group relative overflow-hidden border-[var(--border)]"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted opacity-60">
                      Fleet Safety Score
                    </span>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">
                      shield
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-main tracking-tighter">
                      92
                    </span>
                    <span className="text-muted text-sm font-bold opacity-30">
                      / 100
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-emerald-400">
                    <span className="material-symbols-outlined text-sm">
                      trending_up
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      +4.2% Growth
                    </span>
                  </div>
                </div>
                <div className="mt-10 h-24 flex items-end gap-1.5">
                  {safetyBarData.map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className={`w-full rounded-t-lg ${i === safetyBarData.length - 1 ? "bg-[var(--primary)] shadow-[0_0_15px_rgba(255,255,255,0.2)]" : "bg-[var(--surface-muted)] group-hover:bg-[var(--surface-light)] transition-all"}`}
                    ></motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Live Map Section */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-8 dashboard-card !p-0 rounded-[24px] overflow-hidden relative group shadow-2xl border-[var(--border)]"
              >
                <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  Live Surveillance Active
                </div>
                <img
                  className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[10s]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANypopLvMRsIxtsuDu3SvHPuA7c8r21d60FKqN2JpBh_sTKxAj-EjVnAT7AbpS53QJZtPtsM4VKnVzInzr4b0amJuZkjuEQGo9FdJG3xGhvGmOCk4zMsHIO0ZF8h7-j4daIghJPqhtx8taYQCCe08iXRGwxJC2rCbAufMGViWGjLqkKMwwWs3P5IqAjyI4kqYsQ4lnlhyuGgDlDX8krVfvS-1GBcFfOz4EwtTYwd6W8yJNcdztSYPstw94kHhfuEm4G5QgehyVDRo"
                  alt="Live fleet tracking map"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="bg-[var(--background)]/80 backdrop-blur-xl p-6 rounded-2xl border border-[var(--border)] flex gap-8 shadow-2xl">
                    {[
                      {
                        label: "Speed Violations",
                        val: "12",
                        color: "text-amber-400",
                      },
                      {
                        label: "Harsh Braking",
                        val: "08",
                        color: "text-rose-400",
                      },
                      {
                        label: "Active Units",
                        val: "144",
                        color: "text-white",
                      },
                    ].map((m, i) => (
                      <React.Fragment key={i}>
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-muted font-black mb-1 opacity-50">
                            {m.label}
                          </p>
                          <p
                            className={`text-2xl font-black ${m.color} tracking-tighter`}
                          >
                            {m.val}
                          </p>
                        </div>
                        {i < 2 && (
                          <div className="w-px h-10 bg-[var(--border)] self-center"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {["add", "remove"].map((icon) => (
                      <motion.button
                        key={icon}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[var(--background)]/60 backdrop-blur-xl w-12 h-12 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--text-main)] shadow-2xl transition-all"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {icon}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              {/* Harsh Events Feed */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-5 card-white p-8 rounded-[24px] flex flex-col border-white/5 shadow-2xl"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-black text-main tracking-tight">
                    Harsh Events
                  </h2>
                  <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em] opacity-40">
                    Live Matrix
                  </span>
                </div>
                <div className="space-y-4 flex-1">
                  {harshEvents.map((event, i) => {
                    const colors = getEventColorClasses(event.color);
                    return (
                      <motion.div
                        key={i}
                        whileHover={{
                          x: 4,
                          backgroundColor: "rgba(255,255,255,0.02)",
                        }}
                        className={`flex items-center gap-5 p-5 rounded-2xl ${colors.bg} border border-[var(--border)] group cursor-pointer transition-all`}
                      >
                        <div
                          className={`${colors.iconBg} w-12 h-12 flex items-center justify-center rounded-xl border border-[var(--border)] group-hover:scale-110 transition-transform`}
                        >
                          <span
                            className={`material-symbols-outlined ${colors.iconText} text-xl`}
                          >
                            {event.icon}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-black text-[13px] text-main tracking-tight">
                              {event.unit}{" "}
                              <span className="mx-1.5 opacity-20">•</span>{" "}
                              {event.type}
                            </p>
                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">
                              {event.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted font-medium leading-relaxed opacity-70">
                            {event.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/event-log")}
                  className="mt-10 w-full py-4 border border-[var(--border)] text-muted hover:text-[var(--text-main)] text-[10px] font-black uppercase tracking-[0.25em] hover:bg-[var(--surface-muted)] rounded-xl transition-all"
                >
                  Complete Event Log
                </motion.button>
              </motion.div>

              {/* Driver Performance Table */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-7 dashboard-card p-8 rounded-[24px] border-[var(--border)] shadow-2xl overflow-hidden"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-xl font-black text-main tracking-tight">
                    Operator Performance
                  </h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black rounded-lg border border-emerald-500/10 uppercase tracking-widest">
                      Top Tier
                    </span>
                    <span className="px-3 py-1 bg-[var(--surface-muted)] text-muted text-[9px] font-black rounded-lg border border-[var(--border)] uppercase tracking-widest">
                      Weekly
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] font-black text-muted uppercase tracking-[0.2em] border-b border-[var(--border)] opacity-50">
                        <th className="pb-5 font-black">Rank</th>
                        <th className="pb-5 font-black">Operator Identity</th>
                        <th className="pb-5 font-black">Tele-Distance</th>
                        <th className="pb-5 font-black">Alerts</th>
                        <th className="pb-5 font-black">Efficiency</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {driverRankings.map((driver, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                          onClick={() => navigate(`/driver-details/${driver.name.toLowerCase().replace(/\s+/g, '-')}`, { state: { driver } })}
                          className="border-b border-[var(--border)] hover:bg-[var(--surface-muted)] transition-colors group cursor-pointer"
                        >
                          <td
                            className={`py-5 font-black text-lg ${i === 0 ? "text-[var(--primary)] dark:text-white" : "text-muted opacity-40"}`}
                          >
                            {driver.rank}
                          </td>
                          <td className="py-5">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-[var(--surface-muted)] overflow-hidden border border-[var(--border)] group-hover:border-[var(--text-muted)] transition-all">
                                <img
                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                                  src={driver.img}
                                  alt={driver.name}
                                />
                              </div>
                              <div>
                                <p className="font-black text-main tracking-tight">
                                  {driver.name}
                                </p>
                                <p className="text-[9px] text-muted font-bold uppercase tracking-widest opacity-60">
                                  {driver.division}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 text-[11px] font-black text-muted tracking-widest">
                            {driver.miles}
                          </td>
                          <td className="py-5 text-[11px] font-black text-muted tracking-widest">
                            {driver.alerts}
                          </td>
                          <td className="py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-20 h-1.5 bg-[var(--surface-muted)] rounded-full overflow-hidden border border-[var(--border)]">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${driver.score}%` }}
                                  className={`h-full ${i === 0 ? "bg-emerald-400" : "bg-[var(--text-muted)] opacity-60"}`}
                                ></motion.div>
                              </div>
                              <span
                                className={`font-black text-[13px] ${i === 0 ? "text-emerald-400" : "text-main"}`}
                              >
                                {driver.score}
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* AI Coaching Insights */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-12 dashboard-card !p-10 rounded-[32px] border-[var(--border)] shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="bg-[var(--surface-muted)] p-6 rounded-[24px] border border-[var(--border)] shadow-2xl group-hover:scale-110 transition-transform duration-700">
                  <span className="material-symbols-outlined text-5xl text-white animate-pulse">
                    psychology
                  </span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-main mb-3 tracking-tight">
                    AI Predictive Safety Insight
                  </h3>
                  <p className="text-muted text-sm font-medium leading-relaxed max-w-3xl opacity-70">
                    Fatigue patterns detected in the Northeast corridor during
                    late shifts. Operators show a{" "}
                    <span className="text-[var(--text-main)] font-black">
                      12% increase
                    </span>{" "}
                    in delayed reaction times. Recommended action: Adjust
                    mandatory rest intervals for{" "}
                    <span className="text-[var(--text-main)] font-black">
                      Unit #700 - #750
                    </span>{" "}
                    series by 15 minutes.
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApplyFleetAdjustment}
                  className="bg-[var(--primary)] text-white font-black px-8 py-4 rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:opacity-90 transition-all whitespace-nowrap"
                >
                  Apply Fleet Adjustment
                </motion.button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/[0.03] blur-[100px] rounded-full group-hover:bg-white/[0.05] transition-all"></div>
            </motion.div>

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

export default SafetySecurityPage;
