const express = require('express');
const router = express.Router();
const {
  getVehicles,
  getVehicle,
  updateVehicleStatus,
  createVehicle
} = require('../controllers/vehicleController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getVehicles)
  .post(protect, authorize('admin'), createVehicle);

router.route('/:id')
  .get(getVehicle);

router.put('/:id/status', protect, authorize('admin', 'operator'), updateVehicleStatus);

module.exports = router;
