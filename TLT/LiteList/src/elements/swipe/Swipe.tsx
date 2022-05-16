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
  Dimensions,
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
import CardStack, {Card} from 'react-native-card-stack-swiper';
export const SwipeElement = ({
  recommendations,
  handleSetPlayer,
  handleGenerateItems,
  handleLoadRecommendations,
}: any) => {
  console.log(
    '🚀 ~ file: Swipe.tsx ~ line 23 ~ SwipeElement ~ recommendations',
    recommendations,
  );

  if (recommendations.length === 0) {
    return <View />;
  }
  return (
    <CardStack
      secondCardZoom={1.05}
      renderNoMoreCards={() => <View />}
      style={{
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
      }}>
      {recommendations.map((recommendation: any, index: any) => {
        return (
          <Card
            style={{
              height: 400,
              width: Dimensions.get('window').width * 0.8,
              borderRadius: 10,
              flex: 1,
            }}>
            <SwipeCard
              handleNavigateTrack={() => alert(1)}
              recommendation={recommendation}
              recommendations={recommendations}
              index={index}
              handleSetPlayer={handleSetPlayer}
              size={recommendations.length - 1}
              handleLoadRecommendations={handleLoadRecommendations}
            />
          </Card>
        );
      })}
    </CardStack>
  );
};
