import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

const CartScreen = () => {
  const { items, subtotal, tax, deliveryFee, total } = useSelector(
    (state) => state.cart
  );

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.menuItemId}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text>Subtotal</Text>
              <Text>{formatCurrency(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Tax</Text>
              <Text>{formatCurrency(tax)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Delivery Fee</Text>
              <Text>{formatCurrency(deliveryFee)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalText}>{formatCurrency(total)}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  listContent: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: COLORS.lightGrayBg,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontWeight: 'bold',
    color: COLORS.darkCharcoal,
    marginBottom: 5,
  },
  itemQty: {
    fontSize: 12,
    color: COLORS.gray,
  },
  itemPrice: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  summary: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontWeight: 'bold',
    color: COLORS.darkCharcoal,
  },
});

export default CartScreen;