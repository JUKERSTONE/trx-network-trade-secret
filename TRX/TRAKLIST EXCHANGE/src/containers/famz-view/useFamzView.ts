import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {store, spendMoney, appendWallet} from '../../stores';
import {api, useAPI} from '../../api';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;
const profile = handleGetState({index: 'profile'});
const TRX = profile.TRX;
const hasForchainId = TRX.hasOwnProperty('forchainId');
console.log(
  '🚀 ~ file: useFamzView.ts ~ line 14 ~ hasForchainId',
  hasForchainId,
);

export const useFamzView = ({navigation, item}: any) => {
  const {usePOST} = useAPI();

  const handlePurchaseNFT = async ({nft, quantity, id, market}: any) => {
    const nftPrice = nft.trakIPO;
    const profile = handleGetState({index: 'profile'});
    const money = profile.TRX.money;
    const totalPrice = nftPrice * quantity;

    if (money < totalPrice) {
      alert('cant afford');
      // return;
    } else if (hasForchainId) {
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

      // append wallet
      const action_2 = appendWallet(data);
      store.dispatch(action_2);

      navigation.navigate('WALLET+');
    } else {
      alert('please connect forchain wallet');
    }
  };

  return {
    handlePurchaseNFT,
  };
};
