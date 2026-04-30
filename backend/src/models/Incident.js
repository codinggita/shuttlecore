const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  unit: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  passengers: {
    type: Number,
    default: 0
  },
  battery: {
    type: Number,
    default: 100
  },
  speed: {
    type: Number,
    default: 0
  },
  heading: {
    type: String,
    default: 'N/A'
  },
  lastUpdate: {
    type: String,
    default: 'Just now'
  },
  description: {
    type: String,
    default: ''
  },
  nearbyUnits: [{
    type: String
  }],
  logs: [{
    time: String,
    msg: String
  }],
  status: {
    type: String,
    enum: ['active', 'resolving', 'resolved'],
    default: 'active'
  },
  resolvedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Incident', incidentSchema);
