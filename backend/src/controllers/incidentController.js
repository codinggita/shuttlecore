const Incident = require('../models/Incident');

/**
 * @desc    Get all incidents
 * @route   GET /api/incidents
 * @access  Private
 */
exports.getIncidents = async (req, res, next) => {
  try {
    const incidents = await Incident.find({ status: { $in: ['active', 'resolving'] } })
      .sort({ createdAt: -1 });

    const formattedIncidents = incidents.map(incident => ({
      id: incident.id,
      type: incident.type,
      severity: incident.severity,
      unit: incident.unit,
      location: incident.location,
      coordinates: incident.coordinates,
      passengers: incident.passengers,
      battery: incident.battery,
      speed: incident.speed,
      heading: incident.heading,
      lastUpdate: incident.lastUpdate,
      description: incident.description,
      nearbyUnits: incident.nearbyUnits,
      logs: incident.logs,
      status: incident.status
    }));

    res.status(200).json({
      success: true,
      incidents: formattedIncidents
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single incident
 * @route   GET /api/incidents/:id
 * @access  Private
 */
exports.getIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findOne({ id: req.params.id });

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.status(200).json({
      success: true,
      incident: {
        id: incident.id,
        type: incident.type,
        severity: incident.severity,
        unit: incident.unit,
        location: incident.location,
        coordinates: incident.coordinates,
        passengers: incident.passengers,
        battery: incident.battery,
        speed: incident.speed,
        heading: incident.heading,
        lastUpdate: incident.lastUpdate,
        description: incident.description,
        nearbyUnits: incident.nearbyUnits,
        logs: incident.logs,
        status: incident.status
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create incident
 * @route   POST /api/incidents
 * @access  Private (Admin/Operator)
 */
exports.createIncident = async (req, res, next) => {
  try {
    const incidentId = `EM-${Date.now().toString().slice(-3)}`;
    
    const incident = await Incident.create({
      id: incidentId,
      ...req.body
    });

    res.status(201).json({
      success: true,
      incident
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Resolve incident
 * @route   PUT /api/incidents/:id/resolve
 * @access  Private (Admin/Operator)
 */
exports.resolveIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findOneAndUpdate(
      { id: req.params.id },
      { 
        status: 'resolved',
        resolvedAt: Date.now()
      },
      { new: true }
    );

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.status(200).json({
      success: true,
      message: `Incident ${incident.id} has been marked as RESOLVED`,
      incident
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update incident (real-time data)
 * @route   PUT /api/incidents/:id
 * @access  Private
 */
exports.updateIncident = async (req, res, next) => {
  try {
    const { battery, speed, lastUpdate } = req.body;

    const incident = await Incident.findOneAndUpdate(
      { id: req.params.id },
      { 
        battery, 
        speed, 
        lastUpdate 
      },
      { new: true }
    );

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.status(200).json({
      success: true,
      incident: {
        id: incident.id,
        battery: incident.battery,
        speed: incident.speed,
        lastUpdate: incident.lastUpdate
      }
    });
  } catch (error) {
    next(error);
  }
};
