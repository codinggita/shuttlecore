const express = require('express');
const router = express.Router();
const {
  getDeployments,
  getDeployment,
  createDeployment,
  updateDeployment
} = require('../controllers/deploymentController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'operator'), getDeployments)
  .post(protect, authorize('admin', 'operator'), createDeployment);

router.route('/:id')
  .get(protect, getDeployment)
  .put(protect, authorize('admin', 'operator'), updateDeployment);

module.exports = router;
