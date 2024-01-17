const checkNotificationPermission = () => {
  if (!('Notification' in window)) {
    throw new Error('No support for notification API.');
  }
};

const requestNotificationPermission = async () => {
  const permission: NotificationPermission =
    await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission not granted.');
  } else {
    new Notification('Vue-pomodoro-timer', {
      icon: 'icons/pwa-64x64.png',
      body: 'The notification feature is set up.',
    });
  }
};

requestNotificationPermission();
