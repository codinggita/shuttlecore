const mongoose = require('mongoose');

const dispatchSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  passenger: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['URGENT', 'ROUTINE', 'LOW'],
    default: 'ROUTINE'
  },
  autoAssign: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'completed', 'waitlist', 'cancelled'],
    default: 'pending'
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  estimatedTime: {
    type: Number,
    default: 0
  },
  distance: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dispatch', dispatchSchema);
