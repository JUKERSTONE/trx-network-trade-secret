import {toggleExchangeView, store} from '../../stores';

export const useSignIn = ({navigation}: any) => {
  const handleDeposit = () => {
    const modal = {
      type: 'deposit',
      exchange: {
        active: true,
      },
    };
    const action = toggleExchangeView(modal);
    store.dispatch(action);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleNavigateSignIn = () => {
    navigation.navigate('SIGN_IN');
  };

  const handleNavigateRegister = () => {
    navigation.navigate('REGISTER');
  };

  return {
    handleDeposit,
    handleGoBack,
    handleNavigateSignIn,
    handleNavigateRegister,
  };
};
