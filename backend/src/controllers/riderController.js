const Rider = require('../models/Rider');

/**
 * @desc    Get all riders
 * @route   GET /api/riders
 * @access  Private (Admin/Operator)
 */
exports.getRiders = async (req, res, next) => {
  try {
    const riders = await Rider.find().populate('user');

    const formattedRiders = riders.map(rider => ({
      id: rider._id,
      name: rider.name,
      phone: rider.phone,
      email: rider.email,
      rating: rider.rating,
      totalRides: rider.totalRides,
      preferredVehicle: rider.preferredVehicle,
      homeLocation: rider.homeLocation,
      workLocation: rider.workLocation,
      isVerified: rider.isVerified,
      notes: rider.notes,
      user: rider.user ? {
        id: rider.user._id,
        email: rider.user.email
      } : null
    }));

    res.status(200).json({
      success: true,
      riders: formattedRiders
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single rider
 * @route   GET /api/riders/:id
 * @access  Private
 */
exports.getRider = async (req, res, next) => {
  try {
    const rider = await Rider.findById(req.params.id).populate('user');

    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }

    res.status(200).json({
      success: true,
      rider: {
        id: rider._id,
        name: rider.name,
        phone: rider.phone,
        email: rider.email,
        rating: rider.rating,
        totalRides: rider.totalRides,
        preferredVehicle: rider.preferredVehicle,
        homeLocation: rider.homeLocation,
        workLocation: rider.workLocation,
        isVerified: rider.isVerified,
        notes: rider.notes,
        user: rider.user ? {
          id: rider.user._id,
          email: rider.user.email
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create rider
 * @route   POST /api/riders
 * @access  Private (Admin)
 */
exports.createRider = async (req, res, next) => {
  try {
    const rider = await Rider.create(req.body);

    res.status(201).json({
      success: true,
      rider
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update rider
 * @route   PUT /api/riders/:id
 * @access  Private (Admin/Operator)
 */
exports.updateRider = async (req, res, next) => {
  try {
    const rider = await Rider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!rider) {
      return res.status(404).json({ message: 'Rider not found' });
    }

    res.status(200).json({
      success: true,
      rider
    });
  } catch (error) {
    next(error);
  }
};
