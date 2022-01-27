import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';

export const useVerifyNFT = ({navigation, route}: any) => {
  const NFTRequest = route.params.item;

  const handleVerifyNFT = () => {
    alert('Verify');
    //
  };

  return {
    NFTRequest,
    handleVerifyNFT,
  };
};
