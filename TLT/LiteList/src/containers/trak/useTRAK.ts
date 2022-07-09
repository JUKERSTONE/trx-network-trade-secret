import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import uuid from 'react-native-uuid';

export const useTRAK = ({navigation, route}: any) => {
  const [TRAK, setTRAK] = useState();
  const {useGET} = useAPI();

  useEffect(() => {
    //
  }, []);

  // const getTRAK = async (trakID: string) => {
  //   const route = api.bernie({method: 'get_trak', payload: {trakID}});
  //   const response = await useGET({route});
  //   console.log(
  //     '🚀 ~ file: useTRAK.ts ~ line 17 ~ getTRAK ~ response',
  //     response,
  //   );
  //   const trak = response.data;
  //   console.log('🚀 ~ file: useTRAK.ts ~ line 18 ~ getTRAK ~ trak', trak);
  //   setTRAK(trak);
  // };

  // const handleSeeMoreMeta = (songRelationships: any) => {
  //   navigation.navigate('MODAL', {
  //     type: 'trak-relationships',
  //     exchange: {
  //       active: true,
  //       item: songRelationships,
  //     },
  //   });
  // };

  const handleNFTNavigation = (item: any) => {
    const nftId = uuid.v4();

    navigation.navigate('MODAL', {
      type: 'nft-view',
      exchange: {
        active: true,
        item: {
          status: 'purchase-whitelist',
          nft: {...item, nftId},
        },
      },
    });
  };

  return {
    // TRAK,
    // handleSeeMoreMeta,
    handleNFTNavigation,
  };
};
