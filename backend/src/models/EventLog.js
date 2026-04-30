const mongoose = require('mongoose');

const eventLogSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    enum: ['booking', 'incident', 'deployment', 'driver', 'vehicle', 'system', 'emergency']
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['info', 'warning', 'error', 'critical'],
    default: 'info'
  },
  relatedId: {
    type: String,
    default: ''
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  source: {
    type: String,
    default: 'system'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EventLog', eventLogSchema);
