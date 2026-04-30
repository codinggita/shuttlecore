import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const SignupPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organization: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Store user data in localStorage for profile persistence
    localStorage.setItem("userProfile", JSON.stringify({
      ...formData,
      role: "Systems Lead",
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
    }));

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="bg-[var(--background)] text-[var(--text-main)] font-sans min-h-screen flex flex-col transition-colors duration-300 overflow-x-hidden">
      {/* TopAppBar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-[var(--surface)]/80 backdrop-blur-2xl border-b border-[var(--border)] flex justify-between items-center px-6 md:px-10 h-20 w-full fixed top-0 z-50 transition-colors duration-300"
      >
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all shadow-lg shadow-black/20">
            <span className="material-symbols-outlined text-white text-xl">
              rocket_launch
            </span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase transition-colors text-[var(--text-main)]">
            Shuttle<span className="opacity-70">Core</span>
          </span>
        </Link>
        <div className="flex items-center gap-4">
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
          <div className="h-6 w-[1px] bg-[var(--border)] mx-2 hidden sm:block"></div>
          <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] hidden md:inline">
            Existing Identity?
          </span>
          <Link
            to="/login"
            className="text-[11px] font-black text-[var(--text-main)] hover:bg-[var(--surface-muted)] px-6 py-2.5 rounded-xl border border-[var(--border)] transition-all uppercase tracking-widest"
          >
            Login
          </Link>
        </div>
      </motion.header>

      <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
        >
          {/* Left Side: Visual Area */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 hidden lg:flex flex-col justify-between p-12 dashboard-card relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 z-0">
              <motion.img
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="w-full h-full object-cover opacity-30 mix-blend-luminosity group-hover:scale-110 transition-transform duration-[3s]"
                alt="Futuristic autonomous transit hub"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFmuPJ9wQUXrH1hg6X9KdMy8qosmOn3G-yBc9WY4Lx9pmcvGKh8NqAz6xrn8aoWpJaVWRgO2tyrE6K5844hKurT9TDxswyYMtQyl94jW8tkmwVdQzQv90I4ZF8Jt7rIaMlNN8aWbwWa1cf2LQeMTOr14p-iIZM5NXKbTfUrqlj5pAjdQKYGr7AcYzMcWZ0mT6h-WFpA_YkFoByGfOCJt2YPqXUX46wYhC2xlcSRAXLu9ar0N9MnsaTVNTt6bB7FSS_Q3Ebrv0suNk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/20 to-transparent"></div>
            </div>
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-10"
              >
                <span className="inline-block bg-white/5 backdrop-blur-md text-[var(--text-main)] border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase">
                  Network Access
                </span>
              </motion.div>
              <h1 className="text-5xl font-black text-[var(--text-main)] mb-6 leading-[1.05] tracking-tight">
                Master the <br />
                <span className="text-[var(--text-main)]/40">Fleet Flow.</span>
              </h1>
              <p className="text-lg text-[var(--text-muted)] max-w-xs leading-relaxed font-medium">
                Join the leading network for autonomous transit logistics and
                predictive dispatch management.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-8">
              {[
                {
                  icon: "auto_awesome",
                  title: "AI-Driven Optimization",
                  desc: "Predictive routing enabled",
                },
                {
                  icon: "verified_user",
                  title: "Secure Fleet Protocols",
                  desc: "Enterprise-grade security",
                },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--surface-muted)] flex items-center justify-center border border-[var(--border)] shadow-xl backdrop-blur-md">
                    <span className="material-symbols-outlined text-[var(--text-main)] text-2xl">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-base font-black text-[var(--text-main)] tracking-tight">
                      {feature.title}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-black opacity-60">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Registration Flow */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-[var(--surface)]/50 backdrop-blur-3xl border border-[var(--border)] rounded-[32px] p-8 md:p-16 transition-colors duration-300 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            <div className="mb-12">
              <h2 className="text-3xl font-black text-[var(--text-main)] mb-4 tracking-tight">
                Create Fleet Account
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 flex-grow bg-[var(--primary)] rounded-full"></div>
                <div className="h-1 flex-grow bg-[var(--surface-muted)] rounded-full"></div>
                <div className="h-1 flex-grow bg-[var(--surface-muted)] rounded-full"></div>
              </div>
              <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.3em] font-black opacity-60">
                STEP 1: CORPORATE IDENTITY
              </p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--text-muted)] tracking-[0.25em] uppercase px-1">
                    First Name
                  </label>
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-[var(--border)] focus:border-white/30 text-[var(--text-main)] p-4 rounded-2xl transition-all focus:outline-none font-bold placeholder:text-muted/20"
                    placeholder="John"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-[var(--text-muted)] tracking-[0.25em] uppercase px-1">
                    Last Name
                  </label>
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-[var(--border)] focus:border-white/30 text-[var(--text-main)] p-4 rounded-2xl transition-all focus:outline-none font-bold placeholder:text-muted/20"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] tracking-[0.25em] uppercase px-1">
                  Work Email Address
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xl group-focus-within:text-white transition-colors">
                    mail
                  </span>
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-[var(--border)] focus:border-white/30 text-[var(--text-main)] pl-12 p-4 rounded-2xl transition-all focus:outline-none font-bold placeholder:text-muted/20"
                    placeholder="j.doe@company-transit.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-[var(--text-muted)] tracking-[0.25em] uppercase px-1">
                  Fleet Organization Name
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-xl group-focus-within:text-white transition-colors">
                    corporate_fare
                  </span>
                  <input
                    required
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full bg-white/[0.03] border border-[var(--border)] focus:border-white/30 text-[var(--text-main)] pl-12 p-4 rounded-2xl transition-all focus:outline-none font-bold placeholder:text-muted/20"
                    placeholder="Global Transit Systems"
                    type="text"
                  />
                </div>
              </div>

              <div className="pt-2 px-1">
                <div className="flex items-start gap-4">
                  <div className="relative flex items-center h-5 pt-1">
                    <input
                      required
                      className="w-4 h-4 rounded-md bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--primary)] focus:ring-0 cursor-pointer appearance-none checked:bg-[var(--primary)] checked:border-[var(--primary)] transition-all"
                      type="checkbox"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-900 opacity-0 checked-sibling:opacity-100">
                      <span className="material-symbols-outlined text-xs font-black">
                        check
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <label className="text-[var(--text-muted)] leading-relaxed text-xs font-bold select-none opacity-80">
                      I agree to the{" "}
                      <a
                        className="text-[var(--text-main)] font-black hover:underline"
                        href="#"
                      >
                        Service Level Agreement
                      </a>{" "}
                      and{" "}
                      <a
                        className="text-[var(--text-main)] font-black hover:underline"
                        href="#"
                      >
                        Data Processing Addendum
                      </a>{" "}
                      for autonomous operations.
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col md:flex-row gap-8 items-center justify-between">
                <Link
                  to="/"
                  className="order-2 md:order-1 flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all text-[11px] font-black uppercase tracking-[0.2em] group"
                >
                  <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                  Abort
                </Link>
                <button
                  disabled={isLoading}
                  className={`order-1 md:order-2 w-full md:w-auto btn-primary !px-12 !py-5 flex items-center justify-center gap-3 relative overflow-hidden active:scale-[0.98] transition-all ${isLoading ? "opacity-80" : ""}`}
                  type="submit"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span className="text-sm font-black uppercase tracking-[0.2em]">
                        Proceed to Validation
                      </span>
                      <span className="material-symbols-outlined text-xl">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-16 pt-10 border-t border-[var(--border)] text-center">
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-muted opacity-40 mb-6">
                Secured by ShuttleCore Neural Shield
              </p>
              <div className="flex justify-center gap-12">
                {["security", "vpn_lock", "verified"].map((icon) => (
                  <span
                    key={icon}
                    className="material-symbols-outlined text-[var(--text-muted)] text-2xl opacity-20 hover:opacity-50 transition-opacity cursor-help"
                  >
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <footer className="bg-[var(--background)] border-t border-[var(--border)] py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.3em] font-black opacity-40">
            © 2024 ShuttleCore Logistics Systems.
          </div>
          <div className="flex gap-10">
            {["Status", "Security", "Privacy"].map((link) => (
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

export default SignupPage;
