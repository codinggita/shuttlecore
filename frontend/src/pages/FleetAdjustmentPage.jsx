import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const FleetAdjustmentPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [adjustmentType, setAdjustmentType] = useState("rest");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Fleet data for units #700-#750 series
  const fleetData = [
    { unit: "Unit #700", operator: "Marcus Vance", shift: "Night", fatigueRisk: 85, restHours: 6.5, reactionTime: "+12%", status: "critical" },
    { unit: "Unit #701", operator: "Sarah Chen", shift: "Day", fatigueRisk: 45, restHours: 8.0, reactionTime: "+3%", status: "normal" },
    { unit: "Unit #702", operator: "David Miller", shift: "Swing", fatigueRisk: 72, restHours: 7.0, reactionTime: "+8%", status: "warning" },
    { unit: "Unit #703", operator: "Jennifer Park", shift: "Day", fatigueRisk: 38, restHours: 8.5, reactionTime: "+2%", status: "normal" },
    { unit: "Unit #704", operator: "Michael Torres", shift: "Night", fatigueRisk: 68, restHours: 6.8, reactionTime: "+10%", status: "warning" },
    { unit: "Unit #705", operator: "Lisa Wong", shift: "Swing", fatigueRisk: 78, restHours: 6.2, reactionTime: "+11%", status: "critical" },
    { unit: "Unit #706", operator: "James Wilson", shift: "Day", fatigueRisk: 42, restHours: 8.2, reactionTime: "+4%", status: "normal" },
    { unit: "Unit #707", operator: "Emma Davis", shift: "Swing", fatigueRisk: 88, restHours: 5.8, reactionTime: "+15%", status: "critical" },
    { unit: "Unit #708", operator: "Alex Johnson", shift: "Night", fatigueRisk: 75, restHours: 6.0, reactionTime: "+13%", status: "warning" },
    { unit: "Unit #709", operator: "Chris Martinez", shift: "Day", fatigueRisk: 35, restHours: 8.8, reactionTime: "+1%", status: "normal" },
    { unit: "Unit #710", operator: "Patricia Brown", shift: "Night", fatigueRisk: 82, restHours: 6.3, reactionTime: "+12%", status: "critical" },
    { unit: "Unit #711", operator: "Robert Taylor", shift: "Swing", fatigueRisk: 65, restHours: 7.2, reactionTime: "+7%", status: "warning" },
    { unit: "Unit #712", operator: "Amanda White", shift: "Day", fatigueRisk: 48, restHours: 8.0, reactionTime: "+5%", status: "normal" },
    { unit: "Unit #713", operator: "Kevin Lee", shift: "Night", fatigueRisk: 90, restHours: 5.5, reactionTime: "+18%", status: "critical" },
    { unit: "Unit #714", operator: "Sandra Garcia", shift: "Swing", fatigueRisk: 71, restHours: 6.9, reactionTime: "+9%", status: "warning" },
    { unit: "Unit #715", operator: "Daniel Kim", shift: "Day", fatigueRisk: 52, restHours: 7.8, reactionTime: "+6%", status: "normal" },
    { unit: "Unit #716", operator: "Michelle Ross", shift: "Night", fatigueRisk: 79, restHours: 6.4, reactionTime: "+11%", status: "critical" },
    { unit: "Unit #717", operator: "Jason Clark", shift: "Swing", fatigueRisk: 63, restHours: 7.3, reactionTime: "+7%", status: "warning" },
    { unit: "Unit #718", operator: "Nicole Adams", shift: "Day", fatigueRisk: 41, restHours: 8.3, reactionTime: "+3%", status: "normal" },
    { unit: "Unit #719", operator: "Ryan Phillips", shift: "Night", fatigueRisk: 86, restHours: 6.1, reactionTime: "+14%", status: "critical" },
    { unit: "Unit #720", operator: "Stephanie Turner", shift: "Swing", fatigueRisk: 74, restHours: 6.7, reactionTime: "+10%", status: "warning" },
    { unit: "Unit #721", operator: "Brandon Collins", shift: "Day", fatigueRisk: 39, restHours: 8.4, reactionTime: "+2%", status: "normal" },
    { unit: "Unit #722", operator: "Rebecca Murphy", shift: "Night", fatigueRisk: 81, restHours: 6.2, reactionTime: "+12%", status: "critical" },
    { unit: "Unit #723", operator: "Justin Rivera", shift: "Swing", fatigueRisk: 67, restHours: 7.1, reactionTime: "+8%", status: "warning" },
    { unit: "Unit #724", operator: "Laura Cooper", shift: "Day", fatigueRisk: 46, restHours: 8.1, reactionTime: "+4%", status: "normal" },
    { unit: "Unit #725", operator: "Tyler Ward", shift: "Night", fatigueRisk: 84, restHours: 6.0, reactionTime: "+13%", status: "critical" },
    { unit: "Unit #726", operator: "Melissa Foster", shift: "Swing", fatigueRisk: 73, restHours: 6.8, reactionTime: "+9%", status: "warning" },
    { unit: "Unit #727", operator: "Aaron Hughes", shift: "Day", fatigueRisk: 44, restHours: 8.2, reactionTime: "+3%", status: "normal" },
    { unit: "Unit #728", operator: "Christina Butler", shift: "Night", fatigueRisk: 87, restHours: 5.9, reactionTime: "+15%", status: "critical" },
    { unit: "Unit #729", operator: "Jordan Simmons", shift: "Swing", fatigueRisk: 69, restHours: 7.0, reactionTime: "+8%", status: "warning" },
    { unit: "Unit #730", operator: "Victoria Price", shift: "Day", fatigueRisk: 37, restHours: 8.6, reactionTime: "+1%", status: "normal" },
    { unit: "Unit #731", operator: "Dylan Richardson", shift: "Night", fatigueRisk: 83, restHours: 6.1, reactionTime: "+13%", status: "critical" },
    { unit: "Unit #732", operator: "Brittany Wood", shift: "Swing", fatigueRisk: 76, restHours: 6.6, reactionTime: "+10%", status: "warning" },
    { unit: "Unit #733", operator: "Cody Barnes", shift: "Day", fatigueRisk: 43, restHours: 8.3, reactionTime: "+3%", status: "normal" },
    { unit: "Unit #734", operator: "Megan Coleman", shift: "Night", fatigueRisk: 89, restHours: 5.7, reactionTime: "+16%", status: "critical" },
    { unit: "Unit #735", operator: "Shawn Patterson", shift: "Swing", fatigueRisk: 70, restHours: 6.9, reactionTime: "+9%", status: "warning" },
    { unit: "Unit #736", operator: "Kelsey Jenkins", shift: "Day", fatigueRisk: 51, restHours: 7.9, reactionTime: "+5%", status: "normal" },
    { unit: "Unit #737", operator: "Brett Perry", shift: "Night", fatigueRisk: 85, restHours: 6.0, reactionTime: "+14%", status: "critical" },
    { unit: "Unit #738", operator: "Cassandra Long", shift: "Swing", fatigueRisk: 77, restHours: 6.5, reactionTime: "+10%", status: "warning" },
    { unit: "Unit #739", operator: "Derek Russell", shift: "Day", fatigueRisk: 49, restHours: 8.0, reactionTime: "+4%", status: "normal" },
    { unit: "Unit #740", operator: "Erica Sanders", shift: "Night", fatigueRisk: 80, restHours: 6.3, reactionTime: "+11%", status: "critical" },
    { unit: "Unit #741", operator: "Shane Gray", shift: "Swing", fatigueRisk: 64, restHours: 7.2, reactionTime: "+7%", status: "warning" },
    { unit: "Unit #742", operator: "Tiffany Bell", shift: "Day", fatigueRisk: 40, restHours: 8.5, reactionTime: "+2%", status: "normal" },
    { unit: "Unit #743", operator: "Kyle Griffin", shift: "Night", fatigueRisk: 91, restHours: 5.6, reactionTime: "+17%", status: "critical" },
    { unit: "Unit #744", operator: "Vanessa Diaz", shift: "Swing", fatigueRisk: 72, restHours: 6.7, reactionTime: "+9%", status: "warning" },
    { unit: "Unit #745", operator: "Corey Hayes", shift: "Day", fatigueRisk: 53, restHours: 7.7, reactionTime: "+6%", status: "normal" },
    { unit: "Unit #746", operator: "Monica Ortiz", shift: "Night", fatigueRisk: 88, restHours: 5.8, reactionTime: "+15%", status: "critical" },
    { unit: "Unit #747", operator: "Scott Reynolds", shift: "Swing", fatigueRisk: 66, restHours: 7.1, reactionTime: "+7%", status: "warning" },
    { unit: "Unit #748", operator: "Allison Fox", shift: "Day", fatigueRisk: 47, restHours: 8.1, reactionTime: "+4%", status: "normal" },
    { unit: "Unit #749", operator: "Bradley Stone", shift: "Night", fatigueRisk: 86, restHours: 5.9, reactionTime: "+14%", status: "critical" },
    { unit: "Unit #750", operator: "Sabrina Palmer", shift: "Swing", fatigueRisk: 75, restHours: 6.6, reactionTime: "+10%", status: "warning" },
  ];

  const handleUnitToggle = (unit) => {
    if (selectedUnits.includes(unit)) {
      setSelectedUnits(selectedUnits.filter(u => u !== unit));
    } else {
      setSelectedUnits([...selectedUnits, unit]);
    }
  };

  const handleSelectAll = () => {
    const criticalUnits = fleetData.filter(f => f.status === "critical").map(f => f.unit);
    setSelectedUnits(selectedUnits.length === criticalUnits.length ? [] : criticalUnits);
  };

  const handleApplyAdjustment = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      alert(`Fleet adjustment applied to ${selectedUnits.length} units. Rest intervals increased by 15 minutes.`);
      navigate("/safety");
    }, 2000);
  };

  const criticalCount = fleetData.filter(f => f.status === "critical").length;
  const warningCount = fleetData.filter(f => f.status === "warning").length;
  const normalCount = fleetData.filter(f => f.status === "normal").length;

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
              <h1 className="text-xl font-black text-main tracking-tighter">Fleet Adjustment</h1>
              <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Unit #700 - #750 Series Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn" title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </motion.button>
            <div className="relative">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/notifications")} className="icon-btn relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-[var(--background)] animate-pulse"></span>
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
            {/* Alert Banner */}
            <motion.div variants={itemVariants} className="mb-8 p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-rose-400 text-2xl">warning</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-black text-rose-400 mb-2">Critical Fatigue Alert: Northeast Corridor</h2>
                  <p className="text-[13px] text-muted leading-relaxed">
                    AI predictive analysis detected a <span className="text-rose-400 font-bold">12% increase</span> in delayed reaction times 
                    during late shift operations (22:00 - 06:00). Affected units show insufficient rest intervals with 
                    average sleep duration of <span className="text-rose-400 font-bold">6.2 hours</span> (below recommended 7.5 hours).
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Units", value: "51", icon: "airport_shuttle", color: "text-[var(--primary)]" },
                { label: "Critical Risk", value: criticalCount, icon: "warning", color: "text-rose-400" },
                { label: "Warning Level", value: warningCount, icon: "error_outline", color: "text-amber-400" },
                { label: "Normal Status", value: normalCount, icon: "check_circle", color: "text-emerald-400" },
              ].map((stat, i) => (
                <div key={i} className="dashboard-card !p-4 text-center">
                  <span className={`material-symbols-outlined ${stat.color} text-lg mb-2`}>{stat.icon}</span>
                  <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Adjustment Controls */}
            <motion.div variants={itemVariants} className="dashboard-card !p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-black text-main flex items-center gap-2">
                    <span className="material-symbols-outlined text-[var(--primary)]">tune</span>
                    Adjustment Parameters
                  </h3>
                  <p className="text-[13px] text-muted mt-1">
                    {selectedUnits.length} units selected for adjustment
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSelectAll}
                    className="px-4 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-lg text-[11px] font-black uppercase tracking-wider text-muted hover:text-[var(--text-main)] transition-all"
                  >
                    Select All Critical
                  </button>
                  <button
                    onClick={() => setSelectedUnits([])}
                    className="px-4 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-lg text-[11px] font-black uppercase tracking-wider text-muted hover:text-[var(--text-main)] transition-all"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="adjustment"
                      value="rest"
                      checked={adjustmentType === "rest"}
                      onChange={(e) => setAdjustmentType(e.target.value)}
                      className="w-4 h-4 accent-[var(--primary)]"
                    />
                    <div>
                      <p className="text-[13px] font-bold text-main">Rest Interval +15 min</p>
                      <p className="text-[10px] text-muted">Increase mandatory break time</p>
                    </div>
                  </label>
                </div>
                <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="adjustment"
                      value="speed"
                      checked={adjustmentType === "speed"}
                      onChange={(e) => setAdjustmentType(e.target.value)}
                      className="w-4 h-4 accent-[var(--primary)]"
                    />
                    <div>
                      <p className="text-[13px] font-bold text-main">Speed Limit -5 mph</p>
                      <p className="text-[10px] text-muted">Reduce max speed during night</p>
                    </div>
                  </label>
                </div>
                <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="adjustment"
                      value="both"
                      checked={adjustmentType === "both"}
                      onChange={(e) => setAdjustmentType(e.target.value)}
                      className="w-4 h-4 accent-[var(--primary)]"
                    />
                    <div>
                      <p className="text-[13px] font-bold text-main">Both Measures</p>
                      <p className="text-[10px] text-muted">Apply rest + speed limits</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleApplyAdjustment}
                disabled={selectedUnits.length === 0}
                className="w-full py-4 bg-[var(--primary)] text-white rounded-xl text-[12px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[var(--primary)]/20"
              >
                Apply Fleet Adjustment to {selectedUnits.length} Units
              </button>
            </motion.div>

            {/* Fleet Table */}
            <motion.div variants={itemVariants} className="dashboard-card !p-6">
              <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">format_list_bulleted</span>
                Unit Status Overview
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-[10px] font-black text-muted uppercase tracking-[0.2em]">
                      <th className="pb-4 text-left">Select</th>
                      <th className="pb-4 text-left">Unit</th>
                      <th className="pb-4 text-left">Operator</th>
                      <th className="pb-4 text-left">Shift</th>
                      <th className="pb-4 text-left">Fatigue Risk</th>
                      <th className="pb-4 text-left">Rest Hours</th>
                      <th className="pb-4 text-left">Reaction Time</th>
                      <th className="pb-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {fleetData.map((unit, i) => (
                      <tr key={i} className="border-b border-[var(--border)]/50 hover:bg-[var(--surface-muted)] transition-colors">
                        <td className="py-4">
                          <input
                            type="checkbox"
                            checked={selectedUnits.includes(unit.unit)}
                            onChange={() => handleUnitToggle(unit.unit)}
                            className="w-4 h-4 accent-[var(--primary)] cursor-pointer"
                          />
                        </td>
                        <td className="py-4">
                          <span className="text-[11px] font-mono text-muted">{unit.unit}</span>
                        </td>
                        <td className="py-4">
                          <p className="text-[13px] font-bold text-main">{unit.operator}</p>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-[var(--surface-muted)] text-muted">
                            {unit.shift}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[var(--surface-muted)] rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${unit.fatigueRisk >= 85 ? "bg-rose-400" : unit.fatigueRisk >= 65 ? "bg-amber-400" : "bg-emerald-400"}`}
                                style={{ width: `${unit.fatigueRisk}%` }}
                              ></div>
                            </div>
                            <span className={`text-[11px] font-bold ${unit.fatigueRisk >= 85 ? "text-rose-400" : unit.fatigueRisk >= 65 ? "text-amber-400" : "text-emerald-400"}`}>
                              {unit.fatigueRisk}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`text-[11px] font-bold ${unit.restHours < 6.5 ? "text-rose-400" : unit.restHours < 7.5 ? "text-amber-400" : "text-emerald-400"}`}>
                            {unit.restHours}h
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`text-[11px] font-bold ${unit.reactionTime.includes("+") && parseInt(unit.reactionTime) > 10 ? "text-rose-400" : "text-amber-400"}`}>
                            {unit.reactionTime}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${unit.status === "critical" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : unit.status === "warning" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                            {unit.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Confirmation Modal */}
            {showConfirmation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="dashboard-card !p-8 max-w-md w-full mx-4"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-[var(--primary)] text-3xl animate-spin">sync</span>
                    </div>
                    <h3 className="text-xl font-black text-main mb-2">Applying Adjustment...</h3>
                    <p className="text-[13px] text-muted">
                      Updating fleet parameters for {selectedUnits.length} units
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

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

export default FleetAdjustmentPage;
