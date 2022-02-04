import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';

export const useAddMerchandise = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useAddMerchandise.ts ~ line 7 ~ useAddMerchandise ~ route',
    route,
  );
  const {handleGetState} = useT4AState();
  const {usePOST} = useAPI();
  const item = route.params;

  const profile = handleGetState({index: 'profile'});
  const minterID = profile.firebase.uid;

  const handleAddMerchandise = async () => {
    console.log(
      '🚀 ~ file: useAddMerchandise.ts ~ line 11 ~ handleAddMerchandise ~ item',
      item,
    );
    const payload = {
      minterID,
      nftID: item.nftID,
      title: 't',
      price: 70,
      thumbnail: 't',
      proof: 'pr',
    };
    const route = api.bernie({method: 'add_merchandise'});
    const response = await usePOST({route, payload});
    console.log(
      '🚀 ~ file: useAddMerchandise.ts ~ line 21 ~ handleAddMerchandise ~ response',
      response,
    );
  };

  return {
    item,
    handleAddMerchandise,
  };
};
