const Restaurant = require('../models/Restaurant');
const logger = require('../utils/logger');

exports.getRestaurants = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const query = { isApproved: true };

    if (req.query.city) {
      query['address.city'] = req.query.city;
    }

    if (req.query.cuisineType) {
      query.cuisineType = { $in: [req.query.cuisineType] };
    }

    const restaurants = await Restaurant.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ rating: -1 });

    const total = await Restaurant.countDocuments(query);

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.getRestaurantDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findById(id).populate('vendorId', 'name email phone');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Restaurant not found' },
      });
    }

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    logger.error('Get restaurant detail error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.searchRestaurants = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Search query required' },
      });
    }

    const restaurants = await Restaurant.find(
      { $text: { $search: q }, isApproved: true },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });

    res.json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    logger.error('Search restaurants error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.getNearbyRestaurants = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Latitude and longitude required' },
      });
    }

    const restaurants = await Restaurant.find({
      isApproved: true,
      'address.latitude': {
        $gte: parseFloat(latitude) - parseFloat(radius),
        $lte: parseFloat(latitude) + parseFloat(radius),
      },
      'address.longitude': {
        $gte: parseFloat(longitude) - parseFloat(radius),
        $lte: parseFloat(longitude) + parseFloat(radius),
      },
    });

    res.json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    logger.error('Get nearby restaurants error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, cuisineType, address, operatingHours, deliveryTime, deliveryFee, minOrder, phone } = req.body;

    const restaurant = await Restaurant.create({
      vendorId: req.user.id,
      name,
      description,
      cuisineType,
      address,
      operatingHours,
      deliveryTime,
      deliveryFee,
      minOrder,
      phone,
    });

    res.status(201).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    logger.error('Create restaurant error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Restaurant not found' },
      });
    }

    res.json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    logger.error('Update restaurant error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};