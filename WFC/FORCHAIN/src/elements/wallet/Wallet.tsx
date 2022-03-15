import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
} from 'react-native';

export const WalletElement = ({
  wallet = [],
  trak,
  handleNavigateTRAK,
  handleNavigateNFT,
  handleExchange,
  handleConnectWallet,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'WALLET'},
    {key: 'second', title: 'ACTIVITY'},
  ]);

  if (trak == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height,
        }}>
        <ActivityIndicator color="blue" size="small" />
      </View>
    );
  return (
    <>
      <Button title="connect wallet" onPress={handleConnectWallet} />
    </>
  );
};
