const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  pickup: {
    type: String,
    required: true
  },
  dropoff: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'wallet'],
    default: 'card'
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'reserved', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  bookingType: {
    type: String,
    enum: ['now', 'reserve'],
    default: 'now'
  },
  reserveDate: {
    type: Date
  },
  reserveTime: {
    type: String
  },
  coordinates: {
    pickup: {
      lat: Number,
      lng: Number
    },
    dropoff: {
      lat: Number,
      lng: Number
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
