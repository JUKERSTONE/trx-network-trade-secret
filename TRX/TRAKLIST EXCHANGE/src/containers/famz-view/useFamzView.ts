import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {store, spendMoney, handleBuyNFT} from '../../stores';
import {api, useAPI} from '../../api';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;
const profile = handleGetState({index: 'profile'});
const wallet = handleGetState({index: 'wallet'});
const TRX = profile.TRX;
const hasForchainId = TRX.hasOwnProperty('forchainId');
console.log(
  '🚀 ~ file: useFamzView.ts ~ line 14 ~ hasForchainId',
  hasForchainId,
);

export const useFamzView = ({navigation, item}: any) => {
  const {usePOST} = useAPI();

  // const handlePurchaseNFT = async ({nft, quantity, id, market}: any) => {

  // };: any

  const senderKey = TRX.stacks_keys.private;

  const handlePurchaseWhitelist = async ({
    event,
    nft,
    quantity,
    id,
    market,
  }: any) => {
    alert(event.nativeEvent.data);

    if (event.nativeEvent.data === 'failed') {
      alert('error processign transaction');
      return;
    }
    const nftPrice = nft.trakIPO;
    const profile = handleGetState({index: 'profile'});
    const money = profile.TRX.money;
    const totalPrice = nftPrice * quantity;

    if (money < totalPrice) {
      alert('cant afford');
      // return;
    } else {
      // MUST HAVE FORCHAIN ID
      const action = spendMoney(totalPrice);
      store.dispatch(action);

      const route = api.bernie({
        method: 'purchase_nft',
        payload: {nftID: id},
      });

      const response: any = await usePOST({
        route,
        token: accessToken,
        payload: {market},
      });
      const data = response.data;
      console.log(
        '🚀 ~ file: useFamzView.ts ~ line 38 ~ handlePurchaseNFT ~ data',
        data,
      );

      const nftWallet = wallet.nft;

      // append wallet
      const action_2 = handleBuyNFT([...nftWallet, data]);
      store.dispatch(action_2);

      navigation.navigate('WALLET+');
    }

    // const publicKey = event.nativeEvent.data;
    // console.log(
    //   '🚀 ~ file: ForchainView.tsx ~ line 18 ~ handleConnect ~ publicKey',
    //   publicKey,
    // );

    // const route: any = api.walter({
    //   method: 'connect_forchain',
    // });
    // console.log(
    //   '🚀 ~ file: ForchainView.tsx ~ line 35 ~ handleConnect ~ route',
    //   route,
    // );
    // // console.log(
    // //   '🚀 ~ file: ForchainView.tsx ~ line 34 ~ handleConnect ~ route',
    // //   route,
    // // );

    // const payload = {
    //   publicKey: 'ST2X1BFRET1W8X0S8JAER85RZ7F145JZ4XCDEZ588',
    // };

    // const response = usePOST({route, payload, token: accessToken});
    // console.log(
    //   '🚀 ~ file: ForchainView.tsx ~ line 49 ~ handleConnect ~ response',
    //   response,
    // );

    // // send to walter
  };

  return {
    // handlePurchaseNFT,
    senderKey,
    handlePurchaseWhitelist,
    accessToken,
  };
};
