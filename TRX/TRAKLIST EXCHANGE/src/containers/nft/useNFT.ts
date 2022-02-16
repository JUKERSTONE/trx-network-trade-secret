import React, {useEffect, useState, useContext} from 'react';
import {store, handleMediaPlayerAction} from '../../stores';

export const useNFT = ({navigation, route}: any) => {
  console.log('🚀 ~ file: useNFT.ts ~ line 4 ~ useNFT ~ route', route);

  const NFT = route.params?.nft ?? null;
  console.log('🚀 ~ file: useNFT.ts ~ line 7 ~ useNFT ~ NFT', NFT);

  const handlePlayNFT = ({type, uri, url, artist, title}: any) => {
    console.log(
      '🚀 ~ file: useNFT.ts ~ line 11 ~ handlePlayNFT ~ type, uri',
      type,
      uri,
      // image,
    );
    const action = handleMediaPlayerAction({
      playbackState: type,
      uri,
      url,
      artist,
      title,
    });
    store.dispatch(action);
  };

  return {
    NFT,
    handlePlayNFT,
  };
};
