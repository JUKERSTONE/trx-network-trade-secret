import {toggleExchangeView, store} from '../../stores';

export const useHeader = ({navigation}: any) => {
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

  return {
    handleDeposit,
    handleGoBack,
  };
};
