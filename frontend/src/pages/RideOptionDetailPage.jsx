import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const RideOptionDetailPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { rideOption } = location.state || {};

  const rideOptionsData = {
    ride: {
      id: "ride",
      title: "Ride",
      description: "Go anywhere with ShuttleCore. Request a ride, hop in, and go.",
      icon: "directions_car",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
      price: "$12-18",
      time: "2 min",
      features: [
        "Real-time tracking",
        "24/7 availability",
        "Professional drivers",
        "Safe and secure rides",
        "Cashless payments",
        "Split fare option"
      ],
      howItWorks: [
        "Enter pickup and dropoff",
        "Choose your ride type",
        "Get matched with a driver",
        "Track your ride in real-time",
        "Rate your experience"
      ],
      benefits: [
        "Fast pickup times",
        "Affordable pricing",
        "No surge pricing",
        "Multiple payment options",
        "Ride scheduling available"
      ]
    },
    reserve: {
      id: "reserve",
      title: "Reserve",
      description: "Reserve your ride in advance so you can relax on the day of your trip.",
      icon: "event_available",
      image: "https://images.unsplash.com/photo-1562519991-88f7a64bfddb?w=800",
      price: "$15-22",
      time: "Scheduled",
      features: [
        "Schedule up to 30 days ahead",
        "Fixed pricing",
        "Guaranteed pickup time",
        "No waiting on the day",
        "Cancel for free up to 1 hour before",
        "Priority matching"
      ],
      howItWorks: [
        "Select date and time",
        "Choose your pickup location",
        "Select your ride type",
        "Confirm your reservation",
        "Driver arrives on time"
      ],
      benefits: [
        "Peace of mind",
        "No surge pricing",
        "Plan your day better",
        "Never be late again",
        "Perfect for important trips"
      ]
    },
    intercity: {
      id: "intercity",
      title: "Intercity",
      description: "Outstation cabs anytime - travel between cities with ease.",
      icon: "directions_bus",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      price: "$45-85",
      time: "Custom",
      features: [
        "Long-distance travel",
        "Comfortable vehicles",
        "Professional drivers",
        "Multiple stops allowed",
        "Round trip options",
        "24/7 support"
      ],
      howItWorks: [
        "Enter pickup and destination cities",
        "Choose your travel date",
        "Select vehicle type",
        "Add stops if needed",
        "Book and enjoy the journey"
      ],
      benefits: [
        "Best rates for long trips",
        "Experienced drivers",
        "Safe and reliable",
        "Multiple payment options",
        "Round trip discounts"
      ]
    },
    parcel: {
      id: "parcel",
      title: "Parcel",
      description: "Same-day item delivery - send packages quickly and securely.",
      icon: "local_shipping",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
      price: "$8-15",
      time: "Same day",
      features: [
        "Fast delivery",
        "Real-time tracking",
        "Secure packaging",
        "Multiple size options",
        "Insurance available",
        "Proof of delivery"
      ],
      howItWorks: [
        "Enter pickup and delivery addresses",
        "Select package size",
        "Choose delivery time",
        "Pay securely",
        "Track your package"
      ],
      benefits: [
        "Quick and reliable",
        "Affordable rates",
        "Safe handling",
        "Live tracking",
        "Flexible scheduling"
      ]
    },
    rentals: {
      id: "rentals",
      title: "Rentals",
      description: "Trip for a block of time, multiple stops - rent by the hour.",
      icon: "schedule",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800",
      price: "$35/hr",
      time: "Hourly",
      features: [
        "Rent by the hour",
        "Multiple stops",
        "Chauffeur service",
        "Flexible duration",
        "No extra charges for stops",
        "Premium vehicles"
      ],
      howItWorks: [
        "Select rental duration",
        "Choose pickup location",
        "Add your stops",
        "Select vehicle type",
        "Enjoy your trip"
      ],
      benefits: [
        "Cost-effective for multiple stops",
        "No waiting between rides",
        "Professional chauffeur",
        "Premium comfort",
        "Flexible timing"
      ]
    },
    bike: {
      id: "bike",
      title: "Bike",
      description: "Motorbike rides at doorstep - quick and affordable city travel.",
      icon: "two_wheeler",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800",
      price: "$5-10",
      time: "3 min",
      features: [
        "Quick pickup",
        "Navigate traffic easily",
        "Affordable rates",
        "Helmet provided",
        "Safe riders",
        "GPS tracking"
      ],
      howItWorks: [
        "Enter pickup location",
        "Enter destination",
        "Book your bike",
        "Rider arrives",
        "Reach quickly"
      ],
      benefits: [
        "Beat traffic",
        "Save money",
        "Quick travel",
        "Eco-friendly",
        "Fun ride"
      ]
    }
  };

  const option = rideOptionsData[rideOption?.id] || rideOptionsData.ride;

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
              onClick={() => navigate("/book-ride")}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[11px] font-black text-muted hover:text-[var(--text-main)] hover:border-[var(--primary)] transition-all"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="hidden sm:inline">Back to Book My Ride</span>
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
            {/* Hero Section */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="relative rounded-2xl overflow-hidden h-[400px] mb-8">
                <img 
                  src={option.image} 
                  alt={option.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-[var(--primary)] rounded-2xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-4xl">{option.icon}</span>
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                        {option.title}
                      </h1>
                      <p className="text-white/90 text-base font-medium">{option.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-xl">schedule</span>
                      <span className="text-white font-bold">{option.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[var(--primary)] text-xl">payments</span>
                      <span className="text-white font-bold">{option.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Features */}
                <motion.div variants={itemVariants} className="dashboard-card !p-8">
                  <h3 className="text-xl font-black text-main mb-6 tracking-tight">Features</h3>
                  <div className="space-y-4">
                    {option.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[var(--primary)] text-sm">check</span>
                        </div>
                        <span className="text-sm font-medium text-main">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* How It Works */}
                <motion.div variants={itemVariants} className="dashboard-card !p-8">
                  <h3 className="text-xl font-black text-main mb-6 tracking-tight">How It Works</h3>
                  <div className="space-y-6">
                    {option.howItWorks.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-black text-sm">
                          {index + 1}
                        </div>
                        <div className="pt-2">
                          <p className="text-sm font-medium text-main">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Benefits */}
                <motion.div variants={itemVariants} className="dashboard-card !p-8">
                  <h3 className="text-xl font-black text-main mb-6 tracking-tight">Why Choose {option.title}?</h3>
                  <div className="space-y-4">
                    {option.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="material-symbols-outlined text-emerald-400 text-sm">star</span>
                        </div>
                        <span className="text-sm font-medium text-main">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Book Now Card */}
                <motion.div variants={itemVariants} className="dashboard-card !p-8 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/30">
                  <h3 className="text-2xl font-black text-main mb-4 tracking-tight">Ready to Book?</h3>
                  <p className="text-muted text-sm mb-6">Book your {option.title} now and experience the ShuttleCore difference.</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-[var(--surface-muted)] rounded-xl">
                      <span className="text-sm font-medium text-muted">Starting from</span>
                      <span className="text-2xl font-black text-[var(--primary)]">{option.price}</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate("/book-ride")}
                      className="w-full py-4 bg-[var(--primary)] text-white rounded-xl text-[13px] font-black uppercase tracking-wider hover:opacity-90 transition-all"
                    >
                      Book {option.title}
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default RideOptionDetailPage;
