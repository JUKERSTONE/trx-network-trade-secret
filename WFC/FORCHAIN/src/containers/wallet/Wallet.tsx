import React from 'react';
import {View, Text} from 'react-native';
import {WalletElement} from '../../elements';
import {useWallet} from './useWallet';

export const WalletContainer = ({navigation, ...props}: any) => {
  const {...useWalletProps} = useWallet({navigation});
  return <WalletElement {...useWalletProps} {...props} />;
};
