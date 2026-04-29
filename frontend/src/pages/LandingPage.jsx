import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[var(--background)] text-[var(--text-main)] font-sans overflow-x-hidden transition-colors duration-300">
      <header className="bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] docked full-width top-0 z-40 fixed w-full">
        <div className="flex justify-between items-center px-4 md:px-6 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              className="md:hidden icon-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
            <span className="text-lg font-black tracking-tighter font-manrope">ShuttleCore</span>
            <nav className="hidden md:flex gap-6 items-center">
              <a className="font-manrope text-sm font-medium text-sky-500 font-bold" href="#">Fleet Overview</a>
              <a className="font-manrope text-sm font-medium text-[var(--text-muted)] hover:bg-sky-500/5 transition-colors px-2 py-1" href="#">AI Dispatch</a>
              <a className="font-manrope text-sm font-medium text-[var(--text-muted)] hover:bg-sky-500/5 transition-colors px-2 py-1" href="#">Route Engine</a>
            </nav>
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
            <div className="hidden md:flex items-center bg-[var(--surface-light)] border border-[var(--border)] rounded px-3 py-1.5 gap-2">
              <span className="material-symbols-outlined text-[var(--text-muted)] text-sm">search</span>
              <input className="bg-transparent border-none text-xs text-[var(--text-main)] focus:ring-0 w-32" placeholder="Search Fleet..." type="text" />
            </div>
            <Link to="/login" className="text-sm font-manrope font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
              Login
            </Link>
            <Link to="/signup" className="btn-primary !py-1.5 !px-4 !text-xs">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-in">
          <div className="absolute inset-0 bg-[var(--background)]/95 backdrop-blur-2xl"></div>
          <div className="relative h-full flex flex-col p-8">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-black tracking-tighter uppercase">ShuttleCore</span>
              <button className="icon-btn" onClick={() => setIsMenuOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex flex-col gap-8">
              <a className="text-3xl font-bold text-main" href="#" onClick={() => setIsMenuOpen(false)}>Fleet Overview</a>
              <a className="text-3xl font-bold text-main" href="#" onClick={() => setIsMenuOpen(false)}>AI Dispatch</a>
              <a className="text-3xl font-bold text-main" href="#" onClick={() => setIsMenuOpen(false)}>Route Engine</a>
              <hr className="border-[var(--border)]" />
              <Link to="/login" className="text-2xl font-bold text-muted" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-primary text-center py-4 text-xl" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </nav>
          </div>
        </div>
      )}

      <main className="pt-16">
        <section className="relative min-h-[70vh] flex flex-col items-center justify-start pt-24 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/90 to-[var(--background)]"></div>
            <img alt="Autonomous Transit Network" className="w-full h-full object-cover opacity-20 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmeWq0Twvo26F1CGN12aca8oEvbQIVrAhSMLKoYJ1CjlrYCMMjqwVb0iWcbFH_I2RcLshHOnEDXenZK7PMCW154rkf9g0I5cccFW4ocwQMUWMojjV7zYdDXAc9uXMl4hyxXUGgtAXo-XsqGsNvWa-ndNCtJphQiKiVuzZg3hlS-RqC3V1LPCVChCljdCcEvAgF_5soSbJvHzcTk4hLGFgRSqynzCuuc9LUSJbMQE-yNbqNERAzi8lqXhd2JBLmbaWybCrzrycHBrg" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span className="font-manrope text-[10px] uppercase tracking-[0.2em] text-sky-500 font-bold">System Status: Active</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[var(--text-main)] mb-6 leading-tight tracking-tight">
              The Pulse of <br />
              <span className="text-sky-500">Autonomous Logistics</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-10">
              Orchestrate high-velocity fleet movements with real-time AI dispatching and predictive demand modeling. Precision transit for the next generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="btn-primary !px-8 !py-4 flex items-center justify-center gap-2">
                Launch Command Center
                <span className="material-symbols-outlined">rocket_launch</span>
              </Link>
              <button className="px-8 py-4 bg-transparent border border-[var(--border)] text-[var(--text-main)] font-manrope font-bold rounded-lg hover:bg-sky-500/5 transition-all flex items-center justify-center gap-2">
                View Operational Specs
                <span className="material-symbols-outlined">description</span>
              </button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-12 lg:col-span-8 dashboard-card relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <span className="material-symbols-outlined text-sky-500 text-4xl opacity-20">auto_awesome</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">AI Demand Modeling</h3>
              <p className="text-[var(--text-muted)] mb-8 max-w-md">
                Our neural core predicts passenger surges 45 minutes before they occur, automatically repositioning your autonomous fleet for zero-wait performance.
              </p>
              <div className="h-48 w-full bg-[var(--surface-light)] rounded border border-[var(--border)] p-4 transition-colors">
                <div className="flex items-end justify-between h-full gap-2">
                  <div className="w-full bg-sky-500/20 border-t border-sky-500 h-[40%] rounded-t-sm"></div>
                  <div className="w-full bg-sky-500/20 border-t border-sky-500 h-[65%] rounded-t-sm"></div>
                  <div className="w-full bg-sky-500/40 border-t-2 border-sky-500 h-[90%] rounded-t-sm relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-sky-500 text-[10px] px-2 py-0.5 rounded text-white font-bold">PEAK</div>
                  </div>
                  <div className="w-full bg-sky-500/20 border-t border-sky-500 h-[55%] rounded-t-sm"></div>
                  <div className="w-full bg-sky-500/20 border-t border-sky-500 h-[30%] rounded-t-sm"></div>
                  <div className="w-full bg-sky-500/20 border-t border-sky-500 h-[45%] rounded-t-sm"></div>
                </div>
              </div>
            </div>
            <div className="md:col-span-12 lg:col-span-4 dashboard-card border-l-4 border-l-sky-500">
              <div className="mb-6">
                <span className="material-symbols-outlined text-sky-500 text-3xl">route</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--text-main)] mb-3">Real-time Routing</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">
                Dynamic mesh network topology for vehicle-to-vehicle traffic mitigation.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-[var(--text-main)]">
                  <span className="material-symbols-outlined text-sky-500 text-sm">check_circle</span>
                  Latent Path Optimization
                </li>
                <li className="flex items-center gap-3 text-sm text-[var(--text-main)]">
                  <span className="material-symbols-outlined text-sky-500 text-sm">check_circle</span>
                  Collision Vector Analysis
                </li>
                <li className="flex items-center gap-3 text-sm text-[var(--text-main)]">
                  <span className="material-symbols-outlined text-sky-500 text-sm">check_circle</span>
                  Energy-Grid Syncing
                </li>
              </ul>
            </div>
            <div className="md:col-span-12 lg:col-span-4 dashboard-card">
              <span className="material-symbols-outlined text-indigo-500 text-3xl mb-4">query_stats</span>
              <h4 className="text-lg font-bold text-[var(--text-main)] mb-2">Predictive Labs</h4>
              <p className="text-sm text-[var(--text-muted)]">Sandbox environment for stress-testing urban transit scenarios with synthetic population data.</p>
            </div>
            <div className="md:col-span-12 lg:col-span-4 dashboard-card">
              <span className="material-symbols-outlined text-emerald-500 text-3xl mb-4">verified_user</span>
              <h4 className="text-lg font-bold text-[var(--text-main)] mb-2">Safety Protocols</h4>
              <p className="text-sm text-[var(--text-muted)]">Layer-7 security encryption for all vehicle communications and passenger biometric data.</p>
            </div>
            <div className="md:col-span-12 lg:col-span-4 dashboard-card">
              <span className="material-symbols-outlined text-amber-500 text-3xl mb-4">eco</span>
              <h4 className="text-lg font-bold text-[var(--text-main)] mb-2">Sustainability</h4>
              <p className="text-sm text-[var(--text-muted)]">Achieve carbon-neutral transit goals through automated load balancing and peak-shaving energy use.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[var(--surface-light)] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-main)] mb-6">Operational Intelligence <span className="text-sky-500">at Scale.</span></h2>
                <p className="text-lg text-[var(--text-muted)] mb-8">
                  ShuttleCore provides the unified dashboard for fleet managers to monitor, intervene, and optimize autonomous networks across entire metropolitan zones.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-sky-500/10 flex items-center justify-center rounded border border-sky-500/30">
                      <span className="material-symbols-outlined text-sky-500">hub</span>
                    </div>
                    <div>
                      <span className="block text-[var(--text-main)] font-bold">Unified Fleet Hub</span>
                      <span className="text-[var(--text-muted)] text-sm">Control thousands of units from a single low-latency interface.</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-sky-500/10 flex items-center justify-center rounded border border-sky-500/30">
                      <span className="material-symbols-outlined text-sky-500">history_toggle_off</span>
                    </div>
                    <div>
                      <span className="block text-[var(--text-main)] font-bold">Wait Intelligence</span>
                      <span className="text-[var(--text-muted)] text-sm">Reduce average passenger wait times by 64% through predictive staging.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-transparent opacity-20 blur-xl group-hover:opacity-30 transition-all"></div>
                <div className="relative dashboard-card !p-0 overflow-hidden">
                  <img alt="System Dashboard" className="w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG6GM0S19dDJ0Ft-8__vafbZTT5_ilVctIDG6gb0UQhtGPy2QeBL37sHUin5cn5ldHACh3R6FxSGJibSo1TONzf29lekeTCAgsm0Q-yKYX4r_RMTRMCnuxcRuphz1xJxu-oxScpeitH8MWJPAOg_kKSl0wPwgjdpyYnFpgAI7QUU-eBKc8BDiZ3QtKDT15pabJRfPa-rQMXS-o5LK2gCuUTXfZOu3VUgFmDqfHpj1jBHLxE8dLAZbCVRb_VqrLvtNXoc2nSfnIB7A" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] to-transparent opacity-40"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-sky-500 uppercase tracking-widest border border-sky-500/30">
                      Live Stream: Node_042
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto dashboard-card !p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
            <h2 className="text-4xl font-bold text-[var(--text-main)] mb-6">Ready to Optimize?</h2>
            <p className="text-lg text-[var(--text-muted)] mb-10">
              Join the ranks of modern metropolitan authorities leveraging ShuttleCore for a cleaner, faster urban future.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="btn-primary !px-10 !py-5">
                Request System Demo
              </button>
              <button className="px-10 py-5 bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-main)] font-bold rounded-xl hover:bg-sky-500/5 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--background)] border-t border-[var(--border)] py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[var(--text-main)] font-black tracking-tighter text-xl font-manrope">ShuttleCore</span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Autonomous Ops Hub</span>
          </div>
          <div className="flex gap-8">
            <a className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase font-bold tracking-widest" href="#">Network Status</a>
            <a className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase font-bold tracking-widest" href="#">Security Docs</a>
            <a className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase font-bold tracking-widest" href="#">Privacy</a>
            <a className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase font-bold tracking-widest" href="#">API Support</a>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">© 2024 ShuttleCore Logistics Systems.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
