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
  Modal,
} from 'react-native';
import {VHeader, Body, Caption} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import {SwipeCard} from '../swipe-card';
import CardStack, {Card} from 'react-native-card-stack-swiper';

export const SwipeElement = ({
  recommendations,
  handleSetPlayer,
  handleGenerateItems,
  handleLoadRecommendations,
  handleSwipedRight,
  spotifyModal,
}: any) => {
  console.log(
    '🚀 ~ file: Swipe.tsx ~ line 34 ~ recommendations',
    recommendations,
  );
  if (recommendations.length === 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button title="reload" onPress={handleLoadRecommendations} />
      </View>
    );
  }
  return (
    <>
      <CardStack
        secondCardZoom={1.03}
        renderNoMoreCards={() => (
          <View
            style={{
              backgroundColor: '#1a1a1a',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button title="RELOAD" onPress={handleLoadRecommendations} />
          </View>
        )}
        style={{
          height: '100%',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        {recommendations.map((recommendation: any, index: any) => {
          return (
            <Card
              onSwipedRight={() => handleSwipedRight(recommendations, index)}
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
      <Modal animationType="slide" transparent={true} visible={spotifyModal}>
        <View
          style={{
            backgroundColor: '#1A1A1A',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            width: 200,
            height: 100,
            borderRadius: 20,
            top: Dimensions.get('window').height / 2 - 50,
            right: Dimensions.get('window').width / 2 - 100,
            opacity: 0.9,
            flexDirection: 'row',
          }}>
          <VHeader type="four" text="saved to " color="whitesmoke" />
          <MaterialCommunityIcons
            name="spotify"
            size={22}
            color={'whitesmoke'}
          />
        </View>
      </Modal>
    </>
  );
};
