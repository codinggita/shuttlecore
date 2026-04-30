import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const VehicleDetailPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [bookingType, setBookingType] = useState("now"); // "now" or "reserve"
  const [reserveDate, setReserveDate] = useState("");
  const [reserveTime, setReserveTime] = useState("");
  
  const { vehicle, pickup, dropoff } = location.state || {};

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "credit_card", last4: "4242" },
    { id: "upi", name: "UPI", icon: "smartphone", last4: "google@okaxis" },
    { id: "cash", name: "Cash", icon: "payments" },
    { id: "wallet", name: "ShuttleCore Wallet", icon: "account_balance_wallet", balance: "₹250" },
  ];

  const discountOffers = [
    { id: "new50", code: "NEW50", description: "50% off for new users", discount: 50, maxDiscount: 100 },
    { id: "ride20", code: "RIDE20", description: "20% off on all rides", discount: 20, maxDiscount: 50 },
    { id: "cashback", code: "CASHBACK", description: "₹50 cashback", discount: 0, cashback: 50 },
  ];

  const getDiscountedPrice = (price) => {
    if (!selectedDiscount) return price;
    const offer = discountOffers.find(o => o.id === selectedDiscount);
    if (offer.discount > 0) {
      const discountAmount = Math.min((price * offer.discount) / 100, offer.maxDiscount);
      return price - discountAmount;
    }
    return price;
  };

  const handleConfirmBooking = () => {
    // Validate reserve booking
    if (bookingType === "reserve" && (!reserveDate || !reserveTime)) {
      alert("Please select both date and time for your reservation");
      return;
    }

    // Save booking to localStorage
    const booking = {
      id: `BK-${Date.now()}`,
      vehicle: vehicle,
      pickup,
      dropoff,
      price: getDiscountedPrice(vehicle.basePrice),
      paymentMethod: selectedPayment,
      discount: selectedDiscount,
      status: bookingType === "reserve" ? "reserved" : "confirmed",
      bookingType: bookingType,
      timestamp: new Date().toISOString(),
      reserveDate: bookingType === "reserve" ? reserveDate : null,
      reserveTime: bookingType === "reserve" ? reserveTime : null,
    };
    
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const updatedBookings = [booking, ...existingBookings];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    
    navigate("/booking-confirmation", { state: { booking } });
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

  if (!vehicle) {
    return (
      <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-main">Vehicle not found</p>
          <button onClick={() => navigate("/book-ride")} className="mt-4 px-6 py-3 bg-[var(--primary)] text-white rounded-xl">
            Go to Book My Ride
          </button>
        </div>
      </div>
    );
  }

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
              onClick={() => navigate("/vehicle-selection")}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[11px] font-black text-muted hover:text-[var(--text-main)] hover:border-[var(--primary)] transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Back to Vehicles</span>
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
            {/* Vehicle Header */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl md:text-5xl font-black text-main mb-2 tracking-tighter">
                {vehicle.name} Ride
              </h1>
              <p className="text-muted text-sm md:text-base font-medium">
                Complete your booking for {vehicle.name}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left - Vehicle Info & Trip Details */}
              <div className="space-y-6">
                {/* Vehicle Card */}
                <motion.div variants={itemVariants} className={`dashboard-card !p-6 border-2 ${vehicle.borderColor}`}>
                  <div className="flex items-center gap-6">
                    <div className={`w-24 h-24 rounded-2xl ${vehicle.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <span className={`material-symbols-outlined text-5xl ${vehicle.color}`}>
                        {vehicle.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-main mb-2">{vehicle.name}</h3>
                      <p className="text-sm text-muted mb-3">{vehicle.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-base">schedule</span>
                          {vehicle.time}
                        </span>
                        <span className="text-sm text-muted">{vehicle.capacity}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Trip Details */}
                <motion.div variants={itemVariants} className="dashboard-card !p-6 bg-[var(--surface-muted)]">
                  <h3 className="text-lg font-black text-main mb-4">Trip Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[var(--primary)]">location_on</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider">Pickup</p>
                        <p className="text-sm font-bold text-main">{pickup}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-rose-400">location_on</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider">Dropoff</p>
                        <p className="text-sm font-bold text-main">{dropoff}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right - Payment & Discounts */}
              <div className="space-y-6">
                {/* Booking Type Toggle */}
                <motion.div variants={itemVariants} className="dashboard-card !p-6">
                  <h3 className="text-lg font-black text-main mb-4">When do you need the ride?</h3>
                  <div className="flex gap-3 mb-4">
                    <button
                      onClick={() => setBookingType("now")}
                      className={`flex-1 py-3 rounded-xl text-[13px] font-black uppercase tracking-wider transition-all ${
                        bookingType === "now"
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--surface-muted)] text-muted hover:text-main"
                      }`}
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => setBookingType("reserve")}
                      className={`flex-1 py-3 rounded-xl text-[13px] font-black uppercase tracking-wider transition-all ${
                        bookingType === "reserve"
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--surface-muted)] text-muted hover:text-main"
                      }`}
                    >
                      Reserve
                    </button>
                  </div>

                  {/* Date/Time Picker for Reserve */}
                  <AnimatePresence>
                    {bookingType === "reserve" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <div className="relative rounded-xl overflow-hidden h-32 mb-4 bg-gradient-to-br from-[var(--primary)]/20 to-blue-500/20">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="material-symbols-outlined text-6xl text-[var(--primary)]">event_available</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-3 left-3">
                            <p className="text-white text-xs font-bold uppercase tracking-wider">Schedule Your Ride</p>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-muted uppercase tracking-wider mb-2 block">Date</label>
                          <input
                            type="date"
                            value={reserveDate}
                            onChange={(e) => setReserveDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-sm font-medium text-main focus:border-[var(--primary)] focus:outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted uppercase tracking-wider mb-2 block">Time</label>
                          <input
                            type="time"
                            value={reserveTime}
                            onChange={(e) => setReserveTime(e.target.value)}
                            className="w-full px-4 py-3 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-sm font-medium text-main focus:border-[var(--primary)] focus:outline-none transition-all"
                          />
                        </div>
                        <p className="text-xs text-muted italic">
                          Reserve up to 30 days in advance. Free cancellation up to 1 hour before pickup.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Payment Methods */}
                <motion.div variants={itemVariants} className="dashboard-card !p-6">
                  <h3 className="text-lg font-black text-main mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                          selectedPayment === method.id
                            ? "border-[var(--primary)] bg-[var(--primary)]/5"
                            : "border-[var(--border)] hover:border-[var(--primary)]/50"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[var(--primary)]">{method.icon}</span>
                        <div className="flex-1 text-left">
                          <p className="text-[13px] font-bold text-main">{method.name}</p>
                          {method.last4 && (
                            <p className="text-[11px] text-muted">•••• {method.last4}</p>
                          )}
                          {method.balance && (
                            <p className="text-[11px] text-emerald-400">{method.balance}</p>
                          )}
                        </div>
                        {selectedPayment === method.id && (
                          <span className="material-symbols-outlined text-[var(--primary)]">check_circle</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Discounts */}
                <motion.div variants={itemVariants} className="dashboard-card !p-6">
                  <h3 className="text-lg font-black text-main mb-4">Offers & Discounts</h3>
                  <div className="space-y-3">
                    {discountOffers.map((offer) => (
                      <button
                        key={offer.id}
                        onClick={() => setSelectedDiscount(selectedDiscount === offer.id ? null : offer.id)}
                        className={`w-full p-4 rounded-xl border transition-all text-left ${
                          selectedDiscount === offer.id
                            ? "border-[var(--primary)] bg-[var(--primary)]/5"
                            : "border-[var(--border)] hover:border-[var(--primary)]/50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-1 bg-[var(--primary)]/10 text-[var(--primary)] text-[11px] font-black rounded">
                            {offer.code}
                          </span>
                          {selectedDiscount === offer.id && (
                            <span className="material-symbols-outlined text-[var(--primary)] text-sm">check_circle</span>
                          )}
                        </div>
                        <p className="text-[13px] font-bold text-main mt-2">{offer.description}</p>
                        {offer.discount > 0 && (
                          <p className="text-[11px] text-emerald-400">Save up to ₹{offer.maxDiscount}</p>
                        )}
                        {offer.cashback && (
                          <p className="text-[11px] text-emerald-400">Get ₹{offer.cashback} cashback</p>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Price Summary */}
                  <div className="mt-6 pt-6 border-t border-[var(--border)]">
                    <div className="flex justify-between mb-2">
                      <span className="text-[13px] text-muted">Ride fare</span>
                      <span className="text-[13px] text-main">₹{vehicle.basePrice}</span>
                    </div>
                    {selectedDiscount && (
                      <div className="flex justify-between mb-2 text-emerald-400">
                        <span className="text-[13px]">Discount</span>
                        <span className="text-[13px] font-bold">
                          -₹{vehicle.basePrice - getDiscountedPrice(vehicle.basePrice)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-[var(--border)]">
                      <span className="text-[16px] font-black text-main">Total</span>
                      <span className="text-[16px] font-black text-[var(--primary)]">
                        ₹{getDiscountedPrice(vehicle.basePrice)}
                      </span>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirmBooking}
                    className="w-full mt-6 py-4 bg-[var(--primary)] text-white rounded-xl text-[13px] font-black uppercase tracking-wider hover:opacity-90 transition-all"
                  >
                    Confirm Booking
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetailPage;
