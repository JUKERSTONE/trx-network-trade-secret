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
import Toast from 'react-native-toast-message';

export const TRAKLISTradioElement = () => {
  const {handleGetState} = useLITELISTState();

  const {userData, setUserData} = useContext(PlayerContext);

  // const {mode, paused, muted, repeat, source, image, title, artist} =
  //   handleGetState({index: 'player'});

  const {
    mode,
    paused,
    muted,
    repeat,
    source,
    image,
    title,
    artist,
    queue,
    index,
  } = useSelector((state: any) => state.player);
  // console.log(
  //   '🚀 ~ file: TRAKLISTradio.tsx ~ line 25 ~ TRAKLISTradioElement ~ player',
  //   player,
  // );

  const upcomingTRAK = queue[index + 1];

  return (
    <MediaPlayer
      onEnd={() => (!repeat ? userData.swiperRef.current.swipeRight() : null)}
      playInBackground={true}
      source={source}
      audioOnly={true}
      paused={paused}
      muted={muted}
      controls={false}
      ignoreSilentSwitch="ignore"
      repeat={repeat}
      onProgress={progressData => {
        console.log(
          '🚀 ~ file: TRAKLISTradio.tsx ~ line 48 ~ TRAKLISTradioElement ~ progressData',
          progressData,
        );
        if (progressData.currentTime > 15 && progressData.currentTime < 20) {
          if (!repeat) {
            Toast.show({
              type: 'success',
              text1: 'Coming up on TRAKLIST...',
              text2: upcomingTRAK.artist + ' - ' + upcomingTRAK.title,
            });
          } else {
            Toast.show({
              type: 'success',
              text1: 'Looping...',
              text2: upcomingTRAK.artist + ' - ' + upcomingTRAK.title,
            });
          }
        }
        setUserData({...userData, ...progressData});
      }}
    />
  );
};
