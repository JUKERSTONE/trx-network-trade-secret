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
import Octicons from 'react-native-vector-icons/Octicons';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import {SwipeCard} from '../swipe-card';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import LinearGradient from 'react-native-linear-gradient';

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
    <LinearGradient
      colors={['#1B3926', '#1A1A1A', '#1a1a1a', '#1a1a1a', '#1a1a1a']}
      style={{flex: 1}}>
      <View style={{flex: 4, backgroundColor: 'transparent'}}>
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
            justifyContent: 'center',
            backgroundColor: 'transparent',
          }}>
          {recommendations.map((recommendation: any, index: any) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <Card
                  onSwipedRight={() =>
                    handleSwipedRight(recommendations, index)
                  }
                  style={{
                    height: '100%',
                    width: Dimensions.get('window').width,
                    borderRadius: 20,
                    // flex: 1,
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
                <View style={{flex: 1}}></View>
              </View>
            );
          })}
        </CardStack>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          flexDirection: 'row',
          // alignItems: 'center',
          width: '70%',
          alignSelf: 'center',
        }}>
        <Pressable onPress={() => alert('swipe settings')}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Octicons name="arrow-left" size={25} color={'#1db'} />
          </View>
        </Pressable>
        <Pressable onPress={() => alert('swipe settings')}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Octicons name="arrow-up" size={25} color={'#a2c'} />
          </View>
        </Pressable>
        <Pressable onPress={() => alert('swipe settings')}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Octicons name="arrow-right" size={25} color={'#333'} />
          </View>
        </Pressable>
        <Pressable onPress={() => alert('swipe settings')}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Octicons name="arrow-down" size={25} color={'#714'} />
          </View>
        </Pressable>
      </View>

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
    </LinearGradient>
  );
};
