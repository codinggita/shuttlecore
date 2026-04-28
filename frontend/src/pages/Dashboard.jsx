import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('simulation');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const stats = [
    { label: 'Nodes Online', value: '99.8%', icon: 'lan', trend: '+0.2%', color: 'text-sky-400' },
    { label: 'Fleet Health', value: 'Nominal', icon: 'health_and_safety', trend: 'Stable', color: 'text-emerald-400' },
    { label: 'Avg Speed', value: '24.5 mph', icon: 'speed', trend: '+1.2%', color: 'text-amber-400' },
    { label: 'Security Level', value: 'L-7 SYNC', icon: 'security', trend: 'Active', color: 'text-indigo-400' }
  ];

  const menuItems = [
    { id: 'simulation', label: 'Simulation', icon: 'model_training' },
    { id: 'analytics', label: 'Analytics', icon: 'query_stats' },
    { id: 'fleet', label: 'Fleet Management', icon: 'airport_shuttle' },
    { id: 'safety', label: 'Safety & Security', icon: 'verified_user' },
  ];

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-main">SHUTTLE<span className="text-sky-500">CORE</span></span>
          </div>

          <nav className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Main Menu</p>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link w-full ${activeTab === item.id ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <div className="dashboard-card !p-4 !rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFxhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-sky-500/20"
              />
              <div>
                <p className="text-sm font-bold text-main">Cmdr. Operative</p>
                <p className="text-[10px] text-muted uppercase font-bold">Systems Lead</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-muted hover:text-rose-400 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg transition-colors duration-300 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden icon-btn"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex-1 max-w-xl hidden sm:block">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors">search</span>
              <input 
                type="text" 
                placeholder="Search telemetry, nodes, or logs..."
                className="w-full bg-[var(--surface-light)] border border-[var(--border)] rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-sky-500/50 focus:ring-4 focus:ring-sky-500/5 transition-all text-[var(--text-main)]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="icon-btn"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <span className="material-symbols-outlined">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <button className="icon-btn hidden xs:flex">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="icon-btn hidden xs:flex">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="h-8 w-[1px] bg-white/5 mx-2"></div>
            <button className="btn-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              <span className="hidden xs:inline">New Simulation</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar animate-in">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-main mb-2">Operations Dashboard</h1>
            <p className="text-muted text-sm md:text-base">Welcome back. System status is <span className="text-emerald-400 font-semibold">Nominal</span> across all sectors.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="dashboard-card group">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-xl bg-slate-700/30 ${stat.color}`}>
                    <span className="material-symbols-outlined">{stat.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    {stat.trend}
                  </span>
                </div>
                <p className="text-sm font-medium text-muted mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-main">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Main Performance Chart */}
            <div className="col-span-12 xl:col-span-8 dashboard-card">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-main">Fleet Performance</h3>
                  <p className="text-xs text-muted">Real-time throughput and efficiency metrics</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-[10px] font-bold rounded-lg bg-surface-light text-main">Live</button>
                  <button className="px-3 py-1 text-[10px] font-bold rounded-lg text-muted hover:bg-surface-light hover:text-main transition-all">24h</button>
                </div>
              </div>
              
              <div className="h-64 w-full relative flex items-end gap-1.5 px-2">
                {/* Mock Chart Visualization */}
                {[40, 65, 45, 85, 55, 95, 70, 80, 50, 60, 45, 75, 90, 65, 85, 60, 40, 70, 95, 80].map((h, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-sky-600/40 to-sky-400 rounded-t-lg transition-all hover:brightness-125 relative group" 
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-[8px] font-bold px-1.5 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {h}% Load
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase mb-1">Peak Load</p>
                  <p className="text-xl font-bold text-main">95.2%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase mb-1">Energy Cons.</p>
                  <p className="text-xl font-bold text-main">0.82 kWh</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted uppercase mb-1">Avg Latency</p>
                  <p className="text-xl font-bold text-main">12ms</p>
                </div>
              </div>
            </div>

            {/* Operator Queue */}
            <div className="col-span-12 xl:col-span-4 dashboard-card flex flex-col">
              <h3 className="text-lg font-bold text-main mb-6">Dispatch Queue</h3>
              <div className="space-y-4 flex-1">
                {[
                  { id: 'TX-402', status: 'In Transit', time: '4m rem', color: 'bg-sky-500' },
                  { id: 'NY-881', status: 'Charging', time: '12m rem', color: 'bg-amber-500' },
                  { id: 'SF-103', status: 'Standby', time: 'Ready', color: 'bg-emerald-500' },
                  { id: 'LA-229', status: 'In Transit', time: '15m rem', color: 'bg-sky-500' }
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[var(--surface-light)] rounded-2xl border border-[var(--border)] hover:border-sky-500/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${task.color} animate-pulse`}></div>
                      <div>
                        <p className="text-sm font-bold text-main">{task.id}</p>
                        <p className="text-[10px] text-muted font-medium">{task.status}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-muted">{task.time}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2.5 btn-secondary text-xs uppercase tracking-widest">
                Manage Queue
              </button>
            </div>
          </div>

          {/* Simulation Controls Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Environment Config */}
            <div className="dashboard-card">
              <h3 className="text-lg font-bold text-main mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-400">settings_input_component</span>
                Environment
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-muted uppercase">Traffic Density</label>
                    <span className="text-xs font-bold text-sky-400">High</span>
                  </div>
                  <input type="range" className="w-full accent-sky-500 bg-surface-light rounded-lg h-1.5 appearance-none cursor-pointer" />
                </div>
                <div>
                  <label className="text-xs font-bold text-muted uppercase block mb-3">Weather Condition</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Clear', 'Rain', 'Storm'].map((w) => (
                      <button key={w} className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${w === 'Clear' ? 'bg-sky-500/10 border-sky-500 text-sky-400' : 'border-border text-muted hover:border-sky-500/30'}`}>
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Strategies */}
            <div className="dashboard-card">
              <h3 className="text-lg font-bold text-main mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-400">alt_route</span>
                Routing Logic
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Dynamic Reroute', desc: 'AI-driven pathfinding', active: true },
                  { name: 'Fixed Corridors', desc: 'Traditional lanes', active: false },
                  { name: 'Swarm Mesh', desc: 'Decentralized node logic', active: false }
                ].map((s) => (
                  <button key={s.name} className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${s.active ? 'bg-indigo-500/10 border-indigo-500' : 'border-border hover:border-indigo-500/30'}`}>
                    <div>
                      <p className={`text-xs font-bold ${s.active ? 'text-indigo-400' : 'text-main'}`}>{s.name}</p>
                      <p className="text-[10px] text-muted">{s.desc}</p>
                    </div>
                    {s.active && <span className="material-symbols-outlined text-indigo-400 text-sm">check_circle</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* System Log */}
            <div className="dashboard-card">
              <h3 className="text-lg font-bold text-[var(--text-main)] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-400">terminal</span>
                Live Telemetry
              </h3>
              <div className="bg-[var(--surface-light)] rounded-xl p-4 font-mono text-[10px] space-y-2 h-32 overflow-y-auto custom-scrollbar border border-[var(--border)]">
                <p><span className="text-sky-500">[14:02:11]</span> <span className="text-slate-300">ROUTE_CALC_INIT: Node_AF2</span></p>
                <p><span className="text-sky-500">[14:02:14]</span> <span className="text-slate-300">PKT_REC: Optimization Complete</span></p>
                <p><span className="text-amber-500">[14:02:18]</span> <span className="text-amber-400">WARN: Grid Congestion Sector 7</span></p>
                <p><span className="text-sky-500">[14:02:22]</span> <span className="text-slate-300">SYNC: Master Clock Unified</span></p>
              </div>
              <button className="w-full mt-4 text-xs font-bold text-muted hover:text-main transition-colors flex items-center justify-center gap-1">
                View Full Logs
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

