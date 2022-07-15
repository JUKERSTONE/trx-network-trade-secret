import React from 'react';
import {View, Text} from 'react-native';
import {usePlaylist} from './usePlaylist';
import {PlaylistElement} from '../../elements';

export const PlaylistContainer = ({navigation, route, ...props}: any) => {
  const {...usePlaylistProps} = usePlaylist({navigation, route});
  return <PlaylistElement {...usePlaylistProps} {...props} />;
};
