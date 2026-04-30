const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private
 */
exports.createBooking = async (req, res, next) => {
  try {
    const { vehicleId, pickup, dropoff, paymentMethod, discountCode, bookingType, reserveDate, reserveTime } = req.body;

    // Get vehicle
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    // Calculate price (simplified - in production would use distance calculation)
    let price = vehicle.basePrice;
    let discount = null;

    // Apply discount if provided
    if (discountCode) {
      const Discount = require('../models/Discount');
      discount = await Discount.findOne({ code: discountCode.toUpperCase(), isActive: true });
      if (discount) {
        price = price * (1 - discount.percentage / 100);
        discount.usageCount += 1;
        await discount.save();
      }
    }

    // Generate booking ID
    const bookingId = `BK-${Date.now()}`;

    // Create booking
    const booking = await Booking.create({
      id: bookingId,
      user: req.user._id,
      vehicle: vehicle._id,
      pickup,
      dropoff,
      price: Math.round(price),
      paymentMethod: paymentMethod || 'card',
      discount: discount?._id,
      bookingType: bookingType || 'now',
      reserveDate: bookingType === 'reserve' ? reserveDate : null,
      reserveTime: bookingType === 'reserve' ? reserveTime : null,
      status: bookingType === 'reserve' ? 'reserved' : 'confirmed'
    });

    // Populate vehicle for response
    const populatedBooking = await Booking.findById(booking._id).populate('vehicle');

    res.status(201).json({
      success: true,
      booking: {
        id: populatedBooking.id,
        vehicle: {
          id: populatedBooking.vehicle._id,
          name: populatedBooking.vehicle.name,
          type: populatedBooking.vehicle.type,
          basePrice: populatedBooking.vehicle.basePrice
        },
        pickup: populatedBooking.pickup,
        dropoff: populatedBooking.dropoff,
        price: populatedBooking.price,
        paymentMethod: populatedBooking.paymentMethod,
        discount: discount ? { code: discount.code, percentage: discount.percentage } : null,
        status: populatedBooking.status,
        bookingType: populatedBooking.bookingType,
        timestamp: populatedBooking.createdAt,
        reserveDate: populatedBooking.reserveDate,
        reserveTime: populatedBooking.reserveTime
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings for a user
 * @route   GET /api/bookings
 * @access  Private
 */
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('vehicle')
      .sort({ createdAt: -1 });

    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      vehicle: {
        id: booking.vehicle._id,
        name: booking.vehicle.name,
        type: booking.vehicle.type,
        basePrice: booking.vehicle.basePrice
      },
      pickup: booking.pickup,
      dropoff: booking.dropoff,
      price: booking.price,
      paymentMethod: booking.paymentMethod,
      status: booking.status,
      bookingType: booking.bookingType,
      timestamp: booking.createdAt,
      reserveDate: booking.reserveDate,
      reserveTime: booking.reserveTime
    }));

    res.status(200).json({
      success: true,
      bookings: formattedBookings
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single booking
 * @route   GET /api/bookings/:id
 * @access  Private
 */
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ id: req.params.id, user: req.user._id })
      .populate('vehicle');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      booking: {
        id: booking.id,
        vehicle: {
          id: booking.vehicle._id,
          name: booking.vehicle.name,
          type: booking.vehicle.type,
          basePrice: booking.vehicle.basePrice
        },
        pickup: booking.pickup,
        dropoff: booking.dropoff,
        price: booking.price,
        paymentMethod: booking.paymentMethod,
        status: booking.status,
        bookingType: booking.bookingType,
        timestamp: booking.createdAt,
        reserveDate: booking.reserveDate,
        reserveTime: booking.reserveTime
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update booking status
 * @route   PUT /api/bookings/:id/status
 * @access  Private
 */
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { id: req.params.id, user: req.user._id },
      { status },
      { new: true }
    ).populate('vehicle');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Cancel booking
 * @route   DELETE /api/bookings/:id
 * @access  Private
 */
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { id: req.params.id, user: req.user._id },
      { status: 'cancelled' },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    next(error);
  }
};
