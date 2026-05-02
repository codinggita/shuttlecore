import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline, Circle } from "@react-google-maps/api";
import { updateLiveLocation, toggleTracking, setConnectedUserLocations } from '../features/user/userSlice';
import { useSocket, emitLocation } from '../context/SocketContext';
import { useTheme } from "../context/ThemeContext";
import api from "../services/api";
import axios from 'axios';

const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    { featureType: 'all', elementType: 'labels.text.fill', stylers: [{ color: '#94A3B8' }] },
    { featureType: 'all', elementType: 'labels.text.stroke', stylers: [{ visibility: 'off' }] },
    { featureType: 'landscape', elementType: 'all', stylers: [{ color: '#0B0E14' }] },
    { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
    { featureType: 'road', elementType: 'all', stylers: [{ saturation: -100 }, { lightness: -70 }] },
    { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'off' }] },
    { featureType: 'water', elementType: 'all', stylers: [{ color: '#1C222D' }] }
  ]
};

const AIDispatchPage = () => {
  const { theme, toggleTheme } = useTheme();
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
  const { profile } = useSelector((state) => state.user);
  const { currentLocation, trackingActive: reduxTrackingActive, connectedUsersLocations } = useSelector((state) => state.user);
  const { socket, isConnected } = useSocket();

  const [dispatchQueue, setDispatchQueue] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [trackingActive, setTrackingActive] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [map, setMap] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [activeRoutes, setActiveRoutes] = useState([]);
  const [simulatedDrivers, setSimulatedDrivers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const watchId = React.useRef(null);

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey || '',
    language: 'en'
  });

  const handleLocationUpdate = React.useCallback(async (position) => {
    const { latitude, longitude } = position.coords;
    const newLocation = { lat: latitude, lng: longitude };
    
    dispatch(updateLiveLocation(newLocation));
    setLastUpdated(new Date());

    if (profile) {
      const locationData = {
        userId: profile.id || profile._id,
        name: `${profile.firstName} ${profile.lastName}`,
        role: profile.role,
        ...newLocation
      };

      emitLocation(socket, locationData);

      try {
        await axios.put('/api/dispatch/location', locationData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (err) {
        console.error('Failed to update location on server:', err);
      }
    }
  }, [dispatch, profile, socket]);

  const handleLocationError = React.useCallback((err) => {
    console.error('Location error:', err.message);
    if (trackingActive) {
      dispatch(toggleTracking());
    }
  }, [dispatch, trackingActive]);

  React.useEffect(() => {
    // Auto-enable tracking on mount for this page
    if (!trackingActive) {
      dispatch(toggleTracking());
    }

    if ("geolocation" in navigator) {
      watchId.current = navigator.geolocation.watchPosition(
        handleLocationUpdate,
        handleLocationError,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [handleLocationUpdate, handleLocationError, dispatch, trackingActive]);

  // Tactical Radar Fallback Component for Missing API Key
  const TacticalRadar = () => (
    <div className="w-full h-full bg-[#0B0E14] relative overflow-hidden flex items-center justify-center">
      {/* Radar Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Radar Sweeper Animation */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-[var(--primary)]/10 to-transparent origin-center pointer-events-none"
      />

      {/* Simulated Operational Content */}
      <div className="relative z-10 text-center">
        <div className="w-24 h-24 rounded-full border-4 border-[var(--primary)]/30 flex items-center justify-center mb-6 animate-pulse mx-auto">
          <span className="material-symbols-outlined text-4xl text-[var(--primary)]">radar</span>
        </div>
        <h3 className="text-2xl font-black text-main tracking-tighter uppercase mb-2">Tactical Radar Active</h3>
        <p className="text-[10px] text-muted font-black uppercase tracking-[0.3em]">Satellite Link: Established • API Auth: Simulation Mode</p>
      </div>

      {/* Render Simulated Drivers on Radar */}
      {Object.values(simulatedDrivers).map((driver, idx) => (
        <motion.div
          key={`radar-driver-${idx}`}
          className="absolute flex flex-col items-center gap-1"
          style={{ 
            left: `${((driver.lng - 72.6450) * 5000) + 50}%`, 
            top: `${((23.0850 - driver.lat) * 5000) + 50}%` 
          }}
        >
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10B981] animate-pulse"></div>
          <span className="text-[8px] font-bold text-emerald-500 bg-black/80 px-1 rounded uppercase tracking-tighter">
            {driver.vehicleId || 'UNIT'}
          </span>
        </motion.div>
      ))}

      {/* Warning Toast for Developer */}
      {!googleMapsApiKey && (
        <div className="absolute top-6 right-6 z-50 bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl backdrop-blur-md max-w-[240px]">
          <div className="flex gap-3 items-start">
            <span className="material-symbols-outlined text-amber-500 text-lg">warning</span>
            <div>
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">API Key Missing</p>
              <p className="text-[9px] text-main opacity-80 leading-relaxed font-bold">Provide <code className="bg-black/20 px-1">VITE_GOOGLE_MAPS_API_KEY</code> in your .env file to enable high-resolution satellite imagery.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Fetch dispatch queue and vehicles on mount
  useEffect(() => {
    const fetchDispatchData = async () => {
      setIsLoading(true);
      try {
        const [dispatchRes, vehiclesRes, clustersRes] = await Promise.all([
          api.get('/dispatch'),
          api.get('/vehicles'),
          api.get('/clusters')
        ]);
        
        const dispatchData = dispatchRes.data.dispatchQueue || dispatchRes.data.dispatch || [];
        const vehiclesData = vehiclesRes.data.vehicles || [];
        const clustersData = clustersRes.data.clusters || [];
        
        // Transform dispatch queue
        const transformedDispatch = dispatchData.map(d => ({
          id: d.id || d._id,
          passenger: d.passenger || "Noah K.",
          origin: d.origin || "Nana Chiloda",
          destination: d.destination || "Airport Road",
          priority: d.priority || "URGENT",
          autoAssign: d.autoAssign || "Unit 104",
          status: d.status || "pending",
          originCoords: { lat: 23.0850 + (Math.random() - 0.5) * 0.02, lng: 72.6450 + (Math.random() - 0.5) * 0.02 },
          destCoords: { lat: 23.0850 + (Math.random() - 0.5) * 0.02, lng: 72.6450 + (Math.random() - 0.5) * 0.02 }
        }));

        const ahmedabadClusters = [
          { name: 'Nana Chiloda', coordinates: { lat: 23.0850, lng: 72.6450 }, demand: 'High', passengers: 14 },
          { name: 'Naroda GIDC', coordinates: { lat: 23.0650, lng: 72.6650 }, demand: 'Medium', passengers: 8 },
          { name: 'Airport Road', coordinates: { lat: 23.0750, lng: 72.6250 }, demand: 'High', passengers: 22 }
        ];
        
        setDispatchQueue(transformedDispatch.length ? transformedDispatch : [
          { id: 'D-9921', passenger: 'Noah K.', origin: 'Nana Chiloda', destination: 'Airport Rd', priority: 'URGENT', status: 'pending', autoAssign: 'Unit 104', originCoords: { lat: 23.0850, lng: 72.6450 }, destCoords: { lat: 23.0750, lng: 72.6250 } }
        ]);
        setClusters(ahmedabadClusters);

        // Generate routes for active dispatches
        const routes = (transformedDispatch.length ? transformedDispatch : [{ status: 'confirmed', originCoords: { lat: 23.0850, lng: 72.6450 }, destCoords: { lat: 23.0750, lng: 72.6250 } }])
          .filter(d => d.status === 'assigned' || d.status === 'confirmed' || d.status === 'pending')
          .map(d => [d.originCoords, d.destCoords]);
        setActiveRoutes(routes);

      } catch (error) {
        console.error("Error fetching dispatch data:", error);
        setDispatchQueue([
          { id: 'D-9921', passenger: 'Noah K.', origin: 'Nana Chiloda', destination: 'Airport Rd', priority: 'URGENT', status: 'pending', autoAssign: 'Unit 104', originCoords: { lat: 23.0850, lng: 72.6450 }, destCoords: { lat: 23.0750, lng: 72.6250 } }
        ]);
        setClusters([
          { name: 'Nana Chiloda', coordinates: { lat: 23.0850, lng: 72.6450 }, demand: 'High', passengers: 14 }
        ]);
        setVehicles([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDispatchData();
  }, []);

  const [pendingRequests, setPendingRequests] = useState(124);
  const [liveFleets, setLiveFleets] = useState(86);
  const [efficiency, setEfficiency] = useState(98.4);
  const [networkHealth, setNetworkHealth] = useState({
    bandwidth: 42,
    uplink: "Stable",
    latency: 14
  });
  const [operators, setOperators] = useState([
    { id: "104", status: "bg-rose-500", active: true },
    { id: "208", status: "bg-emerald-500", active: true }
  ]);

  // Real-time update simulation
  React.useEffect(() => {
    const timer = setInterval(() => {

      // Fluctuate efficiency
      setEfficiency(prev => Math.min(100, Math.max(95, prev + (Math.random() * 0.2 - 0.1))));

      // Fluctuate pending requests
      setPendingRequests(prev => Math.max(100, prev + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)));

      // Fluctuate live fleets
      setLiveFleets(prev => Math.max(80, Math.min(92, prev + (Math.random() > 0.9 ? (Math.random() > 0.5 ? 1 : -1) : 0))));

      // Update network health
      setNetworkHealth(prev => ({
        bandwidth: Math.min(100, Math.max(10, prev.bandwidth + (Math.random() * 4 - 2))),
        uplink: Math.random() > 0.95 ? "Syncing..." : "Stable",
        latency: Math.max(5, Math.min(50, prev.latency + (Math.random() > 0.5 ? 1 : -1)))
      }));

      // Update operators
      if (Math.random() > 0.9) {
        setOperators(prev => prev.map(o => ({
          ...o,
          status: Math.random() > 0.8 ? (o.status === "bg-rose-500" ? "bg-emerald-500" : "bg-rose-500") : o.status
        })));
      }

      // Update dispatch queue
      setDispatchQueue(prev => {
        // Randomly "confirm" a pending order
        let nextQueue = prev.map(item => {
          if (item.status === "pending" && Math.random() > 0.98) {
            return { ...item, status: "confirmed" };
          }
          return item;
        });

        // Randomly remove a confirmed order and add a new pending one more frequently
        if (Math.random() > 0.8) {
          const names = ["Aria Smith", "Liam J.", "Sophia W.", "Noah K.", "Olivia R.", "Ethan B.", "Dharmi P.", "Rahul S."];
          const hubs = ["Nana Chiloda", "Naroda GIDC", "Hansol", "Nikol", "Airport Circle"];
          const newOrder = {
            id: `TX-${Math.floor(Math.random() * 9000 + 1000)}`,
            passenger: names[Math.floor(Math.random() * names.length)],
            origin: hubs[Math.floor(Math.random() * hubs.length)],
            destination: hubs[Math.floor(Math.random() * hubs.length)],
            priority: Math.random() > 0.6 ? "URGENT" : "ROUTINE",
            autoAssign: `Unit ${Math.floor(Math.random() * 900 + 100)}`,
            status: "pending",
            originCoords: { lat: 23.0850 + (Math.random() - 0.5) * 0.05, lng: 72.6450 + (Math.random() - 0.5) * 0.05 },
            destCoords: { lat: 23.0850 + (Math.random() - 0.5) * 0.05, lng: 72.6450 + (Math.random() - 0.5) * 0.05 }
          };
          
          // Trigger notification for new pending request
          const toast = document.createElement("div");
          toast.className = "fixed bottom-10 right-10 z-[100] bg-[var(--primary)] text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-in-right border border-white/10 backdrop-blur-xl";
          toast.innerHTML = `
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <span class="material-symbols-outlined text-xl">notifications_active</span>
            </div>
            <div>
              <p class="font-black text-[10px] uppercase tracking-widest opacity-70">New Request</p>
              <p class="font-black text-sm">${newOrder.passenger} • ${newOrder.origin}</p>
            </div>
          `;
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 4000);

          // Remove first confirmed if exists to keep queue clean
          const confirmedIndex = nextQueue.findIndex(i => i.status === "confirmed");
          if (confirmedIndex !== -1) {
            nextQueue = [...nextQueue.slice(0, confirmedIndex), ...nextQueue.slice(confirmedIndex + 1), newOrder];
          } else if (nextQueue.length < 8) {
            nextQueue = [...nextQueue, newOrder];
          }
        }

        return nextQueue.slice(-10); // Keep last 10
      });

      // Update simulated drivers
      setSimulatedDrivers(prev => {
        const next = { ...prev };
        dispatchQueue.forEach(item => {
          if (item.status === 'confirmed' || item.status === 'assigned' || item.status === 'pending') {
            const driverId = item.autoAssign || item.id;
            const current = next[driverId] || { ...item.originCoords, heading: 0 };
            const dest = item.destCoords;
            
            if (dest) {
              const dx = dest.lng - current.lng;
              const dy = dest.lat - current.lat;
              const dist = Math.sqrt(dx*dx + dy*dy);
              
              if (dist > 0.0001) {
                const step = 0.0005; // speed
                const angle = Math.atan2(dy, dx);
                next[driverId] = {
                  lat: current.lat + Math.sin(angle) * step,
                  lng: current.lng + Math.cos(angle) * step,
                  heading: (angle * 180) / Math.PI,
                  name: driverId
                };
              }
            }
          }
        });
        return next;
      });

    }, 1000);
    return () => clearInterval(timer);
  }, [dispatchQueue]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleDispatchConfirm = (orderId) => {
    setDispatchQueue((prev) =>
      prev.map((item) =>
        item.id === orderId ? { ...item, status: "confirmed" } : item,
      ),
    );
  };

  const handleDeployUnits = () => {
    navigate("/deploy-units");
  };

  const menuItems = [
    {
      id: "simulation",
      label: "Simulation",
      icon: "model_training",
      path: "/dashboard",
    },
    {
      id: "bookride",
      label: "Book My Ride",
      icon: "local_taxi",
      path: "/book-ride",
    },
    {
      id: "ridehistory",
      label: "Ride History",
      icon: "history",
      path: "/ride-history",
    },
    {
      id: "analytics",
      label: "AI Dispatch",
      icon: "query_stats",
      path: "/ai-dispatch",
    },
    {
      id: "heatmaps",
      label: "Demand Heatmaps",
      icon: "local_fire_department",
      path: "/demand-heatmaps",
    },
    {
      id: "fleet",
      label: "Fleet Management",
      icon: "airport_shuttle",
      path: "/fleet",
    },
    {
      id: "safety",
      label: "Safety & Security",
      icon: "verified_user",
      path: "/safety",
    },
  ];

  const stats = [
    {
      label: "Pending Requests",
      value: pendingRequests.toString(),
      trend: "+12%",
      icon: "pending_actions",
      color: "text-gray-400",
    },
    {
      label: "Live Fleets",
      value: liveFleets.toString(),
      total: "92",
      subtext: `${((liveFleets / 92) * 100).toFixed(0)}% Deployment`,
      icon: "electric_car",
      color: "text-gray-400",
    },
    {
      label: "Efficiency Core",
      value: `${efficiency.toFixed(1)}%`,
      subtext: "Optimal Route",
      icon: "speed",
      color: "text-gray-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="p-6">
          <Link
            to="/"
            className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity"
            title="Back to Home"
          >
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20 transition-all">
              <span className="material-symbols-outlined text-white text-xl">
                rocket_launch
              </span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">
              SHUTTLE
              <span className="text-[var(--text-main)] opacity-70">CORE</span>
            </span>
          </Link>

          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">
              Operational Hub
            </p>
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate(item.path);
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}
              >
                <span
                  className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
                >
                  {item.icon}
                </span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <motion.button
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(244, 63, 94, 0.1)",
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              alert("EMERGENCY STOP ACTIVATED: All fleet units halted.")
            }
            className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
          >
            <span className="material-symbols-outlined text-lg animate-pulse">
              emergency_home
            </span>
            Emergency Stop
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border-[var(--border)]"
          >
            <div className="flex items-center gap-3 mb-4 group/pcard cursor-pointer" onClick={() => navigate("/profile")}>
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-white/20 group-hover/pcard:border-[var(--primary)] transition-all"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--surface)]"></div>
              </div>
              <div>
                <p className="text-[13px] font-black text-main leading-tight group-hover/pcard:text-[var(--primary)] transition-colors">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] text-muted uppercase font-bold tracking-wider">
                  {user.role}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg hover:bg-rose-400/5"
            >
              <span className="material-symbols-outlined text-xs">logout</span>
              Terminate Session
            </motion.button>
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg transition-colors duration-300 z-30">
          <div className="flex items-center gap-4 flex-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden icon-btn"
            >
              <span className="material-symbols-outlined">menu</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[11px] font-black text-muted hover:text-[var(--text-main)] hover:border-[var(--primary)] transition-all"
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              <span className="hidden sm:inline">Dashboard</span>
            </motion.button>
            <div className="flex-1 max-w-xl hidden sm:block">
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[var(--text-main)] transition-colors text-lg">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search telemetry, nodes, or logs..."
                  className="input-field !pl-11"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
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

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/notifications")}
                className="icon-btn relative"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-emerald-500 rounded-full border-2 border-[var(--background)] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="icon-btn hidden xs:flex"
            >
              <span className="material-symbols-outlined">settings</span>
            </motion.button>

            <div className="h-8 w-[1px] bg-[var(--border)] mx-1"></div>

            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary !py-2 !px-5 flex items-center gap-2 group shadow-none"
            >
              <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform duration-500">
                add
              </span>
              <span className="hidden xs:inline text-xs font-black uppercase tracking-wider">
                New Dispatch
              </span>
            </motion.button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-[1600px] mx-auto"
          >
            {/* Book My Ride Feature Card */}
            <motion.div 
              variants={itemVariants} 
              className="mb-8 dashboard-card !p-6 bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/20"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[var(--primary)]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[var(--primary)] text-3xl">history</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-main mb-1">Ride History</h3>
                    <p className="text-[13px] text-muted">View all your past and upcoming bookings</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/ride-history")}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-xl text-[12px] font-black uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  View History
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
              {/* Hero Status: Active Orders */}
              <section className="col-span-12 lg:col-span-8 space-y-6">
                {/* Stats Cards */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.2)" }}
                    className="card-white p-8 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all"></div>
                    <div className="flex justify-between items-start mb-6">
                      <p className="text-[10px] font-black text-muted uppercase tracking-[0.2em] opacity-60">
                        {stat.label}
                      </p>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-white transition-colors">
                        {stat.icon}
                      </span>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-main tracking-tighter">
                        {stat.value}
                        {stat.total && (
                          <span className="text-sm text-muted ml-1 opacity-40">
                            /{stat.total}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[10px] font-black mt-2 uppercase tracking-widest ${stat.trend ? "text-emerald-400" : "text-slate-500"}`}
                      >
                        {stat.trend && (
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-xs">
                              trending_up
                            </span>
                            {stat.trend}
                          </span>
                        )}
                        {stat.subtext && stat.subtext}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Real-time Dispatch Map */}
              <motion.div
                variants={itemVariants}
                className="dashboard-card !p-0 rounded-[32px] overflow-hidden h-[450px] relative group border-[var(--border)] shadow-2xl"
              >
                {(!isLoaded || !googleMapsApiKey) ? (
                  <TacticalRadar />
                ) : (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={currentLocation || { lat: 23.0850, lng: 72.6450 }}
                    zoom={14}
                    options={MAP_OPTIONS}
                    onLoad={(map) => setMap(map)}
                  >
                    {/* User's Own Location */}
                    {currentLocation && (
                      <Marker
                        position={currentLocation}
                        icon={{
                          path: google.maps.SymbolPath.CIRCLE,
                          fillColor: profile?.role === 'driver' ? '#6366F1' : '#10B981',
                          fillOpacity: 1,
                          strokeWeight: 2,
                          strokeColor: '#FFFFFF',
                          scale: 8
                        }}
                      />
                    )}

                    {/* Passenger Demand Clusters */}
                    {clusters.map((cluster, idx) => (
                      <React.Fragment key={`cluster-${idx}`}>
                        <Circle
                          center={cluster.coordinates}
                          radius={300}
                          options={{
                            fillColor: cluster.demand === 'High' ? '#F59E0B' : '#10B981',
                            fillOpacity: 0.15,
                            strokeColor: cluster.demand === 'High' ? '#F59E0B' : '#10B981',
                            strokeWeight: 1,
                            strokeOpacity: 0.3
                          }}
                        />
                        <Marker
                          position={cluster.coordinates}
                          icon={{
                            path: google.maps.SymbolPath.CIRCLE,
                            fillColor: cluster.demand === 'High' ? '#F59E0B' : '#10B981',
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: '#FFFFFF',
                            scale: 4
                          }}
                          label={{
                            text: cluster.passengers.toString(),
                            color: 'white',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            className: 'mt-4'
                          }}
                        />
                      </React.Fragment>
                    ))}

                    {/* Active Routes */}
                    {activeRoutes.map((path, idx) => (
                      <Polyline
                        key={`route-${idx}`}
                        path={path}
                        options={{
                          strokeColor: '#6366F1',
                          strokeOpacity: 0.4,
                          strokeWeight: 2,
                          geodesic: true,
                          icons: [{
                            icon: { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
                            offset: '100%',
                            repeat: '50px'
                          }]
                        }}
                      />
                    ))}
                    {/* Connected Drivers */}
                    {Object.values(connectedUsersLocations).map((userLoc, i) => (
                      <Marker
                        key={`driver-${i}`}
                        position={{ lat: userLoc.lat, lng: userLoc.lng }}
                        onClick={() => setSelectedUser(userLoc)}
                        icon={{
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          fillColor: '#6366F1',
                          fillOpacity: 1,
                          strokeWeight: 2,
                          strokeColor: '#FFFFFF',
                          scale: 6,
                          rotation: userLoc.heading || 0
                        }}
                      />
                    ))}

                    {/* Simulated Drivers Tracking */}
                    {Object.values(simulatedDrivers).map((driver, i) => (
                      <Marker
                        key={`sim-driver-${i}`}
                        position={{ lat: driver.lat, lng: driver.lng }}
                        onClick={() => setSelectedUser({ ...driver, role: 'driver' })}
                        icon={{
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          fillColor: '#10B981',
                          fillOpacity: 1,
                          strokeWeight: 2,
                          strokeColor: '#FFFFFF',
                          scale: 7,
                          rotation: driver.heading
                        }}
                      />
                    ))}

                    {/* Live Connected Drivers */}
                    {Object.values(connectedUsersLocations).map((userLoc, i) => (
                      <Marker
                        key={`driver-${i}`}
                        position={{ lat: userLoc.lat, lng: userLoc.lng }}
                        onClick={() => setSelectedUser(userLoc)}
                        icon={{
                          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                          fillColor: '#6366F1',
                          fillOpacity: 1,
                          strokeWeight: 2,
                          strokeColor: '#FFFFFF',
                          scale: 6,
                          rotation: userLoc.heading || 0
                        }}
                      />
                    ))}

                    {selectedUser && (
                      <InfoWindow
                        position={{ lat: selectedUser.lat, lng: selectedUser.lng }}
                        onCloseClick={() => setSelectedUser(null)}
                      >
                        <div className="bg-[var(--surface)] p-2 rounded border border-[var(--border)] min-w-[140px]">
                          <p className="font-bold text-xs uppercase text-[var(--text-main)] mb-1">{selectedUser.name}</p>
                          <p className="text-[9px] text-[var(--primary)] font-black uppercase">{selectedUser.role}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                )}

                {/* HUD Overlay - Status */}
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 border shadow-2xl transition-all bg-black/60 backdrop-blur-xl border-emerald-500/30 text-white`}>
                    <div className={`w-2 h-2 rounded-full ${trackingActive ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10B981]' : 'bg-rose-500 animate-ping'}`}></div>
                    {trackingActive ? 'Live Network Stream: Active' : 'Network Stream: Reconnecting...'}
                  </div>
                </div>

                {/* Tracking Status Badge */}
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="px-4 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                    Tracking Active
                  </div>
                </div>

                {/* Map Legend HUD */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-8 shadow-2xl pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">Active Nodes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">High Demand</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 flex gap-2">
                  <button
                    onClick={() => {
                      if (map && currentLocation) {
                        map.panTo(currentLocation);
                        map.setZoom(15);
                      }
                    }}
                    className="p-3 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">navigation</span>
                  </button>
                </div>
              </motion.div>

              {/* Pending Dispatch Table */}
              <motion.div
                variants={itemVariants}
                className="dashboard-card !p-0 rounded-[24px] overflow-hidden border-[var(--border)] shadow-2xl"
              >
                <div className="px-8 py-8 border-b border-[var(--border)] flex justify-between items-center bg-[var(--surface-muted)]">
                  <h3 className="text-2xl font-black text-main tracking-tight">
                    Live Dispatch Queue
                  </h3>
                  <button className="text-[10px] font-black text-muted hover:text-white uppercase tracking-[0.25em] transition-colors opacity-70">
                    ARCHIVE TERMINAL
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] font-black text-muted uppercase tracking-[0.25em] border-b border-[var(--border)] bg-[var(--surface-muted)]">
                        <th className="px-8 py-5 font-black">ORDER ID</th>
                        <th className="px-8 py-5 font-black">PASSENGER</th>
                        <th className="px-8 py-5 font-black">ROUTE MATRIX</th>
                        <th className="px-8 py-5 font-black">PRIORITY</th>
                        <th className="px-8 py-5 font-black">AUTO-ASSIGN</th>
                        <th className="px-8 py-5 font-black text-center">COMMS</th>
                        <th className="px-8 py-5 font-black">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {dispatchQueue.map((item) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-[var(--surface-muted)] transition-colors group"
                        >
                          <td className="px-8 py-7 font-mono text-[11px] font-bold text-muted opacity-60">
                            {item.id}
                          </td>
                          <td className="px-8 py-7">
                            <p className="text-lg font-black text-main tracking-tight group-hover:text-white transition-colors">
                              {item.passenger}
                            </p>
                          </td>
                          <td className="px-8 py-7">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col">
                                <span className="text-[11px] font-black text-muted uppercase tracking-widest opacity-60">
                                  {item.origin}
                                </span>
                              </div>
                              <span className="material-symbols-outlined text-sm text-muted opacity-30">
                                arrow_forward
                              </span>
                              <div className="flex flex-col">
                                <span className="text-[11px] font-black text-main uppercase tracking-widest">
                                  {item.destination}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-7">
                            <span
                              className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase border ${item.priority === "URGENT" ? "bg-rose-500/5 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]" : "bg-slate-500/5 text-slate-400 border-slate-500/20"}`}
                            >
                              {item.priority}
                            </span>
                          </td>
                          <td className="px-8 py-7">
                            {item.autoAssign ? (
                              <div className="flex items-center gap-3 text-slate-300">
                                <span className="material-symbols-outlined text-lg opacity-40">
                                  smart_toy
                                </span>
                                <span className="text-[11px] font-black tracking-widest">
                                  {item.autoAssign}
                                </span>
                              </div>
                            ) : (
                              <span className="text-[11px] font-black text-muted opacity-40 uppercase tracking-[0.2em]">
                                WAIT-LIST
                              </span>
                            )}
                          </td>
                          <td className="px-8 py-7 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                const notification = document.createElement("div");
                                notification.id = "active-call-toast";
                                notification.className = "fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-[var(--primary)] text-white px-8 py-6 rounded-[2rem] shadow-2xl flex flex-col items-center gap-4 animate-bounce-in border border-white/20 backdrop-blur-2xl transition-all";
                                notification.innerHTML = `
                                  <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center animate-pulse" id="call-icon-container">
                                    <span class="material-symbols-outlined text-4xl">call</span>
                                  </div>
                                  <div class="text-center">
                                    <p class="font-black text-lg uppercase tracking-widest" id="call-status">Calling Driver...</p>
                                    <p class="text-xs opacity-70">${item.autoAssign || 'Assigned Unit'}</p>
                                  </div>
                                  <button class="mt-2 px-6 py-2 bg-rose-500 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-colors" onclick="this.parentElement.remove(); window.speechSynthesis.cancel();">End Call</button>
                                `;
                                document.body.appendChild(notification);

                                // Simulation: Connection after 2 seconds
                                setTimeout(() => {
                                  const status = document.getElementById("call-status");
                                  const container = document.getElementById("call-icon-container");
                                  if (status && container) {
                                    status.innerText = "CONNECTED";
                                    container.classList.remove("bg-white/20");
                                    container.classList.add("bg-emerald-500/40");
                                    
                                    // Get driver's current location for context
                                    const driverLoc = simulatedDrivers[item.autoAssign || item.id] || { lat: 23.0850, lng: 72.6450 };
                                    const locationName = driverLoc.lat > 23.08 ? "Nana Chiloda" : driverLoc.lat > 23.07 ? "Airport Road" : "Naroda";

                                    const speak = (text) => {
                                      window.speechSynthesis.cancel(); // Stop any current speech
                                      const utterance = new SpeechSynthesisUtterance(text);
                                      const voices = window.speechSynthesis.getVoices();
                                      
                                      // Priority voices for better quality
                                      const premiumVoice = voices.find(v => v.name.includes('Google') && v.lang.includes('en')) || 
                                                           voices.find(v => v.lang.includes('en-GB')) || 
                                                           voices[0];
                                      
                                      utterance.voice = premiumVoice;
                                      utterance.pitch = 1.1;
                                      utterance.rate = 1.3; // Slightly faster for responsiveness
                                      utterance.volume = 1;
                                      window.speechSynthesis.speak(utterance);
                                      return utterance;
                                    };

                                    const startInteractiveSession = () => {
                                      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                                      if (!Recognition) return;
                                      
                                      const recognition = new Recognition();
                                      recognition.continuous = false;
                                      recognition.interimResults = false;
                                      recognition.lang = 'en-US';

                                      recognition.onstart = () => {
                                        if (status) {
                                          status.innerHTML = `<span class="flex items-center gap-2 text-emerald-400 font-black animate-pulse"><span class="material-symbols-outlined text-sm">mic</span> LISTENING...</span>`;
                                        }
                                        container.classList.add("ring-8", "ring-emerald-500/30");
                                      };

                                      recognition.onresult = (event) => {
                                        const transcript = event.results[0][0].transcript.toLowerCase();
                                        if (status) status.innerHTML = `<span class="text-indigo-400 font-black">PROCESSING...</span>`;

                                        let response = "Acknowledged, Dispatch. Continuing mission.";
                                        
                                        // Enhanced Natural Language Logic
                                        if (transcript.includes("where") || transcript.includes("location") || transcript.includes("area") || transcript.includes("loaction")) {
                                          response = `I am currently passing through ${locationName}. The road is clear and I am on schedule.`;
                                        } else if (transcript.includes("who") || transcript.includes("identify") || transcript.includes("name")) {
                                          response = `This is Unit ${item.autoAssign || 'Delta-1'}. System status is green.`;
                                        } else if (transcript.includes("hurry") || transcript.includes("fast") || transcript.includes("emergency")) {
                                          response = "Copy that! Activating high-priority transit mode. ETA reduced by 2 minutes.";
                                        } else if (transcript.includes("hello") || transcript.includes("hi") || transcript.includes("anyone")) {
                                          response = `Hello Dispatch, Unit ${item.autoAssign} is connected and awaiting your orders.`;
                                        } else if (transcript.includes("time") || transcript.includes("eta") || transcript.includes("long")) {
                                          response = `My navigation system predicts arrival at ${item.origin} in approximately 3 minutes.`;
                                        } else if (transcript.includes("status") || transcript.includes("ok") || transcript.includes("how are you")) {
                                          response = "All systems operational. Vehicle telemetry is stable and I am focused on the route.";
                                        } else if (transcript.includes("stop") || transcript.includes("abort") || transcript.includes("wait")) {
                                          response = "Understood. Re-routing to a safe standby position in the Naroda sector.";
                                        }

                                        // Instant reply - no timeout
                                        if (status) status.innerHTML = `<span class="text-white font-black animate-pulse">REPLYING...</span>`;
                                        const utt = speak(response);
                                        utt.onend = () => {
                                          startInteractiveSession();
                                        };
                                      };

                                      recognition.onerror = () => {
                                        if (status) status.innerText = "CONNECTED";
                                        setTimeout(startInteractiveSession, 100); // Fast restart
                                      };

                                      try { recognition.start(); } catch(e) {}
                                    };

                                    // Initial Greeting
                                    const greeting = speak(`Hello, this is ${item.autoAssign || 'your driver'}. I am on my way, currently near ${locationName}. How can I help you?`);
                                    greeting.onend = () => {
                                      startInteractiveSession();
                                    };
                                  }
                                }, 500);
                              }}
                              className="w-10 h-10 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary)] hover:text-white transition-all shadow-lg shadow-[var(--primary)]/20"
                            >
                              <span className="material-symbols-outlined text-lg">call</span>
                            </motion.button>
                          </td>
                          <td className="px-8 py-7">
                            {item.status === "pending" ? (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  // Call original handler
                                  handleDispatchConfirm(item.id);
                                  
                                  // Also save to history for demo
                                  const confirmedBooking = {
                                    id: item.id,
                                    pickup: item.origin,
                                    dropoff: item.destination,
                                    vehicle: { name: item.autoAssign || 'Assigned Unit', icon: 'airport_shuttle', color: 'text-emerald-400', bgColor: 'bg-emerald-400/10' },
                                    status: 'confirmed',
                                    timestamp: new Date().toISOString(),
                                    price: 250,
                                    paymentMethod: 'card',
                                    bookingType: 'now'
                                  };
                                  const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
                                  localStorage.setItem('bookings', JSON.stringify([confirmedBooking, ...existing]));
                                }}
                                className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-2xl shadow-indigo-500/20"
                              >
                                CONFIRM
                              </motion.button>
                            ) : item.status === "confirmed" ? (
                              <div className="flex items-center gap-2 text-emerald-400">
                                <span className="material-symbols-outlined text-sm">
                                  verified
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                  Dispatched
                                </span>
                              </div>
                            ) : (
                              <button className="text-[11px] font-black text-muted hover:text-white uppercase tracking-[0.2em] transition-all opacity-70">
                                DETAILS
                              </button>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </section>

            {/* Operational Sidebar Insights */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">
              {/* AI Insights Card */}
              <motion.div
                variants={itemVariants}
                className="card-white !p-8 rounded-[24px] relative overflow-hidden shadow-2xl"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-[var(--surface-muted)] flex items-center justify-center border border-[var(--border)] shadow-xl">
                    <span className="material-symbols-outlined text-white text-xl">
                      psychology
                    </span>
                  </div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-main">
                    AI Dispatcher Pulse
                  </h3>
                </div>
                <p className="text-sm text-muted mb-8 leading-relaxed font-medium">
                  System detecting increased demand in{" "}
                  <span className="text-[var(--text-main)] font-black">
                    North Sector
                  </span>
                  . Recommend repositioning{" "}
                  <span className="text-[var(--text-main)] font-black">
                    4 idle units
                  </span>{" "}
                  from District 2 to offset predicted 15-minute delays.
                </p>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[var(--surface-muted)] p-4 rounded-2xl border border-[var(--border)] flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-main">
                      Action Needed
                    </span>
                  </div>
                  <button
                    onClick={handleDeployUnits}
                    className="text-[10px] font-black text-white hover:text-white/80 transition-all uppercase tracking-widest underline decoration-white/20 underline-offset-4"
                  >
                    DEPLOY UNITS
                  </button>
                </motion.div>
              </motion.div>

              {/* System Telemetry */}
                <motion.div
                  variants={itemVariants}
                  className="card-white !p-8 rounded-[28px] shadow-2xl"
                >
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted mb-8 opacity-60">
                  Network Health
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      label: "Bandwidth Load",
                      value: `${networkHealth.bandwidth.toFixed(0)}%`,
                      color: "bg-white/40",
                      progress: networkHealth.bandwidth,
                    },
                    {
                      label: "Satellite Uplink",
                      value: networkHealth.uplink,
                      color: networkHealth.uplink === "Stable" ? "bg-emerald-500" : "bg-amber-500 animate-pulse",
                      progress: networkHealth.uplink === "Stable" ? 100 : 50,
                    },
                    {
                      label: "Compute Latency",
                      value: `${networkHealth.latency}ms`,
                      color: "bg-white/20",
                      progress: (networkHealth.latency / 50) * 100,
                    },
                  ].map((tele, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-[10px] mb-3 uppercase font-black tracking-widest">
                        <span className="text-muted">{tele.label}</span>
                        <span className="text-main">{tele.value}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${tele.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${tele.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Driver Safety Mini-Feed */}
              <motion.div
                variants={itemVariants}
                className="dashboard-card !p-0 rounded-[24px] overflow-hidden shadow-2xl border-[var(--border)]"
              >
                <div className="px-8 py-5 border-b border-[var(--border)] bg-[var(--surface-muted)]">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-muted opacity-60">
                    Tele-Operator Feeds
                  </h3>
                </div>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {[
                    {
                      id: "104",
                      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHb63VKEQkFcvUDOzRo9br8wzOCHG9ADdsJLU-ev5TODsXOOsMu_vqvhq8OnGt3yS_U-uyo89DglzV7EwDZ-dIXmlRpOZoh9o6E4ya0n2ZojOXrGiG2jvBDrYdKd2lAjac4ETxfoMbqrdcWOy0XxJjcDFfL3aqRnqADkjFgx9_81dY549j8bYLzO87yh8cKrp5070S-hvpkBIPpVV-CLkk1Bqpf6WIGz8mtFdiiXFTlMFjDzY8jsPvecwAiNA2P3rumO_eoYCYZII",
                    },
                    {
                      id: "208",
                      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVG2zv74HfVcALoQrNxSMfuT3it3bp7GiX3jl-T3U157Ghf3bjocy1r5DcJsmKsN7KcLv8PTARQkP90BGonEKUWhz-dof2aNmbPwRS7BANqZmfYs7MZKqNZZrHUohZYttsFaa3M981oSPO-2qTHDwHvI2HC1gBlag0phkdxEaO3u9XjAjVWzFFAeGaC1ii_G2CON8HHU-OgomROhNx0UZUG1r8TPpDsmRjDr6lW_wERFfRegLVULw88K1eiGhDbBfWVMjuvTC6G7M",
                    },
                  ].map((feed, i) => {
                    const opState = operators.find(o => o.id === feed.id);
                    return (
                      <div
                        key={i}
                        className="aspect-video bg-black rounded-xl relative overflow-hidden border border-white/10 group cursor-pointer"
                      >
                        <img
                          src={feed.img}
                          alt={`Unit ${feed.id}`}
                          className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${opState?.status} animate-pulse`}
                          ></div>
                          <span className="text-[8px] font-black text-white uppercase tracking-widest">
                            UNIT {feed.id}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-6 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="w-full py-3 border border-[var(--border)] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-muted hover:text-[var(--text-main)] hover:bg-[var(--surface-muted)] transition-all"
                  >
                    Enter Override Control
                  </motion.button>
                </div>
              </motion.div>
            </aside>
            </div>
          </motion.div>

          {/* Footer Area */}
          <footer className="mt-12 border-t border-[var(--border)] py-12 mt-auto">
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

        {/* Floating Action Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 h-16 w-16 bg-[var(--primary)] text-white rounded-2xl shadow-2xl flex items-center justify-center z-50 transition-all"
        >
          <span className="material-symbols-outlined text-3xl font-black">
            bolt
          </span>
        </motion.button>
      </main>
    </div>
  );
};

export default AIDispatchPage;
