import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const AllDriversPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState("all");

  // All 9 drivers data
  const allDrivers = [
    {
      rank: "01",
      name: "Marcus Vance",
      division: "Heavy Haul Div.",
      miles: "1,244 mi",
      alerts: 0,
      score: 98,
      scoreColor: "green",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBw7z2R0KH4HAZsobWRb4qGmGVYYjd-k0Dcm_PoYHQoUjLloqkYz3uL6Dj_iAvjjcCHTPOR4w8svAie85uoZaIqMZsvLnGOYKISvT2yZesD0Q4GuLvMfP3AckWIZFjXdzeU6cWSOopx8qlZ8ataQmtJk3GjJ127zpnuNzZhNfIPH1XlnY4cro6dmvlDPuqp5ZTbPTB26Cd0WNMnWn9-L-a19Tsi1krTB5N002-pXP90kHxUypgkg7YRQxwhltEKueNImZNXi01bwY",
      status: "Top Performer",
    },
    {
      rank: "02",
      name: "Sarah Chen",
      division: "Regional Express",
      miles: "982 mi",
      alerts: 2,
      score: 94,
      scoreColor: "cyan",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkPtYBkrZ1lh4wsjxLGQ5CgWDU2vCTb-sVLnpPYFG6uHymmU7QPwgtCKlHwn0UH5ij6vb8wgvVFVjGH00WRha2mJFeQdBfhJ-qnXwLx7sB63znEJpaQJVbzD0LDobfMK-D74qhY5V949XSk-uF741quEhLNOe8RynMF7FthVA238WUvFJC6wFjV8jKeh93B_ab0y8_IUb1IedudkbQH28cxoq9bVXg1lD6EWGOHeas-td8dWvUWkoX2RXc_gDSzctB-RS5oMcB0ok",
      status: "Rising Star",
    },
    {
      rank: "03",
      name: "David Miller",
      division: "Last Mile",
      miles: "2,105 mi",
      alerts: 5,
      score: 91,
      scoreColor: "cyan",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqJ-cs0VYoIQd5_LibrD7tr9DGOxbFSyXXVLs_OVWLZKgD1AHXEDn0JeLdA35ZE0lJgHtS5B6xcsQKrNWF_iPzWimDxn6TPUA_S3iy03L-Jgt4Jjwpt_utu96mCN5unFoBwJea7wEGldUhIoBk5cV3EyiIkO60vjSW7jEQ2eOWEjDfzdYZ7xqGfOzzc9wRzKJsdURU2hHxvvacBh1kvb4-fgH8f58Em4Yp3MwWdxL0wN7atSC5GL7AeHiEhe-AI2wCgn6cLj_JZy0",
      status: "High Volume",
    },
    {
      rank: "04",
      name: "Jennifer Park",
      division: "Regional Express",
      miles: "876 mi",
      alerts: 3,
      score: 89,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=jennifer.park@shuttlecore.com",
      status: "Airport Expert",
    },
    {
      rank: "05",
      name: "Michael Torres",
      division: "Heavy Haul Div.",
      miles: "1,156 mi",
      alerts: 4,
      score: 87,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=michael.torres@shuttlecore.com",
      status: "Hazmat Certified",
    },
    {
      rank: "06",
      name: "Lisa Wong",
      division: "Last Mile",
      miles: "1,945 mi",
      alerts: 6,
      score: 85,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=lisa.wong@shuttlecore.com",
      status: "EV Specialist",
    },
    {
      rank: "07",
      name: "James Wilson",
      division: "Regional Express",
      miles: "743 mi",
      alerts: 4,
      score: 84,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=james.wilson@shuttlecore.com",
      status: "ADA Certified",
    },
    {
      rank: "08",
      name: "Emma Davis",
      division: "Last Mile",
      miles: "1,678 mi",
      alerts: 7,
      score: 82,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=emma.davis@shuttlecore.com",
      status: "In Training",
    },
    {
      rank: "09",
      name: "Alex Johnson",
      division: "Heavy Haul Div.",
      miles: "1,089 mi",
      alerts: 5,
      score: 80,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=alex.johnson@shuttlecore.com",
      status: "Oversized Load",
    },
    {
      rank: "10",
      name: "Chris Martinez",
      division: "Regional Express",
      miles: "923 mi",
      alerts: 2,
      score: 88,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=chris.martinez@shuttlecore.com",
      status: "Express Driver",
    },
    {
      rank: "11",
      name: "Patricia Brown",
      division: "Last Mile",
      miles: "1,834 mi",
      alerts: 6,
      score: 86,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=patricia.brown@shuttlecore.com",
      status: "High Efficiency",
    },
    {
      rank: "12",
      name: "Robert Taylor",
      division: "Heavy Haul Div.",
      miles: "1,245 mi",
      alerts: 3,
      score: 87,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=robert.taylor@shuttlecore.com",
      status: "Long Haul Pro",
    },
    {
      rank: "13",
      name: "Amanda White",
      division: "Regional Express",
      miles: "756 mi",
      alerts: 2,
      score: 89,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=amanda.white@shuttlecore.com",
      status: "Customer Favorite",
    },
    {
      rank: "14",
      name: "Kevin Lee",
      division: "Last Mile",
      miles: "2,012 mi",
      alerts: 7,
      score: 83,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=kevin.lee@shuttlecore.com",
      status: "Volume Driver",
    },
    {
      rank: "15",
      name: "Sandra Garcia",
      division: "Heavy Haul Div.",
      miles: "1,378 mi",
      alerts: 4,
      score: 85,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=sandra.garcia@shuttlecore.com",
      status: "Equipment Spec",
    },
    {
      rank: "16",
      name: "Daniel Kim",
      division: "Regional Express",
      miles: "892 mi",
      alerts: 3,
      score: 86,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=daniel.kim@shuttlecore.com",
      status: "Route Expert",
    },
    {
      rank: "17",
      name: "Michelle Ross",
      division: "Last Mile",
      miles: "1,756 mi",
      alerts: 5,
      score: 84,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=michelle.ross@shuttlecore.com",
      status: "Fast Delivery",
    },
    {
      rank: "18",
      name: "Jason Clark",
      division: "Heavy Haul Div.",
      miles: "1,543 mi",
      alerts: 4,
      score: 85,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=jason.clark@shuttlecore.com",
      status: "Heavy Load Pro",
    },
    {
      rank: "19",
      name: "Nicole Adams",
      division: "Regional Express",
      miles: "678 mi",
      alerts: 2,
      score: 90,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=nicole.adams@shuttlecore.com",
      status: "Top Rated",
    },
    {
      rank: "20",
      name: "Ryan Phillips",
      division: "Last Mile",
      miles: "1,987 mi",
      alerts: 6,
      score: 82,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=ryan.phillips@shuttlecore.com",
      status: "Night Shift",
    },
    {
      rank: "21",
      name: "Stephanie Turner",
      division: "Heavy Haul Div.",
      miles: "1,234 mi",
      alerts: 3,
      score: 87,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=stephanie.turner@shuttlecore.com",
      status: "Safety Leader",
    },
    {
      rank: "22",
      name: "Brandon Collins",
      division: "Regional Express",
      miles: "834 mi",
      alerts: 2,
      score: 88,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=brandon.collins@shuttlecore.com",
      status: "On-Time Pro",
    },
    {
      rank: "23",
      name: "Rebecca Murphy",
      division: "Last Mile",
      miles: "1,654 mi",
      alerts: 5,
      score: 84,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=rebecca.murphy@shuttlecore.com",
      status: "Delivery Pro",
    },
    {
      rank: "24",
      name: "Justin Rivera",
      division: "Heavy Haul Div.",
      miles: "1,432 mi",
      alerts: 4,
      score: 86,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=justin.rivera@shuttlecore.com",
      status: "Load Master",
    },
    {
      rank: "25",
      name: "Laura Cooper",
      division: "Regional Express",
      miles: "765 mi",
      alerts: 2,
      score: 89,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=laura.cooper@shuttlecore.com",
      status: "Express Pro",
    },
    {
      rank: "26",
      name: "Tyler Ward",
      division: "Last Mile",
      miles: "1,823 mi",
      alerts: 6,
      score: 83,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=tyler.ward@shuttlecore.com",
      status: "Urban Expert",
    },
    {
      rank: "27",
      name: "Melissa Foster",
      division: "Heavy Haul Div.",
      miles: "1,567 mi",
      alerts: 4,
      score: 85,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=melissa.foster@shuttlecore.com",
      status: "Long Distance",
    },
    {
      rank: "28",
      name: "Aaron Hughes",
      division: "Regional Express",
      miles: "912 mi",
      alerts: 3,
      score: 87,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=aaron.hughes@shuttlecore.com",
      status: "Reliable",
    },
    {
      rank: "29",
      name: "Christina Butler",
      division: "Last Mile",
      miles: "1,745 mi",
      alerts: 5,
      score: 84,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=christina.butler@shuttlecore.com",
      status: "Quick Pickup",
    },
    {
      rank: "30",
      name: "Jordan Simmons",
      division: "Heavy Haul Div.",
      miles: "1,398 mi",
      alerts: 4,
      score: 86,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=jordan.simmons@shuttlecore.com",
      status: "Heavy Duty",
    },
    {
      rank: "31",
      name: "Victoria Price",
      division: "Regional Express",
      miles: "654 mi",
      alerts: 1,
      score: 91,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=victoria.price@shuttlecore.com",
      status: "Elite Driver",
    },
    {
      rank: "32",
      name: "Dylan Richardson",
      division: "Last Mile",
      miles: "1,892 mi",
      alerts: 6,
      score: 82,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=dylan.richardson@shuttlecore.com",
      status: "Multi-Stop",
    },
    {
      rank: "33",
      name: "Brittany Wood",
      division: "Heavy Haul Div.",
      miles: "1,456 mi",
      alerts: 4,
      score: 85,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=brittany.wood@shuttlecore.com",
      status: "Freight Pro",
    },
    {
      rank: "34",
      name: "Cody Barnes",
      division: "Regional Express",
      miles: "876 mi",
      alerts: 3,
      score: 86,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=cody.barnes@shuttlecore.com",
      status: "Shuttle Expert",
    },
    {
      rank: "35",
      name: "Megan Coleman",
      division: "Last Mile",
      miles: "1,678 mi",
      alerts: 5,
      score: 83,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=megan.coleman@shuttlecore.com",
      status: "Same Day",
    },
    {
      rank: "36",
      name: "Shawn Patterson",
      division: "Heavy Haul Div.",
      miles: "1,534 mi",
      alerts: 4,
      score: 85,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=shawn.patterson@shuttlecore.com",
      status: "Towing Spec",
    },
    {
      rank: "37",
      name: "Kelsey Jenkins",
      division: "Regional Express",
      miles: "723 mi",
      alerts: 2,
      score: 88,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=kelsey.jenkins@shuttlecore.com",
      status: "Peak Performer",
    },
    {
      rank: "38",
      name: "Brett Perry",
      division: "Last Mile",
      miles: "1,834 mi",
      alerts: 6,
      score: 81,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=brett.perry@shuttlecore.com",
      status: "Flexible",
    },
    {
      rank: "39",
      name: "Cassandra Long",
      division: "Heavy Haul Div.",
      miles: "1,623 mi",
      alerts: 5,
      score: 84,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=cassandra.long@shuttlecore.com",
      status: "Industrial",
    },
    {
      rank: "40",
      name: "Derek Russell",
      division: "Regional Express",
      miles: "567 mi",
      alerts: 1,
      score: 92,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=derek.russell@shuttlecore.com",
      status: "Perfect Score",
    },
  ];

  const divisions = ["all", "Heavy Haul Div.", "Regional Express", "Last Mile"];

  const filteredDrivers = allDrivers.filter(driver => {
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
                { label: "Total Drivers", value: "40", icon: "people", color: "text-[var(--primary)]" },
                { label: "Active Duty", value: "38", icon: "check_circle", color: "text-emerald-400" },
                { label: "In Training", value: "2", icon: "school", color: "text-amber-400" },
                { label: "Avg Score", value: "86%", icon: "trending_up", color: "text-blue-400" },
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
                      <p className="text-[13px] font-black text-[var(--primary)]">{driver.miles}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-muted uppercase font-bold tracking-wider mb-1">Alerts</p>
                      <p className={`text-[13px] font-black ${driver.alerts === 0 ? "text-emerald-400" : driver.alerts <= 3 ? "text-amber-400" : "text-rose-400"}`}>{driver.alerts}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[9px] text-muted uppercase font-bold tracking-wider mb-1">Score</p>
                      <p className={`text-[13px] font-black ${driver.score >= 95 ? "text-emerald-400" : driver.score >= 90 ? "text-blue-400" : "text-amber-400"}`}>{driver.score}%</p>
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
