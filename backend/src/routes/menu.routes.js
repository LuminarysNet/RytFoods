const router = require('express').Router();
const menuController = require('../controllers/menuController');
const { protect } = require('../middleware/auth.middleware');

router.get('/restaurant/:restaurantId', menuController.getMenuItems);
router.get('/:id', menuController.getMenuItem);
router.post('/:restaurantId', protect, menuController.createMenuItem);
router.put('/:id', protect, menuController.updateMenuItem);
router.delete('/:id', protect, menuController.deleteMenuItem);

module.exports = router;