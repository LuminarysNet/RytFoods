import api from './api';

const restaurantService = {
  getRestaurants: async (page = 1, limit = 20, filters = {}) => {
    const query = new URLSearchParams({
      page,
      limit,
      ...filters,
    });
    const response = await api.get(`/restaurants?${query}`);
    return response.data;
  },

  getRestaurantDetail: async (restaurantId) => {
    const response = await api.get(`/restaurants/${restaurantId}`);
    return response.data;
  },

  searchRestaurants: async (query) => {
    const response = await api.get(`/restaurants/search?q=${query}`);
    return response.data;
  },

  getMenuItems: async (restaurantId, category = null) => {
    let url = `/restaurants/${restaurantId}/menu`;
    if (category) {
      url += `?category=${category}`;
    }
    const response = await api.get(url);
    return response.data;
  },

  getMenuItem: async (menuItemId) => {
    const response = await api.get(`/menu/${menuItemId}`);
    return response.data;
  },

  getNearbyRestaurants: async (latitude, longitude, radius = 5) => {
    const response = await api.get('/restaurants/nearby', {
      params: { latitude, longitude, radius },
    });
    return response.data;
  },
};

export default restaurantService;