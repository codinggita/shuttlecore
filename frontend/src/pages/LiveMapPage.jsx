import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  updateLiveLocation, 
  toggleTracking, 
  setConnectedUserLocations 
} from '../features/user/userSlice';
import { useSocket, emitLocation } from '../context/SocketContext';
import axios from 'axios';
import { 
  MapPin, 
  Navigation, 
  Users, 
  Shield, 
  AlertCircle, 
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';

const MAP_OPTIONS = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#94A3B8' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ color: '#0B0E14' }]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [{ saturation: -100 }, { lightness: -70 }]
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      elementType: 'all',
      stylers: [{ color: '#1C222D' }]
    }
  ]
};

const LiveMapPage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { currentLocation, trackingActive, connectedUsersLocations } = useSelector((state) => state.user);
  const { socket, isConnected } = useSocket();
  
  const [map, setMap] = useState(null);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [simulatedDrivers, setSimulatedDrivers] = useState({});

  const watchId = useRef(null);
  const trackingInterval = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    language: 'en'
  });

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    setIsLoading(false);
  }, []);

  const handleLocationUpdate = useCallback(async (position) => {
    const { latitude, longitude } = position.coords;
    const newLocation = { lat: latitude, lng: longitude };
    
    // Update Redux state
    dispatch(updateLiveLocation(newLocation));
    setLastUpdated(new Date());

    if (profile) {
      const locationData = {
        userId: profile.id || profile._id,
        name: `${profile.firstName} ${profile.lastName}`,
        role: profile.role,
        ...newLocation
      };

      // Emit via Socket.io
      emitLocation(socket, locationData);

      // Persist to Backend (Debounced or throttled would be better, but doing it here for simplicity as requested)
      try {
        await axios.put('/api/dispatch/location', locationData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (err) {
        console.error('Failed to update location on server:', err);
      }
    }
  }, [dispatch, profile, socket]);

  const handleLocationError = useCallback((err) => {
    let message = 'An unknown error occurred';
    switch (err.code) {
      case err.PERMISSION_DENIED:
        message = 'Location access denied. Please enable permissions to use the live map.';
        break;
      case err.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable.';
        break;
      case err.TIMEOUT:
        message = 'The request to get user location timed out.';
        break;
    }
    setError(message);
    if (trackingActive) {
      dispatch(toggleTracking());
    }
  }, [dispatch, trackingActive]);

  useEffect(() => {
    if (trackingActive) {
      setError(null);
      if ("geolocation" in navigator) {
        // Start watching position
        watchId.current = navigator.geolocation.watchPosition(
          handleLocationUpdate,
          handleLocationError,
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setError('Geolocation is not supported by your browser.');
      }
    } else {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    }

    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [trackingActive, handleLocationUpdate, handleLocationError]);

  // Simulation Effect for Live Map demo
  useEffect(() => {
    const timer = setInterval(() => {
      setSimulatedDrivers(prev => {
        const next = { ...prev };
        // Create 2 mock drivers if they don't exist
        const mocks = [
          { id: 'sim-104', name: 'Unit 104', dest: { lat: 23.0850, lng: 72.6450 }, start: { lat: 23.0950, lng: 72.6350 } },
          { id: 'sim-223', name: 'Unit 223', dest: { lat: 23.0650, lng: 72.6650 }, start: { lat: 23.0750, lng: 72.6550 } }
        ];

        mocks.forEach(m => {
          const current = next[m.id] || { ...m.start, heading: 0 };
          const dx = m.dest.lng - current.lng;
          const dy = m.dest.lat - current.lat;
          const dist = Math.sqrt(dx*dx + dy*dy);

          if (dist > 0.0001) {
            const step = 0.0003;
            const angle = Math.atan2(dy, dx);
            next[m.id] = {
              lat: current.lat + Math.sin(angle) * step,
              lng: current.lng + Math.cos(angle) * step,
              heading: (angle * 180) / Math.PI,
              name: m.name,
              userId: m.id,
              role: 'driver'
            };
          } else {
            // Reset to start if arrived
            next[m.id] = { ...m.start, heading: 0, name: m.name, userId: m.id, role: 'driver' };
          }
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const centerMap = () => {
    if (map && currentLocation) {
      map.panTo(currentLocation);
      map.setZoom(15);
    }
  };

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Tactical Radar Fallback
  const TacticalRadar = () => (
    <div className="w-full h-full bg-[#0B0E14] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-[var(--primary)]/10 to-transparent origin-center pointer-events-none" />
      <div className="relative z-10 text-center">
        <div className="w-20 h-20 rounded-full border-2 border-[var(--primary)]/30 flex items-center justify-center mb-6 animate-pulse mx-auto">
          <span className="material-symbols-outlined text-3xl text-[var(--primary)]">radar</span>
        </div>
        <h3 className="text-xl font-black text-main tracking-tighter uppercase">Live Fleet Radar</h3>
        <p className="text-[9px] text-muted font-black uppercase tracking-[0.2em]">Satellite Connection: Active • Simulation Mode</p>
      </div>
      {Object.values(simulatedDrivers).map((driver, idx) => (
        <div key={`radar-sim-${idx}`} className="absolute w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10B981] animate-pulse" 
             style={{ left: `${((driver.lng - 72.6450) * 5000) + 50}%`, top: `${((23.0850 - driver.lat) * 5000) + 50}%` }}></div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-[var(--background)] overflow-hidden">
      {/* Top Navigation / Status Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)] z-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[var(--primary)]/10 rounded-xl">
            <Navigation className="w-6 h-6 text-[var(--primary)]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight uppercase">Live Fleet Map</h1>
            <div className="flex items-center gap-2 text-[10px] uppercase font-semibold text-[var(--text-muted)]">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
              {isConnected ? 'Real-Time Link Active' : 'Offline'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 px-6 py-2 bg-[var(--surface-light)] rounded-2xl border border-[var(--border)]">
            <div className="flex flex-col">
              <span className="text-[9px] text-[var(--text-muted)] uppercase">Active Trackers</span>
              <span className="text-sm font-bold flex items-center gap-1">
                <Users className="w-3 h-3 text-[var(--primary)]" />
                {connectedUsersLocations.length + (currentLocation ? 1 : 0)}
              </span>
            </div>
            <div className="w-px h-6 bg-[var(--border)]" />
            <div className="flex flex-col">
              <span className="text-[9px] text-[var(--text-muted)] uppercase">Last Update</span>
              <span className="text-sm font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-[var(--primary)]" />
                {lastUpdated ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--'}
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(toggleTracking())}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              trackingActive 
                ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' 
                : 'btn-primary'
            }`}
          >
            {trackingActive ? (
              <>
                <XCircle className="w-4 h-4" />
                Stop Tracking
              </>
            ) : (
              <>
                <Activity className="w-4 h-4" />
                Start Tracking
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        {/* Error Overlay */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
            >
              <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-md rounded-2xl p-4 flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-red-500 uppercase mb-1">Tracking Error</h3>
                  <p className="text-xs text-red-400/80 leading-relaxed">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="text-red-500/50 hover:text-red-500 transition-colors">
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Overlay */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={centerMap}
            disabled={!currentLocation}
            className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text-main)] hover:bg-[var(--surface-light)] transition-all active:scale-95 disabled:opacity-50"
          >
            <Navigation className="w-5 h-5" />
          </button>
        </div>

        {/* Map Container */}
        {(isLoaded && googleMapsApiKey) ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={currentLocation || { lat: 23.0850, lng: 72.6450 }}
            zoom={14}
            onLoad={onMapLoad}
            options={MAP_OPTIONS}
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
                scale: 10
              }}
              onClick={() => setSelectedUser({ 
                name: 'You', 
                role: profile?.role, 
                lat: currentLocation.lat, 
                lng: currentLocation.lng,
                lastSeen: lastUpdated 
              })}
            />
          )}

          {/* Simulated Drivers Tracking */}
          {Object.values(simulatedDrivers).map((driver, i) => (
            <Marker
              key={`sim-driver-${i}`}
              position={{ lat: driver.lat, lng: driver.lng }}
              onClick={() => setSelectedUser(driver)}
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

          {/* Other Connected Users */}
          {connectedUsersLocations.map((user) => (
            <Marker
              key={user.userId}
              position={{ lat: user.lat, lng: user.lng }}
              icon={{
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                fillColor: user.role === 'driver' ? '#6366F1' : '#F59E0B',
                fillOpacity: 0.9,
                strokeWeight: 1,
                strokeColor: '#FFFFFF',
                scale: 6,
                rotation: 0 // Could add heading here
              }}
              onClick={() => setSelectedUser(user)}
            />
          ))}

          {selectedUser && (
            <InfoWindow
              position={{ lat: selectedUser.lat, lng: selectedUser.lng }}
              onCloseClick={() => setSelectedUser(null)}
            >
              <div className="bg-[var(--surface)] p-3 rounded-lg border border-[var(--border)] min-w-[180px]">
                <div className="flex items-center gap-3 mb-2 pb-2 border-b border-[var(--border)]">
                  <div className={`w-2 h-2 rounded-full ${selectedUser.role === 'driver' ? 'bg-indigo-500' : 'bg-green-500'}`} />
                  <span className="font-bold text-sm uppercase tracking-tight text-[var(--text-main)]">
                    {selectedUser.name}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase">Role</span>
                    <span className="text-[10px] font-bold text-[var(--primary)] uppercase">{selectedUser.role}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase">Status</span>
                    <span className="text-[10px] font-bold text-green-500 uppercase">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase">Last Link</span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      {new Date(selectedUser.lastSeen || Date.now()).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
          </GoogleMap>
        ) : (
          <TacticalRadar />
        )}
      </div>

      {/* Sidebar - Tracked Objects List */}
      <div className="absolute bottom-6 left-6 w-80 bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--border)] rounded-3xl p-6 shadow-2xl z-10 hidden lg:block">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold uppercase tracking-widest text-xs">Fleet Registry</h3>
          <span className="px-2 py-1 bg-[var(--surface-light)] rounded-md text-[10px] font-mono border border-[var(--border)]">
            {connectedUsersLocations.length} ACTIVE
          </span>
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {connectedUsersLocations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-8 h-8 text-[var(--surface-light)] mx-auto mb-2" />
              <p className="text-[10px] text-[var(--text-muted)] uppercase">No other units active in sector</p>
            </div>
          ) : (
            connectedUsersLocations.map((user) => (
              <div 
                key={user.userId} 
                className="p-3 bg-[var(--surface-light)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)]/50 transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedUser(user);
                  map?.panTo({ lat: user.lat, lng: user.lng });
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs group-hover:text-[var(--primary)] transition-colors">{user.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    user.role === 'driver' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    {user.lat.toFixed(4)}, {user.lng.toFixed(4)}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[8px] text-green-500 font-bold uppercase">Streaming</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6 pt-6 border-t border-[var(--border)]">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[var(--text-muted)] mb-2">
            <span>Tracking Fidelity</span>
            <span>98%</span>
          </div>
          <div className="h-1 bg-[var(--surface-light)] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '98%' }}
              className="h-full bg-[var(--primary)]" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMapPage;
