import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../utils/constants';
import { formatCurrency, formatRating } from '../../utils/formatters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RestaurantCard = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.overlay}>
        <View style={styles.ratingBadge}>
          <MaterialCommunityIcons name="star" color={COLORS.white} size={14} />
          <Text style={styles.ratingText}>{formatRating(restaurant.rating)}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>
          {restaurant.cuisineType.join(', ')}
        </Text>
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="clock" color={COLORS.gray} size={14} />
            <Text style={styles.infoText}>{restaurant.deliveryTime} min</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="cash" color={COLORS.gray} size={14} />
            <Text style={styles.infoText}>
              {formatCurrency(restaurant.deliveryFee)} delivery
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.lightGray,
  },
  overlay: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  ratingBadge: {
    backgroundColor: COLORS.darkCharcoal,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.darkCharcoal,
    marginBottom: 5,
  },
  cuisine: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 10,
  },
  info: {
    flexDirection: 'row',
    gap: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 11,
    color: COLORS.gray,
  },
});

export default RestaurantCard;