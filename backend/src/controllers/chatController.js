const logger = require('../utils/logger');

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;

    res.json({
      success: true,
      data: {
        message: 'Message sent',
      },
    });
  } catch (error) {
    logger.error('Send message error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};
