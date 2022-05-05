import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
export const useHeader = ({navigation}: any) => {
  const {handleGetState} = useLITELISTState();

  const isLoggedIn = handleGetState({index: 'authentication'}).isLoggedIn;

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
      default:
        navigation.navigate('AUTHENTICATION');
    }
  };

  return {
    handleDeposit,
    handleGoBack,
    isLoggedIn,
    handleAuthentication,
  };
};
