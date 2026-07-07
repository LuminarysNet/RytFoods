import api from './api';

const chatService = {
  sendMessage: async (conversationId, content) => {
    const response = await api.post('/chats/send', {
      conversationId,
      content,
    });
    return response.data;
  },

  getConversation: async (conversationId, page = 1) => {
    const response = await api.get(
      `/chats/${conversationId}?page=${page}`
    );
    return response.data;
  },

  listConversations: async () => {
    const response = await api.get('/chats');
    return response.data;
  },

  markAsRead: async (conversationId) => {
    const response = await api.put(`/chats/${conversationId}/read`);
    return response.data;
  },

  deleteConversation: async (conversationId) => {
    const response = await api.delete(`/chats/${conversationId}`);
    return response.data;
  },
};

export default chatService;