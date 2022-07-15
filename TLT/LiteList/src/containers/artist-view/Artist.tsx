import React from 'react';
import {View, Text} from 'react-native';
import {useArtist} from './useArtist';
import {ArtistView} from '../../elements';

export const ArtistContainer = (artistData: any) => {
  const {...useArtistProps} = useArtist(artistData);
  return <ArtistView {...useArtistProps} artistData={artistData} />;
};
