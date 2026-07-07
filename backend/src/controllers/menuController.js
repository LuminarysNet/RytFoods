const MenuItem = require('../models/MenuItem');
const logger = require('../utils/logger');

exports.getMenuItems = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { category } = req.query;

    const query = { restaurantId, availability: true };
    if (category) {
      query.category = category;
    }

    const menuItems = await MenuItem.find(query).sort({ category: 1 });

    res.json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    logger.error('Get menu items error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.getMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Menu item not found' },
      });
    }

    res.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    logger.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.createMenuItem = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, price, category, isVegetarian, preparationTime } = req.body;

    const menuItem = await MenuItem.create({
      restaurantId,
      name,
      description,
      price,
      category,
      isVegetarian,
      preparationTime,
      image: req.file ? req.file.path : null,
    });

    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    logger.error('Create menu item error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (req.file) {
      updateData.image = req.file.path;
    }

    const menuItem = await MenuItem.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Menu item not found' },
      });
    }

    res.json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    logger.error('Update menu item error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Menu item not found' },
      });
    }

    res.json({
      success: true,
      message: 'Menu item deleted',
    });
  } catch (error) {
    logger.error('Delete menu item error:', error);
    res.status(500).json({
      success: false,
      error: { code: 'SERVER_ERROR', message: error.message },
    });
  }
};