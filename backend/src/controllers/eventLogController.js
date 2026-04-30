const EventLog = require('../models/EventLog');

/**
 * @desc    Get all event logs
 * @route   GET /api/event-logs
 * @access  Private (Admin/Operator)
 */
exports.getEventLogs = async (req, res, next) => {
  try {
    const { eventType, severity, limit = 100 } = req.query;
    
    const query = {};
    if (eventType) query.eventType = eventType;
    if (severity) query.severity = severity;

    const logs = await EventLog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    const formattedLogs = logs.map(log => ({
      id: log._id,
      eventType: log.eventType,
      title: log.title,
      description: log.description,
      severity: log.severity,
      relatedId: log.relatedId,
      metadata: log.metadata,
      source: log.source,
      timestamp: log.createdAt
    }));

    res.status(200).json({
      success: true,
      logs: formattedLogs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create event log
 * @route   POST /api/event-logs
 * @access  Private (Admin/System)
 */
exports.createEventLog = async (req, res, next) => {
  try {
    const log = await EventLog.create(req.body);

    res.status(201).json({
      success: true,
      log
    });
  } catch (error) {
    next(error);
  }
};
