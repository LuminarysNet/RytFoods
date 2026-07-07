import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Favorites Screen</Text>
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

export default FavoritesScreen;