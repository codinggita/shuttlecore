import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const SignupPage = () => {
  const { theme } = useTheme();
  return (
    <div className="bg-[var(--background)] text-[var(--text-main)] font-sans min-h-screen flex flex-col transition-colors duration-300">
      {/* TopAppBar */}
      <header className="bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)] flex justify-between items-center px-6 h-16 w-full fixed top-0 z-50 transition-colors duration-300">
        <Link to="/" className="text-xl font-black tracking-tighter uppercase">
          ShuttleCore
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-6 w-[1px] bg-[var(--border)] mx-2"></div>
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest hidden md:inline">Already have an account?</span>
          <Link to="/login" className="text-sm font-bold text-sky-500 hover:bg-sky-500/5 px-4 py-2 rounded-xl transition-all">LOG IN</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: Visual Area */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-between p-10 dashboard-card relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                alt="Futuristic autonomous transit hub"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFmuPJ9wQUXrH1hg6X9KdMy8qosmOn3G-yBc9WY4Lx9pmcvGKh8NqAz6xrn8aoWpJaVWRgO2tyrE6K5844hKurT9TDxswyYMtQyl94jW8tkmwVdQzQv90I4ZF8Jt7rIaMlNN8aWbwWa1cf2LQeMTOr14p-iIZM5NXKbTfUrqlj5pAjdQKYGr7AcYzMcWZ0mT6h-WFpA_YkFoByGfOCJt2YPqXUX46wYhC2xlcSRAXLu9ar0N9MnsaTVNTt6bB7FSS_Q3Ebrv0suNk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10">
              <div className="mb-6">
                <span className="inline-block bg-sky-500/10 text-sky-500 border border-sky-500/30 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  Operator Tier
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                Master the Fleet <br />
                Flow.
              </h1>
              <p className="text-sm text-slate-200 opacity-80 max-w-xs">
                Join the leading network for autonomous transit logistics and predictive dispatch management.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
                  <span className="material-symbols-outlined text-sky-500">auto_awesome</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AI-Driven Optimization</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Predictive routing enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
                  <span className="material-symbols-outlined text-sky-500">verified_user</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Secure Fleet Protocols</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Enterprise-grade security</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Flow */}
          <div className="lg:col-span-7 bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 md:p-12 transition-colors duration-300">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-[var(--text-main)] mb-2">Create Fleet Account</h2>
              <div className="flex items-center gap-2">
                <div className="h-1 flex-grow bg-sky-500 rounded-full"></div>
                <div className="h-1 flex-grow bg-[var(--surface-light)] rounded-full"></div>
                <div className="h-1 flex-grow bg-[var(--surface-light)] rounded-full"></div>
              </div>
              <p className="text-[var(--text-muted)] text-[10px] mt-2 uppercase tracking-[0.2em] font-bold">STEP 1: CORPORATE IDENTITY</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase ml-1">First Name</label>
                  <input
                    className="w-full bg-[var(--surface-light)] border border-[var(--border)] focus:border-sky-500 text-[var(--text-main)] p-3.5 rounded-xl transition-all focus:outline-none"
                    placeholder="John"
                    type="text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase ml-1">Last Name</label>
                  <input
                    className="w-full bg-[var(--surface-light)] border border-[var(--border)] focus:border-sky-500 text-[var(--text-main)] p-3.5 rounded-xl transition-all focus:outline-none"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase ml-1">Work Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-lg">mail</span>
                  <input
                    className="w-full bg-[var(--surface-light)] border border-[var(--border)] focus:border-sky-500 text-[var(--text-main)] pl-12 p-3.5 rounded-xl transition-all focus:outline-none"
                    placeholder="j.doe@company-transit.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase ml-1">Fleet Organization Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-lg">corporate_fare</span>
                  <input
                    className="w-full bg-[var(--surface-light)] border border-[var(--border)] focus:border-sky-500 text-[var(--text-main)] pl-12 p-3.5 rounded-xl transition-all focus:outline-none"
                    placeholder="Global Transit Systems"
                    type="text"
                  />
                </div>
              </div>
              <div className="pt-2">
                <div className="flex items-start gap-4">
                  <div className="flex items-center h-5">
                    <input
                      className="w-5 h-5 rounded border-[var(--border)] bg-[var(--surface-light)] text-sky-500 focus:ring-sky-500 transition-colors"
                      type="checkbox"
                    />
                  </div>
                  <div className="text-sm">
                    <label className="text-[var(--text-muted)] leading-relaxed text-xs font-medium">
                      I agree to the <a className="text-sky-500 font-bold hover:underline" href="#">Service Level Agreement</a> and <a className="text-sky-500 font-bold hover:underline" href="#">Data Processing Addendum</a> for autonomous operations.
                    </label>
                  </div>
                </div>
              </div>
              <div className="pt-6 flex flex-col md:flex-row gap-6 items-center justify-between">
                <Link to="/" className="order-2 md:order-1 flex items-center gap-2 text-[var(--text-muted)] hover:text-sky-500 transition-colors text-[10px] font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  CANCEL
                </Link>
                <button
                  className="order-1 md:order-2 w-full md:w-auto btn-primary !px-8 !py-4 flex items-center justify-center gap-2"
                  type="submit"
                >
                  PROCEED TO VALIDATION
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </form>
            <div className="mt-10 pt-8 border-t border-[var(--border)]">
              <p className="text-center text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] font-bold">
                SECURED BY SHUTTLECORE ENCRYPTION
              </p>
              <div className="flex justify-center gap-8 mt-4">
                <span className="material-symbols-outlined text-[var(--text-muted)] text-xl opacity-50">security</span>
                <span className="material-symbols-outlined text-[var(--text-muted)] text-xl opacity-50">vpn_lock</span>
                <span className="material-symbols-outlined text-[var(--text-muted)] text-xl opacity-50">verified</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[var(--background)] border-t border-[var(--border)] py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-bold">
            © 2024 ShuttleCore Logistics Systems.
          </div>
          <div className="flex gap-8">
            <a className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase tracking-[0.2em] font-bold" href="#">Status</a>
            <a className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase tracking-[0.2em] font-bold" href="#">Security</a>
            <a className="text-[10px] text-[var(--text-muted)] hover:text-sky-500 transition-colors uppercase tracking-[0.2em] font-bold" href="#">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;
