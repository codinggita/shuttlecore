const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  passengers: {
    type: Number,
    default: 0
  },
  shuttlesAssigned: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'optimizing'],
    default: 'active'
  },
  color: {
    type: String,
    default: 'bg-emerald-500'
  },
  demand: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  lastUpdate: {
    type: String,
    default: 'Just now'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cluster', clusterSchema);
