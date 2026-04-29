const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

// Basic health check endpoint
app.get("/health", (req, res) => res.status(200).json({ status: "OK", service: "Real-Time Engine" }));

const server = http.createServer(app);

// Initialize Socket.io with permissive CORS for development
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
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

  // Simulate real-time fleet movement and alerts
  const simulationInterval = setInterval(() => {
    // 1. Fleet Location Update (High Frequency)
    socket.emit("fleet_location_update", {
      unit: "TX-402",
      lat: (37.7749 + (Math.random() - 0.5) * 0.05).toFixed(6),
      lng: (-122.4194 + (Math.random() - 0.5) * 0.05).toFixed(6),
      velocity: Math.floor(Math.random() * 60) + 10,
      timestamp: new Date().toISOString()
    });

    // 2. Status Changes (Medium Frequency)
    if (Math.random() > 0.8) {
      const statuses = ["Transit", "Charging", "Standby", "Docking"];
      socket.emit("status_change", {
        unit: "NY-881",
        status: statuses[Math.floor(Math.random() * statuses.length)],
        progress: Math.floor(Math.random() * 100),
        timestamp: new Date().toISOString()
      });
    }

    // 3. Urgent Alerts (Low Frequency)
    if (Math.random() > 0.95) {
      socket.emit("urgent_alert", {
        id: `ALRT-${Math.floor(Math.random() * 1000)}`,
        level: "WARNING",
        message: "Traffic density spike detected in Sector 4",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
    }
  }, 2000); // Emits every 2 seconds

  socket.on("disconnect", () => {
    connectedClients--;
    console.log(`[Socket] Disconnected: ${socket.id} | Total Clients: ${connectedClients}`);
    clearInterval(simulationInterval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 ShuttleCore Real-Time Engine running on port ${PORT}`);
});
