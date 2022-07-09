import React, {useState, useContext} from 'react';
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
import {useSelector} from 'react-redux';
import {VHeader, Body} from '..';
import {PlayerContext} from '../../stores';

export const TRAKLISTradioElement = () => {
  const {handleGetState} = useLITELISTState();

  const {userData, setUserData} = useContext(PlayerContext);

  // const {mode, paused, muted, repeat, source, image, title, artist} =
  //   handleGetState({index: 'player'});

  const {mode, paused, muted, repeat, source, image, title, artist} =
    useSelector((state: any) => state.player);
  // console.log(
  //   '🚀 ~ file: TRAKLISTradio.tsx ~ line 25 ~ TRAKLISTradioElement ~ player',
  //   player,
  // );

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
      onProgress={progressData => setUserData(progressData)}
    />
  );
};
