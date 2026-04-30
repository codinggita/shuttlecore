const express = require('express');
const router = express.Router();
const {
  getEventLogs,
  createEventLog
} = require('../controllers/eventLogController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'operator'), getEventLogs)
  .post(protect, authorize('admin'), createEventLog);

module.exports = router;
