import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, handleGetColor} from '../../app';
import axios from 'axios';
import {useLITELISTState} from '../../app';

export const useArtist = (artistData: any) => {
  const [colors, setColors] = useState();

  const artist = artistData.item.artist.artist;
  console.log('🚀 ~ file: useArtist.ts ~ line 16 ~ useArtist ~ artist', artist);

  useEffect(() => {
    handleColors();
  }, []);

  const handleColors = async () => {
    const url = artist.images[0].url;
    const colors = await handleGetColor(url);
    console.log(
      '🚀 ~ file: useArtist.ts ~ line 22 ~ handleColors ~ colors',
      colors,
    );
    setColors(colors);
  };

  return {
    colors,
  };
};
