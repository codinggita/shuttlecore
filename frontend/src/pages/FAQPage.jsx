import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const faqs = [
  {
    category: "Platform & Access",
    items: [
      {
        q: "What is ShuttleCore?",
        a: "ShuttleCore is a next-generation autonomous fleet management platform. It provides real-time AI dispatching, demand heatmapping, predictive routing, and a unified command center for managing metropolitan transit networks at scale.",
      },
      {
        q: "How do I get started?",
        a: "Simply create an account via the Sign Up page. Once your profile is verified, you'll gain immediate access to the full dashboard including Fleet Management, AI Dispatch, and Safety modules.",
      },
      {
        q: "Is there a free trial available?",
        a: "Yes. ShuttleCore offers a 14-day free trial with full access to all features, no credit card required. After the trial, you can choose from our Starter, Professional, or Enterprise plans.",
      },
    ],
  },
  {
    category: "Fleet & Dispatching",
    items: [
      {
        q: "How does AI Dispatch work?",
        a: "Our neural dispatch engine continuously analyzes real-time passenger demand, vehicle positions, traffic conditions, and historical patterns. It automatically assigns optimal routes and re-positions vehicles up to 45 minutes before peak demand occurs.",
      },
      {
        q: "How many vehicles can the platform manage simultaneously?",
        a: "ShuttleCore is built for scale. The platform supports from 10 vehicles on the Starter plan up to unlimited fleets on Enterprise — all managed through a single low-latency interface with millisecond precision.",
      },
      {
        q: "Can I manually override AI dispatch decisions?",
        a: "Absolutely. Fleet managers retain full control at all times. You can override, pause, or customize any AI decision directly from the dashboard. The system logs all overrides for post-analysis.",
      },
    ],
  },
  {
    category: "Security & Data",
    items: [
      {
        q: "How is my fleet data secured?",
        a: "All data is encrypted in transit and at rest using AES-256 encryption. Vehicle communications use Layer-7 security protocols, and passenger biometric data is processed on-device and never stored on our servers.",
      },
      {
        q: "Does ShuttleCore comply with GDPR and data privacy laws?",
        a: "Yes. ShuttleCore is fully GDPR compliant and adheres to regional data protection regulations. You can request a full data export or deletion at any time from your account settings.",
      },
    ],
  },
  {
    category: "Billing & Plans",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), bank transfers, and invoiced billing for Enterprise clients. Visit our Payments page for the full breakdown.",
      },
      {
        q: "Can I change or cancel my plan at any time?",
        a: "Yes. You can upgrade, downgrade, or cancel your subscription at any time from your account settings. Cancellations take effect at the end of the current billing cycle with no hidden fees.",
      },
    ],
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface-muted)] hover:border-[var(--primary)]/40 transition-colors duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 md:p-8 text-left gap-4"
      >
        <span className="text-base md:text-lg font-bold text-[var(--text-main)]">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="material-symbols-outlined text-[var(--primary)] text-2xl shrink-0"
        >
          add
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 md:px-8 pb-8 text-[var(--text-muted)] leading-relaxed font-medium border-t border-[var(--border)] pt-5">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQPage = () => {
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
            <Link to="/faq" className="text-sm font-semibold text-[var(--primary)] transition-colors">FAQ</Link>
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
              <span className="material-symbols-outlined text-[var(--primary)] text-lg">help_center</span>
              <span className="font-manrope text-[11px] uppercase tracking-[0.25em] text-[var(--text-main)] font-black">Help Center</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-main)] mb-6 leading-tight tracking-tight">
              Frequently Asked<br />
              <span className="text-[var(--primary)]">Questions</span>
            </h1>
            <p className="text-xl text-[var(--text-muted)] leading-relaxed font-medium">
              Everything you need to know about ShuttleCore's platform, fleet management, security, and billing.
            </p>
          </motion.div>
        </section>

        {/* FAQ Categories */}
        <section className="max-w-4xl mx-auto px-6 pb-32 space-y-16">
          {faqs.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-black text-[var(--text-main)] tracking-tight">{section.category}</h2>
                <div className="flex-1 h-px bg-[var(--border)]" />
              </div>
              <div className="space-y-4">
                {section.items.map((item, ii) => (
                  <FAQItem key={ii} q={item.q} a={item.a} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="dashboard-card text-center !p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />
            <span className="material-symbols-outlined text-[var(--primary)] text-5xl mb-4 block">support_agent</span>
            <h3 className="text-2xl font-black text-[var(--text-main)] mb-3">Still have questions?</h3>
            <p className="text-[var(--text-muted)] mb-8 font-medium">Our support team is available 24/7 to help you get the most out of ShuttleCore.</p>
            <Link to="/signup" className="btn-primary !px-10 !py-4">Contact Support</Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope">ShuttleCore</span>
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

export default FAQPage;
