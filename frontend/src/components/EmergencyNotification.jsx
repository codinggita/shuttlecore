import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const EmergencyNotification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [hasVisitedEmergency, setHasVisitedEmergency] = useState(false);
  const audioRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const lastShownTime = useRef(null);

  // Initialize audio for notification sound
  useEffect(() => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/997/997-preview.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Check for active emergency every 15 minutes
  useEffect(() => {
    const checkEmergency = () => {
      const isEmergency = localStorage.getItem("emergencyActive");
      const dismissedAt = localStorage.getItem("emergencyDismissedAt");
      const visitedAt = localStorage.getItem("emergencyVisitedAt");
      
      // Check if user has already dismissed or visited in this cycle
      const dismissed = dismissedAt && (Date.now() - parseInt(dismissedAt)) < 15 * 60 * 1000;
      const visited = visitedAt && (Date.now() - parseInt(visitedAt)) < 15 * 60 * 1000;
      
      if (isEmergency === "true" && !dismissed && !visited) {
        // Check if 15 minutes have passed since last shown
        const canShow = !lastShownTime.current || (Date.now() - lastShownTime.current) >= 15 * 60 * 1000;
        
        if (canShow && location.pathname !== "/emergency") {
          setShowNotification(true);
          lastShownTime.current = Date.now();
          
          // Play sound
          if (audioRef.current && soundEnabled) {
            audioRef.current.play().catch(() => {});
          }
        }
      } else {
        setShowNotification(false);
        // Stop sound when no emergency or dismissed/visited
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    };
    
    // Check immediately
    checkEmergency();
    
    // Check every minute (faster than 15 min for responsiveness)
    const interval = setInterval(checkEmergency, 60000);
    
    return () => {
      clearInterval(interval);
    };
  }, [location.pathname, soundEnabled]);

  // Enable sound on first user interaction
  useEffect(() => {
    const enableSound = () => {
      setSoundEnabled(true);
      document.removeEventListener("click", enableSound);
    };
    document.addEventListener("click", enableSound);
    return () => document.removeEventListener("click", enableSound);
  }, []);

  // Track when user visits emergency page
  useEffect(() => {
    if (location.pathname === "/emergency") {
      localStorage.setItem("emergencyVisitedAt", Date.now().toString());
      setHasVisitedEmergency(true);
      setShowNotification(false);
      // Stop notification sound
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [location.pathname]);

  // Don't show on emergency page itself
  if (location.pathname === "/emergency") return null;
  
  // Don't show if no notification to show
  if (!showNotification) return null;

  const handleDismiss = (e) => {
    e.stopPropagation();
    localStorage.setItem("emergencyDismissedAt", Date.now().toString());
    setNotificationDismissed(true);
    setShowNotification(false);
    // Stop sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleRespond = (e) => {
    e.stopPropagation();
    localStorage.setItem("emergencyVisitedAt", Date.now().toString());
    setHasVisitedEmergency(true);
    setShowNotification(false);
    // Stop sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    navigate("/emergency");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="fixed top-24 right-4 z-[9999] max-w-sm w-full"
      >
        <div 
          className="bg-[var(--surface)] border-2 border-rose-500/50 rounded-2xl shadow-2xl shadow-rose-500/30 overflow-hidden hover:border-rose-500 transition-all hover:shadow-rose-500/50"
        >
          {/* Header with pulse animation */}
          <div className="bg-rose-500/10 px-4 py-3 border-b border-rose-500/20 flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-white text-xl">emergency_home</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full animate-ping"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-rose-400 uppercase tracking-wider">Emergency</h3>
                <span className="px-2 py-0.5 bg-rose-500 text-white text-[8px] font-black rounded uppercase tracking-wider animate-pulse">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-muted font-bold">
                4 Active Incidents
              </p>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-4 bg-[var(--surface)]">
            <p className="text-[12px] text-main mb-3 leading-relaxed">
              <span className="text-rose-400 font-black">4</span> emergency incidents require immediate attention. 
              Click to respond.
            </p>
            <p className="text-[10px] text-muted mb-3">
              Next reminder in 15 minutes if not addressed.
            </p>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={handleRespond}
                className="flex-1 py-2 bg-rose-500 text-white rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-rose-600 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                Respond Now
              </button>
              <button 
                onClick={handleDismiss}
                className="px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] text-muted rounded-xl text-[11px] font-black hover:bg-rose-500/10 hover:text-rose-400 transition-all"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>
          
          {/* Progress bar showing urgency */}
          <div className="h-1 bg-[var(--surface-muted)]">
            <div className="h-full bg-rose-500 animate-pulse w-full"></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EmergencyNotification;
