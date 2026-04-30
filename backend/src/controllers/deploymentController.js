const Deployment = require('../models/Deployment');
const Vehicle = require('../models/Vehicle');

/**
 * @desc    Get all deployments
 * @route   GET /api/deployments
 * @access  Private (Admin/Operator)
 */
exports.getDeployments = async (req, res, next) => {
  try {
    const deployments = await Deployment.find().populate('units');

    const formattedDeployments = deployments.map(deployment => ({
      id: deployment.id,
      name: deployment.name,
      location: deployment.location,
      coordinates: deployment.coordinates,
      units: deployment.units.map(unit => ({
        id: unit._id,
        unitId: unit.unitId,
        name: unit.name,
        type: unit.type
      })),
      status: deployment.status,
      timeSaved: deployment.timeSaved,
      efficiency: deployment.efficiency,
      startTime: deployment.startTime,
      endTime: deployment.endTime
    }));

    res.status(200).json({
      success: true,
      deployments: formattedDeployments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single deployment
 * @route   GET /api/deployments/:id
 * @access  Private
 */
exports.getDeployment = async (req, res, next) => {
  try {
    const deployment = await Deployment.findOne({ id: req.params.id }).populate('units');

    if (!deployment) {
      return res.status(404).json({ message: 'Deployment not found' });
    }

    res.status(200).json({
      success: true,
      deployment: {
        id: deployment.id,
        name: deployment.name,
        location: deployment.location,
        coordinates: deployment.coordinates,
        units: deployment.units.map(unit => ({
          id: unit._id,
          unitId: unit.unitId,
          name: unit.name,
          type: unit.type
        })),
        status: deployment.status,
        timeSaved: deployment.timeSaved,
        efficiency: deployment.efficiency,
        startTime: deployment.startTime,
        endTime: deployment.endTime
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create deployment
 * @route   POST /api/deployments
 * @access  Private (Admin/Operator)
 */
exports.createDeployment = async (req, res, next) => {
  try {
    const { name, location, coordinates, unitIds } = req.body;

    const deploymentId = `DP-${Date.now().toString().slice(-3)}`;
    
    // Get vehicle objects
    const units = await Vehicle.find({ _id: { $in: unitIds } });

    const deployment = await Deployment.create({
      id: deploymentId,
      name,
      location,
      coordinates,
      units: units.map(u => u._id),
      status: 'active',
      startTime: new Date()
    });

    res.status(201).json({
      success: true,
      deployment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update deployment
 * @route   PUT /api/deployments/:id
 * @access  Private (Admin/Operator)
 */
exports.updateDeployment = async (req, res, next) => {
  try {
    const { status, timeSaved, efficiency, endTime } = req.body;

    const deployment = await Deployment.findOneAndUpdate(
      { id: req.params.id },
      { status, timeSaved, efficiency, endTime },
      { new: true }
    );

    if (!deployment) {
      return res.status(404).json({ message: 'Deployment not found' });
    }

    res.status(200).json({
      success: true,
      deployment
    });
  } catch (error) {
    next(error);
  }
};
