import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

export const handleInitializeNotifications = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log(
      '🚀 ~ file: TRAKLITEInterface.tsx ~ line 85 ~ TRXInterfaceHOC ~ unsubscribe ~ remoteMessage',
      remoteMessage,
    );

    const data = remoteMessage.data;
    const type = data?.type;

    switch (type) {
      case 'chat':
        Toast.show({
          type: 'success',
          text1: data!.title,
          text2: data!.body,
        });

        // entry point to deeplinking application
        break;
      default:
        break;
    }
  });

  return unsubscribe;
};
