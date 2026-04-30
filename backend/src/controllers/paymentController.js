const Payment = require('../models/Payment');

/**
 * @desc    Get all payment methods for a user
 * @route   GET /api/payments
 * @access  Private
 */
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.user._id, isActive: true });

    const formattedPayments = payments.map(payment => ({
      id: payment._id,
      type: payment.type,
      provider: payment.provider,
      lastFour: payment.lastFour,
      expiryMonth: payment.expiryMonth,
      expiryYear: payment.expiryYear,
      isDefault: payment.isDefault
    }));

    res.status(200).json({
      success: true,
      payments: formattedPayments
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add payment method
 * @route   POST /api/payments
 * @access  Private
 */
exports.addPayment = async (req, res, next) => {
  try {
    const { type, provider, lastFour, expiryMonth, expiryYear, isDefault } = req.body;

    // If setting as default, remove default from other payments
    if (isDefault) {
      await Payment.updateMany(
        { user: req.user._id },
        { isDefault: false }
      );
    }

    const payment = await Payment.create({
      user: req.user._id,
      type,
      provider,
      lastFour,
      expiryMonth,
      expiryYear,
      isDefault: isDefault || false
    });

    res.status(201).json({
      success: true,
      payment: {
        id: payment._id,
        type: payment.type,
        provider: payment.provider,
        lastFour: payment.lastFour,
        expiryMonth: payment.expiryMonth,
        expiryYear: payment.expiryYear,
        isDefault: payment.isDefault
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Set default payment method
 * @route   PUT /api/payments/:id/default
 * @access  Private
 */
exports.setDefault = async (req, res, next) => {
  try {
    // Remove default from all payments
    await Payment.updateMany(
      { user: req.user._id },
      { isDefault: false }
    );

    // Set new default
    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isDefault: true },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    res.status(200).json({
      success: true,
      payment: {
        id: payment._id,
        isDefault: payment.isDefault
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete payment method
 * @route   DELETE /api/payments/:id
 * @access  Private
 */
exports.deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isActive: false },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Payment method deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
