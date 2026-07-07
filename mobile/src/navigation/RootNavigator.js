import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { COLORS, SCREENS } from '../utils/constants';

// Import Screens
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import SplashScreen from '../screens/Shared/SplashScreen';
import HomeScreen from '../screens/Customer/HomeScreen';
import RestaurantDetailScreen from '../screens/Customer/RestaurantDetailScreen';
import CartScreen from '../screens/Customer/CartScreen';
import CheckoutScreen from '../screens/Customer/CheckoutScreen';
import OrderTrackingScreen from '../screens/Customer/OrderTrackingScreen';
import OrderHistoryScreen from '../screens/Customer/OrderHistoryScreen';
import ProfileScreen from '../screens/Customer/ProfileScreen';
import FavoritesScreen from '../screens/Customer/FavoritesScreen';
import ChatScreen from '../screens/Customer/ChatScreen';
import SearchScreen from '../screens/Customer/SearchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
    }}
  >
    <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
    <Stack.Screen name={SCREENS.SIGNUP} component={SignupScreen} />
    <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const CustomerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.lightGray,
        borderTopWidth: 1,
        paddingBottom: 5,
        paddingTop: 5,
      },
    }}
  >
    <Tab.Screen
      name={SCREENS.HOME}
      component={HomeScreen}
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name={SCREENS.SEARCH}
      component={SearchScreen}
      options={{
        title: 'Search',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name={SCREENS.CART}
      component={CartScreen}
      options={{
        title: 'Cart',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cart" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name={SCREENS.CHAT}
      component={ChatScreen}
      options={{
        title: 'Messages',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="chat" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name={SCREENS.PROFILE}
      component={ProfileScreen}
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const CustomerNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: COLORS.white,
      },
      headerTintColor: COLORS.darkCharcoal,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="CustomerTabs"
      component={CustomerTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={SCREENS.RESTAURANT_DETAIL} component={RestaurantDetailScreen} />
    <Stack.Screen name={SCREENS.CHECKOUT} component={CheckoutScreen} />
    <Stack.Screen name={SCREENS.ORDER_TRACKING} component={OrderTrackingScreen} />
    <Stack.Screen name={SCREENS.ORDER_HISTORY} component={OrderHistoryScreen} />
    <Stack.Screen name={SCREENS.FAVORITES} component={FavoritesScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Customer" component={CustomerNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;