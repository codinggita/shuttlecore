import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chartView, setChartView] = useState("realtime");
  const [user, setUser] = useState({
    firstName: "Cmdr.",
    lastName: "Operative",
    email: "operative@shuttlecore.ai",
    organization: "Systems Command",
    role: "Systems Lead",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userProfile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  // Emergency notification state
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  
  // Check for active emergency
  useEffect(() => {
    const checkEmergency = () => {
      const isEmergency = localStorage.getItem("emergencyActive");
      const emergencyCount = localStorage.getItem("emergencyCount");
      const emergencyTime = localStorage.getItem("emergencyTime");
      
      if (isEmergency === "true") {
        setEmergencyAlert({
          count: emergencyCount || "4",
          time: emergencyTime,
        });
      } else {
        setEmergencyAlert(null);
      }
    };
    
    checkEmergency();
    const interval = setInterval(checkEmergency, 5000);
    const handleStorage = () => checkEmergency();
    window.addEventListener("storage", handleStorage);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const [stats, setStats] = useState([
    { label: "Nodes Online", value: "99.8%", icon: "lan", trend: "+0.2%", color: "text-emerald-400" },
    { label: "Fleet Health", value: "Nominal", icon: "health_and_safety", trend: "Stable", color: "text-emerald-400" },
    { label: "Avg Speed", value: "24.5 mph", icon: "speed", trend: "+1.2%", color: "text-amber-400" },
    { label: "Security Level", value: "L-7 SYNC", icon: "security", trend: "Active", color: "text-gray-400" },
  ]);

  const [performanceData, setPerformanceData] = useState([
    { time: "00:00", load: 40 }, { time: "01:00", load: 65 }, { time: "02:00", load: 45 }, { time: "03:00", load: 85 },
    { time: "04:00", load: 55 }, { time: "05:00", load: 95 }, { time: "06:00", load: 70 }, { time: "07:00", load: 80 },
    { time: "08:00", load: 50 }, { time: "09:00", load: 60 }, { time: "10:00", load: 45 }, { time: "11:00", load: 75 },
    { time: "12:00", load: 90 }, { time: "13:00", load: 65 }, { time: "14:00", load: 85 }, { time: "15:00", load: 60 },
    { time: "16:00", load: 40 }, { time: "17:00", load: 70 }, { time: "18:00", load: 95 }, { time: "19:00", load: 80 },
  ]);

  const [queue, setQueue] = useState([
    { id: "TX-402", status: "Transit", time: "4m rem", color: "bg-emerald-500", progress: 75 },
    { id: "NY-881", status: "Charging", time: "12m rem", color: "bg-amber-500", progress: 40 },
    { id: "SF-103", status: "Standby", time: "Ready", color: "bg-emerald-500", progress: 100 },
    { id: "LA-229", status: "Transit", time: "15m rem", color: "bg-emerald-500", progress: 20 },
    { id: "LD-904", status: "Docking", time: "2m rem", color: "bg-sky-500", progress: 90 },
  ]);

  const [impactMetrics, setImpactMetrics] = useState({
    peakOptimization: 95.2,
    fleetConsumption: 0.82,
    meshLatency: 12
  });

  const [logs, setLogs] = useState([
    { time: "14:02:11", msg: "CORE_BOOT: Node_AF2_SYNCED", type: "info" },
    { time: "14:02:14", msg: "PKT_REC: Mesh_Topo_Updated", type: "info" },
    { time: "14:02:18", msg: "ERR: Node_402_LOW_POWER", type: "error" },
    { time: "14:02:22", msg: "REROUTE: Sector_7_OPTIMIZED", type: "info" },
    { time: "14:02:25", msg: "SYNC: Master_Clock_ Unified", type: "info" },
  ]);

  // Real-time data update simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // Update stats
      setStats(prev => prev.map(s => {
        if (s.label === "Avg Speed") {
          const newVal = (24.5 + (Math.random() * 2 - 1)).toFixed(1);
          return { ...s, value: `${newVal} mph` };
        }
        if (s.label === "Nodes Online") {
          const newVal = (99.5 + (Math.random() * 0.4)).toFixed(1);
          return { ...s, value: `${newVal}%` };
        }
        return s;
      }));

      // Update impact metrics
      setImpactMetrics(prev => ({
        peakOptimization: Math.min(100, Math.max(90, prev.peakOptimization + (Math.random() * 0.4 - 0.2))),
        fleetConsumption: Math.max(0.7, prev.fleetConsumption + (Math.random() * 0.04 - 0.02)),
        meshLatency: Math.max(8, Math.min(25, prev.meshLatency + (Math.random() > 0.5 ? 1 : -1)))
      }));

      // Update chart data
      setPerformanceData(prev => {
        const newData = [...prev.slice(1), { 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }), 
          load: Math.floor(40 + Math.random() * 55) 
        }];
        return newData;
      });

      // Update queue progress
      setQueue(prev => prev.map(q => {
        if (q.progress < 100) {
          const newProg = Math.min(100, q.progress + Math.random() * 2);
          const newTime = newProg === 100 ? "Ready" : `${Math.ceil((100 - newProg) / 10)}m rem`;
          return { ...q, progress: newProg, time: newTime, status: newProg === 100 ? "Standby" : q.status };
        }
        return q;
      }));

      // Update logs
      if (Math.random() > 0.7) {
        const events = ["PKT_SENT", "CLUSTER_SYNC", "NODE_PULSE", "TRX_VALIDATED", "GRID_STABLE"];
        const errors = ["LATENCY_SPIKE", "NODE_TIMEOUT", "BUFFER_OVERFLOW"];
        const isErr = Math.random() > 0.9;
        const newLog = {
          time: new Date().toLocaleTimeString([], { hour12: false }),
          msg: isErr ? `ERR: ${errors[Math.floor(Math.random() * errors.length)]}` : `${events[Math.floor(Math.random() * events.length)]}: Active`,
          type: isErr ? "error" : "info"
        };
        setLogs(prev => [newLog, ...prev.slice(0, 14)]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const historyData = [
    { time: "Mon", load: 60 }, { time: "Tue", load: 80 }, { time: "Wed", load: 50 },
    { time: "Thu", load: 90 }, { time: "Fri", load: 40 }, { time: "Sat", load: 30 }, { time: "Sun", load: 70 },
  ];

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

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
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="opacity-70">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">Operational Hub</p>
            {menuItems.map((item) => (
              <motion.button key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`nav-link w-full group ${location.pathname === item.path || (item.id === "simulation" && location.pathname === "/dashboard") ? "nav-link-active" : "nav-link-inactive"}`}>
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path || (item.id === "simulation" && location.pathname === "/dashboard") ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
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
          <div className="flex items-center gap-4 flex-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
            <div className="flex items-center gap-3 bg-[var(--surface-muted)] px-4 py-2 rounded-xl border border-[var(--border)]">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">Telemetry Stream: Stable</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></motion.button>
            <motion.button onClick={() => navigate("/notifications")} className="icon-btn relative"><span className="material-symbols-outlined">notifications</span><span className="absolute top-2.5 right-2.5 h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span></motion.button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-10 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-black text-main mb-2 tracking-tighter uppercase">Command Center</h1>
                <p className="text-muted text-sm font-medium">Global operations matrix is <span className="text-emerald-400 font-black">Nominal</span>. Clusters reporting 100% sync.</p>
              </div>
              <div className="bg-[var(--surface-muted)] px-6 py-3 rounded-2xl border border-[var(--border)] flex flex-col items-end">
                <p className="text-[9px] font-black text-muted uppercase tracking-widest mb-1">Global Pulse</p>
                <p className="text-xl font-black text-[var(--primary)] font-mono">{new Date().toLocaleTimeString([], { hour12: false })}</p>
              </div>
            </motion.div>

            {emergencyAlert && (
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 cursor-pointer hover:bg-rose-500/20 transition-all" onClick={() => navigate("/emergency")}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center animate-pulse"><span className="material-symbols-outlined text-rose-400 text-2xl">emergency_home</span></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1"><h2 className="text-lg font-black text-rose-400 uppercase tracking-tighter">EMERGENCY ALERT ACTIVE</h2><span className="px-2 py-1 bg-rose-500 text-white text-[9px] font-black rounded-lg uppercase animate-pulse">CRITICAL</span></div>
                    <p className="text-[13px] text-main font-medium"><span className="font-black text-rose-400">{emergencyAlert.count}</span> units reporting critical malfunctions in local sectors.</p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, i) => (
                <motion.div key={i} variants={itemVariants} whileHover={{ y: -4 }} className="dashboard-card group relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10" />
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-2.5 rounded-xl bg-[var(--surface-muted)] ${stat.color} border border-[var(--border)]`}><span className="material-symbols-outlined text-2xl">{stat.icon}</span></div>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 uppercase tracking-widest border border-emerald-500/10">{stat.trend}</span>
                  </div>
                  <p className="text-[9px] font-black text-muted uppercase tracking-[0.2em] mb-1 opacity-60">{stat.label}</p>
                  <h3 className="text-3xl font-black text-main tracking-tighter transition-all duration-500">{stat.value}</h3>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-12 gap-6 mb-10">
              <motion.div variants={itemVariants} className="col-span-12 xl:col-span-8 dashboard-card !p-8 relative overflow-hidden group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-main tracking-tight mb-1 uppercase">Fleet Throughput</h3>
                    <p className="text-[10px] text-muted font-black uppercase tracking-widest opacity-60">High-frequency network performance matrix</p>
                  </div>
                  <div className="flex gap-2 bg-[var(--surface-muted)] p-1.5 rounded-xl border border-[var(--border)]">
                    {["realtime", "history"].map(v => (
                      <button key={v} onClick={() => setChartView(v)} className={`px-5 py-2 text-[10px] font-black rounded-lg uppercase tracking-widest transition-all ${chartView === v ? "bg-[var(--primary)] text-white shadow-xl" : "text-muted hover:text-main"}`}>{v}</button>
                    ))}
                  </div>
                </div>
                <div className="h-72 w-full relative -ml-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartView === "realtime" ? performanceData : historyData}>
                      <defs><linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/><stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.3}/>
                      <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} tick={{fontWeight: 'black'}} dy={10}/>
                      <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} tick={{fontWeight: 'black'}} dx={-10}/>
                      <Tooltip contentStyle={{backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(20px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '20px'}}/>
                      <Area type="monotone" dataKey="load" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorLoad)" animationDuration={1000}/>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-[var(--border)] pt-8">
                  {[
                    {label: "Peak Optimization", val: impactMetrics.peakOptimization.toFixed(1), unit: "%"},
                    {label: "Fleet Consumption", val: impactMetrics.fleetConsumption.toFixed(2), unit: "kWh/m"},
                    {label: "Mesh Latency", val: impactMetrics.meshLatency, unit: "ms"}
                  ].map((m, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-2 opacity-50">{m.label}</p>
                      <p className="text-3xl font-black text-main tracking-tighter transition-all duration-500">{m.val}<span className="text-xs font-bold text-muted ml-1">{m.unit}</span></p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="col-span-12 xl:col-span-4 dashboard-card flex flex-col !p-8">
                <h3 className="text-2xl font-black text-main tracking-tight mb-8 uppercase">Active Queue</h3>
                <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2">
                  {queue.map((task, i) => (
                    <motion.div key={i} whileHover={{ x: 4 }} className="p-5 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)] hover:border-muted transition-all cursor-pointer group relative overflow-hidden">
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${task.color} shadow-[0_0_12px_currentColor] group-hover:scale-125 transition-transform`} />
                          <div><p className="text-sm font-black text-main tracking-tight">{task.id}</p><p className="text-[9px] text-muted font-black uppercase tracking-widest mt-0.5">{task.status}</p></div>
                        </div>
                        <span className="text-[11px] font-black text-main bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">{task.time}</span>
                      </div>
                      <div className="absolute bottom-0 left-0 h-[2px] bg-[var(--primary)] opacity-20 transition-all duration-1000" style={{ width: `${task.progress}%` }} />
                    </motion.div>
                  ))}
                </div>
                <motion.button onClick={() => navigate("/manage-deployment")} whileHover={{ scale: 1.02 }} className="w-full mt-8 py-4 bg-[var(--surface-muted)] text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl border border-[var(--border)] hover:bg-[var(--surface-light)] transition-all">Manage Deployment</motion.button>
              </motion.div>
            </div>

            <div className="grid grid-cols-12 gap-6 mb-10">
              <motion.div variants={itemVariants} className="col-span-12 xl:col-span-8 dashboard-card !p-0 rounded-[40px] overflow-hidden relative h-[500px] border border-[var(--border)] group shadow-2xl">
                 <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFxhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw" className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-[20s]" alt="Map" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80" />
                 <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-2xl px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-4 text-[10px] font-black text-white uppercase tracking-[0.25em] shadow-2xl">
                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> Live Grid Surveillance
                 </div>
                 <div className="absolute bottom-8 right-8 flex gap-3">
                   {["add", "remove", "my_location"].map(icon => <button key={icon} className="w-12 h-12 bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/10 flex items-center justify-center text-white hover:bg-[var(--primary)] transition-all shadow-2xl"><span className="material-symbols-outlined text-xl">{icon}</span></button>)}
                 </div>
              </motion.div>

              <motion.div variants={itemVariants} className="col-span-12 xl:col-span-4 dashboard-card !p-8 flex flex-col">
                <h3 className="text-2xl font-black text-main tracking-tight mb-8 uppercase">System Pulse</h3>
                <div className="bg-black/20 rounded-[32px] p-6 font-mono text-[11px] space-y-4 h-[350px] overflow-y-auto custom-scrollbar border border-white/5 shadow-inner">
                  {logs.map((log, i) => (
                    <div key={i} className={`flex gap-4 border-l-2 pl-4 transition-all duration-500 ${log.type === 'error' ? 'border-rose-500/50' : 'border-emerald-500/20'}`}>
                      <span className="text-muted font-black opacity-30">{log.time}</span>
                      <span className={`font-black tracking-tight ${log.type === 'error' ? 'text-rose-400' : 'text-main opacity-80'}`}>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
