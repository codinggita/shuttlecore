import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ReserveRidePage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || { date: "", time: "" };

  const [step, setStep] = useState(1);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState(initialData.date || "");
  const [time, setTime] = useState(initialData.time || "");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const calculatePrice = (basePrice, p, d) => {
    if (!p || !d) return basePrice;
    const seed = (p + d).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return basePrice + (seed % 180); // Up to ₹180 variance
  };

  const vehicles = [
    { id: "exec", name: "Premium Executive", price: calculatePrice(650, pickup, dropoff), icon: "directions_car", desc: "Arrive in style with our luxury fleet", color: "text-blue-400" },
    { id: "prime", name: "ShuttleCore Prime", price: calculatePrice(350, pickup, dropoff), icon: "bolt", desc: "Efficient and reliable city travel", color: "text-amber-400" },
    { id: "group", name: "Large Group", price: calculatePrice(900, pickup, dropoff), icon: "groups", desc: "Perfect for family and business trips", color: "text-purple-400" }
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: "credit_card" },
    { id: "upi", name: "UPI / QR Code", icon: "smartphone" },
    { id: "wallet", name: "ShuttleCore Wallet", icon: "account_balance_wallet" }
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleConfirm = () => {
    const bookingId = "RR-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const finalPrice = discountApplied ? Math.floor(selectedVehicle.price * 0.8) : selectedVehicle.price;
    
    const newBooking = {
      id: bookingId,
      pickup: pickup,
      dropoff: dropoff,
      bookingType: "reserve",
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

  const renderStep = () => {
    switch(step) {
      case 1: // Route Details
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="dashboard-card !p-8">
              <h3 className="text-2xl font-black text-main mb-8 tracking-tighter">Reservation Details</h3>
              <div className="space-y-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)]">radio_button_checked</span>
                  <input type="text" placeholder="Pickup location" value={pickup} onChange={e => setPickup(e.target.value)} className="input-field !pl-12" />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-rose-500">location_on</span>
                  <input type="text" placeholder="Dropoff location" value={dropoff} onChange={e => setDropoff(e.target.value)} className="input-field !pl-12" />
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
                disabled={!pickup || !dropoff || !date || !time}
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
            <h3 className="text-xl font-black text-main mb-6 tracking-tighter uppercase tracking-widest text-muted">Select Your Ride</h3>
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
                  <p className="text-[10px] text-muted font-black uppercase tracking-widest">Base Fare</p>
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
              <p className="text-sm text-muted mb-8">Apply discount codes for reserved rides.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter Code (e.g. RESERVE20)" 
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value.toUpperCase())}
                  className="input-field flex-1"
                />
                <button 
                  onClick={() => { if(promoCode === "RESERVE20") setDiscountApplied(true); }}
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
                      <span className="text-xs font-bold text-main truncate">{dropoff}</span>
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
                Reserve Now
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-main)] font-sans">
      <header className="h-20 flex items-center justify-between px-8 border-b border-[var(--border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur-xl z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/book-ride")} className="icon-btn">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tighter">SHUTTLECORE RESERVE</h1>
            <p className="text-[10px] text-muted font-black uppercase tracking-widest">Precision Scheduling Engine</p>
          </div>
        </div>
        <button onClick={toggleTheme} className="icon-btn">
          <span className="material-symbols-outlined">
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </header>

      <main className="max-w-xl mx-auto py-12 px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map(s => (
              <div 
                key={s} 
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${s <= step ? "bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" : "bg-[var(--border)]"}`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-black text-muted uppercase tracking-widest">
            <span>Details</span>
            <span>Vehicle</span>
            <span>Payment</span>
            <span>Offer</span>
            <span>Confirm</span>
          </div>
        </div>

        {renderStep()}
      </main>
    </div>
  );
};

export default ReserveRidePage;
