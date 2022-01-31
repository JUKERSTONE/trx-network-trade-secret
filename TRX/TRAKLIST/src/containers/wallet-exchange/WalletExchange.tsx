import React from 'react';
import {View, Text} from 'react-native';
import {ExchangeElement} from '../../elements';
import {useExchange} from './useWalletExchange';

export const WalletExchangeContainer = ({navigation, ...props}: any) => {
  const {...useExchangeProps} = useExchange({navigation});
  return <ExchangeElement {...useExchangeProps} {...props} />;
};
