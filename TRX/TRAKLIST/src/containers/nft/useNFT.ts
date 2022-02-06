import React, {useEffect, useState, useContext} from 'react';

export const useNFT = ({navigation, route}: any) => {
  console.log('🚀 ~ file: useNFT.ts ~ line 4 ~ useNFT ~ route', route);

  const NFT = route.params?.nft ?? null;
  console.log('🚀 ~ file: useNFT.ts ~ line 7 ~ useNFT ~ NFT', NFT);
  return {
    NFT,
  };
};
