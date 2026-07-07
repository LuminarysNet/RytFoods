// API Configuration
export const API_BASE_URL = process.env.API_BASE_URL || 'http://192.168.1.100:3000/api/v1';
export const API_TIMEOUT = 30000;

// Socket Configuration
export const SOCKET_URL = process.env.SOCKET_URL || 'http://192.168.1.100:3000';
export const SOCKET_RECONNECTION_DELAY = 5000;

// Stripe Configuration
export const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY || '';
export const STRIPE_MERCHANT_NAME = 'RytFoods';

// Google Maps Configuration
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

// Firebase Configuration
export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// App Colors
export const COLORS = {
  primary: '#FF6B35',
  darkCharcoal: '#1A1A1A',
  accentGreen: '#2ECC71',
  lightGray: '#F5F5F5',
  warningRed: '#E74C3C',
  accentBlue: '#3498DB',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGrayBg: '#FAFAFA',
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  WALLET: 'wallet',
  CASH: 'cash',
  UPI: 'upi',
};

// User Types
export const USER_TYPES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
};

// Screen Names
export const SCREENS = {
  // Auth
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  SPLASH: 'Splash',
  
  // Customer Screens
  HOME: 'Home',
  RESTAURANT_DETAIL: 'RestaurantDetail',
  CART: 'Cart',
  CHECKOUT: 'Checkout',
  ORDER_TRACKING: 'OrderTracking',
  ORDER_HISTORY: 'OrderHistory',
  PROFILE: 'Profile',
  FAVORITES: 'Favorites',
  CHAT: 'Chat',
  SEARCH: 'Search',
  
  // Vendor Screens
  VENDOR_DASHBOARD: 'VendorDashboard',
  MENU_MANAGEMENT: 'MenuManagement',
  ORDER_MANAGEMENT: 'OrderManagement',
  ANALYTICS: 'Analytics',
  VENDOR_CHAT: 'VendorChat',
};

// Rating Ranges
export const RATING_RANGES = [
  { min: 0, max: 2, label: 'Poor', color: '#E74C3C' },
  { min: 2, max: 3, label: 'Fair', color: '#F39C12' },
  { min: 3, max: 4, label: 'Good', color: '#F1C40F' },
  { min: 4, max: 5, label: 'Excellent', color: '#2ECC71' },
];

// Distance Units
export const DISTANCE_UNIT = 'km';
export const GEOLOCATION_TIMEOUT = 30000;
export const GEOLOCATION_MAX_AGE = 5000;

// Default Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_PAGE = 1;

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
};

// Regular Expressions
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]{10,}$/,
  ZIPCODE: /^\d{5}(-\d{4})?$/,
  URL: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_PHONE: 'Please enter a valid phone number.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  ORDER_PLACED: 'Order placed successfully!',
  PAYMENT_SUCCESS: 'Payment successful!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};
