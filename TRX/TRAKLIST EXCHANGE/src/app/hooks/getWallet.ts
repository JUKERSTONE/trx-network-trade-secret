import {api, useAPI} from '../../api';
import {useTRAKLISTState} from '../useTRAKLISTState';
import {store, setTRXWallet} from '../../stores';

export const handleGetWallet = async (token: string) => {
  const {useGET, usePOST} = useAPI();
  const route = api.walter({
    method: 'get_user_wallet',
  });

  const userWalletResponse = await useGET({
    route,
    token,
  });

  const userWallet = userWalletResponse.data;
  console.log(
    '🚀 ~ file: getWallet.ts ~ line 17 ~ handleGetWal ~ userWallet',
    userWallet,
  );

  if (userWallet === 'User has not connected to FORCHAIN') {
    // const action = setTRXWallet([]);
    // store.dispatch(action);

    const route2 = api.bernie({
      method: 'get_user_wallet',
    });

    const trak = await useGET({
      route: route2,
      token,
    })
      .then((res: any) => {
        console.log(
          '🚀 ~ file: getWallet.ts ~ line 41 ~ handleGetWal ~ res',
          res,
        );
        return res.data;
      })
      .catch(err => {
        alert('err in collecting trak');
      });

    console.log(
      '🚀 ~ file: getWallet.ts ~ line 34 ~ handleGetWal ~ trak',
      trak,
    );

    const action = setTRXWallet({items: trak, type: 'trak'});
    store.dispatch(action);

    return;
  }

  const NFTs = userWallet.non_fungible_tokens.stx;

  const wallet = await Promise.all(
    Object.keys(NFTs).map(async (nft: any) => {
      const assetName = nft.split('::')[1];
      console.log(
        '🚀 ~ file: getWallet.ts ~ line 61 ~ Object.keys ~ assetName',
        assetName,
      );
      const route = api.walter({
        method: 'get_asset',
      });

      return usePOST({
        route,
        token,
        payload: {assetName},
      })
        .then((res: any) => {
          console.log('🚀 ~ file: getWallet.ts ~ line 75 ~ .then ~ res', res);
          console.log(
            '🚀 ~ file: getWallet.ts ~ line 40 ~ .then ~ res.data',
            res.data,
          );
          return res.data;
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: getWallet.ts ~ line 46 ~ Object.keys ~ err',
            err,
          );
          return [];
        });
    }),
  );

  console.log('🚀 ~ file: getWallet.ts ~ line 38 ~ test ~ test', wallet);

  const action = setTRXWallet({items: wallet, type: 'nft'});
  store.dispatch(action);
};
