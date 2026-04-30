import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const VehicleSelectionPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { pickup, dropoff } = location.state || { pickup: "", dropoff: "" };

  const vehicleTypes = [
    {
      id: "bike",
      name: "Bike",
      description: "Fast & affordable for solo riders",
      capacity: "1 passenger",
      basePrice: 45,
      time: "3 min",
      icon: "two_wheeler",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
    },
    {
      id: "auto",
      name: "Auto",
      description: "No bargaining, doorstep pickup",
      capacity: "3 passengers",
      basePrice: 89,
      time: "5 min",
      icon: "local_taxi",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    {
      id: "sedan",
      name: "Sedan",
      description: "Comfortable sedans, top drivers",
      capacity: "4 passengers",
      basePrice: 125,
      time: "2 min",
      icon: "directions_car",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      id: "xl",
      name: "XL",
      description: "Spacious SUVs & vans",
      capacity: "6 passengers",
      basePrice: 195,
      time: "8 min",
      icon: "airport_shuttle",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
  ];

  const handleVehicleSelect = (vehicle) => {
    navigate(`/vehicle/${vehicle.id}`, {
      state: {
        vehicle,
        pickup,
        dropoff,
      },
    });
  };

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
                  (item.id === "simulation" && location.pathname === "/dashboard")
                    ? "nav-link-active"
                    : "nav-link-inactive"
                }`}
              >
                <span
                  className={`material-symbols-outlined transition-colors ${
                    location.pathname === item.path ||
                    (item.id === "simulation" && location.pathname === "/dashboard")
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

        <div className="mt-auto p-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg hover:bg-rose-400/5"
          >
            <span className="material-symbols-outlined text-xs">logout</span>
            Terminate Session
          </motion.button>
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
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1400px] mx-auto"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <button
                onClick={() => navigate("/book-ride")}
                className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Book My Ride
              </button>
              <h1 className="text-3xl md:text-5xl font-black text-main mb-2 tracking-tighter">
                Choose Your Ride
              </h1>
              <p className="text-muted text-sm md:text-base font-medium">
                Select a vehicle type for your trip from {pickup} to {dropoff}
              </p>
            </motion.div>

            {/* Vehicle Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicleTypes.map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`dashboard-card !p-6 cursor-pointer transition-all border-2 ${vehicle.borderColor} hover:border-[var(--primary)]`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-20 h-20 rounded-2xl ${vehicle.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <span className={`material-symbols-outlined text-4xl ${vehicle.color}`}>
                        {vehicle.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-black text-main mb-1">{vehicle.name}</h3>
                          <p className="text-sm text-muted">{vehicle.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-[var(--primary)]">₹{vehicle.basePrice}</p>
                          <p className="text-xs text-muted">base fare</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)]">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          {vehicle.time}
                        </span>
                        <span className="text-xs text-muted">{vehicle.capacity}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Route Summary */}
            <motion.div variants={itemVariants} className="mt-8 dashboard-card !p-6 bg-[var(--surface-muted)]">
              <h3 className="text-lg font-black text-main mb-4">Trip Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[var(--primary)]">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">Pickup</p>
                    <p className="text-sm font-bold text-main">{pickup || "Enter pickup location"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-rose-400">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">Dropoff</p>
                    <p className="text-sm font-bold text-main">{dropoff || "Enter dropoff location"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default VehicleSelectionPage;
