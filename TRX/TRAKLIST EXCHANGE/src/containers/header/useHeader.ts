import {toggleExchangeView, store} from '../../stores';

export const useHeader = ({navigation}: any) => {
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

  return {
    handleDeposit,
    handleGoBack,
  };
};
