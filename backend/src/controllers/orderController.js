const Order = require('../models/Order');
const logger = require('../utils/logger');

exports.createOrder = async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress, paymentMethod, specialInstructions } = req.body;

    // Calculate totals
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1; // 10% tax
    const deliveryFee = 2.99;
    const totalAmount = subtotal + tax + deliveryFee;

    const order = await Order.create({
      customerId: req.user.id,
      restaurantId,
      items,
      subtotal,
      tax,
      deliveryFee,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      specialInstructions,
      orderStatus: 'pending',
      paymentStatus: 'pending',
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ customerId: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate('restaurantId', 'name image');

    const total = await Order.countDocuments({ customerId: req.user.id });

    res.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('customerId', 'name phone email')
      .populate('restaurantId', 'name phone')
      .populate('items.menuItemId');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Order not found' },
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error('Get order detail error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Order not found' },
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.trackOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id).select('orderStatus trackingLocation estimatedDeliveryTime');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Order not found' },
      });
    }

    res.json({
      success: true,
      data: {
        orderId: order._id,
        status: order.orderStatus,
        currentLocation: order.trackingLocation,
        estimatedDeliveryTime: order.estimatedDeliveryTime,
      },
    });
  } catch (error) {
    logger.error('Track order error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: 'cancelled', cancelReason: reason },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Order not found' },
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    logger.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};