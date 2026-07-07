import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import restaurantService from '../../services/restaurant.service';

const initialState = {
  restaurants: [],
  selectedRestaurant: null,
  menuItems: [],
  isLoading: false,
  error: null,
};

export const fetchRestaurants = createAsyncThunk(
  'restaurant/fetchRestaurants',
  async ({ page = 1, limit = 20, filters = {} }, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getRestaurants(page, limit, filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRestaurantDetail = createAsyncThunk(
  'restaurant/fetchRestaurantDetail',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getRestaurantDetail(restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMenuItems = createAsyncThunk(
  'restaurant/fetchMenuItems',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await restaurantService.getMenuItems(restaurantId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchRestaurantDetail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRestaurantDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedRestaurant = action.payload;
      })
      .addCase(fetchRestaurantDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchMenuItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menuItems = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = restaurantSlice.actions;
export default restaurantSlice.reducer;