import api from './api';

const paymentService = {
  createPaymentIntent: async (orderId, amount) => {
    const response = await api.post('/payments/create-intent', {
      orderId,
      amount,
    });
    return response.data;
  },

  confirmPayment: async (paymentIntentId, orderId) => {
    const response = await api.post('/payments/confirm', {
      paymentIntentId,
      orderId,
    });
    return response.data;
  },

  getPaymentHistory: async (page = 1) => {
    const response = await api.get(`/payments?page=${page}`);
    return response.data;
  },

  handlePaymentWebhook: async (webhookData) => {
    const response = await api.post('/payments/webhook', webhookData);
    return response.data;
  },
};

export default paymentService;