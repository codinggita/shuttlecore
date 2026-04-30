import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chartView, setChartView] = useState("realtime");
  
  // Emergency notification state
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  
  // Check for active emergency
  useEffect(() => {
    const checkEmergency = () => {
      const isEmergency = localStorage.getItem("emergencyActive");
      const emergencyCount = localStorage.getItem("emergencyCount");
      const emergencyTime = localStorage.getItem("emergencyTime");
      
      if (isEmergency === "true") {
        setEmergencyAlert({
          count: emergencyCount || "4",
          time: emergencyTime,
        });
      } else {
        setEmergencyAlert(null);
      }
    };
    
    // Check immediately
    checkEmergency();
    
    // Check every 5 seconds for updates
    const interval = setInterval(checkEmergency, 5000);
    
    // Also listen for storage events (when localStorage changes in other tabs)
    const handleStorage = () => checkEmergency();
    window.addEventListener("storage", handleStorage);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const stats = [
    {
      label: "Nodes Online",
      value: "99.8%",
      icon: "lan",
      trend: "+0.2%",
      color: "text-emerald-400",
    },
    {
      label: "Fleet Health",
      value: "Nominal",
      icon: "health_and_safety",
      trend: "Stable",
      color: "text-emerald-400",
    },
    {
      label: "Avg Speed",
      value: "24.5 mph",
      icon: "speed",
      trend: "+1.2%",
      color: "text-amber-400",
    },
    {
      label: "Security Level",
      value: "L-7 SYNC",
      icon: "security",
      trend: "Active",
      color: "text-gray-400",
    },
  ];

  const performanceData = [
    { time: "00:00", load: 40 },
    { time: "01:00", load: 65 },
    { time: "02:00", load: 45 },
    { time: "03:00", load: 85 },
    { time: "04:00", load: 55 },
    { time: "05:00", load: 95 },
    { time: "06:00", load: 70 },
    { time: "07:00", load: 80 },
    { time: "08:00", load: 50 },
    { time: "09:00", load: 60 },
    { time: "10:00", load: 45 },
    { time: "11:00", load: 75 },
    { time: "12:00", load: 90 },
    { time: "13:00", load: 65 },
    { time: "14:00", load: 85 },
    { time: "15:00", load: 60 },
    { time: "16:00", load: 40 },
    { time: "17:00", load: 70 },
    { time: "18:00", load: 95 },
    { time: "19:00", load: 80 },
  ];

  const historyData = [
    { time: "Mon", load: 60 },
    { time: "Tue", load: 80 },
    { time: "Wed", load: 50 },
    { time: "Thu", load: 90 },
    { time: "Fri", load: 40 },
    { time: "Sat", load: 30 },
    { time: "Sun", load: 70 },
  ];

  const menuItems = [
    {
      id: "simulation",
      label: "Simulation",
      icon: "model_training",
      path: "/dashboard",
    },
    {
      id: "bookride",
      label: "Book My Ride",
      icon: "local_taxi",
      path: "/book-ride",
    },
    {
      id: "ridehistory",
      label: "Ride History",
      icon: "history",
      path: "/ride-history",
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
                className={`nav-link w-full group ${
                  location.pathname === item.path ||
                  (item.id === "simulation" &&
                    location.pathname === "/dashboard")
                    ? "nav-link-active"
                    : "nav-link-inactive"
                }`}
              >
                <span
                  className={`material-symbols-outlined transition-colors ${
                    location.pathname === item.path ||
                    (item.id === "simulation" &&
                      location.pathname === "/dashboard")
                      ? "opacity-100"
                      : "opacity-70 group-hover:opacity-100"
                  }`}
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
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--surface)] shadow-sm"></div>
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
                  placeholder="Search telemetry, nodes, or logs..."
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
                add
              </span>
              <span className="hidden xs:inline text-xs font-black uppercase tracking-wider">
                New Operation
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
          >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-main mb-2 tracking-tighter">
                Command Center
              </h1>
              <p className="text-muted text-sm md:text-base font-medium">
                System telemetry is{" "}
                <span className="text-emerald-400 font-black">Nominal</span>. All
                autonomous clusters report sync.
              </p>
            </motion.div>

            {/* Emergency Alert Banner */}
            {emergencyAlert && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 cursor-pointer hover:bg-rose-500/20 transition-all"
                onClick={() => navigate("/emergency")}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center animate-pulse">
                    <span className="material-symbols-outlined text-rose-400 text-2xl">emergency_home</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-lg font-black text-rose-400">EMERGENCY ALERT</h2>
                      <span className="px-2 py-1 bg-rose-500 text-white text-[9px] font-black rounded-lg uppercase tracking-wider animate-pulse">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-[13px] text-main">
                      <span className="font-black text-rose-400">{emergencyAlert.count}</span> emergency incidents requiring immediate attention. 
                      Click to view details and respond.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-[11px] text-muted uppercase font-bold">View Emergency</span>
                    <span className="material-symbols-outlined text-rose-400">arrow_forward</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                  className="dashboard-card group relative overflow-hidden"
                >
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className={`p-2.5 rounded-xl bg-[var(--surface-muted)] ${stat.color} border border-[var(--border)]`}
                    >
                      <span className="material-symbols-outlined text-2xl">
                        {stat.icon}
                      </span>
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 uppercase tracking-wider border border-emerald-500/10">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-xs font-black text-muted uppercase tracking-[0.15em] mb-1 opacity-70">
                    {stat.label}
                  </p>
                  <h3 className="text-3xl font-black text-main tracking-tighter">
                    {stat.value}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Layout Grid */}
            <div className="grid grid-cols-12 gap-6 mb-10">
              {/* Main Performance Chart */}
              <motion.div
                variants={itemVariants}
                className="col-span-12 xl:col-span-8 dashboard-card !p-8 relative overflow-hidden group"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                  <div>
                    <h3 className="text-xl font-black text-main tracking-tight mb-1">
                      Fleet Throughput
                    </h3>
                    <p className="text-[11px] text-muted font-bold uppercase tracking-wider">
                      Real-time network performance matrix
                    </p>
                  </div>
                  <div className="flex gap-2 bg-[var(--surface-light)] p-1.5 rounded-xl border border-[var(--border)] self-start">
                    <button onClick={() => setChartView("realtime")} className={`px-4 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-widest transition-all ${chartView === "realtime" ? "bg-[var(--primary)] text-white shadow-lg" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}>
                      Real-Time
                    </button>
                    <button onClick={() => setChartView("history")} className={`px-4 py-1.5 text-[10px] font-black rounded-lg uppercase tracking-widest transition-all ${chartView === "history" ? "bg-[var(--primary)] text-white shadow-lg" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"}`}>
                      History
                    </button>
                  </div>
                </div>

                <div className="h-72 w-full relative -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartView === "realtime" ? performanceData : historyData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorLoad"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="var(--primary)"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="var(--primary)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                        vertical={false}
                        opacity={0.3}
                      />
                      <XAxis
                        dataKey="time"
                        stroke="var(--text-muted)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontWeight: "bold", fill: "var(--text-muted)" }}
                        dy={10}
                      />
                      <YAxis
                        stroke="var(--text-muted)"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                        tick={{ fontWeight: "bold", fill: "var(--text-muted)" }}
                        dx={-10}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          backdropFilter: "blur(12px)",
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "20px",
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                          color: "#fff",
                          padding: "16px",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                        itemStyle={{
                          color: "#fff",
                          fontWeight: "900",
                          fontSize: "14px",
                          textTransform: "uppercase",
                        }}
                        labelStyle={{
                          color: "rgba(255, 255, 255, 0.5)",
                          marginBottom: "6px",
                          fontSize: "10px",
                          fontWeight: "800",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                        }}
                        cursor={{
                          stroke: "var(--primary)",
                          strokeWidth: 1,
                          strokeDasharray: "4 4",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="load"
                        stroke="var(--primary)"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorLoad)"
                        animationDuration={2000}
                        className="text-primary"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[var(--border)] pt-8">
                  <div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1.5 opacity-60">
                      Peak Optimization
                    </p>
                    <p className="text-2xl font-black text-main tracking-tighter">
                      95.2%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1.5 opacity-60">
                      Fleet Consumption
                    </p>
                    <p className="text-2xl font-black text-main tracking-tighter">
                      0.82{" "}
                      <span className="text-sm font-bold text-muted">
                        kWh/m
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-1.5 opacity-60">
                      Mesh Latency
                    </p>
                    <p className="text-2xl font-black text-main tracking-tighter">
                      12<span className="text-sm font-bold text-muted">ms</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Operator Queue */}
              <motion.div
                variants={itemVariants}
                className="col-span-12 xl:col-span-4 dashboard-card flex flex-col !p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-main tracking-tight">
                    Active Queue
                  </h3>
                  <span className="material-symbols-outlined text-muted opacity-50">
                    more_vert
                  </span>
                </div>
                <div className="space-y-3.5 flex-1 overflow-y-auto custom-scrollbar pr-1">
                  {[
                    {
                      id: "TX-402",
                      status: "Transit",
                      time: "4m rem",
                      color: "bg-emerald-500",
                      progress: 75,
                    },
                    {
                      id: "NY-881",
                      status: "Charging",
                      time: "12m rem",
                      color: "bg-amber-500",
                      progress: 40,
                    },
                    {
                      id: "SF-103",
                      status: "Standby",
                      time: "Ready",
                      color: "bg-emerald-500",
                      progress: 100,
                    },
                    {
                      id: "LA-229",
                      status: "Transit",
                      time: "15m rem",
                      color: "bg-emerald-500",
                      progress: 20,
                    },
                    {
                      id: "LD-904",
                      status: "Docking",
                      time: "2m rem",
                      color: "bg-sky-500",
                      progress: 90,
                    },
                  ].map((task, i) => (
                    <motion.div
                      key={i}
                      whileHover={{
                        x: 4,
                        backgroundColor: "var(--surface-muted)",
                      }}
                      className="p-4 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)] hover:border-[var(--text-muted)] transition-all cursor-pointer relative overflow-hidden group"
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${task.color} shadow-[0_0_8px_${task.color}80] group-hover:scale-125 transition-transform`}
                          ></div>
                          <div>
                            <p className="text-[13px] font-black text-main tracking-tight">
                              {task.id}
                            </p>
                            <p className="text-[9px] text-muted font-bold uppercase tracking-widest">
                              {task.status}
                            </p>
                          </div>
                        </div>
                        <span className="text-[10px] font-black text-main bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                          {task.time}
                        </span>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 h-[1px] bg-[var(--border)] group-hover:bg-[var(--text-muted)] transition-colors"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  onClick={() => navigate("/manage-deployment")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-8 py-3.5 btn-secondary text-[10px] font-black uppercase tracking-[0.25em] !bg-[var(--surface-muted)] border-[var(--border)] hover:!bg-[var(--surface-light)]"
                >
                  Manage Deployment
                </motion.button>
              </motion.div>
            </div>

            {/* Bottom Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-12 gap-6"
            >
              {/* Live Fleet Map Section (Larger) */}
              <motion.div
                variants={itemVariants}
                className="col-span-12 xl:col-span-8 dashboard-card !p-0 rounded-[32px] overflow-hidden relative h-[450px] border-[var(--border)] group shadow-2xl"
              >
                <div className="absolute inset-0 bg-[#0F172A] dark:bg-[#0F172A] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFxhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
                    className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-[10s]"
                    alt="Map HUD"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] to-transparent opacity-60"></div>

                  {/* Map Markers */}
                  <div className="absolute top-[30%] left-[40%] group/marker">
                    <div className="relative">
                      <div className="absolute -inset-4 bg-emerald-500/20 rounded-full animate-ping"></div>
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white/40 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/80 dark:bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black text-white whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity uppercase tracking-widest border border-white/10">
                        Unit_402
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-[60%] left-[65%] group/marker">
                    <div className="relative">
                      <div className="w-2 h-2 bg-amber-500 rounded-full border border-white/20 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black text-white whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-opacity uppercase tracking-widest border border-white/10">
                        Unit_881
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                    <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3 text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-2xl">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Network Grid: Active
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                    {["add", "remove", "my_location"].map((icon) => (
                      <button
                        key={icon}
                        className="w-9 h-9 bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all shadow-2xl"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {icon}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="col-span-12 xl:col-span-4 space-y-6">
                {/* Routing Strategies */}
                <motion.div
                  variants={itemVariants}
                  className="dashboard-card !p-8"
                >
                  <h3 className="text-xl font-black text-main mb-8 flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">
                      alt_route
                    </span>
                    Route Engine
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Neural Mesh",
                        desc: "AI-driven vectoring",
                        active: true,
                      },
                      {
                        name: "Fixed Corridors",
                        desc: "Pre-defined lanes",
                        active: false,
                      },
                      {
                        name: "Swarm Logic",
                        desc: "Decentralized nodes",
                        active: false,
                      },
                    ].map((s) => (
                      <motion.button
                        key={s.name}
                        onClick={() => navigate("/simulation-details")}
                        whileHover={{ scale: 1.02, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all group ${
                          s.active
                            ? "bg-[var(--surface-light)] border-[var(--primary)] shadow-xl"
                            : "border-[var(--border)] hover:border-[var(--primary)]/30 bg(--surface)"
                        }`}
                      >
                        <div>
                          <p
                            className={`text-[13px] font-black tracking-tight ${
                              s.active ? "text-[var(--primary)]" : "text-main"
                            }`}
                          >
                            {s.name}
                          </p>
                          <p className="text-[10px] text-muted font-bold uppercase tracking-wider">
                            {s.desc}
                          </p>
                        </div>
                        {s.active ? (
                          <span className="material-symbols-outlined text-[var(--primary)] text-xl">
                            check_circle
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-[var(--text-muted)] group-hover:text-[var(--text-main)] text-xl transition-colors">
                            circle
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Live Telemetry */}
                <motion.div
                  variants={itemVariants}
                  className="dashboard-card !p-8"
                >
                  <h3 className="text-xl font-black text-main mb-8 flex items-center gap-3">
                    <span className="material-symbols-outlined text-rose-500">
                      terminal
                    </span>
                    System Logs
                  </h3>
                  <div className="bg-[var(--background)] rounded-2xl p-5 font-mono text-[10px] space-y-3 h-[180px] overflow-y-auto custom-scrollbar border border-[var(--border)] shadow-inner">
                    <p className="flex gap-3">
                      <span className="text-[var(--text-muted)] font-bold opacity-40">
                        14:02:11
                      </span>{" "}
                      <span className="text-[var(--text-main)] font-medium">
                        CORE_BOOT: Node_AF2_SYNCED
                      </span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-[var(--text-muted)] font-bold opacity-40">
                        14:02:14
                      </span>{" "}
                      <span className="text-[var(--text-main)] font-medium">
                        PKT_REC: Mesh_Topo_Updated
                      </span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-rose-500/50 font-bold opacity-40">
                        14:02:18
                      </span>{" "}
                      <span className="text-rose-400 font-black tracking-tighter">
                        ERR: Node_402_LOW_POWER
                      </span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-[var(--text-muted)] font-bold opacity-40">
                        14:02:22
                      </span>{" "}
                      <span className="text-[var(--text-main)] font-medium">
                        REROUTE: Sector_7_OPTIMIZED
                      </span>
                    </p>
                    <p className="flex gap-3">
                      <span className="text-[var(--text-muted)] font-bold opacity-40">
                        14:02:25
                      </span>{" "}
                      <span className="text-[var(--text-main)] font-medium">
                        SYNC: Master_Clock_ Unified
                      </span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
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
        </div>

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 h-16 w-16 bg-[var(--primary)] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 transition-all"
        >
          <span className="material-symbols-outlined text-3xl font-black">
            bolt
          </span>
        </motion.button>
      </main>
    </div>
  );
};

export default Dashboard;
