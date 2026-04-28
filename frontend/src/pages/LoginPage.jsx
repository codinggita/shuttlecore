import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LoginPage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-y-auto bg-[var(--background)] text-[var(--text-main)] font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300">
      {/* Background Visuals */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--surface-light)] to-[var(--background)]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 blur-[120px] rounded-full"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center py-12 px-6 relative z-10">
        <main className="w-full max-w-5xl grid md:grid-cols-12 bg-[var(--surface)]/50 backdrop-blur-3xl rounded-3xl overflow-hidden border border-[var(--border)] shadow-2xl">
          
          {/* Left Side: Visual Area */}
          <section className="hidden md:flex md:col-span-5 relative overflow-hidden group">
            <img 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              alt="Autonomous Transit Terminal"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHeOA38j3WXs2uYmr0uV8u71GDdp4OHanlZKPOOnq7TJK7e6JjprEf0mQrsciVE_oB32GwkjYXjsHwdemGiUYw-Blimu52-x23FmOCF_iB0mrjWuOXzwypPHdLzJdqcl9FrgmxjgK2X-A1_smQpn1CC9irqYK9JtjD5OGfr5YxEwq0bUizqGoKV-vzmzfAm2qqFzy6UUlQ_bAcMlnr-Lr75VzwcYnN3eUJnQVqbcv5-rDl7EdlHdgOdhAqdWHwyyNydy9kibedrV4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent"></div>
            
            <div className="relative z-10 p-10 flex flex-col justify-between h-full">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="material-symbols-outlined text-sky-500 text-3xl">route</span>
                <span className="text-xl font-black tracking-tighter text-white uppercase">ShuttleCore</span>
              </Link>
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Fleet Active</span>
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">
                  The Command <br/> Core of Logistics
                </h2>
                <p className="text-sm text-slate-200 max-w-xs leading-relaxed opacity-80">
                  Precision-engineered authentication for the next generation of autonomous transit systems.
                </p>
              </div>
            </div>
          </section>

          {/* Right Side: Form Side */}
          <section className="md:col-span-12 lg:col-span-7 p-6 md:p-12 flex flex-col justify-center">
            <div className="max-w-[400px] mx-auto w-full space-y-8">
              {/* Mobile Logo */}
              <div className="md:hidden text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2">
                  <span className="material-symbols-outlined text-sky-500 text-3xl">route</span>
                  <span className="text-xl font-black text-[var(--text-main)] uppercase tracking-tighter">ShuttleCore</span>
                </Link>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[var(--text-main)]">Operator Login</h3>
                <p className="text-sm text-[var(--text-muted)]">Enter your credentials to access the terminal.</p>
              </div>

              {/* SSO Options */}
              <button className="w-full h-12 bg-[var(--surface-light)] border border-[var(--border)] rounded-xl flex items-center justify-center gap-3 hover:bg-sky-500/5 transition-colors group">
                <img 
                  alt="Google Logo" 
                  className="w-5 h-5" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj2GLJs32EUXUIlwGcha56VS5fEF0GfwiYoFZ1tXTISP_MHWFU09Q8zg_D4jL4q-eu2hUqQbuvs7VmOS1SsnC6Bm8BTQ8FYub03xMKm24UFa81iJQGt0JQ6dfOrc8EBwJVFY8a4c-ieb-TO3Yln7BzSo34UYX6OT1jhWt_Lu2jaJblbdPZwIa5SiaM1rjhMXfyFzk3mmZHG9COqvt6SIl0NHv5p-3EibQEWsl_IojJZdy9g-tegTCbKAwhIyPP3IECNnCq-wWsQrc" 
                />
                <span className="text-sm font-medium text-[var(--text-main)]">Continue with Enterprise SSO</span>
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border)]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold">
                  <span className="bg-[var(--background)] px-4 text-[var(--text-muted)]">Direct Access</span>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest flex items-center gap-2 uppercase">
                      <span className="material-symbols-outlined text-sm">person</span>
                      System Identifier
                    </label>
                    <input 
                      className="w-full h-12 bg-[var(--surface-light)] border border-[var(--border)] focus:border-sky-500 text-[var(--text-main)] px-4 rounded-xl transition-all focus:outline-none placeholder:text-[var(--text-muted)] opacity-80 focus:opacity-100" 
                      placeholder="admin@shuttlecore.com" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest flex items-center gap-2 uppercase">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        Secure Key
                      </label>
                      <a className="text-[10px] text-sky-500 font-bold hover:underline" href="#">FORGOT?</a>
                    </div>
                    <input 
                      className="w-full h-12 bg-[var(--surface-light)] border border-[var(--border)] focus:border-sky-500 text-[var(--text-main)] px-4 rounded-xl transition-all focus:outline-none placeholder:text-[var(--text-muted)] opacity-80 focus:opacity-100" 
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
                    className="w-4 h-4 rounded-sm bg-[var(--surface-light)] border-[var(--border)] text-sky-500 focus:ring-sky-500 cursor-pointer" 
                    id="mfa" 
                    type="checkbox" 
                  />
                  <label className="text-xs text-[var(--text-muted)] cursor-pointer" htmlFor="mfa">Remember device for 30 days</label>
                </div>

                <div className="space-y-4 pt-2">
                  <button 
                    className="btn-primary w-full h-14 flex items-center justify-center gap-2 active:scale-[0.98]" 
                    type="submit"
                  >
                    AUTHENTICATE SYSTEM
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <div className="text-center">
                    <Link to="/" className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors font-bold uppercase tracking-widest border border-[var(--border)] px-6 py-2 rounded-xl hover:bg-sky-500/5 inline-flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">arrow_back</span>
                      BACK TO HOME
                    </Link>
                  </div>
                </div>
              </form>

              {/* Footer Links */}
              <div className="text-center pt-6 border-t border-[var(--border)]">
                <p className="text-xs text-[var(--text-muted)]">
                  Don't have an account? <Link className="text-sky-500 font-bold hover:underline" to="/signup">Create an account</Link>
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-[var(--surface)]/80 backdrop-blur-md border-t border-[var(--border)] py-6 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <span className="font-manrope text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">© 2024 ShuttleCore Logistics Systems.</span>
          <div className="flex gap-6">
            <a className="font-manrope text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase tracking-widest font-bold" href="#">Security Docs</a>
            <a className="font-manrope text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase tracking-widest font-bold" href="#">Privacy</a>
            <a className="font-manrope text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase tracking-widest font-bold" href="#">API Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
