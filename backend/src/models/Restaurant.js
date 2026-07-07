const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide restaurant name'],
      trim: true,
    },
    description: String,
    cuisineType: [String],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    image: String,
    bannerImage: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      latitude: Number,
      longitude: Number,
    },
    operatingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    isOpen: { type: Boolean, default: true },
    deliveryTime: Number,
    deliveryFee: Number,
    minOrder: Number,
    maxOrder: Number,
    phone: String,
    email: String,
    website: String,
    isApproved: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    commission: { type: Number, default: 0 },
    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      bankName: String,
      routingNumber: String,
    },
  },
  {
    timestamps: true,
  }
);

restaurantSchema.index({ vendorId: 1 });
restaurantSchema.index({ 'address.latitude': 1, 'address.longitude': 1 });
restaurantSchema.index({ isApproved: 1, isOpen: 1 });
restaurantSchema.index({ rating: -1 });
restaurantSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);