import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageService = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(
        key,
        typeof value === 'string' ? value : JSON.stringify(value)
      );
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      return null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  },

  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  multiSet: async (items) => {
    try {
      await AsyncStorage.multiSet(items);
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  multiGet: async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Storage error:', error);
      return [];
    }
  },
};

export default storageService;