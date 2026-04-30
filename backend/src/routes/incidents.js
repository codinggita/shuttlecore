const express = require('express');
const router = express.Router();
const {
  getIncidents,
  getIncident,
  createIncident,
  resolveIncident,
  updateIncident
} = require('../controllers/incidentController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getIncidents)
  .post(protect, authorize('admin', 'operator'), createIncident);

router.route('/:id')
  .get(protect, getIncident)
  .put(protect, updateIncident);

router.put('/:id/resolve', protect, authorize('admin', 'operator'), resolveIncident);

module.exports = router;
