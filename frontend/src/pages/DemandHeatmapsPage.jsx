import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useSocket } from "../context/SocketContext";
import api from "../services/api";

const DemandHeatmapsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { liveMapData, fleetLocations, isConnected } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const [efficiency, setEfficiency] = useState(94);
  const [walkDistance, setWalkDistance] = useState(180);
  const [fleetLoad, setFleetLoad] = useState(82);
  const [avgWait, setAvgWait] = useState(4.2);
  const [predictionTime, setPredictionTime] = useState(1035); // 17:15 in minutes
  const [clusters, setClusters] = useState([]);

  // Fetch clusters on mount
  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await api.get('/clusters');
        const clustersData = response.data.clusters || [];
        
        // Transform clusters to match UI format
        const transformedClusters = clustersData.map((c, index) => ({
          id: `#${index + 1}`,
          name: c.name || `Cluster ${index + 1}`,
          sub: `${c.passengers || 0} Passengers • ${c.shuttlesAssigned || 0} Shuttles Assigned`,
          count: c.passengers || 0,
          color: c.status === 'active' ? "bg-emerald-500" : c.status === 'pending' ? "bg-slate-500" : "bg-[#5C5C3D]",
          text: c.status === 'active' ? "text-emerald-500" : c.status === 'pending' ? "text-slate-500" : "text-[#5C5C3D]",
          status: c.status
        }));
        
        setClusters(transformedClusters);
      } catch (error) {
        console.error("Error fetching clusters:", error);
        // Fallback to default clusters if API fails
        setClusters([
          { id: "#1", name: "North Financial Plaza", sub: "12 Passengers • 1 Shuttle Assigned", count: 12, color: "bg-emerald-500", text: "text-emerald-500" },
          { id: "#2", name: "The Mission Hub", sub: "28 Passengers • 3 Shuttles Assigned", count: 28, color: "bg-[#5C5C3D]", text: "text-[#5C5C3D]" },
          { id: "#3", name: "Sunset Terrace", sub: "Pending optimization...", count: 8, color: "bg-slate-500", text: "text-slate-500", status: "pending" },
        ]);
      }
    };
    
    fetchClusters();
  }, []);

  // Real-time update simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      // Fluctuate efficiency
      setEfficiency(prev => Math.min(100, Math.max(90, prev + (Math.random() * 0.4 - 0.2))));
      
      // Update walk distance
      setWalkDistance(prev => Math.max(150, prev + (Math.random() * 2 - 1)));

      // Update fleet load and wait time
      setFleetLoad(prev => Math.min(100, Math.max(10, prev + (Math.random() * 2 - 1))));
      setAvgWait(prev => Math.max(1, Math.min(15, prev + (Math.random() * 0.2 - 0.1))));

      // Fluctuate prediction time
      setPredictionTime(prev => prev + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0));

      // Update cluster counts
      setClusters(prev => prev.map(c => {
        const change = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newCount = Math.max(1, c.count + change);
        return { ...c, count: newCount, sub: c.id === "#3" ? c.sub : `${newCount} Passengers • ${Math.ceil(newCount/10)} Shuttles Assigned` };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMinutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
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

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter">SHUTTLE<span className="opacity-70">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">Operational Hub</p>
            {menuItems.map((item) => (
              <motion.button key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}>
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-4">
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => navigate("/emergency-stop")} className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5">
            <span className="material-symbols-outlined text-lg animate-pulse">emergency_home</span> Emergency Stop
          </motion.button>
          <div className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-colors group/sidebar-profile">
            <Link to="/profile" className="flex items-center gap-3 mb-4 group/pcard">
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-white/20 group-hover/pcard:border-[var(--primary)] transition-all" />
              <div><p className="text-[13px] font-black text-main leading-tight group-hover/pcard:text-[var(--primary)] transition-colors">{user.firstName} {user.lastName}</p><p className="text-[10px] text-muted uppercase font-bold tracking-wider">{user.role}</p></div>
            </Link>
            <motion.button onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg">
              <span className="material-symbols-outlined text-xs">logout</span> Terminate Session
            </motion.button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg z-30">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
          <div className="flex-1 max-w-xl hidden sm:block mx-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-main transition-colors text-lg">search</span>
              <input type="text" placeholder="Search clusters..." className="input-field !pl-11" />
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn">
            <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto">
            <motion.div variants={itemVariants} className="mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-main tracking-tighter mb-2">Smart Passenger Clustering</h1>
              <p className="text-[13px] text-muted font-medium">Visualizing dynamically optimized pickup nodes based on real-time commute density.</p>
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
              <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 dashboard-card !p-2 relative overflow-hidden h-[600px] group border-[var(--border)]">
                <div className="absolute inset-0 bg-[#E2E2D5] dark:bg-slate-900 overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxjH0hJVR-3ax8Ghkx_cmuc_utpCPI_ZTug_BC53QR7J9oy_fjGfJWbBBmPg-XbBPdtImF9w2hD0zrMWAQR7dl4Cd1eRluej_OKzg-s_8YImHOcE54JBT4lBHczSF220JS18fvZG50sOC2aoy42QNoUokqVmoIWDrPBn8Rb3QGKcCYvj1-5Mp6HueBObujXx_9GX2_WizU303A8r8KhqxKrNNxAd-4syg98w5Voxg1X_f6uJGElXRMl5urL8f-PbTE80u4k6pJhdM" className="w-full h-full object-cover opacity-50 dark:opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" alt="Map" />
                  {clusters.map((c) => (
                    <div key={c.id} className="absolute transition-all duration-1000" style={{ top: c.id === "#1" ? "20%" : c.id === "#2" ? "65%" : "40%", left: c.id === "#1" ? "30%" : c.id === "#2" ? "45%" : "75%" }}>
                      <div className="relative group/marker">
                        <div className={`absolute -inset-16 ${c.color}/10 rounded-full blur-3xl animate-pulse`}></div>
                        <div className={`w-${c.id === "#2" ? "16" : "12"} h-${c.id === "#2" ? "16" : "12"} ${c.color} rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white/20 font-black text-sm cursor-pointer hover:scale-110 transition-transform`}>
                          {c.count}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    <div className="bg-[var(--surface)]/90 backdrop-blur-md p-1.5 rounded-xl border border-[var(--border)] shadow-2xl">
                      <button className="p-2 hover:bg-[var(--surface-light)] rounded-lg block mb-1 transition-colors text-main"><span className="material-symbols-outlined">layers</span></button>
                      <button className="p-2 hover:bg-[var(--surface-light)] rounded-lg block transition-colors text-main"><span className="material-symbols-outlined">my_location</span></button>
                    </div>
                  </div>
                  <div className="absolute bottom-6 right-6 z-20 bg-[var(--surface)]/90 backdrop-blur-md p-4 rounded-2xl border border-[var(--border)] shadow-2xl flex gap-6 items-center">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div><span className="text-[10px] font-black text-muted uppercase tracking-widest">Active Nodes</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#5C5C3D] shadow-[0_0_8px_rgba(92,92,61,0.5)]"></div><span className="text-[10px] font-black text-muted uppercase tracking-widest">High Demand</span></div>
                  </div>
                </div>
              </motion.div>

              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                <motion.div variants={itemVariants} className="dashboard-card group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </div>
                    <h3 className="font-black text-xl text-main tracking-tight">System Efficiency</h3>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <p className="text-[11px] font-black text-muted uppercase tracking-widest mb-1">Walkability Score</p>
                        <p className="text-4xl font-black text-emerald-500 tracking-tighter">{efficiency.toFixed(1)}%</p>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">+2.4% Week</span>
                    </div>
                    <div className="w-full bg-[var(--surface-muted)] rounded-full h-2.5 overflow-hidden">
                      <motion.div animate={{ width: `${efficiency}%` }} className="bg-emerald-500 h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
                    <div><p className="text-[10px] uppercase font-black text-muted tracking-widest mb-1 opacity-50">Avg. Walk</p><p className="text-lg font-black text-main tracking-tight">{walkDistance.toFixed(0)}m</p></div>
                    <div><p className="text-[10px] uppercase font-black text-muted tracking-widest mb-1 opacity-50">Fuel Saved</p><p className="text-lg font-black text-main tracking-tight">12.4 gal</p></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="dashboard-card flex-1 flex flex-col min-h-[250px]">
                  <h3 className="font-black text-xl text-main tracking-tight mb-6">Active Clusters</h3>
                  <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                    {clusters.map((item) => (
                      <div key={item.id} onClick={() => navigate(item.id === "#1" ? "/cluster-north-plaza" : item.id === "#2" ? "/cluster-mission-hub" : "/demand-heatmaps")} className="bg-[var(--surface-muted)] p-4 rounded-2xl flex items-center justify-between border border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--surface-light)] transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl ${item.color}/10 flex items-center justify-center ${item.text} font-black text-xs border border-${item.color}/20`}>{item.id}</div>
                          <div><h4 className="font-black text-[13px] text-main group-hover:text-white transition-colors">{item.name}</h4><p className="text-[11px] text-muted font-medium">{item.sub}</p></div>
                        </div>
                        <span className="material-symbols-outlined text-muted text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">chevron_right</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-[var(--primary)] p-6 rounded-[2rem] text-white relative overflow-hidden shadow-2xl group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-white/80 animate-pulse">psychology</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Terra Intelligence</span>
                    </div>
                    <p className="text-lg font-bold leading-snug italic tracking-tight mb-6">"Moving Cluster #2 40 meters North could reduce total dwell time by 8%."</p>
                    <button onClick={() => navigate("/apply-recommendation")} className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-xs font-black transition-all uppercase tracking-widest">Apply Recommendation</button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pb-10">
              {[
                { label: "Peak Hour Prediction", val: formatMinutesToTime(predictionTime), trend: "12% rise", tColor: "text-rose-400", icon: "trending_up" },
                { label: "Active Fleet Load", val: `${fleetLoad.toFixed(0)}%`, trend: fleetLoad > 85 ? "Heavy" : "Optimal", tColor: fleetLoad > 85 ? "text-amber-400" : "text-emerald-400", icon: fleetLoad > 85 ? "warning" : "check_circle" },
                { label: "Avg. Wait Time", val: `${avgWait.toFixed(1)} min`, trend: "Live Sync", tColor: "text-emerald-400", icon: "sync" },
              ].map((metric, i) => (
                <motion.div key={i} variants={itemVariants} className="card-white group">
                  <p className="text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-50">{metric.label}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-main tracking-tighter transition-all duration-500">{metric.val}</span>
                    <span className={`text-[10px] font-black ${metric.tColor} flex items-center gap-1 uppercase tracking-widest`}><span className="material-symbols-outlined text-xs">{metric.icon}</span> {metric.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DemandHeatmapsPage;
