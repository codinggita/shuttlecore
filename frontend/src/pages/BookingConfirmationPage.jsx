import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const BookingConfirmationPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { booking } = location.state || {};

  useEffect(() => {
    // Show notification when page loads
    if (booking) {
      const notification = document.createElement("div");
      notification.className = "fixed top-24 right-6 z-50 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in";
      notification.innerHTML = `
        <span class="material-symbols-outlined text-2xl">check_circle</span>
        <div>
          <p class="font-bold text-sm">Ride Confirmed!</p>
          <p class="text-xs opacity-90">Your ${booking.vehicle.name} is on the way</p>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transition = "opacity 0.5s";
        setTimeout(() => notification.remove(), 500);
      }, 4000);
    }
  }, [booking]);

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

  if (!booking) {
    return (
      <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-main">No booking found</p>
          <button onClick={() => navigate("/book-ride")} className="mt-4 px-6 py-3 bg-[var(--primary)] text-white rounded-xl">
            Book a Ride
          </button>
        </div>
      </div>
    );
  }

  const paymentMethodNames = {
    card: "Credit/Debit Card",
    upi: "UPI",
    cash: "Cash",
    wallet: "ShuttleCore Wallet",
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
            className="max-w-[800px] mx-auto"
          >
            {/* Success Animation */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5, delay: 0.2 }}
                className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
                  booking.bookingType === "reserve" ? "bg-blue-500/20" : "bg-emerald-500/20"
                }`}
              >
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.5, delay: 0.4 }}
                  className={`material-symbols-outlined text-6xl ${
                    booking.bookingType === "reserve" ? "text-blue-400" : "text-emerald-400"
                  }`}
                >
                  {booking.bookingType === "reserve" ? "event_available" : "check_circle"}
                </motion.span>
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-main mb-3 tracking-tighter">
                {booking.bookingType === "reserve" ? "Ride Reserved!" : "Booking Confirmed!"}
              </h1>
              <p className="text-muted text-base font-medium">
                {booking.bookingType === "reserve"
                  ? `Your ${booking.vehicle.name} has been reserved for ${booking.reserveDate} at ${booking.reserveTime}`
                  : `Your ${booking.vehicle.name} is on the way to ${booking.pickup}`
                }
              </p>
            </motion.div>

            {/* Booking Details Card */}
            <motion.div variants={itemVariants} className="dashboard-card !p-8 mb-6">
              <h3 className="text-lg font-black text-main mb-6">Booking Details</h3>
              
              <div className="space-y-6">
                {/* Vehicle Info */}
                <div className="flex items-center gap-4 pb-6 border-b border-[var(--border)]">
                  <div className={`w-16 h-16 rounded-xl ${booking.vehicle.bgColor} flex items-center justify-center`}>
                    <span className={`material-symbols-outlined text-3xl ${booking.vehicle.color}`}>
                      {booking.vehicle.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted uppercase tracking-wider mb-1">Vehicle Type</p>
                    <p className="text-xl font-black text-main">{booking.vehicle.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted uppercase tracking-wider mb-1">Booking ID</p>
                    <p className="text-sm font-bold text-main">{booking.id}</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mt-2 inline-block ${
                      booking.bookingType === "reserve"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}>
                      {booking.bookingType === "reserve" ? "Reserved" : "Confirmed"}
                    </span>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4 pb-6 border-b border-[var(--border)]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[var(--primary)]">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">Pickup</p>
                      <p className="text-sm font-bold text-main">{booking.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-rose-400">location_on</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">Dropoff</p>
                      <p className="text-sm font-bold text-main">{booking.dropoff}</p>
                    </div>
                  </div>
                  {booking.bookingType === "reserve" && (
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-400">event</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider">Scheduled For</p>
                        <p className="text-sm font-bold text-main">{booking.reserveDate} at {booking.reserveTime}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">Payment Method</p>
                      <p className="text-sm font-bold text-main">{paymentMethodNames[booking.paymentMethod]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted uppercase tracking-wider">Amount Paid</p>
                      <p className="text-2xl font-black text-[var(--primary)]">₹{booking.price}</p>
                    </div>
                  </div>
                  {booking.discount && (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="material-symbols-outlined text-sm">local_offer</span>
                      <p className="text-sm font-bold">Discount Applied</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (booking) {
                    try {
                      // Update booking status to confirmed
                      const updatedBooking = { ...booking, status: "confirmed" };
                      const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
                      const updatedBookings = existingBookings.map(b => b.id === booking.id ? updatedBooking : b);
                      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
                      navigate("/ride-history");
                    } catch (error) {
                      console.error("Error confirming ride:", error);
                      alert("There was an error confirming your ride. Please try again.");
                    }
                  } else {
                    console.error("Booking not found");
                    alert("Booking not found. Please try again.");
                  }
                }}
                className="flex-1 py-4 bg-[var(--primary)] text-white rounded-xl text-[13px] font-black uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Confirm Ride
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/ride-history")}
                className="flex-1 py-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[13px] font-black uppercase tracking-wider hover:bg-[var(--surface-light)] transition-all"
              >
                View Booking History
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/book-ride")}
                className="flex-1 py-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[13px] font-black uppercase tracking-wider hover:bg-[var(--surface-light)] transition-all"
              >
                Book Another Ride
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmationPage;
