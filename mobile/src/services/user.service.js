import api from './api';

const userService = {
  getUserProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateUserProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  uploadProfileImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.post('/users/profile/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getFavorites: async () => {
    const response = await api.get('/users/favorites');
    return response.data;
  },

  addFavorite: async (restaurantId) => {
    const response = await api.post('/users/favorites', { restaurantId });
    return response.data;
  },

  removeFavorite: async (restaurantId) => {
    const response = await api.delete(`/users/favorites/${restaurantId}`);
    return response.data;
  },

  getAddresses: async () => {
    const response = await api.get('/users/addresses');
    return response.data;
  },

  addAddress: async (addressData) => {
    const response = await api.post('/users/addresses', addressData);
    return response.data;
  },

  updateAddress: async (addressId, addressData) => {
    const response = await api.put(`/users/addresses/${addressId}`, addressData);
    return response.data;
  },

  deleteAddress: async (addressId) => {
    const response = await api.delete(`/users/addresses/${addressId}`);
    return response.data;
  },
};

export default userService;