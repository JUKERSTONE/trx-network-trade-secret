import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../../app';

export const useRedeem = ({navigation, route}: any) => {
  const {useGET, usePOST} = useAPI();
  const {handleGetState} = useT4AState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userID = TRXProfile.id;
  console.log('🚀 ~ file: useRedeem.ts ~ line 13 ~ useRedeem ~ userID', userID);

  const trak = route.params.trak;
  const trakID = trak.trakID;
  console.log('🚀 ~ file: useRedeem.ts ~ line 8 ~ useRedeem ~ trakID', trak);

  const handleNavigateNext = async () => {
    const verify = {
      userID,
      trakID,
      proof: '',
    };
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 20 ~ handleNavigateNext ~ verify',
      verify,
    );

    const route = api.bernie({method: 'request_nft'});
    console.log(
      '🚀 ~ file: useExchange.ts ~ line 10 ~ useEffect ~ route',
      route,
    );

    const payload = {
      userID,
      trakID,
      proof: 'test',
      type: 'track',
      trakIMAGE: 'ef',
      trakAUDIO: 'ef',
      trakIPO: 30.3,
      trakCOPIES: 100,
      title: trak.title,
      artist: trak.artist,
      thumbnail: trak.thumbnail,
    };

    const response: any = await usePOST({route, payload});
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 36 ~ handleNavigateNext ~ response',
      response,
    );
  };

  return {
    handleNavigateNext,
  };
};
