const express = require('express');
const router = express.Router();
const {
  getRiders,
  getRider,
  createRider,
  updateRider
} = require('../controllers/riderController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'operator'), getRiders)
  .post(protect, authorize('admin'), createRider);

router.route('/:id')
  .get(protect, getRider)
  .put(protect, authorize('admin', 'operator'), updateRider);

module.exports = router;
