import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const BookMyRidePage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("request");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [showPrices, setShowPrices] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const topNavItems = [
    { id: "request", label: "Request a ride", icon: "local_taxi" },
    { id: "reserve", label: "Reserve a ride", icon: "event" },
    { id: "prices", label: "See prices", icon: "payments" },
    { id: "explore", label: "Explore ride options", icon: "explore" },
    { id: "airport", label: "Airport rides", icon: "flight" },
  ];

  const rideOptions = [
    {
      id: "ride",
      title: "Ride",
      description: "Go anywhere with ShuttleCore. Request a ride, hop in, and go.",
      icon: "directions_car",
      image: "https://i.imgur.com/J8tX9wB.png",
      price: "$12-18",
      time: "2 min away",
    },
    {
      id: "reserve",
      title: "Reserve",
      description: "Reserve your ride in advance so you can relax on the day of your trip.",
      icon: "event_available",
      image: "https://i.imgur.com/8C3hR2P.png",
      price: "$15-22",
      time: "Scheduled",
    },
    {
      id: "intercity",
      title: "Intercity",
      description: "Get convenient, affordable outstation cabs anytime at your door.",
      icon: "commute",
      image: "https://i.imgur.com/Vf1K3mN.png",
      price: "$45-85",
      time: "Book now",
    },
    {
      id: "parcel",
      title: "Parcel",
      description: "ShuttleCore makes same-day item delivery easier than ever.",
      icon: "local_shipping",
      image: "https://i.imgur.com/WxYzAbC.png",
      price: "$8-15",
      time: "45 min delivery",
    },
    {
      id: "rentals",
      title: "Rentals",
      description: "Request a trip for a block of time and make multiple stops.",
      icon: "schedule",
      image: "https://i.imgur.com/QrStUvE.png",
      price: "$35/hr",
      time: "Hourly",
    },
    {
      id: "bike",
      title: "Bike",
      description: "Get affordable motorbike rides in minutes at your doorstep.",
      icon: "two_wheeler",
      image: "https://i.imgur.com/NmPqRsT.png",
      price: "$5-10",
      time: "1 min away",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Can I have a lost item delivered to me?",
      answer: "Yes, if you left something in a vehicle, you can contact the driver through the app within 24 hours of the trip. The driver can arrange to return your item for a fee."
    },
    {
      id: 2,
      question: "Can I rent a car using ShuttleCore?",
      answer: "Yes! Our Rentals service allows you to book a vehicle with a driver for a block of time. Perfect for multiple stops, business meetings, or day trips."
    },
    {
      id: 3,
      question: "Can I request a ride that picks up friends in different locations?",
      answer: "Absolutely. You can add up to 3 stops during your trip. Just tap 'Add Stop' when booking your ride and enter the additional pickup locations."
    },
    {
      id: 4,
      question: "Can I request a taxi on ShuttleCore?",
      answer: "Yes, we partner with licensed taxi operators in select cities. Look for the 'Taxi' option when viewing available ride types."
    },
    {
      id: 5,
      question: "Is there a ShuttleCore ride option for 5 people?",
      answer: "Yes! Our XL service accommodates up to 6 passengers with spacious SUVs and vans. Look for 'XL' when selecting your ride type."
    },
  ];

  const handleSeePrices = () => {
    if (pickupLocation && dropoffLocation) {
      setShowPrices(true);
    } else {
      alert("Please enter both pickup and dropoff locations");
    }
  };

  const handleRideSelect = (rideId) => {
    setSelectedRide(rideId);
    navigate(`/ride-details/${rideId}`, { 
      state: { 
        ride: rideOptions.find(r => r.id === rideId),
        pickup: pickupLocation,
        dropoff: dropoffLocation
      } 
    });
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
            onClick={() => navigate("/emergency")}
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
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--text-main)] transition-colors text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search ride options..."
                  className="input-field !pl-11"
                />
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
            
            {/* Top Navigation Tabs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8 border-b border-[var(--border)] pb-4">
              {topNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                    activeTab === item.id 
                      ? "bg-[var(--primary)] text-white" 
                      : "bg-[var(--surface-muted)] text-muted hover:text-[var(--text-main)] border border-[var(--border)]"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </motion.div>

            {/* Hero Section - Ride Booking */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Left - Booking Form */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-[13px] text-muted mb-2">
                  <span className="material-symbols-outlined text-[var(--primary)]">location_on</span>
                  <span>Ahmedabad, IN</span>
                  <button className="text-[var(--primary)] underline hover:no-underline">Change city</button>
                </div>

                <h1 className="text-3xl md:text-4xl font-black text-main tracking-tighter leading-tight">
                  Request a ride for<br />now or later
                </h1>

                <div className="flex items-center gap-2 text-[13px] text-emerald-400">
                  <span className="material-symbols-outlined">verified</span>
                  <span>Up to 50% off your first 5 ShuttleCore rides. T&Cs apply.*</span>
                </div>
                <p className="text-[11px] text-muted">*Valid within 15 days of signup.</p>

                {/* Booking Form */}
                <div className="dashboard-card !p-6 space-y-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[12px] font-black text-main">
                    <span className="material-symbols-outlined text-[var(--primary)]">schedule</span>
                    Pickup now
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                  </button>

                  <div className="space-y-3">
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]">radio_button_checked</span>
                      <input
                        type="text"
                        placeholder="Pickup location"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-[var(--surface-light)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]"
                      />
                      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-[var(--primary)]">
                        <span className="material-symbols-outlined">location_searching</span>
                      </button>
                    </div>

                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-rose-500">radio_button_checked</span>
                      <input
                        type="text"
                        placeholder="Dropoff location"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-[var(--surface-light)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSeePrices}
                    className="w-full py-4 bg-[var(--text-main)] text-[var(--background)] rounded-xl text-[12px] font-black uppercase tracking-wider hover:opacity-90 transition-all"
                  >
                    See prices
                  </motion.button>
                </div>
              </div>

              {/* Right - Hero Image */}
              <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-auto">
                <img 
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop" 
                  alt="Woman with luggage at hotel"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </motion.div>

            {/* Ride Options Grid */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-black text-main mb-6 tracking-tighter">
                Explore what you can do with ShuttleCore
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rideOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ y: -4, borderColor: "var(--primary)" }}
                    onClick={() => handleRideSelect(option.id)}
                    className="dashboard-card !p-5 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-black text-main mb-2 group-hover:text-[var(--primary)] transition-colors">
                          {option.title}
                        </h3>
                        <p className="text-[13px] text-muted leading-relaxed">
                          {option.description}
                        </p>
                      </div>
                      <div className="w-24 h-16 bg-[var(--surface-muted)] rounded-lg overflow-hidden ml-4">
                        <span className="material-symbols-outlined text-4xl text-[var(--primary)] w-full h-full flex items-center justify-center">
                          {option.icon}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                      <span className="text-[11px] font-black text-muted uppercase tracking-wider">
                        {option.price}
                      </span>
                      <button className="px-4 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-lg text-[11px] font-black text-muted hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all">
                        Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Reserve Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-black text-main mb-6 tracking-tighter">Plan for later</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left - Reserve Card */}
                <div className="dashboard-card !p-8 bg-[var(--surface)]">
                  <h3 className="text-2xl font-black text-main mb-2">
                    Get your ride right with ShuttleCore Reserve
                  </h3>
                  <p className="text-[13px] text-muted mb-6">Choose date and time</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted">calendar_today</span>
                      <input
                        type="text"
                        placeholder="Date"
                        className="w-full pl-10 pr-4 py-3 bg-[var(--surface-light)] border border-[var(--border)] rounded-lg text-[13px] font-bold"
                      />
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted">schedule</span>
                      <select className="w-full pl-10 pr-4 py-3 bg-[var(--surface-light)] border border-[var(--border)] rounded-lg text-[13px] font-bold appearance-none">
                        <option>Time</option>
                        <option>08:00 AM</option>
                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                      </select>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-[var(--text-main)] text-[var(--background)] rounded-lg text-[12px] font-black uppercase tracking-wider"
                  >
                    Next
                  </motion.button>
                </div>

                {/* Right - Benefits */}
                <div className="dashboard-card !p-8">
                  <h3 className="text-lg font-black text-main mb-6">Benefits</h3>
                  <div className="space-y-4">
                    {[
                      { icon: "event", text: "Choose your exact pickup time up to 90 days in advance." },
                      { icon: "schedule", text: "Extra wait time included to meet your ride." },
                      { icon: "credit_card", text: "Cancel at no charge up to 60 minutes in advance." },
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-[var(--primary)] mt-0.5">{benefit.icon}</span>
                        <p className="text-[13px] text-muted leading-relaxed">{benefit.text}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 text-[11px] font-black text-[var(--primary)] underline hover:no-underline">
                    See terms
                  </button>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-black text-main mb-6 tracking-tighter">
                Frequently asked questions
              </h2>
              <div className="space-y-2">
                {faqs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className="dashboard-card !p-0 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span className="text-[14px] font-bold text-main">{faq.question}</span>
                      <span className={`material-symbols-outlined text-muted transition-transform ${expandedFaq === faq.id ? "rotate-180" : ""}`}>
                        expand_more
                      </span>
                    </button>
                    {expandedFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-5 pb-5"
                      >
                        <p className="text-[13px] text-muted leading-relaxed border-t border-[var(--border)] pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
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

export default BookMyRidePage;
