const express = require('express');
const router = express.Router();
const {
  getSafetyEvents,
  getSafetyStats,
  createSafetyEvent
} = require('../controllers/safetyEventController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'operator'), getSafetyEvents)
  .post(protect, authorize('admin'), createSafetyEvent);

router.get('/stats', protect, authorize('admin', 'operator'), getSafetyStats);

module.exports = router;
