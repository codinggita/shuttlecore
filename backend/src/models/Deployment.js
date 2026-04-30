const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
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
  units: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  status: {
    type: String,
    enum: ['active', 'pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  timeSaved: {
    type: Number,
    default: 0
  },
  efficiency: {
    type: Number,
    default: 0
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Deployment', deploymentSchema);
