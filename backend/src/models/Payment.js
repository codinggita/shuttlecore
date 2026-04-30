const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['card', 'cash', 'wallet', 'upi'],
    required: true
  },
  provider: {
    type: String,
    default: ''
  },
  lastFour: {
    type: String,
    default: ''
  },
  expiryMonth: {
    type: Number,
    default: null
  },
  expiryYear: {
    type: Number,
    default: null
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);
