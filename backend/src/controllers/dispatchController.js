const Dispatch = require('../models/Dispatch');

/**
 * @desc    Get all dispatch queue items
 * @route   GET /api/dispatch
 * @access  Private (Admin/Operator)
 */
exports.getDispatchQueue = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const dispatchQueue = await Dispatch.find(query)
      .populate('vehicle')
      .populate('driver')
      .sort({ createdAt: -1 });

    const formattedQueue = dispatchQueue.map(item => ({
      id: item.id,
      passenger: item.passenger,
      origin: item.origin,
      destination: item.destination,
      priority: item.priority,
      autoAssign: item.autoAssign,
      status: item.status,
      vehicle: item.vehicle ? {
        id: item.vehicle._id,
        unitId: item.vehicle.unitId,
        name: item.vehicle.name
      } : null,
      driver: item.driver ? {
        id: item.driver._id,
        name: item.driver.name
      } : null,
      estimatedTime: item.estimatedTime,
      distance: item.distance
    }));

    res.status(200).json({
      success: true,
      dispatchQueue: formattedQueue
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single dispatch item
 * @route   GET /api/dispatch/:id
 * @access  Private
 */
exports.getDispatchItem = async (req, res, next) => {
  try {
    const dispatch = await Dispatch.findOne({ id: req.params.id })
      .populate('vehicle')
      .populate('driver');

    if (!dispatch) {
      return res.status(404).json({ message: 'Dispatch item not found' });
    }

    res.status(200).json({
      success: true,
      dispatch: {
        id: dispatch.id,
        passenger: dispatch.passenger,
        origin: dispatch.origin,
        destination: dispatch.destination,
        priority: dispatch.priority,
        autoAssign: dispatch.autoAssign,
        status: dispatch.status,
        vehicle: dispatch.vehicle ? {
          id: dispatch.vehicle._id,
          unitId: dispatch.vehicle.unitId,
          name: dispatch.vehicle.name
        } : null,
        driver: dispatch.driver ? {
          id: dispatch.driver._id,
          name: dispatch.driver.name
        } : null,
        estimatedTime: dispatch.estimatedTime,
        distance: dispatch.distance
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create dispatch item
 * @route   POST /api/dispatch
 * @access  Private (Admin/Operator)
 */
exports.createDispatch = async (req, res, next) => {
  try {
    const dispatchId = `TX-${Date.now().toString().slice(-4)}`;
    
    const dispatch = await Dispatch.create({
      id: dispatchId,
      ...req.body
    });

    res.status(201).json({
      success: true,
      dispatch
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update dispatch item
 * @route   PUT /api/dispatch/:id
 * @access  Private (Admin/Operator)
 */
exports.updateDispatch = async (req, res, next) => {
  try {
    const { status, autoAssign, vehicle, driver, estimatedTime } = req.body;

    const dispatch = await Dispatch.findOneAndUpdate(
      { id: req.params.id },
      { status, autoAssign, vehicle, driver, estimatedTime },
      { new: true }
    );

    if (!dispatch) {
      return res.status(404).json({ message: 'Dispatch item not found' });
    }

    res.status(200).json({
      success: true,
      dispatch
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Auto-assign vehicle to dispatch
 * @route   PUT /api/dispatch/:id/assign
 * @access  Private (Admin/Operator)
 */
exports.autoAssign = async (req, res, next) => {
  try {
    const { vehicleId, driverId } = req.body;

    const dispatch = await Dispatch.findOneAndUpdate(
      { id: req.params.id },
      { 
        vehicle: vehicleId,
        driver: driverId,
        autoAssign: vehicleId,
        status: 'assigned'
      },
      { new: true }
    );

    if (!dispatch) {
      return res.status(404).json({ message: 'Dispatch item not found' });
    }

    res.status(200).json({
      success: true,
      dispatch
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update live location
 * @route   PUT /api/dispatch/location
 * @access  Private
 */
exports.updateLiveLocation = async (req, res, next) => {
  try {
    const { lat, lng, userId } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    // Find active dispatch for this user (as driver or passenger)
    const dispatch = await Dispatch.findOne({
      $or: [
        { driver: userId },
        { passenger: userId } // Assuming passenger ID is stored, though Dispatch model has it as String
      ],
      status: { $in: ['assigned', 'in_progress'] }
    }).sort({ updatedAt: -1 });

    if (!dispatch) {
      // If no active dispatch, we still might want to track the user generally,
      // but the requirement says "extend the Dispatch model".
      // For now, if no dispatch, we just return success but don't save to DB,
      // the real-time broadcasting happens via Socket.io in server.js anyway.
      return res.status(200).json({ 
        success: true, 
        message: 'Location broadcasted (no active dispatch found to save to)' 
      });
    }

    dispatch.liveLocation = {
      lat,
      lng,
      timestamp: new Date()
    };

    await dispatch.save();

    res.status(200).json({
      success: true,
      liveLocation: dispatch.liveLocation
    });
  } catch (error) {
    next(error);
  }
};
