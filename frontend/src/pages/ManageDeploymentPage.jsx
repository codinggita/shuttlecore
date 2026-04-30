import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ManageDeploymentPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isAlertResolved, setIsAlertResolved] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [snapshotBeforeSuspend, setSnapshotBeforeSuspend] = useState(null);

  const [activeDeployments, setActiveDeployments] = useState([
    { id: "SV-402", route: "Sector 7 → Alpha Grid", status: "En Route", progress: 65, color: "bg-emerald-500", text: "text-emerald-500" },
    { id: "SV-881", route: "District 2 → North Hub", status: "Vectoring", progress: 20, color: "bg-amber-500", text: "text-amber-500" },
    { id: "SV-209", route: "Terminal B → Maintenance", status: "Returning", progress: 90, color: "bg-rose-500", text: "text-rose-500" },
    { id: "SV-553", route: "West Campus → South Hub", status: "En Route", progress: 45, color: "bg-emerald-500", text: "text-emerald-500" }
  ]);

  const [availableUnits, setAvailableUnits] = useState(24);
  const [resourceSplit, setResourceSplit] = useState({ active: 48, maintenance: 12, offline: 40 });

  // Real-time update simulation
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSuspended) {
        // Update deployment progress
        setActiveDeployments(prev => prev.map(unit => {
          let newProg = unit.progress + (Math.random() * 0.5 + 0.1); // Smooth per-second progress
          if (newProg >= 100) newProg = 0; 
          
          let newStatus = unit.status;
          if (newProg > 95) newStatus = "Docking";
          else if (newProg < 10) newStatus = "Initializing";
          else if (unit.id === "SV-881") newStatus = "Vectoring";
          else if (unit.id === "SV-209") newStatus = "Returning";
          else newStatus = "En Route";

          return { ...unit, progress: newProg, status: newStatus };
        }));

        // Fluctuate available units
        if (Math.random() > 0.8) {
          setAvailableUnits(prev => Math.max(10, Math.min(50, prev + (Math.random() > 0.5 ? 1 : -1))));
        }

        // Fluctuate resource split
        setResourceSplit(prev => {
          const shift = (Math.random() * 0.4 - 0.2);
          return {
            active: Math.max(10, Math.min(80, prev.active + shift)),
            maintenance: Math.max(5, Math.min(30, prev.maintenance - (shift/2))),
            offline: Math.max(5, Math.min(50, prev.offline - (shift/2)))
          };
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isSuspended]);

  useEffect(() => {
    if (location.state && location.state.newUnit) {
      const unit = location.state.newUnit;
      const mappedUnit = {
        id: unit.unitId,
        route: unit.route || "Deploying to Grid",
        status: unit.status === "Active" ? "Initializing" : unit.status,
        progress: 15,
        color: unit.status === "Active" ? "bg-emerald-500" : (unit.status === "Standby" ? "bg-amber-500" : "bg-rose-500"),
        text: unit.status === "Active" ? "text-emerald-500" : (unit.status === "Standby" ? "text-amber-500" : "text-rose-500")
      };
      
      setActiveDeployments(prev => {
        if (!prev.find(p => p.id === mappedUnit.id)) {
          return [mappedUnit, ...prev];
        }
        return prev;
      });
    }
  }, [location.state]);

  const showToast = (title, desc, type) => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSuspendAll = () => {
    if (isSuspended) {
      const emergencyUnits = activeDeployments.filter(u => u.isEmergency);
      const restored = snapshotBeforeSuspend || [];
      setActiveDeployments([...emergencyUnits, ...restored]);
      setIsSuspended(false);
      showToast("Deployments Resumed", "All units have been reactivated and are back on their routes.", "success");
    } else {
      const nonEmergency = activeDeployments.filter(u => !u.isEmergency);
      const emergency = activeDeployments.filter(u => u.isEmergency);
      setSnapshotBeforeSuspend(nonEmergency);
      const suspended = nonEmergency.map(unit => ({
        ...unit,
        status: "Suspended",
        color: "bg-slate-500",
        text: "text-slate-400"
      }));
      setActiveDeployments([...emergency, ...suspended]);
      setIsSuspended(true);
      showToast("Global Suspension Active", "All standard deployments halted. Emergency units remain active.", "error");
    }
  };

  const handleResolveAlert = () => {
    setIsAlertResolved(true);
    showToast("Sector 4 Stabilized", "3 emergency units have been vectored to Sector 4.", "success");
    const newUnits = [
      { id: "SV-991", route: "Central Hub → Sector 4", status: "En Route", progress: 5, color: "bg-emerald-500", text: "text-emerald-500", isEmergency: true },
      { id: "SV-992", route: "Central Hub → Sector 4", status: "En Route", progress: 2, color: "bg-emerald-500", text: "text-emerald-500", isEmergency: true },
      { id: "SV-993", route: "Central Hub → Sector 4", status: "En Route", progress: 1, color: "bg-emerald-500", text: "text-emerald-500", isEmergency: true }
    ];
    setActiveDeployments(prev => {
      const withoutDuplicates = prev.filter(u => !newUnits.find(n => n.id === u.id));
      return [...newUnits, ...withoutDuplicates];
    });
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
        {toastMessage && (
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] ${toastMessage.type === 'success' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/20 border-rose-500/30 text-rose-400'} px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 backdrop-blur-xl border border-white/5`}>
            <span className="material-symbols-outlined">{toastMessage.type === 'success' ? 'check_circle' : 'warning'}</span>
            <div><p className="font-black tracking-tight uppercase text-xs">{toastMessage.title}</p><p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-0.5">{toastMessage.desc}</p></div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20"><span className="material-symbols-outlined text-white text-xl">rocket_launch</span></div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="opacity-70">CORE</span></span>
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
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg transition-colors duration-300 z-30">
          <div className="flex items-center gap-4">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
            <div className="flex items-center gap-3 bg-[var(--surface-muted)] px-4 py-2 rounded-xl border border-[var(--border)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-muted uppercase tracking-[0.25em]">Resource Vectoring: active</span>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto flex flex-col">
            <motion.div variants={itemVariants} className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-black text-muted hover:text-main transition-colors mb-6 uppercase tracking-[0.2em]"><span className="material-symbols-outlined text-sm">arrow_back</span> Back to Dashboard</button>
                <h1 className="text-4xl md:text-6xl font-black text-main mb-3 tracking-tighter uppercase">Manage Deployment</h1>
                <p className="text-muted text-sm font-medium opacity-70">High-fidelity fleet distribution and autonomous resource vectoring matrix.</p>
              </div>
              <div className="flex gap-4">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSuspendAll} className={`px-8 py-4 flex items-center gap-3 rounded-2xl border-2 font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-2xl ${isSuspended ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/5 border-rose-500/20 text-rose-500 hover:bg-rose-500/10"}`}>
                  <span className="material-symbols-outlined text-lg">{isSuspended ? "play_circle" : "pause_circle"}</span> {isSuspended ? "Resume All" : "Suspend All"}
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate("/add-unit")} className="btn-primary !px-8 !py-4 flex items-center gap-3 !rounded-2xl shadow-2xl shadow-[var(--primary)]/20 text-[11px] font-black uppercase tracking-[0.3em]">
                  <span className="material-symbols-outlined text-lg">add</span> Add Unit
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
              <motion.div variants={itemVariants} className="lg:col-span-2 dashboard-card !p-10 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)] opacity-[0.03] rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
                <div className="flex justify-between items-center mb-10 relative z-10">
                  <h3 className="text-2xl font-black tracking-tight flex items-center gap-4 uppercase">
                    <span className="material-symbols-outlined text-[var(--primary)] text-3xl">route</span> Active Deployments
                  </h3>
                  <div className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl ${isSuspended ? "bg-rose-500/10 text-rose-500 border-rose-500/20 animate-pulse" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                    <div className={`w-2 h-2 rounded-full ${isSuspended ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`} /> {isSuspended ? "Halted" : "Live Matrix"}
                  </div>
                </div>
                
                <div className="space-y-4 flex-1 pr-2 custom-scrollbar">
                  {activeDeployments.map((unit, i) => (
                    <motion.div key={i} whileHover={{ x: 6 }} className="p-6 rounded-[32px] border border-[var(--border)] bg-[var(--surface-muted)]/50 hover:bg-[var(--surface-muted)] transition-all group cursor-pointer shadow-lg hover:shadow-2xl">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center font-black text-lg border-2 border-white/5 ${unit.text} bg-white/5 shadow-inner group-hover:scale-110 transition-transform`}>{unit.id.split('-')[1]}</div>
                          <div><p className="font-black text-xl tracking-tight">{unit.id}</p><p className="text-[11px] text-muted font-black uppercase tracking-[0.2em] mt-1 opacity-60">{unit.route}</p></div>
                        </div>
                        <div className="flex flex-col items-end"><span className={`text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-lg bg-white/5 border border-white/5 mb-2 ${unit.text}`}>{unit.status}</span><p className="text-[10px] font-black text-muted tracking-widest">{Math.floor(unit.progress)}% COMPLETE</p></div>
                      </div>
                      <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden border border-white/5 shadow-inner"><motion.div initial={false} animate={{ width: `${unit.progress}%` }} transition={{ duration: 1 }} className={`h-full ${unit.color} shadow-[0_0_15px_currentColor]`} /></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="flex flex-col gap-8">
                <motion.div variants={itemVariants} className="dashboard-card !p-8 flex flex-col border border-[var(--border)] shadow-2xl relative overflow-hidden group">
                  <h3 className="text-xl font-black tracking-tight mb-10 uppercase">Resource Allocation</h3>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.3em] mb-4"><span className="text-muted opacity-60">Available Units</span><span className="text-main">{availableUnits} / 50</span></div>
                      <div className="h-4 w-full bg-[var(--surface)] rounded-full overflow-hidden flex shadow-inner border border-white/5">
                        <motion.div animate={{ width: `${resourceSplit.active}%` }} className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-1000" />
                        <motion.div animate={{ width: `${resourceSplit.maintenance}%` }} className="h-full bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-1000" />
                        <motion.div animate={{ width: `${resourceSplit.offline}%` }} className="h-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all duration-1000" />
                      </div>
                      <div className="flex justify-between mt-6">
                        {[{label: "Active", color: "emerald-500", val: resourceSplit.active}, {label: "Maint", color: "amber-500", val: resourceSplit.maintenance}, {label: "Offline", color: "rose-500", val: resourceSplit.offline}].map(l => (
                          <div key={l.label} className="text-center"><p className={`text-[10px] font-black uppercase tracking-widest text-${l.color} flex items-center gap-2 justify-center`}><span className={`w-2 h-2 rounded-full bg-${l.color} ${l.label === 'Active' ? 'animate-pulse' : ''}`} /> {l.label}</p><p className="text-lg font-black text-main mt-1 tracking-tighter">{Math.floor(l.val)}%</p></div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-8 border-t border-[var(--border)]">
                      <div className="flex items-center justify-between mb-6"><h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted opacity-60">Critical Matrix</h4><span className="material-symbols-outlined text-rose-500 text-sm animate-pulse">emergency</span></div>
                      {!isAlertResolved ? (
                        <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="bg-rose-500/5 border-2 border-rose-500/20 p-6 rounded-3xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-rose-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                          <div className="flex items-start gap-4 relative z-10">
                            <span className="material-symbols-outlined text-rose-500 text-2xl animate-bounce">warning</span>
                            <div>
                              <p className="text-sm font-black text-rose-500 uppercase tracking-widest mb-2">Sector 4 Demand Spike</p>
                              <p className="text-[11px] text-muted font-bold leading-relaxed">3 units required immediately to stabilize cluster throughput.</p>
                              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleResolveAlert} className="mt-5 w-full py-3 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-rose-500/20">Resolve Protocol</motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="bg-emerald-500/5 border-2 border-emerald-500/20 p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                          <span className="material-symbols-outlined text-emerald-500 text-4xl mb-4">verified</span>
                          <p className="text-xs font-black text-emerald-500 uppercase tracking-[0.3em]">All Sectors Stabilized</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <footer className="mt-12 border-t border-[var(--border)] py-12">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity"><span className="material-symbols-outlined text-xl">arrow_back</span> ShuttleCore</Link>
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

export default ManageDeploymentPage;
