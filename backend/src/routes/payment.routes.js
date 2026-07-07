const router = require('express').Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth.middleware');
const { paymentLimiter } = require('../middleware/rateLimit.middleware');

router.post('/create-intent', protect, paymentLimiter, paymentController.createPaymentIntent);
router.post('/confirm', protect, paymentLimiter, paymentController.confirmPayment);

module.exports = router;