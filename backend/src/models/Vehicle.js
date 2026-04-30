const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  unitId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['standard', 'xl', 'bike', 'rental', 'intercity', 'parcel'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    default: 4
  },
  features: [{
    type: String
  }],
  image: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['available', 'in_transit', 'charging', 'maintenance', 'offline'],
    default: 'available'
  },
  currentLocation: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  battery: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
