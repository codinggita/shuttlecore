import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const AIDispatchPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dispatchQueue, setDispatchQueue] = useState([
    {
      id: "TX-9012",
      passenger: "Marcus Thorne",
      origin: "LHR-T5",
      destination: "Central Hub",
      priority: "URGENT",
      autoAssign: "SV-201",
      status: "pending",
    },
    {
      id: "TX-9013",
      passenger: "Elena Vance",
      origin: "District 4",
      destination: "Skyline Dr",
      priority: "ROUTINE",
      autoAssign: null,
      status: "waitlist",
    },
    {
      id: "TX-9014",
      passenger: "James Chen",
      origin: "Tech Park",
      destination: "Airport T2",
      priority: "URGENT",
      autoAssign: "SV-305",
      status: "pending",
    },
    {
      id: "TX-9015",
      passenger: "Sarah Miller",
      origin: "Downtown",
      destination: "West End",
      priority: "ROUTINE",
      autoAssign: null,
      status: "waitlist",
    },
  ]);

  const [vehicles, setVehicles] = useState([
    { id: "SV-402", eta: "4m 12s", x: 33, y: 50, status: "active" },
    { id: "SV-201", eta: "2m 45s", x: 45, y: 35, status: "active" },
    { id: "SV-305", eta: "6m 20s", x: 60, y: 55, status: "active" },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleDispatchConfirm = (orderId) => {
    setDispatchQueue((prev) =>
      prev.map((item) =>
        item.id === orderId ? { ...item, status: "confirmed" } : item,
      ),
    );
  };

  const handleDeployUnits = () => {
    navigate("/deploy-units");
  };

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

  const stats = [
    {
      label: "Pending Requests",
      value: "124",
      trend: "+12%",
      icon: "pending_actions",
      color: "text-gray-400",
    },
    {
      label: "Live Fleets",
      value: "86",
      total: "92",
      subtext: "94% Deployment",
      icon: "electric_car",
      color: "text-gray-400",
    },
    {
      label: "Efficiency Core",
      value: "98.2%",
      subtext: "Optimal Route",
      icon: "speed",
      color: "text-gray-400",
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
                New Dispatch
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
            {/* Book My Ride Feature Card */}
            <motion.div 
              variants={itemVariants} 
              className="mb-8 dashboard-card !p-6 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/20"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[var(--primary)] text-3xl">history</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-main mb-1">Ride History</h3>
                    <p className="text-[13px] text-muted">View all your past and upcoming bookings</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/ride-history")}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl text-[12px] font-black uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  View History
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
              {/* Hero Status: Active Orders */}
              <section className="col-span-12 lg:col-span-8 space-y-6">
                {/* Stats Cards */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                    className="card-white p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
                    <div className="flex justify-between items-start mb-6">
                      <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] opacity-60">
                        {stat.label}
                      </p>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">
                        {stat.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-main tracking-tighter">
                        {stat.value}
                        {stat.total && (
                          <span className="text-sm text-muted ml-1 opacity-40">
                            /{stat.total}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[10px] font-black mt-2 uppercase tracking-widest ${stat.trend ? "text-emerald-400" : "text-slate-500"}`}
                      >
                        {stat.trend && (
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-xs">
                              trending_up
                            </span>
                            {stat.trend}
                          </span>
                        )}
                        {stat.subtext && stat.subtext}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Real-time Dispatch Map */}
              <motion.div
                variants={itemVariants}
                className="dashboard-card !p-0 rounded-[32px] overflow-hidden h-[450px] relative group border-[var(--border)] shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-transform duration-[10s]"
                  style={{
                    backgroundImage:
                      "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDp8spq3mDA9ta6CRefSmovMdLnMQa-IXxWoyUe5Ke0ZgulpzuOfi3Z8kEl-wHTfqMlrJTuRgS5cjuAhBE0Et89VyYQEagtOaL6HY1vCI5Ej6jWht5yxUU2TUpq2YP8JajO3tF9pPq8I5F_x_3pyZUT-UztMEYUrYF_0MvQulECtrdw_aV_cM-CKeg2FIEVOKqV8PlAli1K_9Htkry46pwwQ_bZr9JRW3NvlQGoF9kia2aKvtxtsi91OTrIlElNeg38N1caUctq8AI)",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80"></div>

                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 flex items-center gap-3 text-[10px] font-black tracking-[0.2em] shadow-2xl">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                    LIVE NETWORK STREAM: SECTOR_7
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 flex gap-3">
                  {["add", "remove", "layers"].map((icon) => (
                    <motion.button
                      key={icon}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="h-10 w-10 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white transition-all shadow-2xl"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {icon}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Vehicle Indicators */}
                {vehicles.map((vehicle, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="absolute group cursor-pointer"
                    style={{ top: `${vehicle.y}%`, left: `${vehicle.x}%` }}
                  >
                    <div className="h-5 w-5 bg-white rounded-full border-2 border-gray-900 shadow-2xl flex items-center justify-center group-hover:scale-125 transition-transform">
                      <span className="material-symbols-outlined text-[10px] text-gray-900 font-black">
                        chevron_right
                      </span>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute -top-16 -left-12 pointer-events-none bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-xl text-[10px] w-32 shadow-2xl"
                    >
                      <p className="font-black text-white mb-1 uppercase tracking-widest">
                        Unit {vehicle.id}
                      </p>
                      <p className="text-muted font-bold">
                        ETA: <span className="text-white">{vehicle.eta}</span>
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pending Dispatch Table */}
              <motion.div
                variants={itemVariants}
                className="dashboard-card !p-0 rounded-[24px] overflow-hidden border-[var(--border)] shadow-2xl"
              >
                <div className="px-8 py-8 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-muted)]">
                  <h3 className="text-2xl font-black text-main tracking-tight">
                    Live Dispatch Queue
                  </h3>
                  <button className="text-[10px] font-black text-muted hover:text-white uppercase tracking-[0.25em] transition-colors opacity-70">
                    ARCHIVE TERMINAL
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] font-black text-muted uppercase tracking-[0.25em] border-b border-[var(--border)] bg-[var(--surface-muted)]">
                        <th className="px-8 py-5 font-black">ORDER ID</th>
                        <th className="px-8 py-5 font-black">PASSENGER</th>
                        <th className="px-8 py-5 font-black">ROUTE MATRIX</th>
                        <th className="px-8 py-5 font-black">PRIORITY</th>
                        <th className="px-8 py-5 font-black">AUTO-ASSIGN</th>
                        <th className="px-8 py-5 font-black">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {dispatchQueue.map((item) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-[var(--surface-muted)] transition-colors group"
                        >
                          <td className="px-8 py-7 font-mono text-[11px] font-bold text-muted opacity-60">
                            {item.id}
                          </td>
                          <td className="px-8 py-7">
                            <p className="text-lg font-black text-main tracking-tight group-hover:text-white transition-colors">
                              {item.passenger}
                            </p>
                          </td>
                          <td className="px-8 py-7">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col">
                                <span className="text-[11px] font-black text-muted uppercase tracking-widest opacity-60">
                                  {item.origin}
                                </span>
                              </div>
                              <span className="material-symbols-outlined text-sm text-muted opacity-30">
                                arrow_forward
                              </span>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-black text-main uppercase tracking-widest">
                                  {item.destination}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-7">
                            <span
                              className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase border ${item.priority === "URGENT" ? "bg-rose-500/5 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]" : "bg-slate-500/5 text-slate-400 border-slate-500/20"}`}
                            >
                              {item.priority}
                            </span>
                          </td>
                          <td className="px-8 py-7">
                            {item.autoAssign ? (
                              <div className="flex items-center gap-3 text-slate-300">
                                <span className="material-symbols-outlined text-lg opacity-40">
                                  smart_toy
                                </span>
                                <span className="text-[11px] font-black tracking-widest">
                                  {item.autoAssign}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[11px] font-black text-muted opacity-40 uppercase tracking-[0.2em]">
                                WAIT-LIST
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-7">
                            {item.status === "pending" ? (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleDispatchConfirm(item.id)}
                                className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-2xl shadow-indigo-500/20"
                              >
                                CONFIRM
                              </motion.button>
                            ) : item.status === "confirmed" ? (
                              <div className="flex items-center gap-2 text-emerald-400">
                                <span className="material-symbols-outlined text-sm">
                                  verified
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                  Dispatched
                                </span>
                              </div>
                            ) : (
                              <button className="text-[11px] font-black text-muted hover:text-white uppercase tracking-[0.2em] transition-all opacity-70">
                                DETAILS
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </section>

            {/* Operational Sidebar Insights */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">
              {/* AI Insights Card */}
              <motion.div
                variants={itemVariants}
                className="card-white !p-8 rounded-[24px] relative overflow-hidden shadow-2xl"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-[var(--surface-muted)] flex items-center justify-center border border-[var(--border)] shadow-xl">
                    <span className="material-symbols-outlined text-white text-xl">
                      psychology
                    </span>
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-main">
                    AI Dispatcher Pulse
                  </h3>
                </div>
                <p className="text-sm text-muted mb-8 leading-relaxed font-medium">
                  System detecting increased demand in{" "}
                  <span className="text-[var(--text-main)] font-black">
                    North Sector
                  </span>
                  . Recommend repositioning{" "}
                  <span className="text-[var(--text-main)] font-black">
                    4 idle units
                  </span>{" "}
                  from District 2 to offset predicted 15-minute delays.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-[var(--border)] flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-main">
                      Action Needed
                    </span>
                  </div>
                  <button
                    onClick={handleDeployUnits}
                    className="text-[10px] font-black text-white hover:text-white/80 transition-all uppercase tracking-widest underline decoration-white/20 underline-offset-4"
                  >
                    DEPLOY UNITS
                  </button>
                </motion.div>
              </motion.div>

              {/* System Telemetry */}
                <motion.div
                  variants={itemVariants}
                  className="card-white !p-8 rounded-[28px] shadow-2xl"
                >
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted mb-8 opacity-60">
                  Network Health
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      label: "Bandwidth Load",
                      value: "42%",
                      color: "bg-white/40",
                      progress: 42,
                    },
                    {
                      label: "Satellite Uplink",
                      value: "Stable",
                      color: "bg-emerald-500",
                      progress: 98,
                    },
                    {
                      label: "Compute Latency",
                      value: "14ms",
                      color: "bg-white/20",
                      progress: 14,
                    },
                  ].map((tele, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] mb-3 uppercase font-black tracking-widest">
                        <span className="text-muted">{tele.label}</span>
                        <span className="text-main">{tele.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tele.progress}%` }}
                          viewport={{ once: true }}
                          className={`h-full ${tele.color} rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Driver Safety Mini-Feed */}
              <motion.div
                variants={itemVariants}
                className="dashboard-card !p-0 rounded-[24px] overflow-hidden shadow-2xl border-[var(--border)]"
              >
                <div className="px-8 py-5 border-b border-[var(--border)] bg-[var(--surface-muted)]">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted opacity-60">
                    Tele-Operator Feeds
                  </h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {[
                    {
                      id: "104",
                      status: "bg-rose-500",
                      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHb63VKEQkFcvUDOzRo9br8wzOCHG9ADdsJLU-ev5TODsXOOsMu_vqvhq8OnGt3yS_U-uyo89DglzV7EwDZ-dIXmlRpOZoh9o6E4ya0n2ZojOXrGiG2jvBDrYdKd2lAjac4ETxfoMbqrdcWOy0XxJjcDFfL3aqRnqADkjFgx9_81dY549j8bYLzO87yh8cKrp5070S-hvpkBIPpVV-CLkk1Bqpf6WIGz8mtFdiiXFTlMFjDzY8jsPvecwAiNA2P3rumO_eoYCYZII",
                    },
                    {
                      id: "208",
                      status: "bg-emerald-500",
                      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVG2zv74HfVcALoQrNxSMfuT3it3bp7GiX3jl-T3U157Ghf3bjocy1r5DcJsmKsN7KcLv8PTARQkP90BGonEKUWhz-dof2aNmbPwRS7BANqZmfYs7MZKqNZZrHUohZYttsFaa3M981oSPO-2qTHDwHvI2HC1gBlag0phkdxEaO3u9XjAjVWzFFAeGaC1ii_G2CON8HHU-OgomROhNx0UZUG1r8TPpDsmRjDr6lW_wERFfRegLVULw88K1eiGhDbBfWVMjuvTC6G7M",
                    },
                  ].map((feed, i) => (
                    <div
                      key={i}
                      className="aspect-video bg-black rounded-xl relative overflow-hidden border border-white/10 group cursor-pointer"
                    >
                      <img
                        src={feed.img}
                        alt={`Unit ${feed.id}`}
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                        <div
                          className={`h-1.5 w-1.5 rounded-full ${feed.status} animate-pulse`}
                        ></div>
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">
                          UNIT {feed.id}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-3 border border-[var(--border)] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-muted hover:text-[var(--text-main)] hover:bg-[var(--surface-muted)] transition-all"
                  >
                    Enter Override Control
                  </motion.button>
                </div>
              </motion.div>
            </aside>
            </div>
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

export default AIDispatchPage;
