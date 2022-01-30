import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTState} from '../../app';
import {store, spendMoney} from '../../stores';
import {api, useAPI} from '../../api';

export const useFamzView = ({navigation, item}: any) => {
  const {useGET} = useAPI();
  const {handleGetState} = useTRAKLISTState();

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
        payload: {nftID: id, user_name: 'Test'},
      });
      console.log(
        '🚀 ~ file: useFamzView.ts ~ line 37 ~ handlePurchaseNFT ~ route',
        route,
      );

      const response: any = await useGET({route});
      const data = response.data;

      // append wallet
    }
  };

  return {
    handlePurchaseNFT,
  };
};
