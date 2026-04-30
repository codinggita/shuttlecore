const mongoose = require('mongoose');

const safetyEventSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Harsh Braking', 'Speed Limit +15', 'Aggressive Turn', 'Lane Departure', 'Collision Warning', 'Other']
  },
  icon: {
    type: String,
    default: 'warning'
  },
  color: {
    type: String,
    default: 'red'
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  location: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  impactForce: {
    type: Number,
    default: 0
  },
  speed: {
    type: Number,
    default: 0
  },
  speedLimit: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SafetyEvent', safetyEventSchema);
