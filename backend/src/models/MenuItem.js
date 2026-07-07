const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide item name'],
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      required: [true, 'Please provide price'],
    },
    image: String,
    category: String,
    isVegetarian: Boolean,
    isVegan: Boolean,
    isSpicy: Boolean,
    spicyLevel: Number,
    calories: Number,
    preparationTime: Number,
    availability: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 },
    addons: [
      {
        name: String,
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

menuItemSchema.index({ restaurantId: 1 });
menuItemSchema.index({ category: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });
menuItemSchema.index({ availability: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);