import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-[#1F2A38] text-[#e6e0e9] font-sans overflow-x-hidden">
      <header className="bg-[#1F2A38]/80 backdrop-blur-xl border-b border-[#4A5568]/30 docked full-width top-0 z-40 fixed w-full">
        <div className="flex justify-between items-center px-6 h-16 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-lg font-black tracking-tighter text-white font-manrope">SlateTransit</span>
            <nav className="hidden md:flex gap-6 items-center">
              <a className="font-manrope text-sm font-medium text-[#3B82F6] font-bold" href="#">Fleet Overview</a>
              <a className="font-manrope text-sm font-medium text-slate-400 hover:bg-white/5 transition-colors px-2 py-1" href="#">AI Dispatch</a>
              <a className="font-manrope text-sm font-medium text-slate-400 hover:bg-white/5 transition-colors px-2 py-1" href="#">Route Engine</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-[#1F2A38] border border-[#4A5568]/30 rounded px-3 py-1.5 gap-2">
              <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
              <input className="bg-transparent border-none text-xs text-white focus:ring-0 w-32" placeholder="Search Fleet..." type="text" />
            </div>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-white transition-colors">notifications</span>
            <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-white transition-colors">settings</span>
            <div className="w-8 h-8 rounded bg-primary-container flex items-center justify-center overflow-hidden border border-[#3B82F6]/50">
              <img alt="Fleet Manager Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7yLYCt-iAMspqKqZuJb0j3a8_rkViqyebQ0k8xI-9OdD-iKqV_0Syu18VeAHbmoUR4qxst--FYvcOHW1vmSD3pAp3mpqPXlr_oGcejUWQL-NRL1jrK1IGJLCQPsJAH-wFDcAu54fVZ-Weto20n-YzTn3Fz9YAA9EH3vkOb3jPZ3BW2yoZRNvMtMH7UZ6meFfm-1ALtuZBIZiNvwG4Mr4THcTbgqlh0Xy_HMYkyr7P1LZJRPyYAHo3Eienam_TcN6mmtqboN_RfOg" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section className="relative min-h-[70vh] flex flex-col items-center justify-start pt-24 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1F2A38] via-[#1F2A38]/90 to-[#1F2A38]"></div>
            <img alt="Autonomous Transit Network" className="w-full h-full object-cover opacity-30 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmeWq0Twvo26F1CGN12aca8oEvbQIVrAhSMLKoYJ1CjlrYCMMjqwVb0iWcbFH_I2RcLshHOnEDXenZK7PMCW154rkf9g0I5cccFW4ocwQMUWMojjV7zYdDXAc9uXMl4hyxXUGgtAXo-XsqGsNvWa-ndNCtJphQiKiVuzZg3hlS-RqC3V1LPCVChCljdCcEvAgF_5soSbJvHzcTk4hLGFgRSqynzCuuc9LUSJbMQE-yNbqNERAzi8lqXhd2JBLmbaWybCrzrycHBrg" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#3B82F6] animate-pulse"></span>
              <span className="font-manrope text-[10px] uppercase tracking-[0.2em] text-[#3B82F6] font-bold">System Status: Active</span>
            </div>
            <h1 className="font-display-lg text-display-lg text-white mb-6 leading-tight">
              The Pulse of <br />
              <span className="text-[#3B82F6]">Autonomous Logistics</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              Orchestrate high-velocity fleet movements with real-time AI dispatching and predictive demand modeling. Precision transit for the next generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="px-8 py-4 bg-[#3B82F6] text-white font-manrope font-bold rounded-lg shadow-lg shadow-[#3B82F6]/20 flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
                Launch Command Center
                <span className="material-symbols-outlined">rocket_launch</span>
              </Link>
              <button className="px-8 py-4 bg-transparent border border-[#4A5568] text-white font-manrope font-bold rounded-lg hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                View Operational Specs
                <span className="material-symbols-outlined">description</span>
              </button>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8 glass-card rounded-xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6">
                <span className="material-symbols-outlined text-[#3B82F6] text-4xl opacity-20">auto_awesome</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-white mb-4">AI Demand Modeling</h3>
              <p className="font-body-md text-body-md text-slate-400 mb-8 max-w-md">
                Our neural core predicts passenger surges 45 minutes before they occur, automatically repositioning your autonomous fleet for zero-wait performance.
              </p>
              <div className="h-48 w-full bg-[#1F2A38] rounded border border-[#4A5568]/30 p-4">
                <div className="flex items-end justify-between h-full gap-2">
                  <div className="w-full bg-[#3B82F6]/20 border-t border-[#3B82F6] h-[40%] rounded-t-sm"></div>
                  <div className="w-full bg-[#3B82F6]/20 border-t border-[#3B82F6] h-[65%] rounded-t-sm"></div>
                  <div className="w-full bg-[#3B82F6]/40 border-t-2 border-[#3B82F6] h-[90%] rounded-t-sm relative">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-[10px] px-2 py-0.5 rounded text-white font-bold">PEAK</div>
                  </div>
                  <div className="w-full bg-[#3B82F6]/20 border-t border-[#3B82F6] h-[55%] rounded-t-sm"></div>
                  <div className="w-full bg-[#3B82F6]/20 border-t border-[#3B82F6] h-[30%] rounded-t-sm"></div>
                  <div className="w-full bg-[#3B82F6]/20 border-t border-[#3B82F6] h-[45%] rounded-t-sm"></div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 glass-card rounded-xl p-8 border-l-4 border-[#3B82F6]">
              <div className="mb-6">
                <span className="material-symbols-outlined text-[#3B82F6] text-3xl">route</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-white mb-3">Real-time Routing</h3>
              <p className="font-label-md text-label-md text-slate-400 mb-6">
                Dynamic mesh network topology for vehicle-to-vehicle traffic mitigation.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-[#3B82F6] text-sm">check_circle</span>
                  Latent Path Optimization
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-[#3B82F6] text-sm">check_circle</span>
                  Collision Vector Analysis
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-300">
                  <span className="material-symbols-outlined text-[#3B82F6] text-sm">check_circle</span>
                  Energy-Grid Syncing
                </li>
              </ul>
            </div>
            <div className="md:col-span-4 glass-card rounded-xl p-8">
              <span className="material-symbols-outlined text-tertiary text-3xl mb-4">query_stats</span>
              <h4 className="font-headline-sm text-headline-sm text-white mb-2">Predictive Labs</h4>
              <p className="font-body-md text-body-md text-slate-400">Sandbox environment for stress-testing urban transit scenarios with synthetic population data.</p>
            </div>
            <div className="md:col-span-4 glass-card rounded-xl p-8">
              <span className="material-symbols-outlined text-primary text-3xl mb-4">verified_user</span>
              <h4 className="font-headline-sm text-headline-sm text-white mb-2">Safety Protocols</h4>
              <p className="font-body-md text-body-md text-slate-400">Layer-7 security encryption for all vehicle communications and passenger biometric data.</p>
            </div>
            <div className="md:col-span-4 glass-card rounded-xl p-8">
              <span className="material-symbols-outlined text-secondary text-3xl mb-4">eco</span>
              <h4 className="font-headline-sm text-headline-sm text-white mb-2">Sustainability</h4>
              <p className="font-body-md text-body-md text-slate-400">Achieve carbon-neutral transit goals through automated load balancing and peak-shaving energy use.</p>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#34495E]/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
              <div>
                <h2 className="font-display-lg text-display-lg text-white mb-6">Operational Intelligence <span className="text-[#3B82F6]">at Scale.</span></h2>
                <p className="font-body-lg text-body-lg text-slate-400 mb-8">
                  SlateTransit provides the unified dashboard for fleet managers to monitor, intervene, and optimize autonomous networks across entire metropolitan zones.
                </p>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-[#3B82F6]/10 flex items-center justify-center rounded border border-[#3B82F6]/30">
                      <span className="material-symbols-outlined text-[#3B82F6]">hub</span>
                    </div>
                    <div>
                      <span className="block text-white font-bold font-manrope">Unified Fleet Hub</span>
                      <span className="text-slate-400 text-sm">Control thousands of units from a single low-latency interface.</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-[#3B82F6]/10 flex items-center justify-center rounded border border-[#3B82F6]/30">
                      <span className="material-symbols-outlined text-[#3B82F6]">history_toggle_off</span>
                    </div>
                    <div>
                      <span className="block text-white font-bold font-manrope">Wait Intelligence</span>
                      <span className="text-slate-400 text-sm">Reduce average passenger wait times by 64% through predictive staging.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#3B82F6] to-transparent opacity-20 blur-xl group-hover:opacity-30 transition-all"></div>
                <div className="relative glass-card rounded-2xl overflow-hidden hud-border">
                  <img alt="System Dashboard" className="w-full aspect-video object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG6GM0S19dDJ0Ft-8__vafbZTT5_ilVctIDG6gb0UQhtGPy2QeBL37sHUin5cn5ldHACh3R6FxSGJibSo1TONzf29lekeTCAgsm0Q-yKYX4r_RMTRMCnuxcRuphz1xJxu-oxScpeitH8MWJPAOg_kKSl0wPwgjdpyYnFpgAI7QUU-eBKc8BDiZ3QtKDT15pabJRfPa-rQMXS-o5LK2gCuUTXfZOu3VUgFmDqfHpj1jBHLxE8dLAZbCVRb_VqrLvtNXoc2nSfnIB7A" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A38] to-transparent opacity-40"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono text-[#3B82F6] uppercase tracking-widest border border-[#3B82F6]/30">
                      Live Stream: Node_042
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>
            <h2 className="font-display-lg text-display-lg text-white mb-6">Ready to Optimize?</h2>
            <p className="font-body-lg text-body-lg text-slate-400 mb-10">
              Join the ranks of modern metropolitan authorities leveraging SlateTransit for a cleaner, faster urban future.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-5 bg-[#3B82F6] text-white font-manrope font-extrabold rounded-lg hover:opacity-90 active:scale-95 transition-all">
                Request System Demo
              </button>
              <button className="px-10 py-5 bg-white/5 border border-[#4A5568] text-white font-manrope font-extrabold rounded-lg hover:bg-white/10 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1F2A38] border-t border-[#4A5568]/20 py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-white font-black tracking-tighter text-sm font-manrope">SlateTransit</span>
            <span className="font-manrope text-[10px] text-slate-500 uppercase tracking-widest">Autonomous Ops Hub</span>
          </div>
          <div className="flex gap-8">
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4" href="#">Network Status</a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4" href="#">Security Docs</a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4" href="#">Privacy</a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4" href="#">API Support</a>
          </div>
          <span className="font-manrope text-[10px] text-slate-500">© 2024 Slate & Signal Transportation Systems. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
