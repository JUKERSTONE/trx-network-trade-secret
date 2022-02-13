import {View, Text, Button} from 'react-native';
import React from 'react';

export const FamzViewElement = ({item, handlePurchaseNFT}: any) => {
  console.log('🚀 ~ file: FamzNFT.tsx ~ line 5 ~ FamzView ~ item', item);
  return (
    <View>
      <Text>PRICE : {item.nft.trakIPO} TRX</Text>
      <Button
        title="Purchase"
        onPress={() =>
          handlePurchaseNFT({nft: item.nft, quantity: 1, id: item.nftID})
        }
      />
    </View>
  );
};
