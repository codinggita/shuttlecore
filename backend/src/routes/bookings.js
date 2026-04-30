const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getBookings)
  .post(protect, createBooking);

router.route('/:id')
  .get(protect, getBooking)
  .delete(protect, cancelBooking);

router.put('/:id/status', protect, updateBookingStatus);

module.exports = router;
