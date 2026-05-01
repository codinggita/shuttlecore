require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middleware/errorHandler');

// Import routes
const authRoutes = require('./src/routes/auth');
const bookingRoutes = require('./src/routes/bookings');
const vehicleRoutes = require('./src/routes/vehicles');
const incidentRoutes = require('./src/routes/incidents');
const driverRoutes = require('./src/routes/drivers');
const clusterRoutes = require('./src/routes/clusters');
const notificationRoutes = require('./src/routes/notifications');
const deploymentRoutes = require('./src/routes/deployments');
const paymentRoutes = require('./src/routes/payments');
const eventLogRoutes = require('./src/routes/eventLogs');
const dispatchRoutes = require('./src/routes/dispatch');
const safetyEventRoutes = require('./src/routes/safetyEvents');
const riderRoutes = require('./src/routes/riders');

const app = express();

// Connect to database
connectDB();

// Middleware
const allowedOrigins = [
  "https://shuttle-core.netlify.app",
  "https://shuttle-core1.netlify.app",
  "https://shuttlecore4.netlify.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/clusters', clusterRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/deployments', deploymentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/event-logs', eventLogRoutes);
app.use('/api/dispatch', dispatchRoutes);
app.use('/api/safety-events', safetyEventRoutes);
app.use('/api/riders', riderRoutes);

// Health check endpoint
app.get("/health", (req, res) => res.status(200).json({ status: "OK", service: "ShuttleCore API" }));

// Error handler (must be last)
app.use(errorHandler);

const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

let connectedClients = 0;

io.on("connection", (socket) => {
  connectedClients++;
  console.log(`[Socket] Connected: ${socket.id} | Total Clients: ${connectedClients}`);

  // Send initial welcome payload
  socket.emit("connection_established", {
    status: "Nominal",
    timestamp: new Date().toISOString(),
    message: "Connected to ShuttleCore Real-Time Engine"
  });

  // Real-time fleet location updates (every 2 seconds)
  const fleetInterval = setInterval(() => {
    socket.emit("fleet_location_update", {
      unit: "TX-402",
      lat: (37.7749 + (Math.random() - 0.5) * 0.05).toFixed(6),
      lng: (-122.4194 + (Math.random() - 0.5) * 0.05).toFixed(6),
      velocity: Math.floor(Math.random() * 60) + 10,
      heading: ['Northbound', 'Southbound', 'Eastbound', 'Westbound'][Math.floor(Math.random() * 4)],
      battery: Math.floor(Math.random() * 40) + 60,
      timestamp: new Date().toISOString()
    });
  }, 2000);

  // Live map updates - multiple vehicles (every 1 second)
  const liveMapInterval = setInterval(() => {
    const vehicles = [
      { unitId: 'SH-402', lat: 37.7749, lng: -122.4194, status: 'in_transit' },
      { unitId: 'SH-881', lat: 37.7849, lng: -122.4094, status: 'available' },
      { unitId: 'SH-209', lat: 37.7649, lng: -122.4294, status: 'in_transit' },
      { unitId: 'SH-103', lat: 37.7949, lng: -122.3994, status: 'charging' },
      { unitId: 'SH-777', lat: 37.7549, lng: -122.4394, status: 'available' },
    ];

    const liveVehicles = vehicles.map(v => ({
      ...v,
      lat: (parseFloat(v.lat) + (Math.random() - 0.5) * 0.001).toFixed(6),
      lng: (parseFloat(v.lng) + (Math.random() - 0.5) * 0.001).toFixed(6),
      speed: Math.floor(Math.random() * 30) + 10,
      heading: ['Northbound', 'Southbound', 'Eastbound', 'Westbound'][Math.floor(Math.random() * 4)],
      battery: Math.floor(Math.random() * 30) + 70,
      timestamp: new Date().toISOString()
    }));

    socket.emit("live_map_update", {
      vehicles: liveVehicles,
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 13
    });
  }, 1000);

  // Status changes (every 3 seconds)
  const statusInterval = setInterval(() => {
    if (Math.random() > 0.7) {
      const statuses = ["Transit", "Charging", "Standby", "Docking"];
      socket.emit("status_change", {
        unit: "NY-881",
        status: statuses[Math.floor(Math.random() * statuses.length)],
        progress: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString()
      });
    }
  }, 3000);

  // Urgent alerts (every 10 seconds)
  const alertInterval = setInterval(() => {
    if (Math.random() > 0.8) {
      socket.emit("urgent_alert", {
        id: `ALRT-${Math.floor(Math.random() * 1000)}`,
        level: "WARNING",
        message: "Traffic density spike detected in Sector 4",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  }, 10000);

  // Emergency notifications
  socket.on("emergency_trigger", (data) => {
    io.emit("emergency_broadcast", {
      ...data,
      timestamp: new Date().toISOString()
    });
  });

  socket.on("disconnect", () => {
    connectedClients--;
    console.log(`[Socket] Disconnected: ${socket.id} | Total Clients: ${connectedClients}`);
    clearInterval(fleetInterval);
    clearInterval(liveMapInterval);
    clearInterval(statusInterval);
    clearInterval(alertInterval);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`🚀 ShuttleCore API Server running on port ${PORT}`);
  console.log(`📡 WebSocket Server ready for connections`);
});
