import React, {useState, useRef, useContext} from 'react';
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
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {ProgressBar, Colors} from 'react-native-paper';
import {
  PlayerContext,
  handleQueueControlsAction,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {VHeader, Body, Caption} from '..';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {TabView, TabBar} from 'react-native-tab-view';
import {colors} from '../../core';
import {SwipeCard} from '../swipe-card';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

export const SwipeElement = ({
  // recommendations,
  handleSetPlayer,
  handleGenerateItems,
  handleLoadRecommendations,
  handleSwipedRight,
  isModalVisible,
  progress,
  handleTRAKInteraction,
  handleSub,
  setCancelLoading,
  cancelLoading,
  isUnavailable,
  handleQueue,
}: any) => {
  const player = useSelector((state: any) => state.player);
  const recommendations = player.queue;
  const isAvailable = player.title && player.source.uri;
  console.log(
    '🚀 ~ file: Swipe.tsx ~ line 54 ~  player.title',
    player.title,
    player.source.uri,
    player,
  );
  const {userData, setUserData} = useContext(PlayerContext);
  console.log('🚀 ~ file: Swipe.tsx ~ line 44 ~ userData', userData);
  const swiperRef = userData.swiperRef;
  console.log('🚀 ~ file: Swipe.tsx ~ line 49 ~ swiperRef', swiperRef);

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
          ref={swiperRef}
          secondCardZoom={1.03}
          onSwipedRight={() =>
            handleQueue(player.queue[player.index - 1].web.spotify.id)
          }
          onSwiped={() => {
            const action = handleQueueControlsAction({
              playbackState: 'next',
            });
            store.dispatch(action);
          }}
          renderNoMoreCards={() => (
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../../core/57276-astronaut-and-music.json')}
                autoPlay
                loop
              />

              <View
                style={{
                  position: 'absolute',
                  top: 100,
                  backgroundColor: '#fff',
                  padding: 15,
                  borderRadius: 8,
                  opacity: 0.8,
                }}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'green'}
                  text={'HAVING FUN?'}
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
          // flex: 0.5,
          justifyContent: 'space-around',
          flexDirection: 'row',
          // alignItems: 'center',
          width: '90%',
          alignSelf: 'center',
          paddingBottom: 15,
        }}>
        <Pressable
          disabled={cancelLoading || !isAvailable}
          onPress={async () => {
            if (isAvailable) {
              await setCancelLoading(true);
              setTimeout(
                async () => await handleTRAKInteraction({type: 'cancel'}),
                1000,
              );
            }
          }}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome name="close" size={25} color={'red'} />
          </View>
        </Pressable>

        {/* <Pressable onPress={() => swiperRef.current.swipeRight()}> */}
        <Pressable
          onPress={() => {
            handleTRAKInteraction({type: 'save', player});
          }}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name={'heart'} size={24} color={'#1db954'} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            const action = handleMediaPlayerAction({
              playbackState: 'repeat:force',
            });
            store.dispatch(action);

            Alert.alert(`Share or sendd 👻`, `Share to social media or DMs?`, [
              {
                text: 'Cancel',
                onPress: () => {
                  const action = handleMediaPlayerAction({
                    playbackState: 'repeat:force:off',
                  });
                  store.dispatch(action);
                  console.log('Cancel Pressed');
                },
                style: 'cancel',
              },
              {
                text: 'SEND',
                onPress: async () => {
                  handleTRAKInteraction({type: 'send'});
                },
              },
              {
                text: 'SHARE',
                onPress: async () => {
                  const imageBase64 = await RNFetchBlob.config({
                    fileCache: true,
                  })
                    .fetch('GET', player.image.uri)
                    // the image is now dowloaded to device's storage
                    .then(resp => {
                      return resp.readFile('base64');
                    })
                    .catch(err => {
                      console.log(
                        '🚀 ~ file: PostHOC.js ~ line 150 ~ PostHOC ~ err',
                        err,
                      );
                    });
                  const action = handleMediaPlayerAction({
                    playbackState: 'share',
                    imageBase64,
                  });
                  store.dispatch(action);

                  // const options: any = {
                  //   title: 'TRAKSTAR!',
                  //   message: `TRAKSTAR! | Check out the latest music from ${artist}'s discography!! \n\nGet an endless stream of new music previews, tailored to your listening habits, on TRAKLITE.\n\nhttps://apps.apple.com/gb/app/traklite/id1575800144 `,
                  //   urls: [`data:image/png;base64,${imageBase64}`],
                  // };
                  // console.log(
                  //   '🚀 ~ file: Swipe.tsx:321 ~ onPress: ~ options',
                  //   options,
                  // );

                  console.log(
                    '🚀 ~ file: Swipe.tsx:300 ~ onPress: ~ imageBase64',
                    imageBase64,
                  );
                },
              },
            ]);
          }}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#fff',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons name={'share'} size={23} color={'#a2c'} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            handleTRAKInteraction({type: 'crypto', player});
          }}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#f2a900',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons name="bitcoin" size={25} color={'#fff'} />
          </View>
        </Pressable>
        <Pressable
          onPress={() => handleTRAKInteraction({type: 'fanclub', player})}>
          <View
            style={{
              height: 45,
              width: 45,
              backgroundColor: '#ffff64',
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2.5,
              borderColor: '#1db954',
            }}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMd1w4uHyX5N9t2W3b_FV-94n1yTXbtH8wvoMWfaHTPyYnORP5XC7lD6_L-TIF7lnLdbg&usqp=CAU',
              }}
              style={{
                borderRadius: 8,
                height: 32,
                width: 32,
              }}
            />
          </View>
        </Pressable>
      </View>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
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
