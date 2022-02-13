import {toggleExchangeView, store} from '../../stores';

export const useHeader = () => {
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

  return {
    handleDeposit,
  };
};
