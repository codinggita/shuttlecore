const Notification = require('../models/Notification');

/**
 * @desc    Get all notifications for a user
 * @route   GET /api/notifications
 * @access  Private
 */
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    const formattedNotifications = notifications.map(notif => ({
      id: notif._id,
      title: notif.title,
      message: notif.message,
      type: notif.type,
      isRead: notif.isRead,
      actionUrl: notif.actionUrl,
      metadata: notif.metadata,
      timestamp: notif.createdAt
    }));

    res.status(200).json({
      success: true,
      notifications: formattedNotifications
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark notification as read
 * @route   PUT /api/notifications/:id/read
 * @access  Private
 */
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({
      success: true,
      notification: {
        id: notification._id,
        isRead: notification.isRead
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark all notifications as read
 * @route   PUT /api/notifications/read-all
 * @access  Private
 */
exports.markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create notification
 * @route   POST /api/notifications
 * @access  Private (Admin/System)
 */
exports.createNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create({
      user: req.body.user || req.user._id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      notification
    });
  } catch (error) {
    next(error);
  }
};
