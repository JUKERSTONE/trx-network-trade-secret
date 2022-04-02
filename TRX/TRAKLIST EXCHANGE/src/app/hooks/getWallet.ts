import {api, useAPI} from '../../api';
import {useTRAKLISTState} from '../useTRAKLISTState';
import {store, setTRXWallet} from '../../stores';

const {handleGetState} = useTRAKLISTState();

export const handleGetWallet = async () => {
  const keys = handleGetState({index: 'keys'});
  const accessToken = keys.trx.accessToken;

  const {useGET, usePOST} = useAPI();
  const route = api.walter({
    method: 'get_user_wallet',
  });

  const userWalletResponse = await useGET({
    route,
    token: accessToken,
  });

  const userWallet = userWalletResponse.data;

  const NFTs = userWallet.non_fungible_tokens.stx;
  console.log('🚀 ~ file: getWallet.ts ~ line 24 ~ handleGetWal ~ NFTs', NFTs);

  const wallet = await Promise.all(
    Object.keys(NFTs).map(async (nft: any) => {
      const assetName = nft.split('::')[1];
      const route = api.walter({
        method: 'get_asset',
      });
      console.log(
        '🚀 ~ file: getWallet.ts ~ line 32 ~ Object.keys ~ route',
        route,
      );

      return await usePOST({
        route,
        token: accessToken,
        payload: {assetName},
      })
        .then((res: any) => {
          return res.data;
        })
        .catch(err => {
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
