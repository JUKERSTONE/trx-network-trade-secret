import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import MediaPlayer from 'react-native-video';
import {useLITELISTState} from '../../app';

import {VHeader, Body} from '..';

export const TRAKLISTradioElement = () => {
  const {handleGetState} = useLITELISTState();

  const {mode, paused, muted, repeat, source, image, title, artist} =
    handleGetState({index: 'player'});
  console.log(
    '🚀 ~ file: TraklistRadio.tsx ~ line 9 ~ TRAKLISTradio ~ mode, paused, muted, repeat, source, image, title, artis',
    mode,
    paused,
    muted,
    repeat,
    source,
    image,
    title,
    artist,
  );
  return (
    <MediaPlayer
      playInBackground={true}
      source={source}
      audioOnly={true}
      paused={paused}
      muted={muted}
      controls={false}
      ignoreSilentSwitch="ignore"
      repeat={repeat}
      // onProgress={progressData => setProgress(progressData)}
    />
  );
};
