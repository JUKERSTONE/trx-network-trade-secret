import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {VHeader, Body, Caption} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import Swiper from 'react-native-deck-swiper';
import {SwipeCard} from '../swipe-card';
export const SwipeElement = ({recommendations, handleSetPlayer}: any) => {
  console.log(
    '🚀 ~ file: Swipe.tsx ~ line 23 ~ SwipeElement ~ recommendations',
    recommendations,
  );

  if (recommendations.length === 0) {
    return <View />;
  }
  return (
    <Swiper
      backgroundColor="#1a1a1a"
      cards={recommendations}
      renderCard={(card: any, index) => {
        console.log(
          '🚀 ~ file: Swipe.tsx ~ line 44 ~ SwipeElement ~ card',
          recommendations,
          recommendations[index],
          index,
        );
        // const {web, cover_art, artist, title} = recommendations[index + 9];
        handleSetPlayer(recommendations, index);

        return (
          <SwipeCard
            handleNavigateTrack={() => alert(1)}
            recommendations={recommendations}
            index={index}
          />
        );
      }}
      // onTapCard={({cardIndex, card}: any) => {
      //   const ids = {
      //     track: card.track.id,
      //     artist: card.artist.id,
      //   };
      //   console.log('🚀 ~ file: index.tsx ~ line 72 ~ ids', ids);
      //   handleNavigateTrack(ids);
      // }}
      // onSwiped={(cardIndex) => generateItems(cardIndex)}
      onSwipedAll={() => {
        console.log('onSwipedAll');
      }}
      cardIndex={0}
      // stackSize={3}
      stackSeparation={22}
      // onSwipedRight={(index) => {
      //   handleRightSwipe(recommendations[index].track.id);
      //   popModal();
      // }}
    />
  );
};
