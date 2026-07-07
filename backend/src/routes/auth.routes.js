const router = require('express').Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth.middleware');
const { authLimiter } = require('../middleware/rateLimit.middleware');

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/logout', protect, authController.logout);
router.post('/refresh', authController.refreshToken);

module.exports = router;