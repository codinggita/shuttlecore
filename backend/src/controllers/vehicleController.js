const Vehicle = require('../models/Vehicle');

/**
 * @desc    Get all vehicles
 * @route   GET /api/vehicles
 * @access  Public
 */
exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ status: 'available' });

    const formattedVehicles = vehicles.map(vehicle => ({
      id: vehicle._id,
      unitId: vehicle.unitId,
      type: vehicle.type,
      name: vehicle.name,
      basePrice: vehicle.basePrice,
      capacity: vehicle.capacity,
      features: vehicle.features,
      image: vehicle.image,
      status: vehicle.status,
      battery: vehicle.battery,
      speed: vehicle.speed,
      heading: vehicle.heading,
      lastUpdate: vehicle.lastUpdate
    }));

    res.status(200).json({
      success: true,
      vehicles: formattedVehicles
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single vehicle
 * @route   GET /api/vehicles/:id
 * @access  Public
 */
exports.getVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({
      success: true,
      vehicle: {
        id: vehicle._id,
        unitId: vehicle.unitId,
        type: vehicle.type,
        name: vehicle.name,
        basePrice: vehicle.basePrice,
        capacity: vehicle.capacity,
        features: vehicle.features,
        image: vehicle.image,
        status: vehicle.status,
        currentLocation: vehicle.currentLocation,
        battery: vehicle.battery,
        speed: vehicle.speed,
        heading: vehicle.heading,
        lastUpdate: vehicle.lastUpdate
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update vehicle status
 * @route   PUT /api/vehicles/:id/status
 * @access  Private (Admin/Operator)
 */
exports.updateVehicleStatus = async (req, res, next) => {
  try {
    const { status, battery, speed, heading, currentLocation } = req.body;

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        battery, 
        speed, 
        heading, 
        currentLocation,
        lastUpdate: 'Just now'
      },
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({
      success: true,
      vehicle: {
        id: vehicle._id,
        unitId: vehicle.unitId,
        status: vehicle.status,
        battery: vehicle.battery,
        speed: vehicle.speed,
        heading: vehicle.heading,
        currentLocation: vehicle.currentLocation,
        lastUpdate: vehicle.lastUpdate
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create vehicle
 * @route   POST /api/vehicles
 * @access  Private (Admin)
 */
exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      vehicle
    });
  } catch (error) {
    next(error);
  }
};
