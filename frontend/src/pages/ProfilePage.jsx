import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

const ProfilePage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "Cmdr.",
    lastName: "Operative",
    email: "operative@shuttlecore.ai",
    organization: "Systems Command",
    role: "Systems Lead",
    joinedDate: "January 2024",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "Cmdr.",
    lastName: "Operative",
    email: "operative@shuttlecore.ai",
    organization: "Systems Command",
    role: "Systems Lead",
    joinedDate: "January 2024",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/me');
        const userData = response.data.user;
        setUser(userData);
        setEditForm(userData);
        localStorage.setItem("userProfile", JSON.stringify(userData));
      } catch (error) {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
          setEditForm(parsed);
        }
      }
    };
    
    fetchUserProfile();
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(editForm));
    setUser(editForm);
    setIsEditing(false);
    alert("Operational identity synchronized successfully.");
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
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
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
              <motion.button key={item.id} whileHover={{ x: 4 }} onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}>
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-4">
          <motion.button onClick={() => navigate("/emergency-stop")} whileHover={{ scale: 1.02 }} className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5">
            <span className="material-symbols-outlined text-lg animate-pulse">emergency_home</span> Emergency Stop
          </motion.button>
          <div className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border border-[var(--primary)]/30 shadow-[0_0_15px_rgba(79,70,229,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-white/20" />
              <div><p className="text-[13px] font-black text-main leading-tight">{user.firstName} {user.lastName}</p><p className="text-[10px] text-muted uppercase font-bold tracking-wider">{user.role}</p></div>
            </div>
            <motion.button onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg">
              <span className="material-symbols-outlined text-xs">logout</span> Terminate Session
            </motion.button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl z-30">
          <div className="flex items-center gap-6">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-main"><span className="material-symbols-outlined">menu</span></motion.button>
            <div className="flex items-center gap-4 bg-[var(--surface-muted)] px-4 py-2 rounded-xl border border-[var(--border)]">
               <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)] animate-pulse" />
               <span className="text-[11px] font-black text-muted uppercase tracking-[0.3em] flex items-center gap-3">User Profile Terminal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <motion.button whileHover={{ scale: 1.05 }} onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></motion.button>
             <div className="h-8 w-[1px] bg-[var(--border)]" />
             <span className="text-xl font-mono font-black text-main opacity-40">{new Date().toLocaleTimeString([], { hour12: false })}</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-[1000px] mx-auto">
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
              
              {/* Profile Header Card */}
              <motion.div variants={itemVariants} className="dashboard-card !p-12 mb-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 blur-[100px] pointer-events-none rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="relative group/avatar">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--primary)] to-cyan-500 rounded-full blur-2xl opacity-20 group-hover/avatar:opacity-40 transition-opacity" />
                    <img src={user.avatar} alt="Profile" className="w-40 h-40 rounded-full border-4 border-[var(--surface)] shadow-2xl relative z-10" />
                    <button className="absolute bottom-2 right-2 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center border-4 border-[var(--surface)] shadow-lg hover:scale-110 transition-transform z-20">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-3">
                       <h1 className="text-5xl font-black text-main tracking-tighter uppercase italic">{user.firstName} <span className="opacity-40">{user.lastName}</span></h1>
                       <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 text-[10px] font-black rounded-full uppercase tracking-widest uppercase">Verified Operator</span>
                    </div>
                    <p className="text-lg text-muted font-medium mb-8 max-w-lg">{user.role} at <span className="text-main font-black underline decoration-[var(--primary)] decoration-4 underline-offset-4">{user.organization}</span>. Managing global autonomous fleet clusters with precision.</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                       <div className="flex flex-col"><span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 opacity-50">Operational Since</span><span className="text-sm font-black text-main">{user.joinedDate}</span></div>
                       <div className="w-[1px] h-10 bg-[var(--border)]" />
                       <div className="flex flex-col"><span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 opacity-50">Security Level</span><span className="text-sm font-black text-emerald-400">Class Alpha</span></div>
                       <div className="w-[1px] h-10 bg-[var(--border)]" />
                       <div className="flex flex-col"><span className="text-[10px] font-black text-muted uppercase tracking-widest mb-1 opacity-50">Node Sync</span><span className="text-sm font-black text-cyan-400">Stable</span></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Contact Details */}
                <motion.div variants={itemVariants} className="md:col-span-7 space-y-8">
                  <div className="dashboard-card !p-8">
                    <h3 className="text-[11px] font-black text-muted uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg text-[var(--primary)]">identity_platform</span> Corporate Identity
                    </h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[9px] font-black text-muted uppercase tracking-widest">First Name</label>
                            {isEditing ? (
                              <input 
                                type="text" 
                                value={editForm.firstName} 
                                onChange={e => setEditForm({...editForm, firstName: e.target.value})}
                                className="input-field !p-4"
                              />
                            ) : (
                              <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl font-bold text-main">{user.firstName}</div>
                            )}
                         </div>
                         <div className="space-y-2">
                            <label className="text-[9px] font-black text-muted uppercase tracking-widest">Last Name</label>
                            {isEditing ? (
                              <input 
                                type="text" 
                                value={editForm.lastName} 
                                onChange={e => setEditForm({...editForm, lastName: e.target.value})}
                                className="input-field !p-4"
                              />
                            ) : (
                              <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl font-bold text-main">{user.lastName}</div>
                            )}
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] font-black text-muted uppercase tracking-widest">Work Email Address</label>
                         {isEditing ? (
                            <input 
                              type="email" 
                              value={editForm.email} 
                              onChange={e => setEditForm({...editForm, email: e.target.value})}
                              className="input-field !p-4"
                            />
                         ) : (
                            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl font-bold text-main flex items-center gap-3">
                               <span className="material-symbols-outlined text-muted text-lg">mail</span>
                               {user.email}
                            </div>
                         )}
                      </div>
                      <div className="space-y-2">
                         <label className="text-[9px] font-black text-muted uppercase tracking-widest">Fleet Organization</label>
                         {isEditing ? (
                            <input 
                              type="text" 
                              value={editForm.organization} 
                              onChange={e => setEditForm({...editForm, organization: e.target.value})}
                              className="input-field !p-4"
                            />
                         ) : (
                            <div className="p-4 bg-[var(--surface-muted)] border border-[var(--border)] rounded-2xl font-bold text-main flex items-center gap-3">
                               <span className="material-symbols-outlined text-muted text-lg">corporate_fare</span>
                               {user.organization}
                            </div>
                         )}
                      </div>
                    </div>
                    {isEditing ? (
                      <div className="flex gap-4 mt-10">
                        <motion.button 
                          whileHover={{ scale: 1.02 }} 
                          onClick={handleSaveProfile}
                          className="flex-1 py-4 bg-[var(--primary)] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20"
                        >
                          Save Operational Identity
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.02 }} 
                          onClick={() => { setIsEditing(false); setEditForm(user); }}
                          className="px-8 py-4 bg-[var(--surface-muted)] text-muted rounded-2xl text-[11px] font-black uppercase tracking-widest border border-[var(--border)]"
                        >
                          Cancel
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button 
                        whileHover={{ scale: 1.02 }} 
                        onClick={() => setIsEditing(true)}
                        className="w-full mt-10 py-4 bg-[var(--primary)] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20"
                      >
                        Edit Identity Data
                      </motion.button>
                    )}
                  </div>

                  <div className="dashboard-card !p-8 !bg-rose-500/5 !border-rose-500/20">
                     <h3 className="text-[11px] font-black text-rose-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-lg">dangerous</span> Danger Zone
                     </h3>
                     <p className="text-[12px] text-muted mb-6 font-medium">Deactivating your operator identity will immediately revoke all access to fleet command and control protocols. This action is irreversible.</p>
                     <button className="text-[11px] font-black text-rose-500 uppercase tracking-widest hover:underline">Terminate Identity Access</button>
                  </div>
                </motion.div>

                {/* Account Activity */}
                <motion.div variants={itemVariants} className="md:col-span-5 space-y-8">
                   <div className="dashboard-card !p-8">
                      <h3 className="text-[11px] font-black text-muted uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                         <span className="material-symbols-outlined text-lg text-cyan-500">history</span> Command History
                      </h3>
                      <div className="space-y-6">
                        {[
                          { action: "Login: Secure Terminal", time: "2 hours ago", icon: "login" },
                          { action: "Dispatch Override", time: "Yesterday", icon: "emergency" },
                          { action: "Mesh Network Update", time: "3 days ago", icon: "hub" },
                          { action: "Security Credential Renewed", time: "1 week ago", icon: "key" },
                        ].map((log, i) => (
                          <div key={i} className="flex items-center gap-4 group">
                             <div className="w-9 h-9 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--primary)]/10 transition-colors">
                                <span className="material-symbols-outlined text-muted text-lg group-hover:text-[var(--primary)] transition-colors">{log.icon}</span>
                             </div>
                             <div>
                                <p className="text-[13px] font-black text-main leading-none mb-1">{log.action}</p>
                                <p className="text-[10px] text-muted font-bold uppercase tracking-tighter">{log.time}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => navigate("/event-log")} className="w-full mt-8 py-3 text-[10px] font-black text-muted hover:text-main uppercase tracking-widest transition-colors border border-dashed border-[var(--border)] rounded-xl">View Audit Logs</button>
                   </div>

                   <div className="dashboard-card !p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10"><span className="material-symbols-outlined text-6xl text-[var(--primary)]">shield</span></div>
                      <h3 className="text-[11px] font-black text-muted uppercase tracking-[0.3em] mb-6">Security Settings</h3>
                      <div className="space-y-4">
                         <div 
                           onClick={() => setTwoFactor(!twoFactor)}
                           className="flex items-center justify-between p-4 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)] cursor-pointer group"
                         >
                            <span className="text-[12px] font-black text-main group-hover:text-[var(--primary)] transition-colors">Two-Factor Auth</span>
                            <div className={`w-10 h-5 ${twoFactor ? "bg-emerald-500/20" : "bg-slate-500/20"} rounded-full relative p-1 transition-colors`}>
                              <motion.div 
                                animate={{ x: twoFactor ? 20 : 0 }}
                                className={`w-3 h-3 ${twoFactor ? "bg-emerald-500" : "bg-slate-400"} rounded-full`} 
                              />
                            </div>
                         </div>
                         <div 
                           onClick={() => setBiometric(!biometric)}
                           className="flex items-center justify-between p-4 bg-[var(--surface-muted)] rounded-2xl border border-[var(--border)] cursor-pointer group"
                         >
                            <span className="text-[12px] font-black text-main group-hover:text-[var(--primary)] transition-colors">Biometric Access</span>
                            <div className={`w-10 h-5 ${biometric ? "bg-emerald-500/20" : "bg-slate-500/20"} rounded-full relative p-1 transition-colors`}>
                              <motion.div 
                                animate={{ x: biometric ? 20 : 0 }}
                                className={`w-3 h-3 ${biometric ? "bg-emerald-500" : "bg-slate-400"} rounded-full`} 
                              />
                            </div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              </div>

            </motion.div>
            <footer className="mt-20 border-t border-[var(--border)] py-12">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-main font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity"><span className="material-symbols-outlined text-xl">arrow_back</span> ShuttleCore</Link>
                <div className="flex flex-wrap justify-center gap-8">{[{ label: "System Status", to: "/dashboard" }, { label: "Privacy Policy", to: "/privacy" }, { label: "Security Center", to: "/safety" }].map((l) => <Link key={l.label} to={l.to} className="text-[11px] text-muted hover:text-main transition-colors uppercase font-black tracking-[0.2em]">{l.label}</Link>)}</div>
                <span className="text-[11px] text-muted font-bold opacity-40">© 2024 ShuttleCore Logistics Systems.</span>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
