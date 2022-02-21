import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {store, spendMoney, appendWallet} from '../../stores';
import {api, useAPI} from '../../api';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useFamzView = ({navigation, item}: any) => {
  const {useGET} = useAPI();

  const handlePurchaseNFT = async ({nft, quantity, id}: any) => {
    const nftPrice = nft.trakIPO;
    const profile = handleGetState({index: 'profile'});
    const money = profile.TRX.money;
    const totalPrice = nftPrice * quantity;

    if (money < totalPrice) {
      alert('cant afford');
      // return;
    } else {
      const action = spendMoney(totalPrice);
      store.dispatch(action);

      const route = api.bernie({
        method: 'purchase_nft',
        payload: {nftID: id},
      });

      const response: any = await useGET({
        route,
        token: 'Bearer ' + accessToken,
      });
      const data = response.data;

      // append wallet
      const action_2 = appendWallet(data);
      store.dispatch(action_2);

      navigation.navigate('WALLET+');
    }
  };

  return {
    handlePurchaseNFT,
  };
};
