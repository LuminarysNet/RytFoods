import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import restaurantReducer from './slices/restaurantSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    restaurant: restaurantReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(thunk),
});

export default store;