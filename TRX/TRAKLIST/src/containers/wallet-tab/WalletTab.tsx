import {View, Text} from 'react-native';
import React from 'react';
import {WalletTabElement} from '../../elements';
import {useWalletTab} from './useWalletTab';

export const WalletTabContainer = ({
  wallet,
  trak,
  title,
  artist,
  item,
  navigation,
  ...props
}: any) => {
  const {...useWalletTabProps} = useWalletTab({
    navigation,
    title,
    artist,
    item,
  });
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
