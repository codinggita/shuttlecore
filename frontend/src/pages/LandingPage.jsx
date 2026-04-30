import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
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

  const headerVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[var(--background)] text-[var(--text-main)] font-sans overflow-x-hidden transition-colors duration-300">
      <motion.header
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] docked full-width top-0 z-40 fixed w-full"
      >
        <div className="flex justify-between items-center px-4 md:px-8 h-20 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4 md:gap-10">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden icon-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </motion.button>
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-all shadow-lg shadow-black/20">
                <span className="material-symbols-outlined text-white text-xl">
                  rocket_launch
                </span>
              </div>
              <span className="text-xl font-black tracking-tighter font-manrope transition-colors">
                Shuttle
                <span className="text-[var(--text-main)] opacity-70">Core</span>
              </span>
            </Link>
            <nav className="hidden md:flex gap-8 items-center">
              <a
                className="text-sm font-semibold text-[var(--text-main)] hover:text-[var(--primary)] transition-colors"
                href="#fleet"
              >
                Fleet Overview
              </a>
              <a
                className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
                href="#ai"
              >
                AI Dispatch
              </a>
              <Link
                className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
                to="/services"
              >
                Services
              </Link>
              <Link
                className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
                to="/faq"
              >
                FAQ
              </Link>
            </nav>
          </div>
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
            <div className="hidden lg:flex items-center bg-[var(--surface-light)] border border-[var(--border)] rounded-xl px-4 py-2 gap-3 focus-within:border-white/30 transition-all">
              <span className="material-symbols-outlined text-[var(--text-muted)] text-sm">
                search
              </span>
              <input
                className="bg-transparent border-none text-xs text-[var(--text-main)] focus:ring-0 w-32 placeholder:text-muted/40"
                placeholder="Search Fleet..."
                type="text"
              />
            </div>
            <Link
              to="/login"
              className="hidden sm:block text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors px-4"
            >
              Login
            </Link>
            <Link to="/signup" className="btn-primary !px-6">
              Get Started
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-[var(--background)]/98 backdrop-blur-3xl"></div>
            <div className="relative h-full flex flex-col p-8">
              <div className="flex justify-between items-center mb-16">
                <span className="text-2xl font-black tracking-tighter">
                  ShuttleCore
                </span>
                <button
                  className="icon-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <nav className="flex flex-col gap-10">
                <a
                  className="text-4xl font-bold text-[var(--text-main)] hover:translate-x-2 transition-transform"
                  href="#fleet"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Fleet Overview
                </a>
                <a
                  className="text-4xl font-bold text-[var(--text-main)] hover:translate-x-2 transition-transform"
                  href="#ai"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AI Dispatch
                </a>
                <Link
                  className="text-4xl font-bold text-[var(--text-main)] hover:translate-x-2 transition-transform"
                  to="/services"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  className="text-4xl font-bold text-[var(--text-main)] hover:translate-x-2 transition-transform"
                  to="/faq"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </Link>
                <hr className="border-[var(--border)] my-4" />
                <Link
                  to="/login"
                  className="text-3xl font-bold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-center py-5 text-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-20">
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/95 to-[var(--background)]"></div>
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              alt="Autonomous Transit Network"
              className="w-full h-full object-cover mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmeWq0Twvo26F1CGN12aca8oEvbQIVrAhSMLKoYJ1CjlrYCMMjqwVb0iWcbFH_I2RcLshHOnEDXenZK7PMCW154rkf9g0I5cccFW4ocwQMUWMojjV7zYdDXAc9uXMl4hyxXUGgtAXo-XsqGsNvWa-ndNCtJphQiKiVuzZg3hlS-RqC3V1LPCVChCljdCcEvAgF_5soSbJvHzcTk4hLGFgRSqynzCuuc9LUSJbMQE-yNbqNERAzi8lqXhd2JBLmbaWybCrzrycHBrg"
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] mb-10 shadow-xl shadow-black/20"
            >
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              <span className="font-manrope text-[11px] uppercase tracking-[0.25em] text-[var(--text-main)] font-black">
                System Status: Active
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-8xl font-black text-[var(--text-main)] mb-8 leading-[1.05] tracking-tight"
            >
              The Pulse of <br />
              <span className="text-[var(--text-main)] drop-shadow-2xl">
                Autonomous Logistics
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-2xl text-[var(--text-muted)] max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
            >
              Orchestrate high-velocity fleet movements with real-time AI
              dispatching and predictive demand modeling. Precision transit for
              the next generation.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Link
                to="/login"
                className="btn-primary !px-12 !py-5 flex items-center justify-center gap-3 text-lg group"
              >
                <span>Launch Command Center</span>
                <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  rocket_launch
                </span>
              </Link>
              <button className="btn-secondary !px-12 !py-5 flex items-center justify-center gap-3 text-lg group border-2">
                <span>View Operational Specs</span>
                <span className="material-symbols-outlined text-2xl group-hover:translate-y-0.5 transition-transform">
                  description
                </span>
              </button>
            </motion.div>
          </motion.div>
        </section>

        <section id="fleet" className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-12 lg:col-span-8 dashboard-card relative overflow-hidden group min-h-[450px] flex flex-col justify-end"
            >
              <div className="absolute top-0 right-0 p-8">
                <span className="material-symbols-outlined text-[var(--text-main)] text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                  auto_awesome
                </span>
              </div>
              <div className="relative z-10 p-2">
                <h3 className="text-3xl font-black text-[var(--text-main)] mb-5">
                  AI Demand Modeling
                </h3>
                <p className="text-lg text-[var(--text-muted)] mb-10 max-w-xl leading-relaxed">
                  Our neural core predicts passenger surges 45 minutes before
                  they occur, automatically repositioning your autonomous fleet
                  for zero-wait performance.
                </p>
                <div className="h-56 w-full bg-[var(--background)]/40 rounded-2xl border border-[var(--border)] p-6 transition-colors group-hover:border-[var(--primary)]/30">
                  <div className="flex items-end justify-between h-full gap-3 md:gap-6">
                    {[40, 65, 90, 55, 30, 45, 75, 50].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                        className={`w-full ${h === 90 ? "bg-[var(--primary)]" : "bg-[var(--text-main)]/20"} rounded-t-lg relative`}
                      >
                        {h === 90 && (
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white text-[10px] px-2.5 py-1 rounded-full font-black shadow-xl">
                            PEAK
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-12 lg:col-span-4 dashboard-card border-l-4 border-l-[var(--primary)] flex flex-col justify-center p-10"
            >
              <div className="mb-8">
                <div className="w-14 h-14 bg-[var(--surface-muted)] rounded-2xl flex items-center justify-center border border-[var(--border)]">
                  <span className="material-symbols-outlined text-[var(--text-main)] text-3xl">
                    route
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-black text-[var(--text-main)] mb-4">
                Real-time Routing
              </h3>
              <p className="text-base text-[var(--text-muted)] mb-10 leading-relaxed">
                Dynamic mesh network topology for vehicle-to-vehicle traffic
                mitigation and optimal pathfinding.
              </p>
              <ul className="space-y-5">
                {[
                  { icon: "hub", label: "Latent Path Optimization" },
                  { icon: "security", label: "Collision Vector Analysis" },
                  { icon: "bolt", label: "Energy-Grid Syncing" },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 text-base font-bold text-[var(--text-main)]"
                  >
                    <span className="material-symbols-outlined text-[var(--text-main)] text-xl">
                      {item.icon}
                    </span>
                    {item.label}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="md:col-span-12 lg:col-span-4 grid grid-cols-1 gap-8 h-full">
              {[
                {
                  icon: "query_stats",
                  color: "text-gray-400",
                  title: "Predictive Labs",
                  desc: "Sandbox environment for stress-testing urban transit scenarios with synthetic population data.",
                },
                {
                  icon: "verified_user",
                  color: "text-emerald-500",
                  title: "Safety Protocols",
                  desc: "Layer-7 security encryption for all vehicle communications and passenger biometric data.",
                },
                {
                  icon: "eco",
                  color: "text-amber-500",
                  title: "Sustainability",
                  desc: "Achieve carbon-neutral transit goals through automated load balancing and energy optimization.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="dashboard-card group hover:border-[var(--primary)] transition-all"
                >
                  <span
                    className={`material-symbols-outlined ${feature.color} text-4xl mb-6 block`}
                  >
                    {feature.icon}
                  </span>
                  <h4 className="text-xl font-bold text-[var(--text-main)] mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-12 lg:col-span-8 dashboard-card !p-0 overflow-hidden relative group"
            >
              <img
                alt="System Dashboard"
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-[2s]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG6GM0S19dDJ0Ft-8__vafbZTT5_ilVctIDG6gb0UQhtGPy2QeBL37sHUin5cn5ldHACh3R6FxSGJibSo1TONzf29lekeTCAgsm0Q-yKYX4r_RMTRMCnuxcRuphz1xJxu-oxScpeitH8MWJPAOg_kKSl0wPwgjdpyYnFpgAI7QUU-eBKc8BDiZ3QtKDT15pabJRfPa-rQMXS-o5LK2gCuUTXfZOu3VUgFmDqfHpj1jBHLxE8dLAZbCVRb_VqrLvtNXoc2nSfnIB7A"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
                <div className="px-5 py-2 bg-black/60 backdrop-blur-xl rounded-xl text-[11px] font-black text-white uppercase tracking-[0.2em] border border-white/20 shadow-2xl">
                  Live Network Stream: Node_042
                </div>
                <div className="flex gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-48 bg-[var(--surface-muted)] border-y border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                id="ai"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-10 leading-tight">
                  Operational Intelligence{" "}
                  <span className="text-[var(--text-main)]">at Scale.</span>
                </h2>
                <p className="text-xl text-[var(--text-muted)] mb-12 leading-relaxed font-medium">
                  ShuttleCore provides the unified command center for fleet
                  managers to monitor, intervene, and optimize autonomous
                  networks across metropolitan zones.
                </p>
                <div className="space-y-10">
                  {[
                    {
                      icon: "hub",
                      title: "Unified Fleet Hub",
                      desc: "Control thousands of units from a single low-latency interface with millisecond precision.",
                    },
                    {
                      icon: "history_toggle_off",
                      title: "Wait Intelligence",
                      desc: "Reduce average passenger wait times by up to 64% through advanced predictive staging algorithms.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-14 h-14 shrink-0 bg-[var(--surface-muted)] flex items-center justify-center rounded-2xl border border-[var(--border)] shadow-lg">
                        <span className="material-symbols-outlined text-[var(--text-main)] text-2xl">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <span className="block text-xl font-bold text-main mb-1">
                          {item.title}
                        </span>
                        <span className="text-[var(--text-muted)] text-base leading-relaxed font-medium">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group p-4"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-transparent opacity-20 blur-3xl rounded-full"></div>
                <div className="relative dashboard-card !p-2 overflow-hidden shadow-2xl">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      alt="System Visualization"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp8spq3mDA9ta6CRefSmovMdLnMQa-IXxWoyUe5Ke0ZgulpzuOfi3Z8kEl-wHTfqMlrJTuRgS5cjuAhBE0Et89VyYQEagtOaL6HY1vCI5Ej6jWht5yxUU2TUpq2YP8JajO3tF9pPq8I5F_x_3pyZUT-UztMEYUrYF_0MvQulECtrdw_aV_cM-CKeg2FIEVOKqV8PlAli1K_9Htkry46pwwQ_bZr9JRW3NvlQGoF9kia2aKvtxtsi91OTrIlElNeg38N1caUctq8AI"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-32 md:py-60 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto dashboard-card !p-16 md:!p-24 text-center relative overflow-hidden shadow-2xl shadow-black/40"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50"></div>
            <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] mb-10">
              Ready to Optimize?
            </h2>
            <p className="text-xl text-[var(--text-muted)] mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
              Join the ranks of modern metropolitan authorities leveraging
              ShuttleCore for a cleaner, faster, and more efficient urban
              future.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link
                to="/signup"
                className="btn-primary !px-12 !py-6 !text-xl flex items-center justify-center"
              >
                Request System Demo
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-[var(--surface-light)] border border-[var(--border)] text-[var(--text-main)] font-black rounded-xl hover:bg-white/10 transition-all text-xl shadow-xl"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-[var(--background)] border-t border-[var(--border)] py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <span className="text-[var(--text-main)] font-black tracking-tighter text-3xl font-manrope">
              ShuttleCore
            </span>
            <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-[0.4em] font-black opacity-60">
              Autonomous Ops Hub
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <Link
              className="text-[11px] text-[var(--text-muted)] hover:text-white transition-colors uppercase font-black tracking-[0.2em]"
              to="/services"
            >
              Services
            </Link>
            <Link
              className="text-[11px] text-[var(--text-muted)] hover:text-white transition-colors uppercase font-black tracking-[0.2em]"
              to="/faq"
            >
              FAQ
            </Link>
            <Link
              className="text-[11px] text-[var(--text-muted)] hover:text-white transition-colors uppercase font-black tracking-[0.2em]"
              to="/payments"
            >
              Payments
            </Link>
            <a
              className="text-[11px] text-[var(--text-muted)] hover:text-white transition-colors uppercase font-black tracking-[0.2em]"
              href="#"
            >
              Privacy
            </a>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] font-bold opacity-40">
            © 2024 ShuttleCore Logistics Systems.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
