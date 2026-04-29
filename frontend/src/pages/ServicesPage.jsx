import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const services = [
  {
    icon: "bolt",
    color: "text-amber-400",
    title: "AI Dispatch Engine",
    desc: "Neural-powered dispatch that predicts passenger surges 45 minutes in advance and automatically repositions your fleet for zero-wait performance.",
    features: ["Real-time demand prediction", "Auto fleet repositioning", "Multi-zone load balancing", "Override & manual control"],
  },
  {
    icon: "route",
    color: "text-sky-400",
    title: "Smart Route Optimization",
    desc: "Dynamic mesh routing across your entire network. Minimize travel time, fuel consumption, and emissions simultaneously using live traffic data.",
    features: ["Live traffic integration", "Energy-efficient pathfinding", "Collision vector analysis", "Multi-stop sequencing"],
  },
  {
    icon: "analytics",
    color: "text-emerald-400",
    title: "Demand Heatmapping",
    desc: "Visualize passenger demand across your city in real-time. Identify high-density zones and plan future fleet coverage with precision.",
    features: ["Live demand heatmaps", "Historical trend analysis", "Zone-based forecasting", "Export & reporting"],
  },
  {
    icon: "verified_user",
    color: "text-violet-400",
    title: "Safety & Security Suite",
    desc: "Layer-7 encrypted communication for every vehicle. Continuous safety scoring, anomaly detection, and incident response built-in.",
    features: ["Biometric data protection", "Anomaly detection AI", "Incident response playbooks", "Compliance reporting"],
  },
  {
    icon: "notifications_active",
    color: "text-rose-400",
    title: "Real-Time Notifications",
    desc: "Proactive alerting for fleet managers, dispatchers, and passengers. Configurable webhooks, SMS, and in-app notifications.",
    features: ["Multi-channel alerts", "Custom threshold triggers", "Webhook integrations", "Passenger-facing updates"],
  },
  {
    icon: "hub",
    color: "text-orange-400",
    title: "Fleet Command Center",
    desc: "Unified dashboard to monitor, control, and optimize your entire autonomous fleet from a single low-latency interface.",
    features: ["Real-time telemetry", "Remote vehicle control", "Maintenance scheduling", "Performance KPI tracking"],
  },
];

const plans = [
  { name: "Starter", price: "$299", period: "/mo", vehicles: "Up to 50 vehicles", highlight: false },
  { name: "Professional", price: "$899", period: "/mo", vehicles: "Up to 500 vehicles", highlight: true },
  { name: "Enterprise", price: "Custom", period: "", vehicles: "Unlimited fleet", highlight: false },
];

const ServicesPage = () => {
  const { theme, toggleTheme } = useTheme();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

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
            <Link to="/services" className="text-sm font-semibold text-[var(--primary)] transition-colors">Services</Link>
            <Link to="/faq" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">FAQ</Link>
            <Link to="/payments" className="text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">Payments</Link>
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
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] mb-8">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-manrope text-[11px] uppercase tracking-[0.25em] text-[var(--text-main)] font-black">Full Platform Suite</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[var(--text-main)] mb-6 leading-tight tracking-tight">
              Everything Your Fleet<br />
              <span className="text-[var(--primary)]">Needs to Excel</span>
            </h1>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed font-medium">
              A complete suite of intelligent tools designed to orchestrate, optimize, and secure your autonomous transit network — end to end.
            </p>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="dashboard-card group hover:border-[var(--primary)]/40 transition-all duration-300 flex flex-col"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 bg-[var(--surface-muted)] rounded-2xl flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--primary)]/30 transition-colors">
                    <span className={`material-symbols-outlined ${s.color} text-3xl`}>{s.icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-[var(--text-main)] mb-3">{s.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 font-medium flex-1">{s.desc}</p>
                <ul className="space-y-2.5">
                  {s.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm font-semibold text-[var(--text-main)]">
                      <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Plans */}
        <section className="bg-[var(--surface-muted)] border-y border-[var(--border)] py-24 px-6">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] mb-4 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-[var(--text-muted)] text-xl font-medium">Scale up as your fleet grows. No hidden fees, ever.</p>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`dashboard-card text-center relative overflow-hidden ${plan.highlight ? "border-[var(--primary)] border-2" : ""}`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent" />
                )}
                {plan.highlight && (
                  <div className="absolute top-4 right-4 bg-[var(--primary)] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                )}
                <h3 className="text-xl font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-black text-[var(--text-main)]">{plan.price}</span>
                  <span className="text-[var(--text-muted)] font-bold">{plan.period}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] font-semibold mb-8">{plan.vehicles}</p>
                <Link to="/signup" className={plan.highlight ? "btn-primary w-full block text-center" : "btn-secondary w-full block text-center"}>
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto dashboard-card !p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />
            <h2 className="text-4xl font-black text-[var(--text-main)] mb-4">Ready to Launch?</h2>
            <p className="text-[var(--text-muted)] text-lg mb-10 font-medium">Book a live demo and see ShuttleCore in action with your fleet data.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="btn-primary !px-10 !py-4">Request Demo</Link>
              <Link to="/faq" className="btn-secondary !px-10 !py-4">Read FAQ</Link>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope">ShuttleCore</span>
          <div className="flex flex-wrap justify-center gap-8">
            {[{ label: "Services", to: "/services" }, { label: "FAQ", to: "/faq" }, { label: "Payments", to: "/payments" }, { label: "Privacy", to: "#" }].map((l) => (
              <Link key={l.label} to={l.to} className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors uppercase font-black tracking-[0.2em]">{l.label}</Link>
            ))}
          </div>
          <span className="text-[11px] text-[var(--text-muted)] font-bold opacity-40">© 2024 ShuttleCore Logistics Systems.</span>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;
