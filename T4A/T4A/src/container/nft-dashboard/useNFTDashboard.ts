import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';

export const useNFTDashboard = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useNFTDashboard.ts ~ line 7 ~ useNFTDashboard ~ route',
    route,
  );
  const item = route.params;

  const handleNavigateMerchandise = () => {
    navigation.navigate('NFT_MERCHANDISE');
  };

  return {
    item,
    handleNavigateMerchandise,
  };
};
