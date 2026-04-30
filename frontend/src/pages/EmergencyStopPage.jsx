import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const EmergencyStopPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showEnableSound, setShowEnableSound] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Emergency sound effect
  useEffect(() => {
    // Use ambulance siren sound for emergency
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/997/997-preview.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audioRef.current = audio;
    
    // Store emergency state in localStorage for dashboard notification
    localStorage.setItem("emergencyActive", "true");
    localStorage.setItem("emergencyCount", "4");
    localStorage.setItem("emergencyTime", new Date().toISOString());
    
    // Try to play immediately (may be blocked by browser)
    const attemptPlay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowEnableSound(false);
        } catch (err) {
          console.log("Audio autoplay blocked - showing enable button");
          setShowEnableSound(true);
          setIsPlaying(false);
        }
      }
    };
    
    // Small delay to ensure audio is loaded
    setTimeout(attemptPlay, 100);
    
    // Also try to play on first user click anywhere on page
    const handleFirstClick = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setShowEnableSound(false);
        }).catch(() => {});
      }
      document.removeEventListener("click", handleFirstClick);
    };
    document.addEventListener("click", handleFirstClick);
    
    // Cleanup
    return () => {
      document.removeEventListener("click", handleFirstClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Toggle sound
  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Emergency incidents data
  const emergencyIncidents = [
    {
      id: "EM-4521",
      unit: "Unit #707",
      driver: "Kevin Lee",
      phone: "+1 (415) 555-0890",
      type: "Collision Warning",
      severity: "critical",
      location: "Highway 101, Mile 45.2",
      coordinates: { lat: 37.4419, lng: -122.1430 },
      timestamp: "2 min ago",
      status: "active",
      speed: "65 mph",
      heading: "Northbound",
      eta: "N/A",
      lastUpdate: "15 seconds ago",
      alertDetails: "Automatic brake assist activated. Driver reported fatigue after 11-hour shift.",
      nearbyUnits: ["Unit #703", "Unit #712"],
      emergencyServices: "Dispatched",
    },
    {
      id: "EM-4520",
      unit: "Unit #728",
      driver: "Christina Butler",
      phone: "+1 (415) 555-0654",
      type: "Panic Button",
      severity: "critical",
      location: "Industrial District, Warehouse Row",
      coordinates: { lat: 37.4849, lng: -122.2281 },
      timestamp: "5 min ago",
      status: "active",
      speed: "0 mph",
      heading: "Stopped",
      eta: "N/A",
      lastUpdate: "45 seconds ago",
      alertDetails: "Driver activated emergency panic button. Potential security threat reported.",
      nearbyUnits: ["Unit #725", "Unit #734"],
      emergencyServices: "Police En Route",
    },
    {
      id: "EM-4519",
      unit: "Unit #743",
      driver: "Kyle Griffin",
      phone: "+1 (415) 555-0321",
      type: "Medical Emergency",
      severity: "critical",
      location: "Downtown Transit Hub",
      coordinates: { lat: 37.3382, lng: -121.8863 },
      timestamp: "8 min ago",
      status: "active",
      speed: "0 mph",
      heading: "Stopped",
      eta: "N/A",
      lastUpdate: "1 minute ago",
      alertDetails: "Driver reported chest pain. Medical assistance requested immediately.",
      nearbyUnits: ["Unit #736", "Unit #747"],
      emergencyServices: "Ambulance En Route",
    },
    {
      id: "EM-4518",
      unit: "Unit #715",
      driver: "Michelle Ross",
      phone: "+1 (415) 555-0789",
      type: "Vehicle Breakdown",
      severity: "warning",
      location: "Port of Oakland, Terminal 3",
      coordinates: { lat: 37.8044, lng: -122.2712 },
      timestamp: "12 min ago",
      status: "active",
      speed: "0 mph",
      heading: "Stopped",
      eta: "N/A",
      lastUpdate: "3 minutes ago",
      alertDetails: "Engine failure reported. Vehicle immobilized in loading zone.",
      nearbyUnits: ["Unit #709", "Unit #722"],
      emergencyServices: "Tow Truck Dispatched",
    },
  ];

  const emergencyHistory = [
    { id: "H-102", unit: "Unit #605", type: "Sudden Impact", time: "2h ago", status: "resolved", detail: "Minor collision at depot. Unit inspected." },
    { id: "H-101", unit: "Unit #912", type: "Brake Failure", time: "5h ago", status: "resolved", detail: "Unit halted using remote override. Towed." },
    { id: "H-100", unit: "Unit #112", type: "Unauthorized Entry", time: "1d ago", status: "resolved", detail: "Security responded. False alarm." }
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleResolve = (incidentId) => {
    setShowResolveModal(true);
    
    // Stop the alarm sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
    
    // Clear emergency state from localStorage
    localStorage.removeItem("emergencyActive");
    localStorage.removeItem("emergencyCount");
    localStorage.removeItem("emergencyTime");
    
    setTimeout(() => {
      setShowResolveModal(false);
      setSelectedEmergency(null);
    }, 2000);
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
      {/* Emergency Pulse Animation Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-rose-500/5 animate-pulse"></div>
      </div>

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
            <div className="w-9 h-9 bg-rose-500 rounded-xl flex items-center justify-center border border-rose-500/30 shadow-lg shadow-rose-500/30 transition-all animate-pulse">
              <span className="material-symbols-outlined text-white text-xl">emergency_home</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-rose-400">EMERGENCY</span>
          </Link>

          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-4">Critical Mode</p>
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
            whileHover={{ scale: 1.02, backgroundColor: "rgba(244, 63, 94, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/safety")}
            className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/10 hover:border-rose-400 hover:shadow-[0_0_30px_rgba(244,63,94,0.4)]"
          >
            <span className="material-symbols-outlined text-lg">close</span>
            Cancel Emergency
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFxhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw" alt="Profile" className="w-10 h-10 rounded-full border border-white/20" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-[var(--surface)] animate-pulse"></div>
              </div>
              <div>
                <p className="text-[13px] font-black text-main leading-tight">Cmdr. Operative</p>
                <p className="text-[10px] text-rose-400 uppercase font-bold tracking-wider">Emergency Response</p>
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
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-rose-500/10 border-b border-rose-500/20 transition-colors duration-300 z-30">
          <div className="flex items-center gap-4 flex-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn">
              <span className="material-symbols-outlined text-rose-400">menu</span>
            </motion.button>
            <button onClick={() => navigate("/dashboard")} className="text-muted hover:text-[var(--text-main)] transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-rose-400 tracking-tighter animate-pulse">EMERGENCY STOP</h1>
                <span className="px-2 py-1 bg-rose-500 text-white text-[9px] font-black rounded-lg uppercase tracking-wider animate-pulse">ACTIVE</span>
              </div>
              <p className="text-[10px] text-muted uppercase font-bold tracking-wider">{emergencyIncidents.filter(e => e.status === "active").length} Active Incidents</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {showEnableSound && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.play().then(() => {
                      setIsPlaying(true);
                      setShowEnableSound(false);
                    }).catch(() => {});
                  }
                }}
                className="px-3 py-2 bg-rose-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-2 animate-pulse"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span>
                Enable Sound
              </motion.button>
            )}
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              onClick={toggleSound}
              className="icon-btn relative border-rose-500/30"
            >
              <span className="material-symbols-outlined text-rose-400">{isPlaying ? "volume_up" : "volume_off"}</span>
              {isPlaying && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              )}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn">
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </motion.button>
            <div className="relative">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/notifications")} className="icon-btn relative">
                <span className="material-symbols-outlined text-rose-400">notifications</span>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-[var(--background)] animate-pulse"></span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto">
            {/* Emergency Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Active Emergencies", value: emergencyIncidents.filter(e => e.status === "active").length, icon: "emergency_home", color: "text-rose-400" },
                { label: "Critical", value: emergencyIncidents.filter(e => e.severity === "critical").length, icon: "warning", color: "text-rose-400" },
                { label: "Warning", value: emergencyIncidents.filter(e => e.severity === "warning").length, icon: "error_outline", color: "text-amber-400" },
                { label: "Units Dispatched", value: "4", icon: "local_police", color: "text-blue-400" },
              ].map((stat, i) => (
                <div key={i} className="dashboard-card !p-4 text-center border-rose-500/10 bg-rose-500/5">
                  <span className={`material-symbols-outlined ${stat.color} text-lg mb-2`}>{stat.icon}</span>
                  <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Emergency List */}
              <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
                <h3 className="text-[13px] font-black text-main mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-rose-400">emergency_home</span>
                  Active Incidents ({emergencyIncidents.filter(e => e.status === "active").length})
                </h3>
                
                {emergencyIncidents.filter(e => e.status === "active").map((incident, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedEmergency(incident)}
                    className={`dashboard-card !p-4 cursor-pointer transition-all ${selectedEmergency?.id === incident.id ? "border-rose-500 bg-rose-500/10" : "border-rose-500/10 hover:border-rose-500/30"}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${incident.severity === "critical" ? "bg-rose-500/20" : "bg-amber-500/20"}`}>
                        <span className={`material-symbols-outlined ${incident.severity === "critical" ? "text-rose-400" : "text-amber-400"}`}>
                          {incident.severity === "critical" ? "emergency_home" : "warning"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[13px] font-black text-main">{incident.type}</p>
                          <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider ${incident.severity === "critical" ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"}`}>
                            {incident.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted mb-1">{incident.unit} • {incident.driver}</p>
                        <p className="text-[10px] text-rose-400 font-bold">{incident.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Live Tracking & Details */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                {selectedEmergency ? (
                  <div className="space-y-6">
                    {/* Emergency Details Card */}
                    <div className="dashboard-card !p-6 border-rose-500/20">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="material-symbols-outlined text-3xl text-rose-400">emergency_home</span>
                            <div>
                              <h2 className="text-2xl font-black text-rose-400">{selectedEmergency.type}</h2>
                              <p className="text-[11px] text-muted uppercase font-bold tracking-wider">{selectedEmergency.id}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => window.open(`tel:${selectedEmergency.phone}`)}
                            className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-[11px] font-black uppercase tracking-wider hover:bg-emerald-500/20 transition-all flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-sm">call</span>
                            Call Driver
                          </button>
                          <button 
                            onClick={() => handleResolve(selectedEmergency.id)}
                            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-[11px] font-black uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Resolve
                          </button>
                        </div>
                      </div>

                      {/* Driver Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <p className="text-[10px] text-muted uppercase font-black tracking-wider mb-2">Driver</p>
                          <p className="text-[16px] font-black text-main">{selectedEmergency.driver}</p>
                          <p className="text-[13px] text-rose-400 font-bold">{selectedEmergency.unit}</p>
                        </div>
                        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <p className="text-[10px] text-muted uppercase font-black tracking-wider mb-2">Phone Number</p>
                          <p className="text-[16px] font-black text-emerald-400">{selectedEmergency.phone}</p>
                          <p className="text-[11px] text-muted">Tap to call immediately</p>
                        </div>
                      </div>

                      {/* Location & Status */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <p className="text-[9px] text-muted uppercase font-black tracking-wider mb-1">Location</p>
                          <p className="text-[13px] font-bold text-main">{selectedEmergency.location}</p>
                        </div>
                        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <p className="text-[9px] text-muted uppercase font-black tracking-wider mb-1">Speed</p>
                          <p className="text-[13px] font-bold text-main">{selectedEmergency.speed}</p>
                        </div>
                        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <p className="text-[9px] text-muted uppercase font-black tracking-wider mb-1">Direction</p>
                          <p className="text-[13px] font-bold text-main">{selectedEmergency.heading}</p>
                        </div>
                        <div className="p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <p className="text-[9px] text-muted uppercase font-black tracking-wider mb-1">Last Update</p>
                          <p className="text-[13px] font-bold text-amber-400">{selectedEmergency.lastUpdate}</p>
                        </div>
                      </div>

                      {/* Alert Details */}
                      <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/20 mb-6">
                        <p className="text-[10px] text-rose-400 uppercase font-black tracking-wider mb-2">Alert Details</p>
                        <p className="text-[13px] text-main leading-relaxed">{selectedEmergency.alertDetails}</p>
                      </div>

                      {/* Nearby Units */}
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-muted uppercase font-black tracking-wider">Nearby Units:</span>
                        <div className="flex gap-2">
                          {selectedEmergency.nearbyUnits.map((unit, i) => (
                            <span key={i} className="px-3 py-1 bg-[var(--surface-muted)] border border-[var(--border)] rounded-lg text-[10px] font-bold text-main">
                              {unit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Live Map Simulation */}
                    <div className="dashboard-card !p-6 border-rose-500/20">
                      <h3 className="text-[13px] font-black text-main mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-rose-400">location_on</span>
                        Live Tracking Map
                      </h3>
                      <div className="relative h-80 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)] overflow-hidden">
                        {/* Map Grid Background */}
                        <div className="absolute inset-0" style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                          `,
                          backgroundSize: '40px 40px'
                        }}></div>
                        
                        {/* Roads */}
                        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
                          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--primary)" strokeWidth="4" />
                          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--primary)" strokeWidth="4" />
                          <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--primary)" strokeWidth="2" />
                          <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--primary)" strokeWidth="2" />
                        </svg>

                        {/* Emergency Vehicle Pulse */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-rose-500/20 animate-ping absolute inset-0"></div>
                            <div className="w-20 h-20 rounded-full bg-rose-500/40 animate-pulse absolute inset-0"></div>
                            <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center relative z-10 border-4 border-[var(--background)]">
                              <span className="material-symbols-outlined text-white text-xl">emergency_home</span>
                            </div>
                          </div>
                        </div>

                        {/* Nearby Units */}
                        <div className="absolute top-1/4 left-1/4">
                          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/60 flex items-center justify-center border-2 border-[var(--background)]">
                            <span className="material-symbols-outlined text-white text-xs">airport_shuttle</span>
                          </div>
                        </div>
                        <div className="absolute bottom-1/3 right-1/4">
                          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/60 flex items-center justify-center border-2 border-[var(--background)]">
                            <span className="material-symbols-outlined text-white text-xs">airport_shuttle</span>
                          </div>
                        </div>

                        {/* Map Legend */}
                        <div className="absolute bottom-4 left-4 p-3 bg-[var(--surface)]/90 rounded-lg border border-[var(--border)]">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                              <span className="text-[10px] text-muted font-bold">Emergency</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div>
                              <span className="text-[10px] text-muted font-bold">Nearby Units</span>
                            </div>
                          </div>
                        </div>

                        {/* Coordinates */}
                        <div className="absolute top-4 right-4 p-2 bg-[var(--surface)]/90 rounded-lg border border-[var(--border)]">
                          <p className="text-[10px] text-muted font-mono">
                            {selectedEmergency.coordinates.lat.toFixed(4)}, {selectedEmergency.coordinates.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center dashboard-card !p-12">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-6xl text-muted opacity-30 mb-4">touch_app</span>
                      <p className="text-[16px] font-bold text-muted">Select an incident to view details</p>
                      <p className="text-[13px] text-muted opacity-60 mt-2">Click on any emergency from the list to see live tracking</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Emergency History Section */}
            <motion.div variants={itemVariants} className="mt-12">
              <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-muted">history</span>
                Emergency Resolution History
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {emergencyHistory.map((item, i) => (
                  <div key={i} className="dashboard-card !p-5 border-emerald-500/10 bg-emerald-500/5 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 bg-emerald-500/20 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-emerald-400 text-sm">verified</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">{item.id}</span>
                      <span className="text-[10px] text-muted font-bold">{item.time}</span>
                    </div>
                    <h4 className="text-sm font-black text-main mb-1">{item.type}</h4>
                    <p className="text-[11px] text-rose-400 font-bold mb-3">{item.unit}</p>
                    <p className="text-[11px] text-muted leading-relaxed">{item.detail}</p>
                    <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Resolved</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Footer */}
            <footer className="mt-12 border-t border-rose-500/20 py-12">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <button onClick={() => navigate("/")} className="flex items-center gap-2 text-rose-400 font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity">
                  <span className="material-symbols-outlined text-xl">emergency_home</span> Emergency Response
                </button>
                <div className="flex flex-wrap justify-center gap-8">
                  {[{ label: "Fleet Status", to: "/fleet" }, { label: "Safety Center", to: "/safety" }, { label: "Dispatch", to: "/ai-dispatch" }].map((l) => (
                    <button key={l.label} onClick={() => navigate(l.to)} className="text-[11px] text-muted hover:text-rose-400 transition-colors uppercase font-black tracking-[0.2em]">{l.label}</button>
                  ))}
                </div>
                <span className="text-[11px] text-muted font-bold opacity-40">© 2024 ShuttleCore Emergency Systems.</span>
              </div>
            </footer>
          </motion.div>
        </div>
      </main>

      {/* Resolve Confirmation Modal */}
      {showResolveModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="dashboard-card !p-8 max-w-md w-full mx-4 border-emerald-500/30 bg-emerald-500/5"
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-emerald-400 text-3xl">check_circle</span>
              </div>
              <h3 className="text-xl font-black text-main mb-2">Emergency Resolved</h3>
              <p className="text-[13px] text-muted">
                Incident has been marked as resolved. All units notified.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EmergencyStopPage;
