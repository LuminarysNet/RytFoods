const router = require('express').Router();
const chatController = require('../controllers/chatController');
const { protect } = require('../middleware/auth.middleware');

router.post('/send', protect, chatController.sendMessage);

module.exports = router;