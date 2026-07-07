import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import store from '../redux/store';

const notificationService = {
  // Request user notification permissions
  requestPermission: async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permissions granted');
        return true;
      }
    } catch (error) {
      console.error('Permission request error:', error);
    }
    return false;
  },

  // Get FCM token
  getFCMToken: async () => {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.error('FCM token error:', error);
      return null;
    }
  },

  // Display local notification
  displayNotification: async (title, body, data = {}) => {
    try {
      await notifee.displayNotification({
        title,
        body,
        data,
        android: {
          channelId: 'default',
          smallIcon: 'ic_notification',
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          critical: false,
          sound: 'default',
        },
      });
    } catch (error) {
      console.error('Notification display error:', error);
    }
  },

  // Initialize notification handlers
  initialize: () => {
    // Handle notifications when app is in foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message:', remoteMessage);
      await notificationService.displayNotification(
        remoteMessage.notification?.title || 'New Notification',
        remoteMessage.notification?.body || '',
        remoteMessage.data
      );
    });

    // Handle notification tap
    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === 1) {
        // Press action
        console.log('Notification pressed:', detail);
      }
    });

    return unsubscribe;
  },
};

export default notificationService;