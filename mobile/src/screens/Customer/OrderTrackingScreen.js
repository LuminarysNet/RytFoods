import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const OrderTrackingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Tracking Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: COLORS.darkCharcoal,
  },
});

export default OrderTrackingScreen;