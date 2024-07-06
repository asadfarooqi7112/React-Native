import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';

// Register the background event handler
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the notification
  if (type === EventType.ACTION_PRESS && pressAction.id === 'default') {
    // Handle the action press, for example, navigate to a specific screen
    console.log('Notification action pressed');
  }
  await notifee.cancelNotification(notification.id);
});

AppRegistry.registerComponent(appName, () => App);
