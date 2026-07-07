const router = require('express').Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, orderController.createOrder);
router.get('/', protect, orderController.getUserOrders);
router.get('/:id', protect, orderController.getOrderDetail);
router.put('/:id/status', protect, orderController.updateOrderStatus);
router.get('/:id/track', protect, orderController.trackOrder);
router.post('/:id/cancel', protect, orderController.cancelOrder);

module.exports = router;