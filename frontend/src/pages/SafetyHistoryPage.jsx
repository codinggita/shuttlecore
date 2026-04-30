import React, { useState } from "react";
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
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";

const SafetyHistoryPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // 7 Days of comprehensive safety data
  const sevenDayData = [
    {
      date: "Apr 30",
      day: "Today",
      incidents: 2,
      alerts: 3,
      miles: "1,847",
      drivers: 24,
      safetyScore: 94,
      events: [
        { time: "08:45", type: "info", desc: "Pre-trip inspections completed", unit: "Fleet Wide" },
        { time: "11:20", type: "warning", desc: "Speed advisory: Highway 101", unit: "Unit #2047" },
        { time: "14:30", type: "success", desc: "Zero incidents: Marcus Vance", unit: "Unit #8421" },
        { time: "16:15", type: "warning", desc: "Lane departure warning", unit: "Unit #3156" },
      ]
    },
    {
      date: "Apr 29",
      day: "Yesterday",
      incidents: 1,
      alerts: 5,
      miles: "2,156",
      drivers: 26,
      safetyScore: 92,
      events: [
        { time: "09:00", type: "success", desc: "Safety training completed", unit: "5 Operators" },
        { time: "12:45", type: "warning", desc: "Harsh braking detected", unit: "Unit #1105" },
        { time: "15:30", type: "info", desc: "System maintenance completed", unit: "Fleet Wide" },
      ]
    },
    {
      date: "Apr 28",
      day: "Sunday",
      incidents: 0,
      alerts: 2,
      miles: "1,523",
      drivers: 18,
      safetyScore: 96,
      events: [
        { time: "10:00", type: "success", desc: "Perfect safety record", unit: "All Units" },
        { time: "13:20", type: "info", desc: "Reduced operations: Weekend", unit: "Fleet Wide" },
      ]
    },
    {
      date: "Apr 27",
      day: "Saturday",
      incidents: 3,
      alerts: 7,
      miles: "1,892",
      drivers: 20,
      safetyScore: 89,
      events: [
        { time: "08:30", type: "warning", desc: "Weather advisory: Fog", unit: "Bay Area" },
        { time: "11:45", type: "warning", desc: "Collision warning: Unit #4421", unit: "Unit #4421" },
        { time: "14:00", type: "success", desc: "Auto-brake prevented incident", unit: "Unit #4421" },
        { time: "17:30", type: "info", desc: "Shift change completed", unit: "Fleet Wide" },
      ]
    },
    {
      date: "Apr 26",
      day: "Friday",
      incidents: 4,
      alerts: 8,
      miles: "2,445",
      drivers: 28,
      safetyScore: 87,
      events: [
        { time: "07:15", type: "warning", desc: "Rush hour congestion alerts", unit: "Multiple" },
        { time: "09:30", type: "warning", desc: "Aggressive turn: Unit #1105", unit: "Unit #1105" },
        { time: "12:00", type: "warning", desc: "Proximity alert", unit: "Unit #2047" },
        { time: "16:45", type: "info", desc: "End of week safety check", unit: "Fleet Wide" },
      ]
    },
    {
      date: "Apr 25",
      day: "Thursday",
      incidents: 2,
      alerts: 4,
      miles: "2,234",
      drivers: 27,
      safetyScore: 93,
      events: [
        { time: "08:00", type: "success", desc: "All systems operational", unit: "Fleet Wide" },
        { time: "13:15", type: "warning", desc: "Fatigue detection alert", unit: "Unit #3156" },
        { time: "18:30", type: "info", desc: "Driver rest compliance: 100%", unit: "Fleet Wide" },
      ]
    },
    {
      date: "Apr 24",
      day: "Wednesday",
      incidents: 1,
      alerts: 3,
      miles: "2,089",
      drivers: 25,
      safetyScore: 95,
      events: [
        { time: "09:45", type: "success", desc: "Safety milestone: 30 days", unit: "Marcus Vance" },
        { time: "14:20", type: "info", desc: "Telemetry sync completed", unit: "Fleet Wide" },
      ]
    },
  ];

  const weeklyStats = {
    totalIncidents: 13,
    totalAlerts: 32,
    totalMiles: "14,186",
    avgSafetyScore: 92,
    bestDay: "Apr 28",
    improvement: "+3%",
  };

  const chartData = sevenDayData.map(d => ({
    day: d.day,
    incidents: d.incidents,
    alerts: d.alerts,
    score: d.safetyScore,
  }));

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity" title="Back to Home">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20 transition-all">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="text-[var(--text-main)] opacity-70">CORE</span></span>
          </Link>

          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">Operational Hub</p>
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}
              >
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(244, 63, 94, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
          >
            <span className="material-symbols-outlined text-lg animate-pulse">emergency_home</span>
            Emergency Stop
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFxhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw" alt="Profile" className="w-10 h-10 rounded-full border border-white/20" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--surface)]"></div>
              </div>
              <div>
                <p className="text-[13px] font-black text-main leading-tight">Cmdr. Operative</p>
                <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Systems Lead</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg hover:bg-rose-400/5">
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
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn">
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
            <button onClick={() => navigate("/safety")} className="text-muted hover:text-[var(--text-main)] transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl font-black text-main tracking-tighter">7-Day Safety History</h1>
              <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Apr 24 - Apr 30, 2024</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn" title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </motion.button>
            <div className="relative">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/notifications")} className="icon-btn relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-emerald-500 rounded-full border-2 border-[var(--background)] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
              </motion.button>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="icon-btn hidden xs:flex">
              <span className="material-symbols-outlined">settings</span>
            </motion.button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto">
            {/* Weekly Summary Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {[
                { label: "Total Incidents", value: weeklyStats.totalIncidents, icon: "warning", color: "text-rose-400" },
                { label: "Total Alerts", value: weeklyStats.totalAlerts, icon: "notifications_active", color: "text-amber-400" },
                { label: "Total Miles", value: weeklyStats.totalMiles, icon: "route", color: "text-[var(--primary)]" },
                { label: "Avg Safety Score", value: `${weeklyStats.avgSafetyScore}%`, icon: "verified", color: "text-emerald-400" },
                { label: "Best Day", value: weeklyStats.bestDay, icon: "emoji_events", color: "text-blue-400" },
                { label: "Improvement", value: weeklyStats.improvement, icon: "trending_up", color: "text-emerald-400" },
              ].map((stat, i) => (
                <div key={i} className="dashboard-card !p-4 text-center">
                  <span className={`material-symbols-outlined ${stat.color} text-lg mb-2`}>{stat.icon}</span>
                  <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Safety Score Trend */}
              <motion.div variants={itemVariants} className="dashboard-card !p-6">
                <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">show_chart</span>
                  Safety Score Trend (7 Days)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.3} />
                      <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis domain={[80, 100]} stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "12px",
                        }}
                      />
                      <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#scoreGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Incidents & Alerts */}
              <motion.div variants={itemVariants} className="dashboard-card !p-6">
                <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-400">warning</span>
                  Daily Incidents & Alerts
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.3} />
                      <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(15, 23, 42, 0.9)",
                          borderColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "12px",
                        }}
                      />
                      <Bar dataKey="incidents" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Incidents" />
                      <Bar dataKey="alerts" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Alerts" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Daily Breakdown */}
            <motion.div variants={itemVariants} className="dashboard-card !p-6 mb-8">
              <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">calendar_view_day</span>
                Daily Safety Breakdown
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {sevenDayData.map((day, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                    className={`p-4 rounded-xl border transition-all text-left ${selectedDay === i ? "bg-[var(--primary)]/10 border-[var(--primary)]" : "bg-[var(--surface-muted)] border-[var(--border)] hover:border-[var(--text-muted)]"}`}
                  >
                    <p className="text-[10px] text-muted uppercase font-black tracking-wider mb-1">{day.date}</p>
                    <p className="text-[11px] font-bold text-main mb-3">{day.day}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted">Score</span>
                        <span className={`text-[11px] font-black ${day.safetyScore >= 95 ? "text-emerald-400" : day.safetyScore >= 90 ? "text-blue-400" : "text-amber-400"}`}>
                          {day.safetyScore}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted">Incidents</span>
                        <span className="text-[11px] font-bold text-rose-400">{day.incidents}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted">Alerts</span>
                        <span className="text-[11px] font-bold text-amber-400">{day.alerts}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted">Miles</span>
                        <span className="text-[11px] font-bold text-[var(--primary)]">{day.miles}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Selected Day Events */}
            {selectedDay !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="dashboard-card !p-6 mb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[13px] font-black text-main flex items-center gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)]">event_note</span>
                    {sevenDayData[selectedDay].day} Events ({sevenDayData[selectedDay].date})
                  </h3>
                  <button 
                    onClick={() => setSelectedDay(null)}
                    className="text-muted hover:text-[var(--text-main)] transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="space-y-3">
                  {sevenDayData[selectedDay].events.map((event, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${event.type === "success" ? "bg-emerald-500/10" : event.type === "warning" ? "bg-amber-500/10" : "bg-blue-500/10"}`}>
                        <span className={`material-symbols-outlined ${event.type === "success" ? "text-emerald-400" : event.type === "warning" ? "text-amber-400" : "text-blue-400"}`}>
                          {event.type === "success" ? "check_circle" : event.type === "warning" ? "warning" : "info"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-bold text-main">{event.desc}</p>
                        <p className="text-[10px] text-muted uppercase font-bold tracking-wider">{event.unit}</p>
                      </div>
                      <span className="text-[11px] font-bold text-muted">{event.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Incident Type Breakdown */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { type: "Speed Violations", count: 4, trend: "-2", icon: "speed", color: "rose" },
                { type: "Lane Departures", count: 3, trend: "+1", icon: "swap_calls", color: "amber" },
                { type: "Collision Warnings", count: 2, trend: "-1", icon: "warning", color: "blue" },
                { type: "Harsh Braking", count: 1, trend: "0", icon: "emergency_brake", color: "orange" },
                { type: "Fatigue Alerts", count: 2, trend: "-3", icon: "bedtime", color: "purple" },
                { type: "Proximity Alerts", count: 1, trend: "+1", icon: "sensors", color: "cyan" },
              ].map((item, i) => (
                <div key={i} className="dashboard-card !p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="material-symbols-outlined text-muted">{item.icon}</span>
                    <span className={`text-[10px] font-black ${item.trend.startsWith("-") ? "text-emerald-400" : item.trend === "0" ? "text-muted" : "text-rose-400"}`}>
                      {item.trend} vs last week
                    </span>
                  </div>
                  <p className="text-2xl font-black text-main mb-1">{item.count}</p>
                  <p className="text-[10px] text-muted uppercase font-black tracking-wider">{item.type}</p>
                </div>
              ))}
            </motion.div>

            {/* Footer */}
            <footer className="mt-12 border-t border-[var(--border)] py-12">
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

export default SafetyHistoryPage;
