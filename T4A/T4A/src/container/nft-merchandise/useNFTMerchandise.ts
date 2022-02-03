import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';

export const useNFTMerchandise = ({navigation, route}: any) => {
  const item = route.params;

  const handleNavigateAddMerchandise = () => {
    navigation.navigate('ADD_MERCHANDISE');
  };

  return {
    item,
    handleNavigateAddMerchandise,
  };
};
