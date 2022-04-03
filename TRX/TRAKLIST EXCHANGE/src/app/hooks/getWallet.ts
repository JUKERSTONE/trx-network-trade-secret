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
    const action = setTRXWallet([]);
    store.dispatch(action);
    return;
  }

  const NFTs = userWallet.non_fungible_tokens.stx;

  const wallet = await Promise.all(
    Object.keys(NFTs).map(async (nft: any) => {
      const assetName = nft.split('::')[1];
      const route = api.walter({
        method: 'get_asset',
      });

      return usePOST({
        route,
        token,
        payload: {assetName},
      })
        .then((res: any) => {
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

  // const route2 = api.bernie({
  //   method: 'get_user_wallet',
  // });
  // const userWalletResponse2 = await useGET({
  //   route2,
  //   token: accessToken,
  // });
  // console.log(
  //   '🚀 ~ file: getWallet.ts ~ line 54 ~ handleGetWal ~ userWalletResponse2',
  //   userWalletResponse2,
  // );

  console.log('🚀 ~ file: getWallet.ts ~ line 38 ~ test ~ test', wallet);

  const action = setTRXWallet(wallet);
  store.dispatch(action);
};
