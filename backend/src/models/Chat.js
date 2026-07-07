const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      unique: true,
      required: true,
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
    messages: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        senderId: mongoose.Schema.Types.ObjectId,
        content: String,
        image: String,
        timestamp: Date,
        isRead: Boolean,
        readAt: Date,
      },
    ],
    lastMessage: String,
    lastMessageTime: Date,
    lastMessageSender: mongoose.Schema.Types.ObjectId,
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

chatSchema.index({ conversationId: 1 });
chatSchema.index({ participants: 1 });
chatSchema.index({ orderId: 1 });
chatSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Chat', chatSchema);