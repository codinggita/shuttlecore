import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

const RideHistoryPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState({
    firstName: "Cmdr.",
    lastName: "Operative",
    email: "operative@shuttlecore.ai",
    organization: "Systems Command",
    role: "Systems Lead",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
        localStorage.setItem("userProfile", JSON.stringify(response.data.user));
      } catch (error) {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };
    
    fetchUserProfile();
  }, []);

  // Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings');
        const bookingsData = response.data.bookings || [];
        
        // Transform bookings to match UI format
        const transformedBookings = bookingsData.map(b => ({
          id: b._id,
          pickupLocation: b.pickupLocation,
          dropoffLocation: b.dropoffLocation,
          vehicleType: b.vehicleType,
          status: b.status,
          price: b.price,
          createdAt: b.createdAt,
          bookingType: b.bookingType || 'standard'
        }));
        
        setBookings(transformedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        // Fallback to localStorage if API fails
        const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        setBookings(savedBookings);
      }
    };
    
    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    if (filter === "completed") return booking.status === "completed";
    if (filter === "confirmed") return booking.status === "confirmed";
    if (filter === "reserved") return booking.bookingType === "reserve" || booking.status === "reserved";
    return true;
  });

  const paymentMethodNames = {
    card: "Credit/Debit Card",
    upi: "UPI",
    cash: "Cash",
    wallet: "ShuttleCore Wallet",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
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
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 text-sm font-bold text-muted hover:text-main transition-colors mb-4 uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to Dashboard
              </button>
              <h1 className="text-3xl md:text-5xl font-black text-main mb-2 tracking-tighter">
                Ride History
              </h1>
              <p className="text-muted text-sm md:text-base font-medium">
                View all your past and upcoming bookings
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="dashboard-card !p-6">
                <p className="text-xs text-muted uppercase tracking-wider mb-2">Total Bookings</p>
                <p className="text-3xl font-black text-main">{bookings.length}</p>
              </div>
              <div className="dashboard-card !p-6">
                <p className="text-xs text-muted uppercase tracking-wider mb-2">Total Spent</p>
                <p className="text-3xl font-black text-[var(--primary)]">
                  ₹{bookings.reduce((sum, b) => sum + b.price, 0)}
                </p>
              </div>
              <div className="dashboard-card !p-6">
                <p className="text-xs text-muted uppercase tracking-wider mb-2">Active Rides</p>
                <p className="text-3xl font-black text-emerald-400">
                  {bookings.filter(b => b.status === "confirmed").length}
                </p>
              </div>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div variants={itemVariants} className="flex gap-2 mb-6">
              {["all", "confirmed", "reserved", "completed"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all ${
                    filter === f
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--surface-muted)] text-muted hover:text-main"
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>

            {/* Bookings List */}
            {filteredBookings.length === 0 ? (
              <motion.div variants={itemVariants} className="dashboard-card !p-12 text-center">
                <span className="material-symbols-outlined text-6xl text-muted mb-4">history</span>
                <p className="text-lg font-bold text-main mb-2">No bookings found</p>
                <p className="text-sm text-muted mb-6">Start booking rides to see your history here</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/book-ride")}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl"
                >
                  Book a Ride
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    variants={itemVariants}
                    whileHover={{ y: -2, borderColor: "var(--primary)" }}
                    onClick={() => navigate("/booking-confirmation", { state: { booking } })}
                    className="dashboard-card !p-6 border-2 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-xl ${booking.vehicle.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <span className={`material-symbols-outlined text-3xl ${booking.vehicle.color}`}>
                          {booking.vehicle.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-black text-main mb-1">{booking.vehicle.name}</h3>
                            <p className="text-xs text-muted">{formatDate(booking.timestamp)}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            booking.bookingType === "reserve" || booking.status === "reserved"
                              ? "bg-blue-500/10 text-blue-400"
                              : booking.status === "confirmed"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-blue-500/10 text-blue-400"
                          }`}>
                            {booking.bookingType === "reserve" ? "Reserved" : booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-6 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-muted">location_on</span>
                            <span className="text-xs text-muted">{booking.pickup}</span>
                          </div>
                          <span className="material-symbols-outlined text-sm text-muted">arrow_forward</span>
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-muted">location_on</span>
                            <span className="text-xs text-muted">{booking.dropoff}</span>
                          </div>
                        </div>
                        {(booking.bookingType === "reserve" || booking.bookingType === "airport") && booking.reserveDate && (
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`material-symbols-outlined text-sm ${booking.bookingType === "airport" ? "text-amber-400" : "text-blue-400"}`}>event</span>
                            <span className={`text-xs font-bold ${booking.bookingType === "airport" ? "text-amber-400" : "text-blue-400"}`}>
                              {booking.bookingType === "airport" ? "Airport Transfer" : "Reserved"} for {booking.reserveDate} at {booking.reserveTime}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm text-muted">payment</span>
                            <span className="text-xs text-muted">{paymentMethodNames[booking.paymentMethod]}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            {booking.discount && (
                              <span className="text-xs text-emerald-400 font-bold">Discount Applied</span>
                            )}
                            <span className="text-lg font-black text-[var(--primary)]">₹{booking.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default RideHistoryPage;
