const express = require('express');
const router = express.Router();
const {
  getClusters,
  getCluster,
  updateCluster,
  createCluster
} = require('../controllers/clusterController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getClusters)
  .post(protect, authorize('admin'), createCluster);

router.route('/:id')
  .get(protect, getCluster)
  .put(protect, authorize('admin', 'operator'), updateCluster);

module.exports = router;
