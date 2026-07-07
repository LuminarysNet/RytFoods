const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    items: [
      {
        menuItemId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number,
        specialInstructions: String,
      },
    ],
    subtotal: Number,
    tax: Number,
    deliveryFee: Number,
    discount: { type: Number, default: 0 },
    totalAmount: Number,
    orderStatus: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'preparing',
        'ready',
        'out_for_delivery',
        'delivered',
        'cancelled',
      ],
      default: 'pending',
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      latitude: Number,
      longitude: Number,
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'wallet', 'cash', 'upi'],
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentId: String,
    transactionId: String,
    estimatedDeliveryTime: Date,
    actualDeliveryTime: Date,
    deliveryPartnerId: mongoose.Schema.Types.ObjectId,
    trackingLocation: {
      latitude: Number,
      longitude: Number,
      timestamp: Date,
    },
    specialInstructions: String,
    rating: Number,
    review: String,
    ratedAt: Date,
    cancelReason: String,
  },
  {
    timestamps: true,
  }
);

// Generate order number
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const count = await this.constructor.countDocuments();
    this.orderNumber = `RYT-${Date.now()}-${count + 1}`;
  }
  next();
});

orderSchema.index({ customerId: 1 });
orderSchema.index({ restaurantId: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ orderNumber: 1 }, { unique: true });

module.exports = mongoose.model('Order', orderSchema);