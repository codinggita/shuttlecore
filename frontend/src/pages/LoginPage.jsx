import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";

const LoginPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("userProfile", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[var(--background)] text-[var(--text-main)] font-sans selection:bg-white selection:text-gray-900 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="icon-btn"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <span className="material-symbols-outlined">
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </motion.button>
      </div>

      {/* Background Visuals */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--surface-light)] to-[var(--background)]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.15, 0.1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 blur-[120px] rounded-full"
          ></motion.div>
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.1, 0.15],
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/30 blur-[120px] rounded-full"
          ></motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex items-center justify-center py-12 px-6 relative z-10">
        <motion.main
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-5xl grid md:grid-cols-12 bg-[var(--surface)]/50 backdrop-blur-3xl rounded-[32px] overflow-hidden border border-[var(--border)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          {/* Left Side: Visual Area */}
          <section className="hidden md:flex md:col-span-5 relative overflow-hidden group">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Autonomous Transit Terminal"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHeOA38j3WXs2uYmr0uV8u71GDdp4OHanlZKPOOnq7TJK7e6JjprEf0mQrsciVE_oB32GwkjYXjsHwdemGiUYw-Blimu52-x23FmOCF_iB0mrjWuOXzwypPHdLzJdqcl9FrgmxjgK2X-A1_smQpn1CC9irqYK9JtjD5OGfr5YxEwq0bUizqGoKV-vzmzfAm2qqFzy6UUlQ_bAcMlnr-Lr75VzwcYnN3eUJnQVqbcv5-rDl7EdlHdgOdhAqdWHwyyNydy9kibedrV4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/40 to-transparent"></div>

            <div className="relative z-10 p-12 flex flex-col justify-between h-full">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all backdrop-blur-md shadow-lg shadow-black/20">
                  <span className="material-symbols-outlined text-white text-2xl group-hover:rotate-12 transition-transform">
                    rocket_launch
                  </span>
                </div>
                <span className="text-2xl font-black tracking-tighter text-[var(--text-main)] uppercase transition-colors">
                  ShuttleCore
                </span>
              </Link>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] backdrop-blur-md"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="text-[10px] font-black text-[var(--text-main)] uppercase tracking-[0.2em]">
                    Fleet Core: Online
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-black text-[var(--text-main)] leading-[1.1] tracking-tight"
                >
                  The Command <br /> Core of Logistics
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.6 }}
                  className="text-base text-[var(--text-muted)] max-w-xs leading-relaxed font-medium"
                >
                  Precision-engineered authentication for the next generation of
                  autonomous transit systems.
                </motion.p>
              </div>
            </div>
          </section>

          {/* Right Side: Form Side */}
          <section className="md:col-span-12 lg:col-span-7 p-8 md:p-16 flex flex-col justify-center">
            <div className="max-w-[420px] mx-auto w-full">
              {/* Mobile Logo */}
              <div className="md:hidden text-center mb-12">
                <Link to="/" className="inline-flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
                    <span className="material-symbols-outlined text-white text-2xl">
                      rocket_launch
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[var(--text-main)] uppercase tracking-tighter">
                    Shuttle
                    <span className="text-[var(--text-main)] opacity-70">
                      Core
                    </span>
                  </span>
                </Link>
              </div>

              <div className="mb-12">
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-black text-[var(--text-main)] mb-3 tracking-tight"
                >
                  Operator Login
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-base text-[var(--text-muted)] font-medium"
                >
                  Enter your credentials to access the terminal.
                </motion.p>
              </div>

              {/* SSO Options */}
              <motion.button
                whileHover={{
                  y: -2,
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 bg-[var(--surface-light)] border border-[var(--border)] rounded-2xl flex items-center justify-center gap-4 hover:border-white/20 transition-all group mb-8"
              >
                <img
                  alt="Google Logo"
                  className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj2GLJs32EUXUIlwGcha56VS5fEF0GfwiYoFZ1tXTISP_MHWFU09Q8zg_D4jL4q-eu2hUqQbuvs7VmOS1SsnC6Bm8BTQ8FYub03xMKm24UFa81iJQGt0JQ6dfOrc8EBwJVFY8a4c-ieb-TO3Yln7BzSo34UYX6OT1jhWt_Lu2jaJblbdPZwIa5SiaM1rjhMXfyFzk3mmZHG9COqvt6SIl0NHv5p-3EibQEWsl_IojJZdy9g-tegTCbKAwhIyPP3IECNnCq-wWsQrc"
                />
                <span className="text-sm font-black text-[var(--text-main)] uppercase tracking-widest">
                  Enterprise SSO
                </span>
              </motion.button>

              <div className="relative mb-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--border)]"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
                  <span className="bg-[var(--background)] px-6 text-[var(--text-muted)]">
                    Secure Tunnel
                  </span>
                </div>
              </div>

              {/* Form */}
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <motion.div variants={formItemVariants} className="space-y-2">
                    <label className="text-[10px] font-black text-[var(--text-muted)] tracking-[0.25em] flex items-center gap-2.5 uppercase px-1">
                      <span className="material-symbols-outlined text-sm opacity-50">
                        person
                      </span>
                      System Identifier
                    </label>
                    <input
                      className="w-full h-14 bg-white/[0.03] border border-[var(--border)] focus:border-white/30 text-[var(--text-main)] px-5 rounded-2xl transition-all focus:outline-none placeholder:text-[var(--text-muted)]/40 font-bold focus:bg-white/[0.05]"
                      placeholder="operator_74@shuttlecore.io"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants} className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-[var(--text-muted)] tracking-[0.25em] flex items-center gap-2.5 uppercase">
                        <span className="material-symbols-outlined text-sm opacity-50">
                          lock
                        </span>
                        Secure Key
                      </label>
                      <a
                        className="text-[9px] text-[var(--text-main)] font-black hover:text-[var(--text-main)]/80 transition-colors uppercase tracking-widest"
                        href="#"
                      >
                        Forgotten?
                      </a>
                    </div>
                    <input
                      className="w-full h-14 bg-white/[0.03] border border-[var(--border)] focus:border-white/30 text-[var(--text-main)] px-5 rounded-2xl transition-all focus:outline-none placeholder:text-[var(--text-muted)]/40 font-bold focus:bg-white/[0.05]"
                      placeholder="••••••••••••"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  variants={formItemVariants}
                  className="flex items-center gap-3 px-1"
                >
                  <div className="relative flex items-center h-5">
                    <input
                      className="w-4 h-4 rounded-md bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--primary)] focus:ring-0 cursor-pointer appearance-none checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all"
                      id="mfa"
                      type="checkbox"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-900 opacity-0 checked-sibling:opacity-100">
                      <span className="material-symbols-outlined text-xs font-black">
                        check
                      </span>
                    </div>
                  </div>
                  <label
                    className="text-xs text-[var(--text-muted)] cursor-pointer font-bold select-none"
                    htmlFor="mfa"
                  >
                    Maintain persistent session
                  </label>
                </motion.div>

                <motion.div
                  variants={formItemVariants}
                  className="space-y-6 pt-2"
                >
                  <button
                    disabled={isLoading}
                    className={`btn-primary w-full h-16 flex items-center justify-center gap-3 active:scale-[0.98] transition-all relative overflow-hidden ${isLoading ? "opacity-80" : ""}`}
                    type="submit"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span className="text-sm font-black uppercase tracking-[0.2em]">
                          Initiate Session
                        </span>
                        <span className="material-symbols-outlined text-xl">
                          login
                        </span>
                      </>
                    )}
                  </button>
                  <div className="text-center">
                    <Link
                      to="/"
                      className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 group"
                    >
                      <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
                        arrow_back
                      </span>
                      Return to Surface
                    </Link>
                  </div>
                </motion.div>
              </form>

              {/* Footer Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center pt-10 mt-10 border-t border-[var(--border)]"
              >
                <p className="text-xs text-[var(--text-muted)] font-medium">
                  Unauthorized operator?{" "}
                  <Link
                    className="text-[var(--text-main)] font-black hover:underline"
                    to="/signup"
                  >
                    Register Identity
                  </Link>
                </p>
              </motion.div>
            </div>
          </section>
        </motion.main>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full bg-[var(--surface)]/30 backdrop-blur-xl border-t border-[var(--border)] py-8">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.3em] font-black opacity-50">
            © 2024 ShuttleCore Systems Inc.
          </span>
          <div className="flex gap-10">
            {["Security", "Privacy", "Support"].map((link) => (
              <a
                key={link}
                className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all uppercase tracking-[0.2em] font-black"
                href="#"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
