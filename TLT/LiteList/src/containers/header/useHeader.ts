import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
export const useHeader = ({navigation}: any) => {
  const {handleGetState} = useLITELISTState();

  const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;

  const handleDeposit = () => {
    navigation.navigate('MODAL', {
      type: 'deposit',
      exchange: {
        active: true,
      },
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAuthentication = (isModal: any) => {
    // remove state when logging out

    switch (isLoggedIn) {
      case true:
        Alert.alert('Signing Out', `Are you sure you want to sign out?`, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'SIGN OUT',
            onPress: async () => {
              if (isModal) {
                navigation.goBack();
              }
              return auth()
                .signOut()
                .then(() => {
                  const authAction = setAuthentication(false);
                  store.dispatch(authAction);
                  console.log('User signed out!');
                });
            },
          },
        ]);

      default:
        navigation.navigate('AUTHENTICATION');
    }
  };

  const handleProfile = () => {
    navigation.navigate('MODAL', {
      type: 'profile',
      exchange: {
        active: true,
        item: TRXProfile,
      },
    });
  };

  return {
    handleDeposit,
    handleGoBack,
    isLoggedIn,
    handleAuthentication,
    handleProfile,
    TRXProfile,
  };
};
