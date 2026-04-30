import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const AirportRidesPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pickup, setPickup] = useState("");
  const [airport, setAirport] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const airports = [
    "Sardar Vallabhbhai Patel International Airport (AMD)",
    "Indira Gandhi International Airport (DEL)",
    "Chhatrapati Shivaji Maharaj International Airport (BOM)",
    "Kempegowda International Airport (BLR)",
    "Rajiv Gandhi International Airport (HYD)",
    "Chennai International Airport (MAA)",
    "Cochin International Airport (COK)",
    "Netaji Subhash Chandra Bose International Airport (CCU)",
    "Pune Airport (PNQ)",
    "Goa International Airport (GOI)",
    "Jaipur International Airport (JAI)",
    "Lucknow Airport (LKO)",
    "Trivandrum International Airport (TRV)",
    "Guwahati Airport (GAU)",
    "Amritsar Airport (ATQ)",
    "Chandigarh Airport (IXC)",
    "Bhubaneswar Airport (BBI)",
    "Varanasi Airport (VNS)",
    "Indore Airport (IDR)",
    "International: Heathrow (LHR)",
    "International: Dubai (DXB)",
    "International: Changi (SIN)",
    "International: JFK (JFK)",
    "International: Tokyo Haneda (HND)"
  ];

  const calculatePrice = (basePrice, p, a) => {
    if (!p || !a) return basePrice;
    const seed = (p + a).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return basePrice + (seed % 200); // Up to ₹200 variance
  };

  const vehicles = [
    { id: "exec", name: "Airport Executive", price: calculatePrice(850, pickup, airport), icon: "directions_car", desc: "Premium sedan with extra space", color: "text-blue-400" },
    { id: "express", name: "Airport Express", price: calculatePrice(450, pickup, airport), icon: "bolt", desc: "Fastest route to terminal", color: "text-amber-400" },
    { id: "van", name: "Airport Van", price: calculatePrice(1200, pickup, airport), icon: "airport_shuttle", desc: "Ideal for groups and luggage", color: "text-purple-400" }
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "credit_card" },
    { id: "upi", name: "UPI / QR Code", icon: "smartphone" },
    { id: "wallet", name: "ShuttleCore Wallet", icon: "account_balance_wallet" }
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleConfirm = () => {
    const bookingId = "AP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const finalPrice = discountApplied ? Math.floor(selectedVehicle.price * 0.8) : selectedVehicle.price;
    
    const newBooking = {
      id: bookingId,
      pickup: pickup,
      dropoff: airport,
      bookingType: "airport",
      reserveDate: date,
      reserveTime: time,
      vehicle: {
        name: selectedVehicle.name,
        icon: selectedVehicle.icon,
        color: selectedVehicle.color,
        bgColor: "bg-[var(--surface-muted)]"
      },
      price: finalPrice,
      paymentMethod: paymentMethod,
      timestamp: new Date().toISOString(),
      status: "confirmed",
      discount: discountApplied
    };

    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([newBooking, ...existing]));

    navigate("/booking-confirmation", { state: { booking: newBooking } });
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const renderStep = () => {
    switch(step) {
      case 1: // See Prices (Now Next)
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="dashboard-card !p-8">
              <h3 className="text-2xl font-black text-main mb-8 tracking-tighter">Airport Transfer Details</h3>
              <div className="space-y-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]">location_on</span>
                  <input type="text" placeholder="Pickup location (Home/Office)" value={pickup} onChange={e => setPickup(e.target.value)} className="input-field !pl-12" />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-rose-500">flight_takeoff</span>
                  <select value={airport} onChange={e => setAirport(e.target.value)} className="input-field !pl-12 appearance-none">
                    <option value="">Select Airport</option>
                    {airports.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 z-10 pointer-events-none">calendar_month</span>
                    <input 
                      type="date" 
                      value={date} 
                      onChange={e => setDate(e.target.value)} 
                      className="input-field !pl-12 !pr-4 relative z-0" 
                      onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    />
                  </div>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 z-10 pointer-events-none">schedule</span>
                    <input 
                      type="time" 
                      value={time} 
                      onChange={e => setTime(e.target.value)} 
                      className="input-field !pl-12 !pr-4 relative z-0" 
                      onClick={(e) => e.target.showPicker && e.target.showPicker()}
                    />
                  </div>
                </div>
              </div>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!pickup || !airport || !date || !time}
                className="btn-primary w-full mt-10 !py-4 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest font-black"
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        );
      case 2: // Select Vehicle
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h3 className="text-xl font-black text-main mb-6 tracking-tighter uppercase tracking-widest text-muted">Select Your Transfer</h3>
            {vehicles.map(v => (
              <motion.div 
                key={v.id} 
                whileHover={{ scale: 1.01 }}
                onClick={() => { setSelectedVehicle(v); handleNext(); }}
                className="dashboard-card !p-5 flex items-center gap-6 cursor-pointer hover:border-[var(--primary)] transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-[var(--surface-muted)] flex items-center justify-center ${v.color}`}>
                  <span className="material-symbols-outlined text-4xl">{v.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-main">{v.name}</h4>
                  <p className="text-xs text-muted font-medium">{v.desc}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-[var(--primary)]">₹{v.price}</p>
                  <p className="text-[10px] text-muted font-black uppercase tracking-widest">Fixed Fare</p>
                </div>
              </motion.div>
            ))}
            <button onClick={handleBack} className="text-xs font-black text-muted uppercase tracking-widest hover:text-main mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              Back
            </button>
          </motion.div>
        );
      case 3: // Choose Payment
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="dashboard-card !p-8">
              <h3 className="text-2xl font-black text-main mb-8 tracking-tighter">Choose Payment</h3>
              <div className="space-y-3">
                {paymentMethods.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => { setPaymentMethod(p.id); handleNext(); }}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all group"
                  >
                    <span className="material-symbols-outlined text-[var(--primary)] group-hover:scale-110 transition-transform">{p.icon}</span>
                    <span className="font-bold text-main flex-1 text-left">{p.name}</span>
                    <span className="material-symbols-outlined text-muted opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                  </button>
                ))}
              </div>
            </div>
            <button onClick={handleBack} className="text-xs font-black text-muted uppercase tracking-widest hover:text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              Back
            </button>
          </motion.div>
        );
      case 4: // Apply Discount
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="dashboard-card !p-8 text-center">
              <span className="material-symbols-outlined text-6xl text-[var(--primary)] mb-6">local_offer</span>
              <h3 className="text-2xl font-black text-main mb-2 tracking-tighter">Have a Promo Code?</h3>
              <p className="text-sm text-muted mb-8">Apply discount codes for airport express rides.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Code (e.g. FLY20)" 
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value.toUpperCase())}
                  className="input-field flex-1"
                />
                <button 
                  onClick={() => { if(promoCode === "FLY20") setDiscountApplied(true); }}
                  className="px-6 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[var(--primary)] hover:text-white transition-all"
                >
                  Apply
                </button>
              </div>
              {discountApplied && <p className="text-xs text-emerald-500 font-bold mt-4 animate-pulse">✓ 20% DISCOUNT APPLIED!</p>}
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="btn-primary w-full mt-10 !py-4 uppercase tracking-widest font-black"
              >
                Confirm
              </motion.button>
            </div>
            <button onClick={handleBack} className="text-xs font-black text-muted uppercase tracking-widest hover:text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              Back
            </button>
          </motion.div>
        );
      case 5: // Confirm
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="dashboard-card !p-8">
              <h3 className="text-2xl font-black text-main mb-8 tracking-tighter">Final Review</h3>
              <div className="space-y-6 border-b border-[var(--border)] pb-8 mb-8">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className={`w-12 h-12 rounded-xl bg-[var(--surface-muted)] flex items-center justify-center ${selectedVehicle?.color}`}>
                      <span className="material-symbols-outlined">{selectedVehicle?.icon}</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted font-black uppercase tracking-widest">Service</p>
                      <p className="font-bold text-main">{selectedVehicle?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted font-black uppercase tracking-widest">Fare</p>
                    <p className="font-black text-xl text-main">₹{discountApplied ? Math.floor(selectedVehicle.price * 0.8) : selectedVehicle.price}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">Route</p>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-main truncate">{pickup}</span>
                      <span className="material-symbols-outlined text-xs text-muted">arrow_downward</span>
                      <span className="text-xs font-bold text-main truncate">{airport}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">Schedule</p>
                    <div className="flex flex-col gap-1">
                      <p className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">event</span> {date}
                      </p>
                      <p className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[10px]">schedule</span> {time}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-muted font-black uppercase tracking-widest mb-1">Payment</p>
                  <p className="text-xs font-bold text-main uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">payment</span>
                    {paymentMethod}
                  </p>
                </div>
              </div>
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="btn-primary w-full !py-4 shadow-xl shadow-[var(--primary)]/20 uppercase tracking-[0.2em] font-black"
              >
                Book Now
              </motion.button>
            </div>
            <button onClick={handleBack} className="text-xs font-black text-muted uppercase tracking-widest hover:text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">arrow_back</span>
              Back
            </button>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="opacity-70">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            {menuItems.map(item => (
              <button key={item.id} onClick={() => navigate(item.path)} className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}>
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Image for context */}
        <div className="absolute inset-0 z-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?w=1600" alt="Airport Background" className="w-full h-full object-cover" />
        </div>

        <header className="h-20 flex items-center justify-between px-8 header-bg z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></button>
            <button onClick={() => navigate("/book-ride")} className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[11px] font-black text-muted hover:text-main transition-all">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Exit Booking
            </button>
          </div>
          <div className="flex items-center gap-3">
             <div className="hidden sm:flex items-center gap-2 bg-[var(--surface-muted)] px-4 py-2 rounded-full border border-[var(--border)]">
               {[1,2,3,4,5].map(s => (
                 <div key={s} className={`h-1.5 w-6 rounded-full transition-all ${s <= step ? "bg-[var(--primary)]" : "bg-muted/20"}`} />
               ))}
             </div>
             <button onClick={toggleTheme} className="icon-btn"><span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative z-10">
          <div className="max-w-[600px] mx-auto pt-10">
            <div className="mb-10 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--primary)] mb-2 block">Airport Services</span>
              <h1 className="text-4xl font-black text-main tracking-tighter">Premium Terminal Transfer</h1>
            </div>

            <AnimatePresence mode="wait">
              {renderStep()}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AirportRidesPage;
