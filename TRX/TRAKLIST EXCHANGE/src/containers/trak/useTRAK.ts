import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';

export const useTRAK = ({navigation, route}: any) => {
  const [TRAK, setTRAK] = useState();
  const {useGET} = useAPI();
  useEffect(() => {
    const trak = route.params.trak;
    const trakID = trak.trakID;
    getTRAK(trakID);
  }, []);

  const getTRAK = async (trakID: string) => {
    console.log('🚀 ~ file: useTRAK.ts ~ line 13 ~ getTRAK ~ trakID', trakID);
    const route = api.bernie({method: 'get_trak', payload: {trakID}});
    console.log('🚀 ~ file: useTRAK.ts ~ line 15 ~ getTRAK ~ route', route);
    const response = await useGET({route});
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 15 ~ getTRAK ~ response',
      response,
    );
    const trak = response.data;
    setTRAK(trak);
  };

  const handleSeeMoreMeta = (songRelationships: any) => {
    const modal = {
      type: 'trak-relationships',
      trakRelationships: {
        active: true,
        songRelationships,
      },
    };
    console.log(
      '🚀 ~ file: useTRAK.ts ~ line 35 ~ handleSeeMoreMeta ~ modal',
      modal,
    );
    const action = toggleTRAKRelationshipsView(modal);
    store.dispatch(action);
  };

  return {
    TRAK,
    handleSeeMoreMeta,
  };
};
