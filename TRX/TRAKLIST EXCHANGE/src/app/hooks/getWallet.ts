import {api, useAPI} from '../../api';
import {useTRAKLISTState} from '../useTRAKLISTState';
import {store, setTRXWallet} from '../../stores';

export const handleGetWallet = async (token: string) => {
  const {useGET, usePOST} = useAPI();
  const route = api.bernie({
    method: 'get_user_wallet',
  });
  const userWalletResponse = await useGET({
    route,
    token,
  });
  const userWallet = userWalletResponse.data;
  console.log(
    '🚀 ~ file: getWallet.ts ~ line 14 ~ handleGetWal ~ userWalletResponse',
    userWallet,
  );

  // if (userWallet === 'User has not connected to FORCHAIN') {
  //   // const action = setTRXWallet([]);
  //   // store.dispatch(action);

  //   const route2 = api.bernie({
  //     method: 'get_user_wallet',
  //   });

  //   const trak = await useGET({
  //     route: route2,
  //     token,
  //   })
  //     .then((res: any) => {
  //       console.log(
  //         '🚀 ~ file: getWallet.ts ~ line 41 ~ handleGetWal ~ res',
  //         res,
  //       );
  //       return res.data;
  //     })
  //     .catch(err => {
  //       alert('err in collecting trak');
  //     });

  const nft = userWallet.nft;

  const typedNFT = await Promise.all(
    nft.map(async (item: any) => {
      const assetName = item.nft.trakASSET;
      const market = item.market;

      const route = api.walter({
        method: 'get_user_wallet',
      });

      const forchainWalletResponse = await useGET({
        route,
        token,
      });
      console.log(
        '🚀 ~ file: getWallet.ts ~ line 58 ~ nft.map ~ forchainWalletResponse',
        forchainWalletResponse,
      );

      const forchainWallet = forchainWalletResponse.data;

      const forchainNFT = forchainWallet.non_fungible_tokens[market];
      console.log(
        '🚀 ~ file: getWallet.ts ~ line 66 ~ nft.map ~ forchainNFT',
        forchainNFT,
      );

      if (forchainNFT === null) return {...item, isMinted: false};

      console.log(
        '🚀 ~ file: getWallet.ts ~ line 64 ~ nftTypeArray ~ Object.keys(forchainNFT)',
        Object.keys(forchainNFT),
      );
      const nftTypeArray = Object.keys(forchainNFT).map(item => {
        const forchainAssetName = item.split('::')[1];
        console.log(
          '🚀 ~ file: getWallet.ts ~ line 65 ~ nftTypeArray ~ forchainAssetName',
          forchainAssetName,
        );

        if (forchainAssetName === assetName) {
          return true;
        } else return false;
      });

      return {
        ...item,
        isMinted: nftTypeArray[0],
      };
    }),
  );

  const traklistWallet = {
    trak: userWallet.trak,
    nft: typedNFT,
  };

  const action = setTRXWallet(traklistWallet);
  store.dispatch(action);
};
