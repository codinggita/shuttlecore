const express = require('express');
const router = express.Router();
const {
  getDrivers,
  getDriver,
  updateDriverStatus,
  createDriver
} = require('../controllers/driverController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'operator'), getDrivers)
  .post(protect, authorize('admin'), createDriver);

router.route('/:id')
  .get(protect, getDriver);

router.put('/:id/status', protect, authorize('admin', 'operator'), updateDriverStatus);

module.exports = router;
