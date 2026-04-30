import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const EventLogPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  // Reset to page 1 when filter changes
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  // Export events to CSV
  const handleExportCSV = () => {
    const headers = ["Event ID", "Unit", "Type", "Severity", "Time", "Description", "Location", "Operator", "Status"];
    const rows = filteredEvents.map(e => [
      e.id,
      e.unit,
      e.type,
      e.severity,
      e.time,
      e.description,
      e.location,
      e.operator,
      e.status
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `event-log-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const events = [
    {
      id: "EV-8421",
      unit: "Unit #8421",
      type: "Harsh Braking",
      severity: "high",
      time: "2M AGO",
      description: "Impact force: 0.85g at 45mph. Driver identified.",
      location: "I-405 N, Mile 24.5",
      operator: "Marcus Vance",
      status: "Reviewed",
      icon: "priority_high",
    },
    {
      id: "EV-9031",
      unit: "Unit #9031",
      type: "Speed Limit +15",
      severity: "medium",
      time: "14M AGO",
      description: "Observed speed 70mph in a 55mph construction zone.",
      location: "Highway 101, Construction Zone B",
      operator: "Sarah Chen",
      status: "Pending",
      icon: "speed",
    },
    {
      id: "EV-1105",
      unit: "Unit #1105",
      type: "Aggressive Turn",
      severity: "medium",
      time: "42M AGO",
      description: "Lateral g-force exceeded safety threshold on exit 14B.",
      location: "Exit 14B, Downtown Junction",
      operator: "David Miller",
      status: "Resolved",
      icon: "turn_slight_right",
    },
    {
      id: "EV-2047",
      unit: "Unit #2047",
      type: "Lane Departure",
      severity: "low",
      time: "1H AGO",
      description: "Unsignaled lane change detected. No collision risk.",
      location: "Main St & 5th Ave",
      operator: "Jennifer Park",
      status: "Reviewed",
      icon: "swap_horiz",
    },
    {
      id: "EV-3156",
      unit: "Unit #3156",
      type: "Hard Acceleration",
      severity: "low",
      time: "2H AGO",
      description: "Rapid acceleration from stop. 0-60 in 4.2 seconds.",
      location: "Airport Blvd Intersection",
      operator: "Michael Torres",
      status: "Pending",
      icon: "rocket_launch",
    },
    {
      id: "EV-4421",
      unit: "Unit #4421",
      type: "Collision Warning",
      severity: "high",
      time: "3H AGO",
      description: "Forward collision warning triggered. Automatic braking engaged.",
      location: "Commerce St, Block 400",
      operator: "Lisa Wong",
      status: "Resolved",
      icon: "warning",
    },
    {
      id: "EV-5523",
      unit: "Unit #5523",
      type: "Sudden Stop",
      severity: "medium",
      time: "4H AGO",
      description: "Emergency braking due to pedestrian detection.",
      location: "Market St, Crosswalk 12",
      operator: "James Wilson",
      status: "Reviewed",
      icon: "stop_circle",
    },
    {
      id: "EV-6612",
      unit: "Unit #6612",
      type: "Signal Violation",
      severity: "high",
      time: "5H AGO",
      description: "Red light violation detected at monitored intersection.",
      location: "Broadway & 1st Ave",
      operator: "Emma Davis",
      status: "Pending",
      icon: "traffic",
    },
    {
      id: "EV-7734",
      unit: "Unit #7734",
      type: "Proximity Alert",
      severity: "low",
      time: "6H AGO",
      description: "Close following distance maintained for 2 minutes.",
      location: "I-280 S, Mile 15",
      operator: "Alex Johnson",
      status: "Resolved",
      icon: "sensors",
    },
    {
      id: "EV-8845",
      unit: "Unit #8845",
      type: "Weather Advisory",
      severity: "low",
      time: "7H AGO",
      description: "Reduced speed due to rain conditions. Auto-wipers activated.",
      location: "Bay Bridge Approach",
      operator: "Chris Lee",
      status: "Resolved",
      icon: "water_drop",
    },
    {
      id: "EV-9956",
      unit: "Unit #9956",
      type: "Route Deviation",
      severity: "medium",
      time: "8H AGO",
      description: "Unauthorized route change to avoid construction zone.",
      location: "Oakland Ave Detour",
      operator: "Pat Brown",
      status: "Reviewed",
      icon: "alt_route",
    },
    {
      id: "EV-1067",
      unit: "Unit #1067",
      type: "Brake System Check",
      severity: "low",
      time: "9H AGO",
      description: "Routine brake diagnostic completed. All systems nominal.",
      location: "Maintenance Depot A",
      operator: "Sam Taylor",
      status: "Resolved",
      icon: "build_circle",
    },
    {
      id: "EV-2178",
      unit: "Unit #2178",
      type: "Passenger Alert",
      severity: "medium",
      time: "10H AGO",
      description: "Unattended package detected. Security protocol activated.",
      location: "Terminal C, Gate 4",
      operator: "Jordan Smith",
      status: "Pending",
      icon: "backpack",
    },
    {
      id: "EV-3289",
      unit: "Unit #3289",
      type: "Tire Pressure",
      severity: "low",
      time: "11H AGO",
      description: "Minor pressure variance detected. Auto-compensation active.",
      location: "Route 101, Mile 45",
      operator: "Morgan Blake",
      status: "Resolved",
      icon: "tire_repair",
    },
    {
      id: "EV-4390",
      unit: "Unit #4390",
      type: "Night Mode Engage",
      severity: "low",
      time: "12H AGO",
      description: "Automatic lighting adjustment for dusk conditions.",
      location: "Sunset Blvd",
      operator: "Casey White",
      status: "Resolved",
      icon: "dark_mode",
    },
    {
      id: "EV-5401",
      unit: "Unit #5401",
      type: "Obstacle Detection",
      severity: "high",
      time: "13H AGO",
      description: "Debris in lane detected. Emergency maneuver executed.",
      location: "Highway 880, Mile 22",
      operator: "Riley Green",
      status: "Reviewed",
      icon: "report_problem",
    },
    {
      id: "EV-6512",
      unit: "Unit #6512",
      type: "Communication Loss",
      severity: "medium",
      time: "14H AGO",
      description: "30-second network disconnection. Backup systems engaged.",
      location: "Tunnel Section B",
      operator: "Quinn Black",
      status: "Resolved",
      icon: "wifi_off",
    },
    {
      id: "EV-7623",
      unit: "Unit #7623",
      type: "Battery Thermal",
      severity: "low",
      time: "15H AGO",
      description: "Temperature spike during fast charging. Cooling activated.",
      location: "Charging Station 7",
      operator: "Skyler Gray",
      status: "Resolved",
      icon: "thermostat",
    },
    {
      id: "EV-8734",
      unit: "Unit #8734",
      type: "Camera Obstruction",
      severity: "medium",
      time: "16H AGO",
      description: "Front camera partially blocked. Cleaning cycle initiated.",
      location: "Dusty Road Construction",
      operator: "Drew Brown",
      status: "Pending",
      icon: "videocam_off",
    },
    {
      id: "EV-9845",
      unit: "Unit #9845",
      type: "Scheduled Maintenance",
      severity: "low",
      time: "17H AGO",
      description: "Routine 10K mile service completed. Logs uploaded.",
      location: "Service Center 3",
      operator: "Jamie Blue",
      status: "Resolved",
      icon: "handyman",
    },
    {
      id: "EV-0956",
      unit: "Unit #0956",
      type: "Emergency Override",
      severity: "high",
      time: "18H AGO",
      description: "Operator took manual control. Incident report filed.",
      location: "Downtown Core",
      operator: "Taylor Red",
      status: "Reviewed",
      icon: "touch_app",
    },
    {
      id: "EV-1068",
      unit: "Unit #1068",
      type: "Low Visibility",
      severity: "low",
      time: "19H AGO",
      description: "Fog detection. Speed reduced per safety protocol.",
      location: "Golden Gate Bridge",
      operator: "Morgan Yellow",
      status: "Resolved",
      icon: "foggy",
    },
    {
      id: "EV-2179",
      unit: "Unit #2179",
      type: "Door Sensor",
      severity: "low",
      time: "20H AGO",
      description: "Passenger door sensor recalibrated. All locks verified.",
      location: "Depot Maintenance",
      operator: "Charlie Purple",
      status: "Resolved",
      icon: "door_front",
    },
    {
      id: "EV-3290",
      unit: "Unit #3290",
      type: "Geo-Fence Entry",
      severity: "medium",
      time: "21H AGO",
      description: "Entered restricted zone with clearance. Logged for audit.",
      location: "Airport Perimeter",
      operator: "Jordan Orange",
      status: "Reviewed",
      icon: "fence",
    },
    {
      id: "EV-4401",
      unit: "Unit #4401",
      type: "Speed Calibration",
      severity: "low",
      time: "22H AGO",
      description: "Speedometer recalibration completed. GPS sync verified.",
      location: "Test Track A",
      operator: "Alex Pink",
      status: "Resolved",
      icon: "speed",
    },
    {
      id: "EV-5512",
      unit: "Unit #5512",
      type: "Pedestrian Near-Miss",
      severity: "high",
      time: "23H AGO",
      description: "Sudden pedestrian entry. Full stop executed safely.",
      location: "School Zone, 4th St",
      operator: "Sam Cyan",
      status: "Pending",
      icon: "directions_walk",
    },
    {
      id: "EV-6623",
      unit: "Unit #6623",
      type: "Audio Alert",
      severity: "low",
      time: "24H AGO",
      description: "Horn activation for emergency vehicle yielding.",
      location: "Emergency Corridor",
      operator: "Pat Magenta",
      status: "Resolved",
      icon: "volume_up",
    },
  ];

  const filteredEvents = filter === "all" ? events : events.filter(e => e.severity === filter);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "bg-rose-500/10 border-rose-500/20 text-rose-400";
      case "medium": return "bg-amber-500/10 border-amber-500/20 text-amber-400";
      case "low": return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
      default: return "bg-slate-500/10 border-slate-500/20 text-slate-400";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high": return "bg-rose-500/20 text-rose-400";
      case "medium": return "bg-amber-500/20 text-amber-400";
      case "low": return "bg-emerald-500/20 text-emerald-400";
      default: return "bg-slate-500/20 text-slate-400";
    }
  };

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
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--text-main)] transition-colors text-lg">search</span>
                <input type="text" placeholder="Search Event Logs..." className="input-field !pl-11" />
              </div>
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
            {/* Header Area */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <button onClick={() => navigate("/safety")} className="text-muted hover:text-[var(--text-main)] transition-colors">
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                  </button>
                  <h1 className="text-2xl md:text-3xl font-black text-main tracking-tighter">Complete Event Log</h1>
                </div>
                <p className="text-[13px] text-muted font-medium mt-1">Comprehensive safety event archive with real-time telemetry analysis.</p>
              </div>
              <div className="flex items-center gap-3">
                <select 
                  value={filter} 
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="px-4 py-2.5 bg-[var(--surface-light)] border border-[var(--border)] rounded-xl text-[11px] font-black text-[var(--text-main)] uppercase tracking-widest focus:outline-none focus:border-[var(--primary)] cursor-pointer"
                >
                  <option value="all">All Events</option>
                  <option value="high">High Severity</option>
                  <option value="medium">Medium Severity</option>
                  <option value="low">Low Severity</option>
                </select>
                <button 
                  onClick={handleExportCSV}
                  className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-xl text-[10px] font-black flex items-center gap-2.5 hover:opacity-90 transition-all shadow-xl shadow-indigo-500/20 uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  Export CSV
                </button>
              </div>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Events", value: "1,247", change: "+12 today", color: "text-[var(--primary)]" },
                { label: "High Severity", value: "23", change: "-3 vs yesterday", color: "text-rose-400" },
                { label: "Pending Review", value: "18", change: "Action needed", color: "text-amber-400" },
                { label: "Resolved Today", value: "45", change: "100% clearance", color: "text-emerald-400" },
              ].map((stat, i) => (
                <div key={i} className="dashboard-card !p-5">
                  <p className="text-[10px] font-black text-muted uppercase tracking-[0.15em] mb-2 opacity-60">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <span className={`text-2xl font-black tracking-tighter ${stat.color}`}>{stat.value}</span>
                    <span className="text-[9px] font-bold text-muted">{stat.change}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Events Table */}
            <motion.div variants={itemVariants} className="dashboard-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-4 px-6 text-[10px] font-black text-muted uppercase tracking-[0.15em]">Event ID</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-muted uppercase tracking-[0.15em]">Unit / Operator</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-muted uppercase tracking-[0.15em]">Event Type</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-muted uppercase tracking-[0.15em]">Severity</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-muted uppercase tracking-[0.15em]">Time</th>
                      <th className="text-left py-4 px-6 text-[10px] font-black text-muted uppercase tracking-[0.15em]">Status</th>
                      <th className="text-right py-4 px-6 text-[10px] font-black text-muted uppercase tracking-[0.15em]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEvents.map((event, i) => (
                      <motion.tr 
                        key={event.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-[var(--border)]/50 hover:bg-[var(--surface-muted)] transition-colors group"
                      >
                        <td className="py-5 px-6">
                          <span className="text-[11px] font-mono text-muted">{event.id}</span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getSeverityIcon(event.severity)}`}>
                              <span className="material-symbols-outlined text-lg">{event.icon}</span>
                            </div>
                            <div>
                              <p className="text-[13px] font-black text-main">{event.unit}</p>
                              <p className="text-[10px] text-muted">{event.operator}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <p className="text-[13px] font-bold text-main">{event.type}</p>
                          <p className="text-[10px] text-muted max-w-[200px] truncate">{event.description}</p>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${getSeverityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-[11px] font-bold text-muted">{event.time}</span>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`text-[10px] font-black uppercase tracking-wider ${event.status === "Resolved" ? "text-emerald-400" : event.status === "Pending" ? "text-amber-400" : "text-blue-400"}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <button 
                            onClick={() => navigate(`/incident-report?id=${event.id}`)}
                            className="px-4 py-2 border border-[var(--border)] rounded-lg text-[10px] font-black uppercase tracking-wider text-muted hover:text-[var(--text-main)] hover:border-[var(--primary)] transition-all opacity-0 group-hover:opacity-100"
                          >
                            View Details
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Pagination */}
            <motion.div variants={itemVariants} className="flex items-center justify-between mt-6">
              <p className="text-[11px] text-muted font-medium">
                Showing {indexOfFirstEvent + 1}-{Math.min(indexOfLastEvent, filteredEvents.length)} of {filteredEvents.length} events
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg text-[10px] font-black text-muted hover:text-[var(--text-main)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    // Show ellipsis if needed
                    if (totalPages > 5) {
                      if (i === 0 && pageNum > 1) {
                        return (
                          <React.Fragment key="start">
                            <button 
                              onClick={() => handlePageChange(1)}
                              className={`w-9 h-9 rounded-lg text-[11px] font-black transition-all ${1 === currentPage ? "bg-[var(--primary)] text-white" : "text-muted hover:text-[var(--text-main)] hover:bg-[var(--surface-muted)]"}`}
                            >
                              1
                            </button>
                            <span className="w-9 h-9 flex items-center justify-center text-muted text-[11px]">...</span>
                          </React.Fragment>
                        );
                      }
                      if (i === 4 && pageNum < totalPages) {
                        return (
                          <React.Fragment key="end">
                            <span className="w-9 h-9 flex items-center justify-center text-muted text-[11px]">...</span>
                            <button 
                              onClick={() => handlePageChange(totalPages)}
                              className={`w-9 h-9 rounded-lg text-[11px] font-black transition-all ${totalPages === currentPage ? "bg-[var(--primary)] text-white" : "text-muted hover:text-[var(--text-main)] hover:bg-[var(--surface-muted)]"}`}
                            >
                              {totalPages}
                            </button>
                          </React.Fragment>
                        );
                      }
                    }
                    
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-9 h-9 rounded-lg text-[11px] font-black transition-all ${pageNum === currentPage ? "bg-[var(--primary)] text-white" : "text-muted hover:text-[var(--text-main)] hover:bg-[var(--surface-muted)]"}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="px-4 py-2 border border-[var(--border)] rounded-lg text-[10px] font-black text-muted hover:text-[var(--text-main)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </motion.div>

            {/* Footer */}
            <footer className="mt-16 border-t border-[var(--border)] py-12">
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

export default EventLogPage;
