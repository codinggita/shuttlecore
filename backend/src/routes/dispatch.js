const express = require('express');
const router = express.Router();
const {
  getDispatchQueue,
  getDispatchItem,
  createDispatch,
  updateDispatch,
  autoAssign,
  updateLiveLocation
} = require('../controllers/dispatchController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin', 'operator'), getDispatchQueue)
  .post(protect, authorize('admin', 'operator'), createDispatch);

router.route('/:id')
  .get(protect, getDispatchItem)
  .put(protect, authorize('admin', 'operator'), updateDispatch);

router.put('/:id/assign', protect, authorize('admin', 'operator'), autoAssign);
router.put('/location', protect, updateLiveLocation);

module.exports = router;
