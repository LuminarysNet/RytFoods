import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import store from './redux/store';
import RootNavigator from './navigation/RootNavigator';
import SplashScreen from './screens/Shared/SplashScreen';
import { toastConfig } from './utils/toastConfig';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      // Check if user is already logged in
      const userToken = await AsyncStorage.getItem('userToken');
      console.log('User token found:', !!userToken);
    } catch (e) {
      console.error('Failed to restore token', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;