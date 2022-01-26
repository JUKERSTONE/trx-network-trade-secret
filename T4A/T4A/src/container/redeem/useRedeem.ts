import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';

export const useRedeem = ({navigation}: any) => {
  const {useGET} = useAPI();

  useEffect(() => {
    // handleGetBank();
  }, []);

  const handleNavigateNext = () => {
    //
    // bernie logic
    // back to distro
    // ----
    // send proof, userID, and trakID to verify collection
    //  ---
    // script - hasNFT = false
    // bernie setTRAK = hasNFT = false
    // check if hasNFT
    // if yes, decline
    // if no, create new TRAK with isNFT an no hasNFT - props
  };

  return {
    handleNavigateNext,
  };
};
