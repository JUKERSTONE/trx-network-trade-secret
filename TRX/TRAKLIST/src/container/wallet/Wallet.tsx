import React from 'react';
import {View, Text} from 'react-native';
import {WalletElement} from '../../elements';
import {useWalletInterface} from './useWallet';

export const WalletContainer = ({navigation, ...props}: any) => {
  const {...useWalletInterfaceProps} = useWalletInterface({navigation});
  return <WalletElement {...useWalletInterfaceProps} {...props} />;
};
