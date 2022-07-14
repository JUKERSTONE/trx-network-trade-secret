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
  SafeAreaView,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {ProgressBar, Colors} from 'react-native-paper';

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
  progress,
}: any) => {
  console.log(
    '🚀 ~ file: Swipe.tsx ~ line 34 ~ recommendations',
    recommendations,
  );
  if (recommendations.length === 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <LottieView
          source={require('../../core/57276-astronaut-and-music.json')}
          autoPlay
          loop
        />

        <View style={{position: 'absolute', top: 100}}>
          <VHeader
            numberOfLines={1}
            type="four"
            color={'#fff'}
            text={'TAKING TOO LONG?'}
          />
          <Pressable onPress={handleLoadRecommendations} style={{marginTop: 5}}>
            <Body
              numberOfLines={1}
              type="one"
              color={'blue'}
              text={'RELOAD'}
              textAlign="center"
            />
          </Pressable>

          <ProgressBar
            progress={progress}
            color={'#cecece'}
            style={{
              marginTop: 3,
              backgroundColor: 'grey',
              height: 10,
              borderRadius: 10,
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <>
      <CardStack
        secondCardZoom={1.03}
        renderNoMoreCards={() => (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1a1a1a',
            }}>
            <LottieView
              source={require('../../core/57276-astronaut-and-music.json')}
              autoPlay
              loop
            />

            <View style={{position: 'absolute', top: 100}}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={'TAKING TOO LONG?'}
              />
              <Pressable
                onPress={handleLoadRecommendations}
                style={{marginTop: 5}}>
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'blue'}
                  text={'RELOAD'}
                  textAlign="center"
                />
              </Pressable>
            </View>
          </SafeAreaView>
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
