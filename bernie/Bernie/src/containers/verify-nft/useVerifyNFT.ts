import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';

export const useVerifyNFT = ({navigation, route}: any) => {
  const NFTRequest = route.params.item;

  const handleVerifyNFT = () => {
    alert('Verify');

    //  ---
    // script - hasNFT = false
    // bernie setTRAK = hasNFT = false
    // check if hasNFT
    // if yes, decline
    // if no, create new TRAK with isNFT an no hasNFT - props
  };

  return {
    NFTRequest,
    handleVerifyNFT,
  };
};
