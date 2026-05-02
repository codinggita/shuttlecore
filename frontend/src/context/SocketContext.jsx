import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setConnectedUserLocations } from "../features/user/userSlice";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

// Replace with your actual backend URL in production
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [liveMapData, setLiveMapData] = useState(null);
  const [fleetLocations, setFleetLocations] = useState([]);
  const [emergencyAlert, setEmergencyAlert] = useState(null);
  const [urgentAlert, setUrgentAlert] = useState(null);
  const [statusChange, setStatusChange] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Get token from localStorage for authentication
    const token = localStorage.getItem("token");
    
    // Initialize socket connection with auth
    const socketInstance = io(SOCKET_URL, {
      reconnectionDelayMax: 10000,
      reconnectionAttempts: 10,
      auth: { token }
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      setIsConnected(true);
      console.log("Socket connected");
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    });

    socketInstance.on("connection_established", (data) => {
      console.log("Socket connection established:", data.message);
    });

    // Live map updates
    socketInstance.on("live_map_update", (data) => {
      setLiveMapData(data);
    });

    // Fleet location updates
    socketInstance.on("fleet_location_update", (data) => {
      setFleetLocations(prev => {
        const existingIndex = prev.findIndex(v => v.id === data.vehicleId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = { ...updated[existingIndex], ...data };
          return updated;
        }
        return [...prev, data];
      });
    });

    // Emergency broadcasts
    socketInstance.on("emergency_broadcast", (data) => {
      setEmergencyAlert(data);
    });

    // Urgent alerts
    socketInstance.on("urgent_alert", (data) => {
      setUrgentAlert(data);
    });

    // Status changes
    socketInstance.on("status_change", (data) => {
      setStatusChange(data);
    });

    // Location broadcast listener
    socketInstance.on("location_broadcast", (data) => {
      dispatch(setConnectedUserLocations(data));
      window.dispatchEvent(new CustomEvent('LOCATION_UPDATE_RECEIVED', { detail: data }));
    });

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const clearEmergencyAlert = () => setEmergencyAlert(null);
  const clearUrgentAlert = () => setUrgentAlert(null);
  const clearStatusChange = () => setStatusChange(null);

  return (
    <SocketContext.Provider value={{ 
      socket, 
      isConnected, 
      liveMapData, 
      fleetLocations, 
      emergencyAlert, 
      urgentAlert, 
      statusChange,
      clearEmergencyAlert,
      clearUrgentAlert,
      clearStatusChange
    }}>
      {children}
    </SocketContext.Provider>
  );
};

export const emitLocation = (socket, locationData) => {
  if (socket) {
    socket.emit("update_location", locationData);
  }
};
