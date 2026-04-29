import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const paymentMethods = [
  {
    icon: "credit_card",
    color: "text-sky-400",
    title: "Credit & Debit Cards",
    desc: "All major cards accepted with instant processing and PCI-DSS Level 1 compliance.",
    badges: ["Visa", "Mastercard", "Amex", "Discover"],
  },
  {
    icon: "account_balance",
    color: "text-emerald-400",
    title: "Bank Transfer (ACH / Wire)",
    desc: "Direct bank-to-bank transfers for enterprise clients. Available in 40+ countries.",
    badges: ["ACH", "SEPA", "Wire", "SWIFT"],
  },
  {
    icon: "receipt_long",
    color: "text-amber-400",
    title: "Invoice Billing",
    desc: "Net-30 and Net-60 invoice terms available for verified Enterprise accounts. No upfront payment required.",
    badges: ["Net-30", "Net-60", "PO Support"],
  },
  {
    icon: "wallet",
    color: "text-violet-400",
    title: "Digital Wallets",
    desc: "One-tap checkout with your preferred digital wallet. Fast, secure, and frictionless.",
    badges: ["Apple Pay", "Google Pay", "PayPal"],
  },
];

const faqs = [
  { q: "When will I be charged?", a: "You are charged at the start of each billing cycle. Annual plans are billed upfront with a 20% discount applied automatically." },
  { q: "Is my payment information secure?", a: "Yes. We are PCI-DSS Level 1 certified. We never store raw card data on our servers — all transactions are processed through Stripe's secure vault." },
  { q: "Can I get a refund?", a: "We offer a full refund within 7 days of any billing cycle if you are not satisfied. After 7 days, refunds are prorated for unused time." },
  { q: "Do you support multiple currencies?", a: "Yes. We support 15+ currencies including USD, EUR, GBP, AED, INR, and CAD. Billing is automatically converted at real-time exchange rates." },
];

const steps = [
  { icon: "account_circle", label: "Create Account", desc: "Sign up and verify your organization details." },
  { icon: "credit_score", label: "Add Payment", desc: "Securely add a card, bank account, or request invoice billing." },
  { icon: "check_circle", label: "Choose a Plan", desc: "Select Starter, Professional, or Enterprise." },
  { icon: "rocket_launch", label: "Launch Fleet", desc: "Your dashboard activates instantly after payment." },
];

const PaymentMethodsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

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
            <Link to="/payments" className="text-sm font-semibold text-[var(--primary)] transition-colors">Payments</Link>
          </nav>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="icon-btn">
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
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto relative z-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] mb-8">
              <span className="material-symbols-outlined text-emerald-400 text-lg">verified_user</span>
              <span className="font-manrope text-[11px] uppercase tracking-[0.25em] text-[var(--text-main)] font-black">PCI-DSS Level 1 Certified</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-main)] mb-6 leading-tight tracking-tight">
              Secure, Flexible<br />
              <span className="text-emerald-400">Payment Methods</span>
            </h1>
            <p className="text-xl text-[var(--text-muted)] leading-relaxed font-medium">
              Pay the way that works for your organization. Enterprise-grade security on every transaction, guaranteed.
            </p>
          </motion.div>
        </section>

        {/* Security Trust Bar */}
        <section className="border-y border-[var(--border)] bg-[var(--surface-muted)] py-6 px-6">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10">
            {[
              { icon: "lock", label: "256-bit SSL Encryption" },
              { icon: "shield", label: "PCI-DSS Level 1" },
              { icon: "verified", label: "SOC 2 Certified" },
              { icon: "gpp_good", label: "Fraud Protection" },
              { icon: "policy", label: "GDPR Compliant" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2.5"
              >
                <span className="material-symbols-outlined text-emerald-400 text-xl">{item.icon}</span>
                <span className="text-sm font-bold text-[var(--text-muted)]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Payment Methods Grid */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[var(--text-main)] mb-4 tracking-tight">Accepted Payment Methods</h2>
            <p className="text-[var(--text-muted)] text-lg font-medium">Choose the method that fits your workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((pm, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="dashboard-card group hover:border-[var(--primary)]/40 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 shrink-0 bg-[var(--surface-muted)] rounded-2xl flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--primary)]/30 transition-colors">
                    <span className={`material-symbols-outlined ${pm.color} text-3xl`}>{pm.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-[var(--text-main)] mb-2">{pm.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium mb-4">{pm.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {pm.badges.map((b, bi) => (
                        <span key={bi} className="px-3 py-1 bg-[var(--surface-muted)] border border-[var(--border)] rounded-lg text-xs font-black text-[var(--text-muted)] uppercase tracking-wider">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-[var(--surface-muted)] border-y border-[var(--border)] py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-[var(--text-main)] mb-4 tracking-tight">How Billing Works</h2>
              <p className="text-[var(--text-muted)] text-lg font-medium">From sign-up to launch in 4 simple steps.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="dashboard-card text-center relative"
                >
                  <div className="absolute top-6 right-6 text-5xl font-black text-[var(--border)] opacity-50 leading-none select-none">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 bg-[var(--background)] rounded-2xl flex items-center justify-center border border-[var(--border)] mx-auto mb-5">
                    <span className="material-symbols-outlined text-[var(--primary)] text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="text-base font-black text-[var(--text-main)] mb-2">{step.label}</h3>
                  <p className="text-sm text-[var(--text-muted)] font-medium leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Payment FAQ */}
        <section className="max-w-4xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-black text-[var(--text-main)] mb-12 tracking-tight text-center">Billing Questions</h2>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-[var(--border)] rounded-2xl bg-[var(--surface-muted)] overflow-hidden hover:border-[var(--primary)]/40 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <span className="text-base font-bold text-[var(--text-main)]">{item.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-symbols-outlined text-[var(--primary)] text-2xl shrink-0"
                  >
                    add
                  </motion.span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="px-6 pb-6 text-[var(--text-muted)] font-medium border-t border-[var(--border)] pt-5 leading-relaxed">
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto dashboard-card !p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-50" />
            <span className="material-symbols-outlined text-emerald-400 text-5xl mb-4 block">payments</span>
            <h2 className="text-4xl font-black text-[var(--text-main)] mb-4">Start Your Free Trial</h2>
            <p className="text-[var(--text-muted)] text-lg mb-10 font-medium">14 days free. No credit card required. Cancel anytime.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn-primary !px-10 !py-4">Start Free Trial</Link>
              <Link to="/faq" className="btn-secondary !px-10 !py-4">View FAQ</Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link to="/" className="text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity">ShuttleCore</Link>
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

export default PaymentMethodsPage;
