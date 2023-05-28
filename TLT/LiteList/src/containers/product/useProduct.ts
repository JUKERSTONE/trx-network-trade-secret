import React, {useEffect, useState, useContext} from 'react';
import {store, handleMediaPlayerAction} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {useAPI} from '../../api';

export const useProduct = ({navigation, route}: any) => {
  console.log('🚀 ~ file: useProduct.ts:7 ~ useProduct ~ route:', route);
  const product = route.params.item;

  const handlePurchaseProduct = () => {
    //
    //
  };

  return {
    product,
    handlePurchaseProduct,
  };
};
