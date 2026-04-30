const Driver = require('../models/Driver');

/**
 * @desc    Get all drivers
 * @route   GET /api/drivers
 * @access  Private (Admin/Operator)
 */
exports.getDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find().populate('vehicle');

    const formattedDrivers = drivers.map(driver => ({
      id: driver._id,
      driverId: driver.driverId,
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      vehicle: driver.vehicle ? {
        id: driver.vehicle._id,
        unitId: driver.vehicle.unitId,
        name: driver.vehicle.name,
        type: driver.vehicle.type
      } : null,
      status: driver.status,
      rating: driver.rating,
      totalTrips: driver.totalTrips,
      currentLocation: driver.currentLocation,
      earnings: driver.earnings,
      isVerified: driver.isVerified
    }));

    res.status(200).json({
      success: true,
      drivers: formattedDrivers
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single driver
 * @route   GET /api/drivers/:id
 * @access  Private
 */
exports.getDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id).populate('vehicle');

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({
      success: true,
      driver: {
        id: driver._id,
        driverId: driver.driverId,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        vehicle: driver.vehicle ? {
          id: driver.vehicle._id,
          unitId: driver.vehicle.unitId,
          name: driver.vehicle.name,
          type: driver.vehicle.type
        } : null,
        status: driver.status,
        rating: driver.rating,
        totalTrips: driver.totalTrips,
        currentLocation: driver.currentLocation,
        earnings: driver.earnings,
        isVerified: driver.isVerified
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update driver status
 * @route   PUT /api/drivers/:id/status
 * @access  Private (Admin/Operator)
 */
exports.updateDriverStatus = async (req, res, next) => {
  try {
    const { status, currentLocation } = req.body;

    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { status, currentLocation },
      { new: true, runValidators: true }
    );

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json({
      success: true,
      driver: {
        id: driver._id,
        status: driver.status,
        currentLocation: driver.currentLocation
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create driver
 * @route   POST /api/drivers
 * @access  Private (Admin)
 */
exports.createDriver = async (req, res, next) => {
  try {
    const driver = await Driver.create(req.body);

    res.status(201).json({
      success: true,
      driver
    });
  } catch (error) {
    next(error);
  }
};
