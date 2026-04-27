import React from 'react';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col dark">
      {/* TopAppBar */}
      <header className="bg-[#1F2A38]/80 backdrop-blur-xl border-b border-[#4A5568]/30 flex justify-between items-center px-6 h-16 w-full fixed top-0 z-50">
        <Link to="/" className="text-lg font-black tracking-tighter text-white font-display-lg">
          ShuttleCore
        </Link>
        <div className="flex items-center gap-4">
          <span className="font-label-sm text-slate-400">ALREADY HAVE AN ACCOUNT?</span>
          <Link to="/login" className="font-label-md text-[#3B82F6] hover:bg-white/5 px-4 py-2 transition-colors">LOG IN</Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-gutter">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          {/* Left Side: Visual/Context Area */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-between p-margin glass-panel rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
                alt="Futuristic autonomous transit hub at night with cyan neon lights reflecting on polished steel surfaces and glass partitions"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFmuPJ9wQUXrH1hg6X9KdMy8qosmOn3G-yBc9WY4Lx9pmcvGKh8NqAz6xrn8aoWpJaVWRgO2tyrE6K5844hKurT9TDxswyYMtQyl94jW8tkmwVdQzQv90I4ZF8Jt7rIaMlNN8aWbwWa1cf2LQeMTOr14p-iIZM5NXKbTfUrqlj5pAjdQKYGr7AcYzMcWZ0mT6h-WFpA_YkFoByGfOCJt2YPqXUX46wYhC2xlcSRAXLu9ar0N9MnsaTVNTt6bB7FSS_Q3Ebrv0suNk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2A38] via-transparent to-transparent"></div>
            </div>
            <div className="relative z-10">
              <div className="mb-lg">
                <span className="inline-block bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  Operator Tier
                </span>
              </div>
              <h1 className="font-display-lg text-white mb-md leading-tight text-4xl font-bold">
                Master the Fleet <br />
                Flow.
              </h1>
              <p className="font-body-md text-slate-400 max-w-xs">
                Join the leading network for autonomous transit logistics and predictive dispatch management.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-sm">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center border border-[#3B82F6]/30">
                  <span className="material-symbols-outlined text-[#3B82F6]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    auto_awesome
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-white">AI-Driven Optimization</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Predictive routing engine enabled</p>
                </div>
              </div>
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center border border-[#3B82F6]/30">
                  <span className="material-symbols-outlined text-[#3B82F6]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                </div>
                <div>
                  <p className="font-label-md text-white">Secure Fleet Protocols</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Enterprise-grade security docs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Flow */}
          <div className="lg:col-span-7 bg-surface-container-low border border-[#4A5568]/30 rounded-xl p-margin md:p-xl">
            <div className="mb-xl">
              <h2 className="font-headline-md text-on-background mb-sm text-2xl font-bold">Create Fleet Account</h2>
              <div className="flex items-center gap-xs">
                <div className="h-1 flex-grow bg-[#3B82F6] rounded-full"></div>
                <div className="h-1 flex-grow bg-surface-container-highest rounded-full"></div>
                <div className="h-1 flex-grow bg-surface-container-highest rounded-full"></div>
              </div>
              <p className="text-slate-500 font-label-sm mt-sm uppercase tracking-wider text-xs font-semibold">STEP 1: CORPORATE IDENTITY</p>
            </div>
            <form className="space-y-lg" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                <div className="space-y-xs">
                  <label className="font-label-md text-on-surface-variant ml-1 text-sm font-medium">First Name</label>
                  <input
                    className="w-full recessed-input border-0 border-b-2 border-transparent focus:border-[#3B82F6] focus:ring-0 text-white p-md rounded-lg transition-all font-body-md"
                    placeholder="John"
                    type="text"
                  />
                </div>
                <div className="space-y-xs">
                  <label className="font-label-md text-on-surface-variant ml-1 text-sm font-medium">Last Name</label>
                  <input
                    className="w-full recessed-input border-0 border-b-2 border-transparent focus:border-[#3B82F6] focus:ring-0 text-white p-md rounded-lg transition-all font-body-md"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-on-surface-variant ml-1 text-sm font-medium">Work Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">mail</span>
                  <input
                    className="w-full recessed-input border-0 border-b-2 border-transparent focus:border-[#3B82F6] focus:ring-0 text-white pl-12 p-md rounded-lg transition-all font-body-md"
                    placeholder="j.doe@company-transit.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-xs">
                <label className="font-label-md text-on-surface-variant ml-1 text-sm font-medium">Fleet Organization Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg">corporate_fare</span>
                  <input
                    className="w-full recessed-input border-0 border-b-2 border-transparent focus:border-[#3B82F6] focus:ring-0 text-white pl-12 p-md rounded-lg transition-all font-body-md"
                    placeholder="Global Transit Systems"
                    type="text"
                  />
                </div>
              </div>
              <div className="pt-md">
                <div className="flex items-start gap-md group">
                  <div className="flex items-center h-5">
                    <input
                      className="w-5 h-5 rounded border-outline-variant bg-surface-container-highest text-[#3B82F6] focus:ring-[#3B82F6] transition-colors"
                      type="checkbox"
                    />
                  </div>
                  <div className="text-sm">
                    <label className="font-body-md text-on-surface-variant leading-relaxed text-sm">
                      I agree to the <a className="text-[#3B82F6] hover:underline" href="#">Service Level Agreement</a> and <a className="text-[#3B82F6] hover:underline" href="#">Data Processing Addendum</a> for autonomous operations.
                    </label>
                  </div>
                </div>
              </div>
              <div className="pt-lg flex flex-col md:flex-row gap-md items-center justify-between">
                <Link to="/" className="order-2 md:order-1 flex items-center gap-sm text-slate-400 hover:text-white transition-colors font-label-md text-sm font-medium uppercase tracking-wider">
                  <span className="material-symbols-outlined">arrow_back</span>
                  CANCEL
                </Link>
                <button
                  className="order-1 md:order-2 w-full md:w-auto bg-[#3B82F6] text-white px-xl py-md rounded-lg font-label-md font-bold hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-md shadow-lg shadow-[#3B82F6]/20"
                  type="submit"
                >
                  PROCEED TO VALIDATION
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </form>
            <div className="mt-xl pt-lg border-t border-[#4A5568]/20">
              <p className="text-center text-slate-500 font-label-sm text-xs uppercase tracking-widest">
                SECURED BY SHUTTLECORE ENCRYPTION PROTOCOLS
              </p>
              <div className="flex justify-center gap-lg mt-md">
                <span className="material-symbols-outlined text-slate-600 text-xl">security</span>
                <span className="material-symbols-outlined text-slate-600 text-xl">vpn_lock</span>
                <span className="material-symbols-outlined text-slate-600 text-xl">verified</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#1F2A38] border-t border-[#4A5568]/20 py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-manrope text-[10px] text-slate-500 uppercase tracking-widest">
            © 2024 ShuttleCore Logistics Systems. All rights reserved.
          </div>
          <div className="flex gap-lg">
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4 uppercase tracking-widest" href="#">
              Network Status
            </a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4 uppercase tracking-widest" href="#">
              Security Docs
            </a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4 uppercase tracking-widest" href="#">
              Privacy
            </a>
            <a className="font-manrope text-[10px] text-slate-500 hover:text-white transition-colors underline-offset-4 uppercase tracking-widest" href="#">
              API Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignupPage;
