import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-y-auto bg-background text-on-background font-body-md selection:bg-[#3B82F6] selection:text-white">
      {/* Background Visuals */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2A38] to-background"></div>
        {/* Decorative HUD Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6] blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary blur-[120px] rounded-full"></div>
        </div>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center py-12 px-6 relative z-10">
        {/* Login Container */}
        <main className="w-full max-w-5xl grid md:grid-cols-12 bg-surface-container-lowest/50 backdrop-blur-3xl rounded-2xl overflow-hidden border border-outline-variant/30 shadow-2xl">
          
          {/* Left Side: Visual Area */}
          <section className="hidden md:flex md:col-span-5 relative overflow-hidden group">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Autonomous Transit Terminal"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHeOA38j3WXs2uYmr0uV8u71GDdp4OHanlZKPOOnq7TJK7e6JjprEf0mQrsciVE_oB32GwkjYXjsHwdemGiUYw-Blimu52-x23FmOCF_iB0mrjWuOXzwypPHdLzJdqcl9FrgmxjgK2X-A1_smQpn1CC9irqYK9JtjD5OGfr5YxEwq0bUizqGoKV-vzmzfAm2qqFzy6UUlQ_bAcMlnr-Lr75VzwcYnN3eUJnQVqbcv5-rDl7EdlHdgOdhAqdWHwyyNydy9kibedrV4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141218] via-[#141218]/40 to-transparent"></div>
            
            <div className="relative z-10 p-10 flex flex-col justify-between h-full">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="material-symbols-outlined text-[#3B82F6] text-3xl">route</span>
                <span className="text-xl font-black tracking-tighter text-white uppercase">SlateTransit</span>
              </Link>
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/20 border border-[#3B82F6]/30">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Fleet Active</span>
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">
                  The Command <br/> Core of Logistics
                </h2>
                <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
                  Precision-engineered authentication for the next generation of autonomous transit systems.
                </p>
              </div>
            </div>
          </section>

          {/* Right Side: Form Side */}
          <section className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-[400px] mx-auto w-full space-y-8">
              {/* Mobile Logo */}
              <div className="md:hidden text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#3B82F6] text-3xl">route</span>
                  <span className="text-xl font-black text-white uppercase tracking-tighter">SlateTransit</span>
                </Link>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Operator Login</h3>
                <p className="text-sm text-slate-400">Enter your credentials to access the terminal.</p>
              </div>

              {/* SSO Options */}
              <button className="w-full h-12 glass-panel rounded-xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors border border-outline-variant/20 group">
                <img 
                  alt="Google Logo" 
                  className="w-5 h-5" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj2GLJs32EUXUIlwGcha56VS5fEF0GfwiYoFZ1tXTISP_MHWFU09Q8zg_D4jL4q-eu2hUqQbuvs7VmOS1SsnC6Bm8BTQ8FYub03xMKm24UFa81iJQGt0JQ6dfOrc8EBwJVFY8a4c-ieb-TO3Yln7BzSo34UYX6OT1jhWt_Lu2jaJblbdPZwIa5SiaM1rjhMXfyFzk3mmZHG9COqvt6SIl0NHv5p-3EibQEWsl_IojJZdy9g-tegTCbKAwhIyPP3IECNnCq-wWsQrc" 
                />
                <span className="text-sm font-medium text-white">Continue with Enterprise SSO</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/10"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
                  <span className="bg-[#141218]/50 backdrop-blur-sm px-4 text-slate-500">Direct Access</span>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 tracking-widest flex items-center gap-2 uppercase">
                      <span className="material-symbols-outlined text-sm">person</span>
                      System Identifier
                    </label>
                    <input 
                      className="w-full h-12 recessed-input border-b-2 border-outline-variant/20 focus:border-[#3B82F6] text-white px-4 rounded-t-xl transition-all focus:outline-none placeholder:text-slate-700" 
                      placeholder="fleet_admin@slate.transit" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-500 tracking-widest flex items-center gap-2 uppercase">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        Secure Key
                      </label>
                      <a className="text-[10px] text-[#3B82F6] font-bold hover:underline" href="#">FORGOT?</a>
                    </div>
                    <input 
                      className="w-full h-12 recessed-input border-b-2 border-outline-variant/20 focus:border-[#3B82F6] text-white px-4 rounded-t-xl transition-all focus:outline-none placeholder:text-slate-700" 
                      placeholder="••••••••••••" 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input 
                    className="w-4 h-4 rounded-sm bg-surface-container-highest border-outline-variant/30 text-[#3B82F6] focus:ring-[#3B82F6] ring-offset-background cursor-pointer" 
                    id="mfa" 
                    type="checkbox" 
                  />
                  <label className="text-xs text-slate-400 cursor-pointer" htmlFor="mfa">Remember device for 30 days</label>
                </div>

                <div className="space-y-4 pt-2">
                  <button 
                    className="w-full h-14 bg-[#3B82F6] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-[#3B82F6]/20" 
                    type="submit"
                  >
                    AUTHENTICATE SYSTEM
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <div className="text-center">
                    <Link to="/" className="text-[10px] text-slate-500 hover:text-[#3B82F6] transition-colors font-bold uppercase tracking-widest border border-slate-500/10 px-6 py-2 rounded-lg hover:bg-white/5 inline-flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">arrow_back</span>
                      BACK TO HOME
                    </Link>
                  </div>
                </div>
              </form>

              {/* Footer Links */}
              <div className="text-center pt-6 border-t border-outline-variant/5">
                <p className="text-xs text-slate-400">
                  Don't have an account? <Link className="text-[#3B82F6] font-bold hover:underline" to="/signup">Create an account</Link>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-surface-container-lowest/80 backdrop-blur-md border-t border-[#4A5568]/10 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <span className="font-manrope text-[10px] text-slate-500 uppercase tracking-widest">© 2024 Slate & Signal Transportation Systems. All rights reserved.</span>
          <div className="flex gap-6">
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors" href="#">Security Docs</a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors" href="#">Privacy</a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors" href="#">API Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
