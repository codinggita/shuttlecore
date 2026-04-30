const SafetyEvent = require('../models/SafetyEvent');

/**
 * @desc    Get all safety events
 * @route   GET /api/safety-events
 * @access  Private (Admin/Operator)
 */
exports.getSafetyEvents = async (req, res, next) => {
  try {
    const { type, severity, limit = 50 } = req.query;
    const query = {};
    if (type) query.type = type;
    if (severity) query.severity = severity;

    const events = await SafetyEvent.find(query)
      .populate('driver')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    const formattedEvents = events.map(event => ({
      id: event._id,
      unit: event.unit,
      type: event.type,
      icon: event.icon,
      color: event.color,
      time: event.time,
      description: event.description,
      severity: event.severity,
      driver: event.driver ? {
        id: event.driver._id,
        name: event.driver.name
      } : null,
      location: event.location,
      impactForce: event.impactForce,
      speed: event.speed,
      speedLimit: event.speedLimit,
      timestamp: event.createdAt
    }));

    res.status(200).json({
      success: true,
      events: formattedEvents
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get safety statistics
 * @route   GET /api/safety-events/stats
 * @access  Private (Admin/Operator)
 */
exports.getSafetyStats = async (req, res, next) => {
  try {
    const totalEvents = await SafetyEvent.countDocuments();
    const criticalEvents = await SafetyEvent.countDocuments({ severity: 'critical' });
    const highEvents = await SafetyEvent.countDocuments({ severity: 'high' });
    const speedViolations = await SafetyEvent.countDocuments({ type: 'Speed Limit +15' });
    const brakingEvents = await SafetyEvent.countDocuments({ type: 'Harsh Braking' });

    const stats = {
      totalEvents,
      criticalEvents,
      highEvents,
      speedViolations,
      brakingEvents,
      safetyScore: Math.max(0, 100 - (criticalEvents * 5) - (highEvents * 2) - (speedViolations * 0.5))
    };

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create safety event
 * @route   POST /api/safety-events
 * @access  Private (Admin/System)
 */
exports.createSafetyEvent = async (req, res, next) => {
  try {
    const event = await SafetyEvent.create(req.body);

    res.status(201).json({
      success: true,
      event
    });
  } catch (error) {
    next(error);
  }
};
