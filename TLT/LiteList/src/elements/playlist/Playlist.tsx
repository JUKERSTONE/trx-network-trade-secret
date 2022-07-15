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
  ImageBackground,
} from 'react-native';
import {TrendingCard} from '../trending-card/TrendingCard';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import {VHeader, Body} from '..';

export const PlaylistElement = ({item: playlist, handleNavigateTRAK}: any) => {
  console.log('🚀 ~ file: Seed.tsx ~ line 22 ~ searchResult', playlist);
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <ParallaxScrollView
      backgroundColor="#1a1a1a"
      // contentBackgroundColor={colors ? colors.primary : '#fff'}
      contentBackgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={100}
      renderBackground={() => (
        <ImageBackground
          source={{uri: playlist.images}}
          style={{
            height: 300,
            padding: 6,
            paddingBottom: 80,
            backgroundColor: '#1A1A1A',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}></ImageBackground>
      )}
      // renderForeground={() => (

      // )}
    >
      <FlatList
        // horizontal
        data={playlist.tracks}
        style={{height: '100%'}}
        // numColumns={3}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Profile.tsx ~ line 305 ~ item', item);
          return (
            <Pressable
              onPress={() =>
                handleNavigateTRAK({...item, cover_art: playlist.images[0].url})
              }>
              <TrendingCard
                rank={index + 1}
                artwork={item.track.album.images[0].url}
                title={item.track.artists[0].name}
                artist={item.track.name}
                status={'same'}
              />
            </Pressable>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
    </ParallaxScrollView>
  );
};
