import {View, Text, Button} from 'react-native';
import React from 'react';

export const FamzViewElement = ({item, handlePurchaseNFT}: any) => {
  console.log('🚀 ~ file: FamzNFT.tsx ~ line 5 ~ FamzViewElement ~ item', item);
  const hasBTC = item.nft.trakCOPIES?.btc !== 0;
  const hasSTX = item.nft.trakCOPIES?.stx !== 0;
  const hasADA = item.nft.trakCOPIES?.ada !== 0;
  const hasSOL = item.nft.trakCOPIES?.sol !== 0;
  return (
    <View>
      <Text>PRICE : {item.nft.trakIPO} TRX</Text>
      {hasBTC && (
        <Button
          title="Purchase BTC"
          onPress={() =>
            handlePurchaseNFT({
              nft: item.nft,
              quantity: 1,
              id: item.nftID,
              market: 'btc',
            })
          }
        />
      )}
      {hasSTX && (
        <Button
          title="Purchase STX"
          onPress={() =>
            handlePurchaseNFT({
              nft: item.nft,
              quantity: 1,
              id: item.nftID,
              market: 'stx',
            })
          }
        />
      )}
      {hasADA && (
        <Button
          title="Purchase ADA"
          onPress={() =>
            handlePurchaseNFT({
              nft: item.nft,
              quantity: 1,
              id: item.nftID,
              market: 'ada',
            })
          }
        />
      )}
      {hasSOL && (
        <Button
          title="Purchase SOL"
          onPress={() =>
            handlePurchaseNFT({
              nft: item.nft,
              quantity: 1,
              id: item.nftID,
              market: 'ada',
            })
          }
        />
      )}
    </View>
  );
};
