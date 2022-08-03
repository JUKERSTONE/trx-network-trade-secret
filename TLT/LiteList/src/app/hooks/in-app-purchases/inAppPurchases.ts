import {View, Text, Platform} from 'react-native';
import React from 'react';
// @ts-ignore
import {getColorFromURL} from 'rn-dominant-color';
import {initConnection, getSubscriptions} from 'react-native-iap';
import {store, setSubscriptions} from '../../../stores';

const items: any = Platform.select({
  ios: ['trx_musichead', 'trx_pro', 'trx_basic'],
  android: [''],
});

export const handleInAppPurchases = async () => {
  // alert('yeah');
  await initConnection()
    .then(() => {
      getSubscriptions(items).then((res: any) => {
        console.log(
          '🚀 ~ file: inAppPurchases.ts ~ line 18 ~ getSubscriptions ~ res',
          res,
        );
        const action = setSubscriptions(res);
        store.dispatch(action);
        //
        //
      });
    })
    .catch(() => {
      alert('no');
    });

  // console.log(
  //   '🚀 ~ file: inAppPurchases.ts ~ line 9 ~ handleInAppPurchases ~ test',
  //   test,
  // );
};
