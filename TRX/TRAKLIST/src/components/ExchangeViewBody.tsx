import {View, Text, Alert} from 'react-native';
import React from 'react';
import {WalletTabElement} from '../elements';
import {
  FamzViewContainer,
  WalletExchangeContainer,
  WalletTabContainer,
} from '../containers';

export const ExchangeViewBodyComponent = ({
  mode,
  isNFT,
  wallet,
  trak,
  item,
  title,
  artist,
  ...props
}: any) => {
  switch (mode) {
    case 'exchange':
      switch (isNFT) {
        case false:
          return (
            <WalletTabContainer
              wallet={wallet}
              trak={trak}
              title={title}
              artist={artist}
              {...props}
            />
          );
        case true:
          return <FamzViewContainer item={item} {...props} />;
      }
    case 'wallet':
      return (
        <WalletExchangeContainer title={title} artist={artist} {...props} />
      );
    default:
      return <View />;
  }
};
