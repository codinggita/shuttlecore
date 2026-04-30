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
  const [isResolving, setIsResolving] = useState(false);
  const audioRef = useRef(null);

  const emergencyIncidents = [
    {
      id: "EM-402",
      type: "Brake System Failure",
      severity: "critical",
      unit: "Shuttle-402",
      location: "Downtown Core - 5th Ave",
      coordinates: { lat: 34.0522, lng: -118.2437 },
      passengers: 4,
      battery: "12%",
      speed: "0 mph",
      heading: "N/A",
      lastUpdate: "4s ago",
      desc: "Emergency regenerative braking engaged after hydraulic pressure loss. Vehicle is currently stationary but blocking a primary artery.",
      nearbyUnits: ["SH-102 (2m)", "SH-881 (5m)", "MED-01 (8m)"],
    },
    {
      id: "EM-881",
      type: "Lidar Sensor Obstruction",
      severity: "high",
      unit: "Shuttle-881",
      location: "Pacific Coast Hwy",
      coordinates: { lat: 34.0122, lng: -118.4912 },
      passengers: 0,
      battery: "65%",
      speed: "5 mph",
      heading: "Westbound",
      lastUpdate: "12s ago",
      desc: "Vision system reports total blindness in Sector-B. Autonomous logic holding vehicle in safe-crawl mode.",
      nearbyUnits: ["SH-209 (4m)", "TECH-04 (12m)"],
    },
    {
      id: "EM-209",
      type: "Unauthorized Cabin Entry",
      severity: "critical",
      unit: "Shuttle-209",
      location: "Financial District",
      coordinates: { lat: 34.0488, lng: -118.2518 },
      passengers: 2,
      battery: "88%",
      speed: "18 mph",
      heading: "Eastbound",
      lastUpdate: "1s ago",
      desc: "Rear emergency hatch opened while in transit. AI has locked the vehicle and initiated police dispatch.",
      nearbyUnits: ["SH-402 (10m)", "SEC-09 (3m)"],
    },
  ];

  useEffect(() => {
    try {
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/997/997-preview.mp3");
      audio.loop = true;
      audioRef.current = audio;
      
      const attemptPlay = () => {
        if (audioRef.current) {
          audioRef.current.play().catch(() => {
            console.log("Audio play blocked by browser policy. Interaction required.");
          });
        }
      };

      const handleFirstClick = () => {
        attemptPlay();
        document.removeEventListener("click", handleFirstClick);
      };

      document.addEventListener("click", handleFirstClick);
      const timer = setTimeout(attemptPlay, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleFirstClick);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
      };
    } catch (err) {
      console.error("Audio initialization failed:", err);
    }
  }, []);

  const handleResolve = (id) => {
    setIsResolving(true);
    setTimeout(() => {
      setIsResolving(false);
      setSelectedEmergency(null);
      localStorage.removeItem("emergencyActive");
      alert(`Incident ${id} has been marked as RESOLVED. Recovery teams are on-site.`);
    }, 1500);
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
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="flex h-screen bg-[#05070a] text-white overflow-hidden relative font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.3)_0,transparent_70%)] animate-pulse" />
      
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0a0c10] border-r border-rose-950 flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-rose-600 rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-rose-900/40"><span className="material-symbols-outlined text-white text-xl">emergency</span></div>
            <span className="text-xl font-black tracking-tighter text-white">SHUTTLE<span className="opacity-50">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-rose-500/60 uppercase tracking-[0.2em] mb-4">Tactical Overlay</p>
            {menuItems.map((item) => (
              <motion.button key={item.id} whileHover={{ x: 4 }} onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${location.pathname === item.path ? "bg-rose-600/10 text-rose-500 border border-rose-500/20 shadow-[0_0_15px_rgba(225,29,72,0.1)]" : "text-slate-400 hover:text-rose-400 hover:bg-rose-950/20"}`}>
                <span className="material-symbols-outlined text-xl">{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-4">
          <motion.button onClick={() => setSelectedEmergency(null)} whileHover={{ scale: 1.02 }} className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-400 border-2 border-rose-500/40 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/10 shadow-[0_0_20px_rgba(225,29,72,0.2)] animate-pulse">
            <span className="material-symbols-outlined text-lg">emergency_home</span> EMERGENCY TERMINAL
          </motion.button>
          <div className="bg-rose-950/10 p-4 rounded-2xl border border-rose-900/30">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw" alt="Profile" className="w-10 h-10 rounded-full border border-rose-500/20 shadow-lg" />
              <div><p className="text-[13px] font-black text-white leading-tight">Cmdr. Operative</p><p className="text-[10px] text-rose-500/60 uppercase font-bold tracking-wider">Crisis Response</p></div>
            </div>
            <motion.button onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-rose-400 hover:text-white transition-colors uppercase tracking-widest border border-rose-900/40 rounded-lg hover:bg-rose-600/20">
              <span className="material-symbols-outlined text-xs">logout</span> EXIT TERMINAL
            </motion.button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <header className="h-20 flex items-center justify-between px-8 border-b border-rose-900/30 bg-[#05070a]/80 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-rose-600/10 border border-rose-500/20 text-rose-500"><span className="material-symbols-outlined">menu</span></motion.button>
            <div className="flex items-center gap-4 bg-rose-600/10 px-4 py-2 rounded-xl border border-rose-500/20 shadow-[0_0_20px_rgba(225,29,72,0.1)]">
               <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
               <span className="text-[11px] font-black text-rose-400 uppercase tracking-[0.3em] flex items-center gap-3">Critical Incident Protocol Active</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-[9px] font-black text-rose-500/60 uppercase tracking-widest">Network Pulse</span>
              <span className="text-sm font-mono font-black text-rose-400">SYNC_ERROR_LOW</span>
            </div>
            <div className="h-10 w-[1px] bg-rose-900/30 mx-2" />
            <span className="text-xl font-mono font-black text-rose-500 animate-pulse">{new Date().toLocaleTimeString([], { hour12: false })}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          <div className="max-w-[1400px] mx-auto">
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mb-12">
              <h1 className="text-5xl font-black text-white mb-3 tracking-tighter uppercase italic"><span className="text-rose-600">CRITICAL</span> INCIDENT TERMINAL</h1>
              <p className="text-slate-400 text-sm font-medium tracking-wide">Emergency fleet protocols engaged. Real-time satellite link synchronized for operational overrides.</p>
            </motion.div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 xl:col-span-4 space-y-6">
                <h3 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.3em] mb-2 px-2">Active Incidents</h3>
                {emergencyIncidents.map((incident) => (
                  <motion.div key={incident.id} variants={itemVariants} onClick={() => setSelectedEmergency(incident)} className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group ${selectedEmergency?.id === incident.id ? "bg-rose-600/20 border-rose-500 shadow-[0_0_40px_rgba(225,29,72,0.2)]" : "bg-[#0a0c10] border-rose-900/20 hover:border-rose-500/50 hover:bg-rose-900/5"}`}>
                    {incident.severity === "critical" && <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 blur-3xl pointer-events-none" />}
                    <div className="flex justify-between items-start mb-4 relative z-10">
                      <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${incident.severity === "critical" ? "bg-rose-600 text-white animate-pulse" : "bg-amber-600/20 text-amber-500"}`}>{incident.severity}</div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">{incident.id}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-1 group-hover:text-rose-400 transition-colors">{incident.type}</h3>
                    <p className="text-[12px] text-slate-400 font-bold mb-4 uppercase tracking-tighter">{incident.unit} • {incident.location}</p>
                    <div className="flex gap-2">
                       <div className="flex-1 h-1 bg-rose-900/30 rounded-full overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-1/2 h-full bg-rose-600" /></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="col-span-12 xl:col-span-8">
                <AnimatePresence mode="wait">
                  {selectedEmergency ? (
                    <motion.div key={selectedEmergency.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0a0c10] border border-rose-500/30 rounded-[40px] overflow-hidden shadow-2xl relative">
                      <div className="p-10">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                          <div className="flex gap-6 items-center">
                            <div className="w-20 h-20 bg-rose-600/20 rounded-3xl flex items-center justify-center border border-rose-500/40 shadow-[0_0_30px_rgba(225,29,72,0.2)]"><span className="material-symbols-outlined text-4xl text-rose-500 animate-bounce">warning</span></div>
                            <div>
                              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-1">{selectedEmergency.type}</h2>
                              <p className="text-[11px] text-rose-500/80 uppercase font-black tracking-[0.2em]">{selectedEmergency.id} • SATELLITE_LINK_ESTABLISHED</p>
                            </div>
                          </div>
                          <div className="flex gap-3 w-full md:w-auto">
                            <button onClick={() => alert("Fleet Halt: Broadcasting STOP signal to all units in Sector-7.")} className="flex-1 md:flex-none px-6 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-rose-900/20">HALT FLEET</button>
                            <button onClick={() => handleResolve(selectedEmergency.id)} disabled={isResolving} className={`flex-1 md:flex-none px-6 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-emerald-900/20 ${isResolving ? "opacity-50 cursor-wait" : ""}`}>{isResolving ? "PROCESSING..." : "RESOLVE INCIDENT"}</button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                          {[
                            { label: "Unit Status", val: "LOCKED", sub: selectedEmergency.unit, color: "text-rose-500" },
                            { label: "Passengers", val: selectedEmergency.passengers, sub: "Verified", color: "text-white" },
                            { label: "Battery", val: selectedEmergency.battery, sub: "Critical", color: "text-amber-500" },
                            { label: "AI Confidence", val: "LOW", sub: "Manual Req", color: "text-rose-500" }
                          ].map((stat, i) => (
                            <div key={i} className="p-6 bg-rose-950/5 rounded-3xl border border-rose-900/20">
                              <p className="text-[9px] text-rose-500/60 uppercase font-black tracking-widest mb-2">{stat.label}</p>
                              <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                              <p className="text-[10px] text-slate-500 font-bold uppercase">{stat.sub}</p>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-12 gap-8 mb-10">
                          <div className="col-span-12 lg:col-span-7 bg-[#05070a] rounded-[32px] p-8 border border-rose-900/20 relative overflow-hidden group h-[400px]">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw" className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-[20s]" alt="Incident Map" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0,rgba(5,7,10,0.8)_100%)]" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                               <div className="relative"><div className="absolute -inset-10 bg-rose-500/20 rounded-full animate-ping" /><div className="w-4 h-4 bg-rose-600 rounded-full shadow-[0_0_20px_rgba(225,29,72,1)] border-2 border-white" /></div>
                               <div className="mt-4 px-4 py-2 bg-black/80 backdrop-blur-md rounded-lg border border-rose-500/30 text-[10px] font-black text-rose-400 uppercase tracking-widest whitespace-nowrap">UNIT_LOCATION: SECTOR_7_A</div>
                            </div>
                          </div>
                          <div className="col-span-12 lg:col-span-5 space-y-4">
                            <h3 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4">Incident Log</h3>
                            <div className="bg-rose-950/5 rounded-3xl p-6 border border-rose-900/20 space-y-4 font-mono text-[11px] h-[330px] overflow-y-auto custom-scrollbar">
                              {[
                                { time: "14:02:11", msg: "CORE_BOOT: Emergency Protocol Engaged" },
                                { time: "14:02:14", msg: "SENSOR_FAILURE: Lidar_Main_Obstructed" },
                                { time: "14:02:18", msg: "AUTO_HALT: Unit SH-402 Stopped" },
                                { time: "14:02:22", msg: "DISPATCH: Recovery Team MED-01 Enroute" },
                                { time: "14:02:25", msg: "SAT_SYNC: Visual Feed Offline" },
                                { time: "14:02:30", msg: "COMM_LINK: Operative Input Required" },
                              ].map((log, i) => (
                                <div key={i} className="flex gap-4 opacity-70 hover:opacity-100 transition-opacity"><span className="text-rose-500 font-black">{log.time}</span><span className="text-white">{log.msg}</span></div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-rose-900/30 pt-10">
                          <div>
                            <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-sm">support_agent</span> Remote Assistance</h4>
                            <div className="flex gap-3">
                               <button onClick={() => alert("Opening Voice Link...")} className="flex-1 py-4 bg-rose-600/10 border border-rose-500/20 rounded-2xl flex flex-col items-center gap-2 hover:bg-rose-600/20 transition-all group"><span className="material-symbols-outlined text-rose-500 group-hover:scale-110 transition-transform">mic</span><span className="text-[9px] font-black text-white uppercase tracking-tighter">Voice Link</span></button>
                               <button onClick={() => alert("Opening Visual Override...")} className="flex-1 py-4 bg-rose-600/10 border border-rose-500/20 rounded-2xl flex flex-col items-center gap-2 hover:bg-rose-600/20 transition-all group"><span className="material-symbols-outlined text-rose-500 group-hover:scale-110 transition-transform">videocam</span><span className="text-[9px] font-black text-white uppercase tracking-tighter">Visual Feed</span></button>
                               <button onClick={() => alert("Deploying Drone...")} className="flex-1 py-4 bg-rose-600/10 border border-rose-500/20 rounded-2xl flex flex-col items-center gap-2 hover:bg-rose-600/20 transition-all group"><span className="material-symbols-outlined text-rose-500 group-hover:scale-110 transition-transform">aerostat</span><span className="text-[9px] font-black text-white uppercase tracking-tighter">Drone Scouter</span></button>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-sm">local_shipping</span> Nearby Support Units</h4>
                            <div className="space-y-2">
                               {selectedEmergency.nearbyUnits.map((u, i) => <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 hover:border-rose-500/30 transition-all"><span className="text-[11px] font-black text-white">{u.split(' ')[0]}</span><span className="text-[10px] font-bold text-rose-400">{u.split(' ')[1]}</span></div>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[700px] bg-[#0a0c10]/40 border-2 border-dashed border-rose-900/30 rounded-[40px] flex flex-col items-center justify-center text-center p-10">
                      <div className="w-24 h-24 bg-rose-600/5 rounded-full flex items-center justify-center mb-8 border border-rose-500/10"><span className="material-symbols-outlined text-6xl text-rose-900/50 animate-pulse">radar</span></div>
                      <h2 className="text-2xl font-black text-rose-500/60 uppercase tracking-[0.2em] mb-4">Awaiting Incident Selection</h2>
                      <p className="text-slate-500 max-w-md text-sm font-medium">Select an active emergency alert from the left matrix to begin tactical intervention and remote unit recovery.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyStopPage;
