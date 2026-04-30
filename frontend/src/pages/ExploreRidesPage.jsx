import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ExploreRidesPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [rideOptions, setRideOptions] = useState([
    {
      id: "ride",
      title: "Standard Ride",
      description: "Fast, reliable rides for your everyday travel needs across the city.",
      icon: "directions_car",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800",
      price: "From ₹89",
      basePrice: 89,
      features: ["2 min pickup", "Verified drivers", "Live tracking"],
      color: "text-blue-400",
      available: true,
      demand: "High"
    },
    {
      id: "xl",
      title: "Shuttle XL",
      description: "Spacious SUVs and vans for groups up to 6 people or extra luggage.",
      icon: "airport_shuttle",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
      price: "From ₹195",
      basePrice: 195,
      features: ["Extra legroom", "Group travel", "Safe & clean"],
      color: "text-purple-400",
      available: true,
      demand: "Medium"
    },
    {
      id: "bike",
      title: "Quick Bike",
      description: "The fastest way to beat the traffic. Perfect for solo travelers.",
      icon: "two_wheeler",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800",
      price: "From ₹45",
      basePrice: 45,
      features: ["Traffic-proof", "Pocket-friendly", "Helmet provided"],
      color: "text-orange-400",
      available: true,
      demand: "High"
    },
    {
      id: "rentals",
      title: "Flex Rentals",
      description: "Book a car by the hour. Make as many stops as you need.",
      icon: "schedule",
      image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800",
      price: "From ₹350/hr",
      basePrice: 350,
      features: ["Hourly bookings", "Unlimited stops", "Chauffeur included"],
      color: "text-emerald-400",
      available: true,
      demand: "Low"
    },
    {
      id: "intercity",
      title: "Intercity Plus",
      description: "Travel comfortably between cities with our top-rated outstation fleet.",
      icon: "commute",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
      price: "From ₹2500",
      basePrice: 2500,
      features: ["One-way/Round trip", "Top-tier sedans", "Roadside assistance"],
      color: "text-sky-400",
      available: true,
      demand: "Medium"
    },
    {
      id: "parcel",
      title: "Parcel Express",
      description: "Secure, same-day delivery for your items and packages.",
      icon: "local_shipping",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
      price: "From ₹60",
      basePrice: 60,
      features: ["Doorstep pickup", "Insured delivery", "Proof of delivery"],
      color: "text-rose-400",
      available: true,
      demand: "High"
    }
  ]);

  // Real-time updates every second
  useEffect(() => {
    const interval = setInterval(() => {
      // Update current time
      setCurrentTime(new Date());

      // Update ride options with simulated real-time changes
      setRideOptions(prevOptions => prevOptions.map(option => {
        // Randomly update demand level
        const demandLevels = ["High", "Medium", "Low"];
        const demandChange = Math.random() > 0.8;
        const newDemand = demandChange ? demandLevels[Math.floor(Math.random() * demandLevels.length)] : option.demand;

        // Randomly update availability
        const availabilityChange = Math.random() > 0.9;
        const newAvailable = availabilityChange ? !option.available : option.available;

        // Slightly adjust price based on demand
        const priceMultiplier = newDemand === "High" ? 1.1 : newDemand === "Medium" ? 1.0 : 0.95;
        const newPrice = Math.round(option.basePrice * priceMultiplier);
        const priceString = option.id === "rentals" ? `From ₹${newPrice}/hr` : `From ₹${newPrice}`;

        return {
          ...option,
          demand: newDemand,
          available: newAvailable,
          price: priceString,
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      {/* Sidebar (Same as other pages for consistency) */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="text-[var(--text-main)] opacity-70">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <button onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg">
            <span className="material-symbols-outlined text-xs">logout</span>
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 header-bg transition-colors duration-300 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <button onClick={() => navigate("/book-ride")} className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[11px] font-black text-muted hover:text-[var(--text-main)] transition-all">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Booking
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="icon-btn">
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="text-4xl md:text-6xl font-black text-main mb-4 tracking-tighter">Explore Ride Options</h1>
              <p className="text-muted text-lg max-w-2xl">Discover the perfect ride for every occasion. From daily commutes to luxury intercity travel, ShuttleCore has you covered.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rideOptions.map((option, idx) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="dashboard-card !p-0 overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/ride-option/${option.id}`, { state: { rideOption: option } })}
                >
                  <div className="h-36 overflow-hidden relative">
                    <img src={option.image} alt={option.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <div className={`w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center ${option.color} border border-white/20`}>
                        <span className="material-symbols-outlined text-xl">{option.icon}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-black text-main group-hover:text-[var(--primary)] transition-colors">{option.title}</h3>
                      <span className="text-base font-black text-[var(--primary)]">{option.price}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                        option.demand === "High" ? "bg-rose-500/10 text-rose-400" : 
                        option.demand === "Medium" ? "bg-amber-500/10 text-amber-400" : 
                        "bg-emerald-500/10 text-emerald-400"
                      }`}>
                        {option.demand} Demand
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                        option.available ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                      }`}>
                        {option.available ? "Available" : "Unavailable"}
                      </span>
                    </div>
                    <p className="text-xs text-muted mb-4 leading-relaxed line-clamp-2">{option.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {option.features.map((f, i) => (
                        <span key={i} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-[var(--surface-muted)] text-muted rounded-md">{f}</span>
                      ))}
                    </div>
                    <button className="w-full py-2.5 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-[var(--primary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed" disabled={!option.available}>
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExploreRidesPage;
