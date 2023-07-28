import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useSelector} from 'react-redux';
import {setYoutubeOff, store} from '../../stores';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome5';

export const LandingTRXCategoriesElement = ({data, ...props}: any) => {
  //   handleGetState({index: 'player'});

  const {
    mode,
    paused,
    muted,
    players,
    repeat,
    source,
    image,
    title,
    artist,
    queue,
    index,
    youtubeId,
    youtubeMinimize,
  } = useSelector((state: any) => state.player);
  // console.log(
  //   '🚀 ~ file: TRAKLISTradio.tsx ~ line 25 ~ TRAKLISTradioElement ~ player',
  //   player,
  // );
  return (
    <View>
      <View
        style={{
          borderRadius: 10,
        }}>
        {/* <YoutubePlayer
          height={200}
          play={!youtubeId}
          videoId={youtubeId?.split('=')[1] ?? 'DljzHxC_9i4'}
          onChangeState={event => {
            if (event == 'ended') {
              const action = setYoutubeOff({});
              store.dispatch(action);
            }
          }}
        /> */}

        <Pressable
          onPress={() => alert('patience & persistence..')}></Pressable>
      </View>
    </View>
  );
};
