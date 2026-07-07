const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');
const { protect } = require('../middleware/auth.middleware');

router.get('/', restaurantController.getRestaurants);
router.get('/search', restaurantController.searchRestaurants);
router.get('/nearby', restaurantController.getNearbyRestaurants);
router.get('/:id', restaurantController.getRestaurantDetail);
router.post('/', protect, restaurantController.createRestaurant);
router.put('/:id', protect, restaurantController.updateRestaurant);

module.exports = router;