import React from 'react';
import {View, Text} from 'react-native';
import {WalletInterfaceElement} from '../../elements';
import {useWalletInterface} from './useWalletInterface';

export const WalletInterfaceContainer = ({navigation, ...props}: any) => {
  const {...useWalletInterfaceProps} = useWalletInterface({navigation});
  return <WalletInterfaceElement {...useWalletInterfaceProps} {...props} />;
};
