import React from 'react';

const LandingPage = () => {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 max-w-full bg-[#1F2A38]/80 backdrop-blur-md z-50 border-b border-white/10 font-manrope antialiased tracking-tight">
        <div className="text-xl font-bold tracking-tighter text-slate-100 uppercase">SignalFlow</div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-blue-400 border-b-2 border-blue-500 pb-1 hover:text-blue-300 transition-all duration-200" href="#">Network</a>
          <a className="text-slate-400 font-medium hover:text-blue-300 hover:bg-white/5 px-3 py-1 rounded transition-all duration-200" href="#">Intelligence</a>
          <a className="text-slate-400 font-medium hover:text-blue-300 hover:bg-white/5 px-3 py-1 rounded transition-all duration-200" href="#">Fleet</a>
          <a className="text-slate-400 font-medium hover:text-blue-300 hover:bg-white/5 px-3 py-1 rounded transition-all duration-200" href="#">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 font-medium hover:text-white transition-colors cursor-pointer px-4 py-2">Login</button>
          <button className="bg-electric-blue text-white font-semibold px-6 py-2 rounded-lg active:scale-95 transition-transform hover:brightness-110">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 hero-gradient">
        <div className="container mx-auto px-margin grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-6 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue mb-6">
              <span className="material-symbols-outlined text-sm">auto_graph</span>
              <span className="font-label-sm uppercase tracking-widest">Autonomous Transit Protocol v2.4</span>
            </div>
            <h1 className="font-display-lg text-display-lg mb-6 leading-tight">
              The Pulse of <br/><span className="text-electric-blue">Smart Mobility</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-8">
              SignalFlow orchestrates high-velocity transit networks with predictive AI, eliminating bottlenecks before they form. Experience the next generation of urban routing.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-electric-blue text-white font-headline-sm px-8 py-4 rounded-xl hover:shadow-[0_0_20px_rgba(0,168,232,0.4)] transition-all">Book Demo</button>
              <button className="hud-border bg-white/5 text-white font-headline-sm px-8 py-4 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                System Status
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-square glass-panel rounded-full p-8 flex items-center justify-center border-electric-blue/20">
              <div className="absolute inset-0 border-2 border-dashed border-white/5 rounded-full animate-[spin_60s_linear_infinite]"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl">
                <img alt="Digital City Map" className="w-full h-full object-cover opacity-60 mix-blend-screen scale-110" data-alt="Futuristic glowing 3D map of a smart city at night with digital neon traffic routes and data points over a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnKLOoNkdZScFQZXUsDeIfQuTXV0wG8LZmj9rr01o-d5i3v4MUkBxe0KurmXTObOE_6vQAfrjSAVRxpzHukgI6s9FmJtN0XsiaTwZW1h8o8LEEGpRT-aZsUr0LUVzNsm26xVBSqAx9hvHy_LVDDIy-uopIEidAvjMxFwSMxHvXZBNgVJ48ntEfYy_G2d0GzAB3PRwm72Q8UUbQ4HtllsW6lFBLLVNCROjkAoniY7wUY_YfmVN-K7gxF1HtUH4h7PaM43Of-uGs67Y"/>
                <div className="absolute inset-0 bg-gradient-to-t from-deep-slate via-transparent to-transparent"></div>
              </div>
              {/* HUD Elements */}
              <div className="absolute top-0 right-0 glass-panel p-4 rounded-xl hud-border translate-x-4 -translate-y-4">
                <p className="text-xs text-on-surface-variant uppercase font-label-sm">Active Nodes</p>
                <p className="text-2xl font-bold text-electric-blue">12,482</p>
              </div>
              <div className="absolute bottom-12 left-0 glass-panel p-4 rounded-xl hud-border -translate-x-8">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-electric-blue">electric_bolt</span>
                  <div>
                    <p className="text-xs text-on-surface-variant uppercase font-label-sm">System Efficiency</p>
                    <p className="text-lg font-bold text-white">99.98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Value Props - Bento Grid */}
      <section className="py-xl bg-surface-container">
        <div className="container mx-auto px-margin">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md mb-4 text-white">Engineered for Velocity</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Our platform integrates deep learning with real-time telemetry to solve the most complex logistics challenges in modern transit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <div className="glass-panel p-8 rounded-2xl hud-border hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-electric-blue/10 rounded-lg flex items-center justify-center text-electric-blue mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>timer</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Reduced Wait Times</h3>
              <p className="text-on-surface-variant leading-relaxed">Dynamic re-routing algorithms reduce passenger wait times by 42% through intelligent vehicle distribution and load balancing.</p>
            </div>
            {/* Card 2 */}
            <div className="glass-panel p-8 rounded-2xl border-electric-blue/30 bg-electric-blue/5 hover:bg-electric-blue/10 transition-colors group">
              <div className="w-12 h-12 bg-electric-blue rounded-lg flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>psychology</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">AI-Predictive Demand</h3>
              <p className="text-on-surface-variant leading-relaxed">Anticipate surge requirements hours in advance. Our neural engine processes historical trends to position assets perfectly.</p>
            </div>
            {/* Card 3 */}
            <div className="glass-panel p-8 rounded-2xl hud-border hover:bg-white/10 transition-colors group">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>eco</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Carbon Neutral Commuting</h3>
              <p className="text-on-surface-variant leading-relaxed">Optimize route energy consumption. Every path calculated by SignalFlow prioritizes minimal ecological footprint without sacrificing speed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Tools Section - Asymmetric Layout */}
      <section className="py-xl overflow-hidden">
        <div className="container mx-auto px-margin">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-electric-blue/10 blur-[100px] rounded-full"></div>
              <div className="relative glass-panel p-6 rounded-3xl hud-border overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-xs font-label-md text-white/40 ml-4">FLEET_CONTROL_v4.0</span>
                  </div>
                  <span className="material-symbols-outlined text-white/30">settings</span>
                </div>
                <img alt="Fleet Dashboard Interface" className="rounded-xl border border-white/5 opacity-80" data-alt="Close up of a complex data visualization dashboard showing real-time logistics graphs, dark UI with electric blue and orange data lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoVNM1MwCEtmVvK4RXPMyJQXmqDTPu_memERDLcVb6qGjPH3IsyDFJrXWLPNryR4S0E9_CzyCsBCoAEBNw-gnPdi_oJXENvUTE2NrrhJ0UIIEt5_dU-15pKhzZTtqyustk4okyNSa4bEtacd5crXsPScREtND3ns41bXss8_2qFaDqil5f9q-yAAeAhO-EGndvaQIkSu6804SCMepudVMfZ4Wr-vj4JkbnMIMeaplq6_ix75IA7AMsle4x5_26Aoq9SHlck8qtyPU"/>
                <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                  <div className="min-w-[140px] bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-[10px] uppercase text-on-surface-variant mb-1">Response</p>
                    <p className="text-lg font-bold text-electric-blue">14ms</p>
                  </div>
                  <div className="min-w-[140px] bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-[10px] uppercase text-on-surface-variant mb-1">Active UAVs</p>
                    <p className="text-lg font-bold text-white">432</p>
                  </div>
                  <div className="min-w-[140px] bg-white/5 p-3 rounded-lg border border-white/10">
                    <p className="text-[10px] uppercase text-on-surface-variant mb-1">Throughput</p>
                    <p className="text-lg font-bold text-white">8.4 GB/s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-electric-blue font-label-md tracking-widest uppercase mb-4 block">Command &amp; Control</span>
              <h2 className="font-headline-md text-headline-md text-white mb-6">Total Fleet Visibility In a Single Interface</h2>
              <p className="font-body-lg text-on-surface-variant mb-10 leading-relaxed">
                Managers deserve more than just data; they need intelligence. SignalFlow transforms raw telematics into actionable insights, allowing you to intercept delays before they occur.
              </p>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-electric-blue mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-white">Live Telemetry Streaming</h4>
                    <p className="text-sm text-on-surface-variant">Millisecond latency updates from every node in your network.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-electric-blue mt-1">check_circle</span>
                  <div>
                    <h4 className="font-bold text-white">Auto-Pilot Dispatch</h4>
                    <p className="text-sm text-on-surface-variant">AI-managed shift transitions and battery management optimizations.</p>
                  </div>
                </li>
              </ul>
              <button className="mt-12 group flex items-center gap-3 text-electric-blue font-bold">
                Explore Control Center
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Operations Map */}
      <section className="py-xl bg-[#141218]">
        <div className="container mx-auto px-margin">
          <div className="glass-panel rounded-[2rem] overflow-hidden hud-border flex flex-col md:flex-row h-[600px]">
            <div className="w-full md:w-1/3 p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Operational Footprint</h3>
                <p className="text-on-surface-variant mb-8">Monitoring active transit zones across global metropolitan hubs.</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="font-medium">San Francisco</span>
                    <span className="text-green-400 font-label-sm">OPTIMAL</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="font-medium">London HQ</span>
                    <span className="text-green-400 font-label-sm">OPTIMAL</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-electric-blue/20 border border-electric-blue/30 rounded-xl">
                    <span className="font-medium text-electric-blue">Singapore Hub</span>
                    <span className="animate-pulse flex h-2 w-2 rounded-full bg-electric-blue"></span>
                  </div>
                </div>
              </div>
              <div className="pt-8">
                <p className="text-xs text-on-surface-variant mb-2">NETWORK LOAD</p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[74%] h-full bg-electric-blue"></div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 relative">
              <img alt="City Network Map" className="w-full h-full object-cover grayscale brightness-50 contrast-125" data-alt="Wide high-angle view of a suspension bridge and city skyline at night with dark blue color palette and glowing light trails" data-location="San Francisco" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjBpMrso0hrIwdduRG6dQPhgqoD1Jvu1VLasJdfoeEUn-VBC2TiXTMvLu3V53eZS74LBH6Sa7GsUHNgQ73JsBkqlVBlxOlMlugg2v1f3UsyW6LkAesKs1DnSEpHPsu46V7dpj1pqyrfMzvWffXwATGG0hli4jaQjQpB9iwWxex7XcaudPBfhRGrdMHMAk8yZp4PtfugJJCzs99UQKfptJH6_5CDvcE3CNV1j_AKkVCgE2B7P4_dxUxupjz3aihXD5750PQd4cdYyo"/>
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none"></div>
              {/* Decorative Map Markers */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-electric-blue rounded-full shadow-[0_0_15px_#00A8E8]"></div>
              <div className="absolute bottom-1/2 right-1/4 w-3 h-3 bg-electric-blue/50 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#1F2A38] border-t border-slate-800 font-manrope text-sm tracking-wide">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-lg font-black text-slate-300">SignalFlow</div>
          <p className="text-slate-500">© 2024 SignalFlow Transit Systems. Secure Autonomous Routing.</p>
        </div>
        <div className="flex gap-8">
          <a className="text-slate-500 hover:text-orange-400 transition-colors cursor-pointer" href="#">Privacy Protocol</a>
          <a className="text-slate-500 hover:text-orange-400 transition-colors cursor-pointer" href="#">Service Terms</a>
          <a className="text-slate-500 hover:text-orange-400 transition-colors cursor-pointer" href="#">Fleet API</a>
          <a className="text-slate-500 hover:text-orange-400 transition-colors cursor-pointer" href="#">Support</a>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">hub</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-sm">lan</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
