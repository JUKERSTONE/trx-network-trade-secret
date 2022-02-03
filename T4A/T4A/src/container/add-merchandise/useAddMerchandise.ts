import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../..';

export const useAddMerchandise = ({navigation, route}: any) => {
  const item = route.params;

  const handleAddMerchandise = () => {
    alert('erwf');
    // title
    // userID
    // price
    // thumbnail
    // proof
  };

  return {
    item,
    handleAddMerchandise,
  };
};
