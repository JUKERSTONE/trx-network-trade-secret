import React from 'react';
import {View, Text} from 'react-native';
import {useArtistTopTracks} from './useArtistTopTracks';
import {ArtistTopTracks} from '../../elements';

export const ArtistTopTracksContainer = ({
  navigation,
  route,
  ...props
}: any) => {
  const {...useArtistTopTracksProps} = useArtistTopTracks({
    navigation,
    route,
  });
  return <ArtistTopTracks {...useArtistTopTracksProps} {...props} />;
};
