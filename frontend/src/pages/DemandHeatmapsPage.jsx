import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useSocket, emitLocation } from "../context/SocketContext";
import { GoogleMap, useJsApiLoader, Marker, Circle, Polyline } from "@react-google-maps/api";
import { updateLiveLocation, toggleTracking } from '../features/user/userSlice';
import { useSelector, useDispatch } from "react-redux";
import api from "../services/api";
import axios from 'axios';

const DemandHeatmapsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { liveMapData, fleetLocations, isConnected } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    firstName: "Cmdr.",
    lastName: "Operative",
    email: "operative@shuttlecore.ai",
    organization: "Systems Command",
    role: "Systems Lead",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw"
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
        localStorage.setItem("userProfile", JSON.stringify(response.data.user));
      } catch (error) {
        const storedUser = localStorage.getItem("userProfile");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    };
    
    fetchUserProfile();
  }, []);

  const dispatch = useDispatch();
  const { profile, currentLocation, trackingActive } = useSelector((state) => state.user);
  const { socket } = useSocket();
  
  const [efficiency, setEfficiency] = useState(94);
  const [walkDistance, setWalkDistance] = useState(180);
  const [fleetLoad, setFleetLoad] = useState(82);
  const [avgWait, setAvgWait] = useState(4.2);
  const [predictionTime, setPredictionTime] = useState(1035);
  const [clusters, setClusters] = useState([]);
  const [map, setMap] = useState(null);
  
  // Booking Workflow State
  const [bookingStep, setBookingStep] = useState('map'); // map, request, vehicle, payment, confirmed
  const [activeRequest, setActiveRequest] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingId, setBookingId] = useState(null);

  const watchId = React.useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    language: 'en'
  });

  const MAP_OPTIONS = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    styles: [
      { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#94A3B8' }] },
      { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#0B0E14' }] },
      { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: -70 }] },
      { featureType: 'water', elementType: 'all', stylers: [{ color: '#1C222D' }] }
    ]
  };

  const handleLocationUpdate = React.useCallback(async (position) => {
    const { latitude, longitude } = position.coords;
    const newLoc = { lat: latitude, lng: longitude };
    dispatch(updateLiveLocation(newLoc));
    if (profile) {
      emitLocation(socket, { userId: profile.id || profile._id, ...newLoc });
    }
  }, [dispatch, profile, socket]);

  React.useEffect(() => {
    // Auto-enable tracking on mount for this page
    if (!trackingActive) {
      dispatch(toggleTracking());
    }

    const startTracking = () => {
      watchId.current = navigator.geolocation.watchPosition(
        handleLocationUpdate,
        (err) => console.error("Location error:", err),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    };

    startTracking();

    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current);
    };
  }, [handleLocationUpdate, dispatch, trackingActive]);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Tactical Radar Fallback
  const TacticalRadar = () => (
    <div className="w-full h-full bg-[#0B0E14] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-[var(--primary)]/10 to-transparent origin-center" />
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 rounded-full border-2 border-[var(--primary)]/30 flex items-center justify-center mb-6 animate-pulse mx-auto">
          <span className="material-symbols-outlined text-3xl text-[var(--primary)]">radar</span>
        </div>
        <h3 className="text-xl font-black text-main tracking-tighter uppercase">Demand Radar Active</h3>
        <p className="text-[9px] text-muted font-black uppercase tracking-[0.2em]">Analyzing High-Density Zones</p>
      </div>
      
      {/* Simulated Fleet on Radar */}
      {fleetLocations && Object.values(fleetLocations).map((loc, idx) => (
        <div key={`radar-fleet-${idx}`} className="absolute w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10B981]" 
             style={{ left: `${((loc.lng - 72.6450) * 5000) + 50}%`, top: `${((23.0850 - loc.lat) * 5000) + 50}%` }}></div>
      ))}
    </div>
  );

  const triggerMockRequest = () => {
    const passengers = ["Noah K.", "Sophia W.", "Alex J.", "Sarah M.", "David C."];
    const locations = [
      { name: "Nana Chiloda", lat: 23.0850, lng: 72.6450 },
      { name: "Naroda GIDC", lat: 23.0650, lng: 72.6650 },
      { name: "Airport Road", lat: 23.0750, lng: 72.6250 },
      { name: "Hansol Sector", lat: 23.0550, lng: 72.6350 },
      { name: "Nikol Hub", lat: 23.0450, lng: 72.6750 }
    ];

    const randomPassenger = passengers[Math.floor(Math.random() * passengers.length)];
    const pickupIdx = Math.floor(Math.random() * locations.length);
    let destIdx = Math.floor(Math.random() * locations.length);
    while (destIdx === pickupIdx) destIdx = Math.floor(Math.random() * locations.length);

    const pickup = locations[pickupIdx];
    const destination = locations[destIdx];
    const randomDistance = (2 + Math.random() * 8).toFixed(1);
    const randomFare = (80 + Math.random() * 300).toFixed(0);

    setActiveRequest({
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      passenger: randomPassenger,
      pickup: pickup.name,
      destination: destination.name,
      distance: `${randomDistance} km`,
      fare: `₹${randomFare}.00`,
      coords: pickup
    });
    setBookingStep('request');
  };

  // Fetch clusters on mount
  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await api.get('/clusters');
        const clustersData = response.data.clusters || [];
        
        // Transform clusters to match UI format
        const transformedClusters = clustersData.map((c, index) => ({
          id: `#${index + 1}`,
          name: c.name || `Cluster ${index + 1}`,
          sub: `${c.passengers || 0} Passengers • ${c.shuttlesAssigned || 0} Shuttles Assigned`,
          count: c.passengers || 0,
          color: c.status === 'active' ? "bg-emerald-500" : c.status === 'pending' ? "bg-slate-500" : "bg-[#5C5C3D]",
          text: c.status === 'active' ? "text-emerald-500" : c.status === 'pending' ? "text-slate-500" : "text-[#5C5C3D]",
          status: c.status
        }));
        
        setClusters(transformedClusters);
      } catch (error) {
        console.error("Error fetching clusters:", error);
        // Fallback to default clusters if API fails
        setClusters([
          { id: "#1", name: "North Financial Plaza", sub: "12 Passengers • 1 Shuttle Assigned", count: 12, color: "bg-emerald-500", text: "text-emerald-500" },
          { id: "#2", name: "The Mission Hub", sub: "28 Passengers • 3 Shuttles Assigned", count: 28, color: "bg-[#5C5C3D]", text: "text-[#5C5C3D]" },
          { id: "#3", name: "Sunset Terrace", sub: "Pending optimization...", count: 8, color: "bg-slate-500", text: "text-slate-500", status: "pending" },
        ]);
      }
    };
    
    fetchClusters();
  }, []);

  // Real-time update simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      // Fluctuate efficiency
      setEfficiency(prev => Math.min(100, Math.max(90, prev + (Math.random() * 0.4 - 0.2))));
      
      // Update walk distance
      setWalkDistance(prev => Math.max(150, prev + (Math.random() * 2 - 1)));

      // Update fleet load and wait time
      setFleetLoad(prev => Math.min(100, Math.max(10, prev + (Math.random() * 2 - 1))));
      setAvgWait(prev => Math.max(1, Math.min(15, prev + (Math.random() * 0.2 - 0.1))));

      // Fluctuate prediction time
      setPredictionTime(prev => prev + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0));

      // Update cluster counts
      setClusters(prev => prev.map(c => {
        const change = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newCount = Math.max(1, c.count + change);
        return { ...c, count: newCount, sub: c.id === "#3" ? c.sub : `${newCount} Passengers • ${Math.ceil(newCount/10)} Shuttles Assigned` };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMinutesToTime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
        )}
      </AnimatePresence>

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter">SHUTTLE<span className="opacity-70">CORE</span></span>
          </Link>
          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">Operational Hub</p>
            {menuItems.map((item) => (
              <motion.button key={item.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }} onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}>
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 space-y-4">
          <motion.button whileHover={{ scale: 1.02 }} onClick={() => navigate("/emergency-stop")} className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5">
            <span className="material-symbols-outlined text-lg animate-pulse">emergency_home</span> Emergency Stop
          </motion.button>
          <div className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border border-[var(--primary)]/20 hover:border-[var(--primary)]/40 transition-colors group/sidebar-profile">
            <Link to="/profile" className="flex items-center gap-3 mb-4 group/pcard">
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-white/20 group-hover/pcard:border-[var(--primary)] transition-all" />
              <div><p className="text-[13px] font-black text-main leading-tight group-hover/pcard:text-[var(--primary)] transition-colors">{user.firstName} {user.lastName}</p><p className="text-[10px] text-muted uppercase font-bold tracking-wider">{user.role}</p></div>
            </Link>
            <motion.button onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg">
              <span className="material-symbols-outlined text-xs">logout</span> Terminate Session
            </motion.button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg z-30">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn"><span className="material-symbols-outlined">menu</span></motion.button>
          <div className="flex-1 max-w-xl hidden sm:block mx-4">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-main transition-colors text-lg">search</span>
              <input type="text" placeholder="Search clusters..." className="input-field !pl-11" />
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn">
            <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto">
            <motion.div variants={itemVariants} className="mb-10">
              <h1 className="text-3xl md:text-4xl font-black text-main tracking-tighter mb-2">Smart Passenger Clustering</h1>
              <p className="text-[13px] text-muted font-medium">Visualizing dynamically optimized pickup nodes based on real-time commute density.</p>
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
              <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 dashboard-card !p-0 relative overflow-hidden h-[600px] border-[var(--border)]">
                {(isLoaded && googleMapsApiKey) ? (
                  <div className="w-full h-full relative">
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={currentLocation || { lat: 23.0850, lng: 72.6450 }}
                      zoom={14}
                      options={MAP_OPTIONS}
                      onLoad={m => setMap(m)}
                    >
                      {/* Passenger Demand Clusters */}
                      {clusters.map((c, i) => (
                        <React.Fragment key={i}>
                          <Circle
                            center={c.coords || { lat: 23.0850 + (i*0.01), lng: 72.6450 + (i*0.01) }}
                            radius={400}
                            options={{
                              fillColor: c.status === 'active' ? '#10B981' : '#F59E0B',
                              fillOpacity: 0.15,
                              strokeColor: c.status === 'active' ? '#10B981' : '#F59E0B',
                              strokeWeight: 1,
                              strokeOpacity: 0.3
                            }}
                          />
                          <Marker
                            position={c.coords || { lat: 23.0850 + (i*0.01), lng: 72.6450 + (i*0.01) }}
                            icon={{
                              path: google.maps.SymbolPath.CIRCLE,
                              fillColor: c.status === 'active' ? '#10B981' : '#F59E0B',
                              fillOpacity: 1,
                              strokeWeight: 2,
                              strokeColor: '#FFFFFF',
                              scale: 4
                            }}
                            label={{
                              text: c.count.toString(),
                              color: 'white',
                              fontSize: '10px',
                              fontWeight: 'bold'
                            }}
                          />
                        </React.Fragment>
                      ))}

                      {/* Live Fleet Simulation Tracking */}
                      {Object.values(fleetLocations || {}).map((loc, idx) => (
                        <Marker
                          key={`fleet-sim-${idx}`}
                          position={{ lat: loc.lat, lng: loc.lng }}
                          icon={{
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            fillColor: '#6366F1',
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: '#FFFFFF',
                            scale: 6,
                            rotation: loc.heading || 0
                          }}
                        />
                      ))}

                      {currentLocation && (
                        <Marker
                          position={currentLocation}
                          icon={{
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: '#FFFFFF',
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: '#6366F1',
                            scale: 8
                          }}
                        />
                      )}
                    </GoogleMap>

                    {/* AI DISPATCH HUD OVERLAYS */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
                      <div className="bg-black/60 backdrop-blur-2xl border border-emerald-500/30 px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xl">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10B981]"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Telemetry Active</span>
                          <span className="text-[8px] text-white/50 font-bold uppercase tracking-widest">Sector: Nana Chiloda Hub</span>
                        </div>
                      </div>
                      
                      <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex flex-col gap-3 shadow-2xl min-w-[180px]">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-black text-muted uppercase tracking-widest">Sync Health</span>
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">98.4%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: '98.4%' }} className="h-full bg-emerald-500" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-6 right-6 z-20">
                      <button 
                        onClick={triggerMockRequest}
                        className="bg-[var(--primary)] text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group"
                      >
                        <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">bolt</span>
                        Inject Demand Node
                      </button>
                    </div>

                    <div className="absolute bottom-8 left-8 z-20 flex gap-4">
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-2xl">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]"></div>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Optimized</span>
                          </div>
                          <div className="w-px h-3 bg-white/10"></div>
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]"></div>
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Overload</span>
                          </div>
                       </div>
                    </div>

                    {/* Notification Overlay */}
                    <AnimatePresence>
                      {bookingStep === 'request' && activeRequest && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
                        >
                          <div className="bg-[var(--surface)] w-full max-w-md rounded-[2.5rem] p-8 border border-[var(--primary)]/30 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h4 className="text-[10px] font-black text-[var(--primary)] uppercase tracking-[0.3em] mb-2">New Ride Request</h4>
                                <h2 className="text-3xl font-black text-main tracking-tighter">{activeRequest.passenger}</h2>
                              </div>
                              <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1 rounded-full text-[10px] font-black border border-emerald-500/20">{activeRequest.fare}</div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                              <div className="flex gap-4">
                                <span className="material-symbols-outlined text-[var(--primary)]">location_on</span>
                                <div><p className="text-[10px] uppercase font-black text-muted tracking-widest">Pickup</p><p className="font-bold text-main">{activeRequest.pickup}</p></div>
                              </div>
                              <div className="flex gap-4">
                                <span className="material-symbols-outlined text-rose-500">near_me</span>
                                <div><p className="text-[10px] uppercase font-black text-muted tracking-widest">Destination</p><p className="font-bold text-main">{activeRequest.destination}</p></div>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <button 
                                onClick={() => setBookingStep('vehicle')}
                                className="py-4 bg-[var(--primary)] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl"
                              >
                                Accept Request
                              </button>
                              <button 
                                onClick={() => setBookingStep('map')}
                                className="py-4 bg-white/5 border border-white/10 text-muted rounded-2xl text-xs font-black uppercase tracking-widest"
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {bookingStep === 'vehicle' && (
                        <motion.div 
                          initial={{ opacity: 0, x: 50 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="absolute inset-y-0 right-0 w-96 bg-[var(--surface)]/95 backdrop-blur-xl border-l border-white/10 z-40 p-8 flex flex-col"
                        >
                          <h3 className="text-2xl font-black text-main tracking-tighter mb-8">Select Vehicle</h3>
                          <div className="space-y-4 flex-1 overflow-y-auto">
                            {[
                              { id: 'bike', name: 'Bike', time: '2 min', icon: 'two_wheeler', price: '₹45' },
                              { id: 'cab', name: 'Cab', time: '5 min', icon: 'directions_car', price: '₹145' },
                              { id: 'auto', name: 'Auto', time: '4 min', icon: 'local_taxi', price: '₹85' }
                            ].map(v => (
                              <button 
                                key={v.id}
                                onClick={() => { setSelectedVehicle(v); setBookingStep('payment'); }}
                                className="w-full bg-[var(--surface-muted)] p-6 rounded-[2rem] border border-white/5 hover:border-[var(--primary)] transition-all flex items-center justify-between group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-all"><span className="material-symbols-outlined">{v.icon}</span></div>
                                  <div className="text-left"><p className="font-black text-main">{v.name}</p><p className="text-[10px] text-muted uppercase font-black">{v.time} away</p></div>
                                </div>
                                <span className="font-black text-main">{v.price}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {bookingStep === 'payment' && selectedVehicle && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 1.1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 z-50 bg-[var(--background)] flex items-center justify-center p-6"
                        >
                          <div className="w-full max-w-lg bg-[var(--surface)] rounded-[3rem] p-10 border border-white/5 shadow-2xl">
                            <h3 className="text-3xl font-black text-main tracking-tighter mb-8">Payment Summary</h3>
                            <div className="space-y-4 mb-10">
                              <div className="flex justify-between py-4 border-b border-white/5">
                                <span className="text-muted font-bold">Fare Breakdown</span>
                                <span className="text-main font-black">{selectedVehicle.price}</span>
                              </div>
                              <div className="flex justify-between py-4 border-b border-white/5">
                                <span className="text-muted font-bold">Booking Fee</span>
                                <span className="text-main font-black">₹10.00</span>
                              </div>
                              <div className="flex justify-between py-6">
                                <span className="text-xl font-black text-main">Total Amount</span>
                                <span className="text-2xl font-black text-[var(--primary)] tracking-tighter">₹{(parseInt(selectedVehicle.price.replace('₹','')) + 10).toFixed(2)}</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => { 
                                const id = 'SC-' + Math.random().toString(36).substr(2, 6).toUpperCase();
                                const newBooking = {
                                  id: id,
                                  pickup: activeRequest.pickup,
                                  dropoff: activeRequest.destination,
                                  vehicle: {
                                    id: selectedVehicle.id,
                                    name: selectedVehicle.name,
                                    type: selectedVehicle.id,
                                    icon: selectedVehicle.icon,
                                    color: 'text-[var(--primary)]',
                                    bgColor: 'bg-[var(--primary)]/10'
                                  },
                                  status: 'confirmed',
                                  price: parseInt(selectedVehicle.price.replace('₹','')) + 10,
                                  paymentMethod: 'card',
                                  timestamp: new Date().toISOString(),
                                  bookingType: 'now'
                                };

                                // Save to localStorage for history
                                const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
                                localStorage.setItem('bookings', JSON.stringify([newBooking, ...existing]));

                                setBookingId(id); 
                                setBookingStep('confirmed'); 
                              }}
                              className="w-full py-5 bg-[var(--primary)] text-white rounded-3xl font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
                            >
                              Complete Payment
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {bookingStep === 'confirmed' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 100 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute inset-0 z-[60] bg-emerald-500 flex flex-col items-center justify-center p-12 text-center"
                        >
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: 0.3 }}
                            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8"
                          >
                            <span className="material-symbols-outlined text-emerald-500 text-5xl">check_circle</span>
                          </motion.div>
                          <h2 className="text-5xl font-black text-white tracking-tighter mb-4">Booking Confirmed!</h2>
                          <p className="text-white/80 font-bold mb-12 text-lg">Your {selectedVehicle.name} is on the way. Booking ID: {bookingId}</p>
                          <button 
                            onClick={() => { setBookingStep('map'); setActiveRequest(null); setSelectedVehicle(null); }}
                            className="px-12 py-5 bg-white text-emerald-500 rounded-3xl font-black uppercase tracking-[0.2em] shadow-xl"
                          >
                            Return to Mission Control
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <TacticalRadar />
                )}
              </motion.div>

              <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                <motion.div variants={itemVariants} className="dashboard-card group">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                    </div>
                    <h3 className="font-black text-xl text-main tracking-tight">System Efficiency</h3>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <p className="text-[11px] font-black text-muted uppercase tracking-widest mb-1">Walkability Score</p>
                        <p className="text-4xl font-black text-emerald-500 tracking-tighter">{efficiency.toFixed(1)}%</p>
                      </div>
                      <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">+2.4% Week</span>
                    </div>
                    <div className="w-full bg-[var(--surface-muted)] rounded-full h-2.5 overflow-hidden">
                      <motion.div animate={{ width: `${efficiency}%` }} className="bg-emerald-500 h-full rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border)] grid grid-cols-2 gap-4">
                    <div><p className="text-[10px] uppercase font-black text-muted tracking-widest mb-1 opacity-50">Avg. Walk</p><p className="text-lg font-black text-main tracking-tight">{walkDistance.toFixed(0)}m</p></div>
                    <div><p className="text-[10px] uppercase font-black text-muted tracking-widest mb-1 opacity-50">Fuel Saved</p><p className="text-lg font-black text-main tracking-tight">12.4 gal</p></div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="dashboard-card flex-1 flex flex-col min-h-[250px]">
                  <h3 className="font-black text-xl text-main tracking-tight mb-6">Active Clusters</h3>
                  <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
                    {clusters.map((item) => (
                      <div key={item.id} onClick={() => navigate(item.id === "#1" ? "/cluster-north-plaza" : item.id === "#2" ? "/cluster-mission-hub" : "/demand-heatmaps")} className="bg-[var(--surface-muted)] p-4 rounded-2xl flex items-center justify-between border border-[var(--border)] hover:border-[var(--primary)]/30 hover:bg-[var(--surface-light)] transition-all cursor-pointer group">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl ${item.color}/10 flex items-center justify-center ${item.text} font-black text-xs border border-${item.color}/20`}>{item.id}</div>
                          <div><h4 className="font-black text-[13px] text-main group-hover:text-white transition-colors">{item.name}</h4><p className="text-[11px] text-muted font-medium">{item.sub}</p></div>
                        </div>
                        <span className="material-symbols-outlined text-muted text-lg opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">chevron_right</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-[var(--primary)] p-6 rounded-[2rem] text-white relative overflow-hidden shadow-2xl group">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-white/80 animate-pulse">psychology</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Terra Intelligence</span>
                    </div>
                    <p className="text-lg font-bold leading-snug italic tracking-tight mb-6">"Moving Cluster #2 40 meters North could reduce total dwell time by 8%."</p>
                    <button onClick={() => navigate("/apply-recommendation")} className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-xs font-black transition-all uppercase tracking-widest">Apply Recommendation</button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pb-10">
              {[
                { label: "Peak Hour Prediction", val: formatMinutesToTime(predictionTime), trend: "12% rise", tColor: "text-rose-400", icon: "trending_up" },
                { label: "Active Fleet Load", val: `${fleetLoad.toFixed(0)}%`, trend: fleetLoad > 85 ? "Heavy" : "Optimal", tColor: fleetLoad > 85 ? "text-amber-400" : "text-emerald-400", icon: fleetLoad > 85 ? "warning" : "check_circle" },
                { label: "Avg. Wait Time", val: `${avgWait.toFixed(1)} min`, trend: "Live Sync", tColor: "text-emerald-400", icon: "sync" },
              ].map((metric, i) => (
                <motion.div key={i} variants={itemVariants} className="card-white group">
                  <p className="text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-50">{metric.label}</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-main tracking-tighter transition-all duration-500">{metric.val}</span>
                    <span className={`text-[10px] font-black ${metric.tColor} flex items-center gap-1 uppercase tracking-widest`}><span className="material-symbols-outlined text-xs">{metric.icon}</span> {metric.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DemandHeatmapsPage;
