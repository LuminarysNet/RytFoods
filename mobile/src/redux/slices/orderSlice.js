import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../../services/order.service';

const initialState = {
  orders: [],
  selectedOrder: null,
  orderTracking: null,
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderService.getUserOrders();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderDetail = createAsyncThunk(
  'order/fetchOrderDetail',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderDetail(orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const trackOrder = createAsyncThunk(
  'order/trackOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderService.trackOrder(orderId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async ({ orderId, reason }, { rejectWithValue }) => {
    try {
      const response = await orderService.cancelOrder(orderId, reason);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateOrderTracking: (state, action) => {
      state.orderTracking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.orderTracking = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      });
  },
});

export const { clearError, updateOrderTracking } = orderSlice.actions;
export default orderSlice.reducer;