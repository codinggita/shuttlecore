import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

const AllDriversPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState("all");
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch drivers on mount
  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/drivers');
        const driversData = response.data.drivers || [];
        
        // Transform drivers to match UI format
        const transformedDrivers = driversData.map((d, index) => ({
          rank: (index + 1).toString().padStart(2, '0'),
          name: d.name,
          division: d.division || "Regional Express",
          miles: d.totalMiles || Math.floor(Math.random() * 2000) + 500,
          alerts: d.alerts || Math.floor(Math.random() * 5),
          score: d.rating || Math.floor(Math.random() * 20) + 80,
          scoreColor: d.rating >= 95 ? "green" : d.rating >= 90 ? "cyan" : "slate",
          img: d.avatar || `https://i.pravatar.cc/150?u=${index + 1}`,
          status: d.status || "Active"
        }));
        
        setDrivers(transformedDrivers);
      } catch (error) {
        console.error("Error fetching drivers:", error);
        // Fallback to empty array if API fails
        setDrivers([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDrivers();
  }, []);

  const [stats, setStats] = useState({
    activeDuty: 38,
    inTraining: 2,
    avgScore: 86
  });

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate real-time updates
      setDrivers(prev => prev.map(d => {
        // Randomly update miles or score slightly
        if (Math.random() > 0.8) {
          return {
            ...d,
            miles: d.miles + Math.floor(Math.random() * 2),
            score: Math.max(50, Math.min(100, d.score + (Math.random() > 0.5 ? 0.1 : -0.1)))
          };
        }
        return d;
      }));

      // Simulate shifts in active duty
      if (Math.random() > 0.95) {
        setStats(prev => ({
          ...prev,
          activeDuty: Math.max(35, Math.min(40, prev.activeDuty + (Math.random() > 0.5 ? 1 : -1)))
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic average score
  useEffect(() => {
    const avg = drivers.reduce((acc, d) => acc + d.score, 0) / drivers.length;
    setStats(prev => ({ ...prev, avgScore: avg }));
  }, [drivers]);

  const divisions = ["all", "Heavy Haul Div.", "Regional Express", "Last Mile"];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = filterDivision === "all" || driver.division === filterDivision;
    return matchesSearch && matchesDivision;
  });

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
            <button onClick={() => navigate("/safety")} className="text-muted hover:text-[var(--text-main)] transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl font-black text-main tracking-tighter">All Drivers</h1>
              <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Fleet Operator Directory - 40 Total</p>
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
            {/* Stats Summary */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Drivers", value: drivers.length, icon: "people", color: "text-[var(--primary)]" },
                { label: "Active Duty", value: stats.activeDuty, icon: "check_circle", color: "text-emerald-400" },
                { label: "In Training", value: stats.inTraining, icon: "school", color: "text-amber-400" },
                { label: "Avg Score", value: `${stats.avgScore.toFixed(1)}%`, icon: "trending_up", color: "text-blue-400" },
              ].map((stat, i) => (
                <div key={i} className="dashboard-card !p-4 text-center">
                  <span className={`material-symbols-outlined ${stat.color} text-lg mb-2`}>{stat.icon}</span>
                  <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Search and Filter */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-muted">search</span>
                <input
                  type="text"
                  placeholder="Search drivers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[var(--surface-light)] border border-[var(--border)] rounded-xl text-[13px] font-bold text-[var(--text-main)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div className="flex gap-2">
                {divisions.map((div) => (
                  <button
                    key={div}
                    onClick={() => setFilterDivision(div)}
                    className={`px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${filterDivision === div ? "bg-[var(--primary)] text-white" : "bg-[var(--surface-muted)] text-muted border border-[var(--border)] hover:border-[var(--text-muted)]"}`}
                  >
                    {div === "all" ? "All" : div.split(" ")[0]}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Drivers Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate(`/driver-details/${driver.name.toLowerCase().replace(/\s+/g, '-')}`, { state: { driver } })}
                  className="dashboard-card !p-6 cursor-pointer hover:border-[var(--primary)] transition-all group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[var(--border)] group-hover:border-[var(--primary)] transition-all">
                        <img src={driver.img} alt={driver.name} className="w-full h-full object-cover" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${i === 0 ? "bg-emerald-500 text-white" : i === 1 ? "bg-blue-500 text-white" : i === 2 ? "bg-amber-500 text-white" : "bg-[var(--surface-muted)] text-muted border border-[var(--border)]"}`}>
                        {driver.rank}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-black text-main group-hover:text-[var(--primary)] transition-colors">{driver.name}</h3>
                      <p className="text-[11px] text-muted uppercase font-bold tracking-wider">{driver.division}</p>
                      <span className={`inline-block mt-2 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${driver.score >= 95 ? "bg-emerald-500/10 text-emerald-400" : driver.score >= 90 ? "bg-blue-500/10 text-blue-400" : driver.score >= 85 ? "bg-amber-500/10 text-amber-400" : "bg-rose-500/10 text-rose-400"}`}>
                        {driver.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[var(--border)]">
                    <div className="text-center">
                      <p className="text-[9px] text-muted uppercase font-bold tracking-wider mb-1">Miles</p>
                      <p className="text-[13px] font-black text-[var(--primary)]">{driver.miles.toLocaleString()} mi</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-muted uppercase font-bold tracking-wider mb-1">Alerts</p>
                      <p className={`text-[13px] font-black ${driver.alerts === 0 ? "text-emerald-400" : driver.alerts <= 3 ? "text-amber-400" : "text-rose-400"}`}>{driver.alerts}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-muted uppercase font-bold tracking-wider mb-1">Score</p>
                      <p className={`text-[13px] font-black ${driver.score >= 95 ? "text-emerald-400" : driver.score >= 90 ? "text-blue-400" : "text-amber-400"}`}>{driver.score.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-[var(--surface-muted)] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${driver.score >= 95 ? "bg-emerald-400" : driver.score >= 90 ? "bg-blue-400" : driver.score >= 85 ? "bg-amber-400" : "bg-rose-400"}`}
                          style={{ width: `${driver.score}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-muted group-hover:text-[var(--primary)] transition-colors">arrow_forward</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {filteredDrivers.length === 0 && (
              <div className="text-center py-16">
                <span className="material-symbols-outlined text-6xl text-muted opacity-30 mb-4">search_off</span>
                <p className="text-[16px] font-bold text-muted">No drivers found</p>
                <p className="text-[13px] text-muted opacity-60 mt-2">Try adjusting your search or filter</p>
              </div>
            )}

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

export default AllDriversPage;
