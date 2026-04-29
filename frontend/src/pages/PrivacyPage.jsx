import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const PrivacyPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-[var(--background)] text-[var(--text-main)] min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <header className="bg-[var(--background)]/80 backdrop-blur-xl border-b border-[var(--border)] fixed w-full top-0 z-40">
        <div className="flex justify-between items-center px-6 md:px-8 h-20 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter font-manrope">
              Shuttle<span className="opacity-70">Core</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-8 items-center">
            <Link to="/services" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">Services</Link>
            <Link to="/faq" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">FAQ</Link>
            <Link to="/payments" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">Payments</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="icon-btn" title="Toggle theme">
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </button>
            <Link to="/login" className="hidden sm:block text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors px-4">Login</Link>
            <Link to="/signup" className="btn-primary !px-6">Get Started</Link>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section className="py-24 md:py-36 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 via-transparent to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto relative z-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] mb-8">
              <span className="material-symbols-outlined text-[var(--primary)] text-lg">shield_lock</span>
              <span className="font-manrope text-[11px] uppercase tracking-[0.25em] text-[var(--text-main)] font-black">Legal & Compliance</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-main)] mb-6 leading-tight tracking-tight">
              Privacy<br />
              <span className="text-[var(--primary)]">Policy</span>
            </h1>
            <p className="text-xl text-[var(--text-muted)] leading-relaxed font-medium">
              We are committed to protecting your data and your fleet's privacy. Here is how we handle your information securely.
            </p>
          </motion.div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6 pb-32 space-y-12 text-[var(--text-muted)] font-medium">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tight mb-4">1. Data Collection</h2>
            <p className="leading-relaxed mb-4">
              ShuttleCore collects telemetry data, fleet location, passenger demand logs, and user account information essential to provide our autonomous fleet management services. We do not sell your personal or corporate data to third parties.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tight mb-4">2. Security & Encryption</h2>
            <p className="leading-relaxed mb-4">
              All communications between your fleet and our platform are secured using Layer-7 encryption. Data at rest is encrypted using AES-256. We maintain strict access controls and conduct regular security audits to ensure compliance with industry standards including SOC 2 and GDPR.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tight mb-4">3. Data Retention</h2>
            <p className="leading-relaxed mb-4">
              We retain your data only for as long as necessary to provide you with our services and for legitimate and essential business purposes, such as maintaining the performance of the platform, making data-driven business decisions about new features and offerings, complying with our legal obligations, and resolving disputes.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tight mb-4">4. Your Rights</h2>
            <p className="leading-relaxed mb-4">
              You have the right to request access to, correction of, or deletion of your personal data at any time. Fleet managers can export their telemetry and operational data directly from the ShuttleCore dashboard.
            </p>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity"><span className="material-symbols-outlined text-xl">arrow_back</span> ShuttleCore</Link>
          <div className="flex flex-wrap justify-center gap-8">
            {[{ label: "Services", to: "/services" }, { label: "FAQ", to: "/faq" }, { label: "Payments", to: "/payments" }, { label: "Privacy", to: "/privacy" }].map((l) => (
              <Link key={l.label} to={l.to} className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors uppercase font-black tracking-[0.2em]">{l.label}</Link>
            ))}
          </div>
          <span className="text-[11px] text-[var(--text-muted)] font-bold opacity-40">© 2024 ShuttleCore Logistics Systems.</span>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPage;
