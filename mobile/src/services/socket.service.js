import io from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';
import store from '../redux/store';
import { updateOrderTracking } from '../redux/slices/orderSlice';

let socket = null;

const socketService = {
  connect: (token) => {
    socket = io(SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    // Order tracking events
    socket.on('order_status_updated', (data) => {
      store.dispatch(updateOrderTracking(data));
    });

    socket.on('order_assigned', (data) => {
      console.log('Order assigned:', data);
    });

    socket.on('delivery_started', (data) => {
      store.dispatch(updateOrderTracking(data));
    });

    // Chat events
    socket.on('receive_message', (message) => {
      console.log('New message:', message);
    });

    socket.on('user_typing', (data) => {
      console.log('User typing:', data);
    });
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
    }
  },

  emit: (event, data) => {
    if (socket) {
      socket.emit(event, data);
    }
  },

  on: (event, callback) => {
    if (socket) {
      socket.on(event, callback);
    }
  },

  off: (event) => {
    if (socket) {
      socket.off(event);
    }
  },
};

export default socketService;