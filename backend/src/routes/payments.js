const express = require('express');
const router = express.Router();
const {
  getPayments,
  addPayment,
  setDefault,
  deletePayment
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getPayments)
  .post(protect, addPayment);

router.put('/:id/default', protect, setDefault);
router.delete('/:id', protect, deletePayment);

module.exports = router;
