import {View, Text} from 'react-native';
import React from 'react';
import {WalletTabElement} from '../../elements';
import {useWalletTab} from './useWalletTab';

export const WalletTabContainer = ({
  wallet,
  trak,
  title,
  artist,
  navigation,
  ...props
}: any) => {
  const {...useWalletTabProps} = useWalletTab({navigation, title, artist});
  return (
    <WalletTabElement
      wallet={wallet}
      data={trak}
      isExchange
      {...useWalletTabProps}
      {...props}
    />
  );
};
