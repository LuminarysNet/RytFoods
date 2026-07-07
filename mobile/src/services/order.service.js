import api from './api';

const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  getUserOrders: async (page = 1, status = null) => {
    let url = '/orders?page=' + page;
    if (status) {
      url += '&status=' + status;
    }
    const response = await api.get(url);
    return response.data;
  },

  getOrderDetail: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  trackOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/track`);
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  cancelOrder: async (orderId, reason) => {
    const response = await api.post(`/orders/${orderId}/cancel`, { reason });
    return response.data;
  },

  rateOrder: async (orderId, rating, review) => {
    const response = await api.post(`/orders/${orderId}/rate`, {
      rating,
      review,
    });
    return response.data;
  },
};

export default orderService;