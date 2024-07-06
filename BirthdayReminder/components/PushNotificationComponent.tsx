import React, { useEffect } from 'react';
import { View } from 'react-native';
import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native';

function PushNotificationComponent({ allData }) {
  useEffect(() => {
    async function setupNotifications() {
      // Request notification permissions
      await notifee.requestPermission();

      // Create the notification channel when the component mounts
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Trigger notifications for each item in allData with reminderStatus
      allData.forEach(item => {
        if (item.reminderStatus) {
          // Calculate time until reminders (18 hours and 6 hours before)
          const timeUntilReminder18Hours = calculateTimeUntilReminder(item.DOB, 18);
          const timeUntilReminder6Hours = calculateTimeUntilReminder(item.DOB, 6);

          // Schedule notifications for each reminder if the time is positive
          if (timeUntilReminder18Hours > 0) {
            onCreateTriggerNotification(item.DOB, timeUntilReminder18Hours, '18 hours');
          }

          if (timeUntilReminder6Hours > 0) {
            onCreateTriggerNotification(item.DOB, timeUntilReminder6Hours, '6 hours');
          }
        }
      });
    }

    setupNotifications();
  }, [allData]); // Trigger effect when allData changes

  // Calculate time until the reminder date
  function calculateTimeUntilReminder(dob, hoursBefore) {
    const parts = dob.split('/');
    const dobDate = new Date(`${parts[2]}-${parts[0]}-${parts[1]}T00:00:00`);

    dobDate.setFullYear(new Date().getFullYear());

    if (dobDate < new Date()) {
      dobDate.setFullYear(new Date().getFullYear() + 1);
    }

    const reminderDate = new Date(dobDate.getTime() - (hoursBefore * 60 * 60 * 1000));
    return reminderDate.getTime() - new Date().getTime();
  }

  // Create a trigger notification for the given date of birth
  async function onCreateTriggerNotification(dob, timeUntilReminder, reminderLabel) {
    if (timeUntilReminder > 0) {
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: new Date().getTime() + timeUntilReminder,
      };

      // Find the corresponding name from allData
      const item = allData.find(data => data.DOB === dob);
      if (!item) return;

      // Create the notification
      await notifee.createTriggerNotification(
        {
          title: 'Birthday Reminder',
          body: `Reminder: Don't forget, ${item.Name}'s birthday is ${reminderLabel} away!`, // Include the name in the notification body
          android: {
            channelId: 'default',
            smallIcon: 'reminder_small_icon', // Replace with your icon name (without file extension)
          },
        },
        trigger,
      );
    }
  }

  return <View />;
}

export default PushNotificationComponent;
