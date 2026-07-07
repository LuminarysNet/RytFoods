import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  restaurantId: null,
  subtotal: 0,
  tax: 0,
  deliveryFee: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { restaurantId, item } = action.payload;

      if (state.restaurantId && state.restaurantId !== restaurantId) {
        state.items = [];
      }

      state.restaurantId = restaurantId;

      const existingItem = state.items.find(
        (i) => i.menuItemId === item.menuItemId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      const menuItemId = action.payload;
      state.items = state.items.filter(
        (item) => item.menuItemId !== menuItemId
      );
      calculateTotals(state);
    },
    updateCartItem: (state, action) => {
      const { menuItemId, quantity } = action.payload;
      const item = state.items.find((i) => i.menuItemId === menuItemId);
      if (item) {
        item.quantity = quantity;
      }
      calculateTotals(state);
    },
    setDeliveryFee: (state, action) => {
      state.deliveryFee = action.payload;
      calculateTotals(state);
    },
    setTax: (state, action) => {
      state.tax = action.payload;
      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      state.subtotal = 0;
      state.tax = 0;
      state.deliveryFee = 0;
      state.total = 0;
    },
  },
});

const calculateTotals = (state) => {
  state.subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  state.total = state.subtotal + state.tax + state.deliveryFee;
};

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  setDeliveryFee,
  setTax,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;