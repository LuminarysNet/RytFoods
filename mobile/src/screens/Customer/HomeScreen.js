import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/slices/restaurantSlice';
import RestaurantCard from '../../components/RestaurantCard';
import { COLORS } from '../../utils/constants';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { restaurants, isLoading } = useSelector((state) => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants({ page: 1, limit: 20 }));
  }, [dispatch]);

  const renderItem = ({ item }) => <RestaurantCard restaurant={item} />;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No restaurants found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
  },
});

export default HomeScreen;