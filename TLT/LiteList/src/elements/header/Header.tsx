import {
  SafeAreaView,
  Text,
  Image,
  View,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useContext} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {VHeader, Caption} from '../typography';
import {useSelector} from 'react-redux';
import {ProgressBar, Colors} from 'react-native-paper';
import * as Keychain from 'react-native-keychain';
import Toast from 'react-native-toast-message';
import {
  PlayerContext,
  handleQueueControlsAction,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useAppBrowser} from '../../containers';

export const HeaderElement = ({
  handleDeposit,
  hasBackButton = false,
  handleGoBack,
  handleAuthentication,
  isLoggedIn,
  isModal,
  handleProfile,
  handleCloseModal,
  navigation,
  TRXProfile,
  backgroundColor = '#1a1a1a',
  hasTRAKLIST,
  handleResumeOnTRAKLIST,
  handleSkipOnTRAKLIST,
  hasShazam,
  handlePlayOnTRAKLIST,
  handleTestBeReal,
  handleNavigateSearch,
  hasSearch,
  handleNavigateSwipe,
}: any) => {
  console.log('🚀 ~ file: Header.tsx ~ line 47 ~ hasTRAKLIST', hasTRAKLIST);
  console.log('🚀 ~ file: Header.tsx ~ line 47 ~ navigation', navigation);
  console.log('🚀 ~ file: Header.tsx ~ line 47 ~ TRXProfile', TRXProfile);
  const player = useSelector((state: any) => state.player);
  const nowPlaying = player.players.spotify;
  const players = player.players;
  const userCategory = TRXProfile.userCategory;
  console.log('🚀 ~ file: Header.tsx ~ line 25 ~ player', player);

  const {userData, setUserData} = useContext(PlayerContext);

  const {handleLoadHTTPS} = useAppBrowser();
  console.log('🚀 ~ file: Header.tsx ~ line 30 ~ userData', userData);

  return (
    <SafeAreaView
      style={{
        backgroundColor,
        height: isModal ? (userCategory !== 'apple_music' ? 200 : 100) : null,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: isLoggedIn ? 'silver' : 'green',
              minWidth: 80,
              paddingRight: 8,
              borderRadius: 10,
              borderColor: isLoggedIn ? '#fff' : 'transparent',
              justifyContent: 'center',
            }}>
            {hasBackButton ? (
              <Pressable onPress={handleGoBack} style={{flexDirection: 'row'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    marginRight: 7,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="five"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={'BACK'}
                  />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialCommunityIcons
                    name={'backspace'}
                    size={23}
                    color={'#fff'}
                    style={{opacity: 0.9, paddingTop: 0}}
                  />
                </View>
              </Pressable>
            ) : !hasShazam ? (
              <Pressable onPress={handleProfile} style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <MaterialCommunityIcons
                    name={'android-messages'}
                    size={28}
                    color={'#fff'}
                    style={{opacity: 0.9, paddingRight: 5, paddingTop: 2}}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="six"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={TRXProfile.trak_name}
                  />
                </View>
              </Pressable>
            ) : (
              <Pressable
                onPress={handleTestBeReal}
                style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <Fontisto
                    name={'shazam'}
                    size={22}
                    color={'#fff'}
                    style={{opacity: 0.9, paddingRight: 5, paddingTop: 2}}
                  />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                    // flex: 1,
                  }}>
                  <VHeader
                    type="five"
                    color={isLoggedIn ? '#fff' : '#fff'}
                    text={'SHAZAM'}
                  />
                </View>
              </Pressable>
            )}
          </View>
        </View>
        <View style={{flex: 1}}>
          <Pressable
            style={{flex: 1}}
            onPress={() =>
              Alert.alert(`OPTIONS`, `What would you like to do?`, [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Chat',
                  onPress: handleProfile,
                },
                {
                  text: 'Sign Out',
                  onPress: async () => handleAuthentication(isModal),
                },
                {
                  text: 'Delete Account',
                  onPress: async () => handleAuthentication(isModal, 'delete'),
                },
              ])
            }>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/poster_black.png?alt=media',
              }}
              style={{
                flex: 1,
                backgroundColor: '#333333',
                paddingLeft: 0,
                borderRadius: 12,
                borderWidth: 2.5,
                borderColor: 'yellow',
              }}
            />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {hasSearch ? (
            <Pressable onPress={handleNavigateSearch} style={{padding: 5}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Fontisto
                  name={'search'}
                  size={17}
                  color={'#fff'}
                  style={{opacity: 0.9, paddingRight: 5, paddingTop: 2}}
                />
              </View>
            </Pressable>
          ) : (
            <Pressable onPress={handleNavigateSwipe} style={{padding: 5}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <MaterialIcons
                  name={'swipe'}
                  size={17}
                  color={'#fff'}
                  style={{opacity: 0.9, paddingRight: 5, paddingTop: 2}}
                />
              </View>
            </Pressable>
          )}
          <Pressable onPress={() => handleAuthentication(isModal)}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: isLoggedIn ? 'transparent' : 'transparent',
                paddingVertical: 2,
                paddingLeft: 5,
                // borderRadius: 10,
                marginRight: 5,
                borderColor: 'whitesmoke',
                borderLeftWidth: 1,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 2,
                  // marginRight: 1,
                }}>
                <VHeader
                  type="six"
                  color={isLoggedIn ? '#fff' : '#fff'}
                  text={isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}
                />
              </View>

              <View
                style={{
                  height: 35,
                  width: 35,
                  // borderWidth: 2.5,
                  borderColor: '#fff',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name={isLoggedIn ? 'sign-out' : 'sign-in'}
                  size={20}
                  color={isLoggedIn ? '#FFF' : '#fff'}
                  style={{opacity: 0.9, paddingTop: 0}}
                />
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      {hasTRAKLIST && nowPlaying && userCategory !== 'apple_music' && (
        <View style={{width: '100%', flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
              style={{
                height: '100%',
                width: 150,
                borderTopRightRadius: 15,
              }}
              source={{uri: nowPlaying.item.album.images[0].url}}
              resizeMethod="scale"
            />
            <View
              style={{
                // backgroundColor: 'orange',
                width: '100%',
                // alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
              }}>
              {nowPlaying.device.name && (
                <View style={{flexDirection: 'row', marginBottom: 2}}>
                  <Fontisto
                    name="spotify"
                    size={15}
                    color={'#1db954'}
                    style={{marginRight: 5}}
                  />

                  <Caption
                    type="two"
                    color={'#1db954'}
                    text={`PLAYING FROM ${nowPlaying.device.name}`}
                  />
                </View>
              )}
              <VHeader
                type="six"
                color={isLoggedIn ? '#fff' : '#fff'}
                text={nowPlaying.item.name}
              />
              <VHeader
                type="six"
                color={isLoggedIn ? '#fff' : '#fff'}
                text={nowPlaying.item.artists[0].name}
              />
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  backgroundColor: '#232323',
                  borderRadius: 6,
                  alignSelf: 'flex-start',
                  width: '35%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: 3,
                }}>
                {/*  */}
                {/*  */}
                <Pressable
                  onPress={() => {
                    handlePlayOnTRAKLIST({
                      id: player.queue[
                        player.index - 1 !== -1
                          ? player.index - 1
                          : player.index
                      ].web.spotify.id,
                      type: 'back',
                    });
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                    }}>
                    <FontAwesome5 name={'backward'} size={18} color={'#fff'} />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => handleResumeOnTRAKLIST(nowPlaying.is_playing)}>
                  <View
                    style={{
                      borderRadius: 8,
                      // borderWidth: 3,
                      // borderColor: '#fff',
                      backgroundColor: nowPlaying.is_playing
                        ? '#fff'
                        : '#1db954',
                    }}>
                    <MaterialCommunityIcons
                      name={nowPlaying.is_playing ? 'pause' : 'play'}
                      size={27}
                      color={nowPlaying.is_playing ? '#1db954' : '#fff'}
                    />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    handlePlayOnTRAKLIST({
                      id: player.queue[
                        player.index + 1 !== player.length
                          ? player.index + 1
                          : player.index
                      ].web.spotify.id,
                      type: 'forward',
                    });
                  }}>
                  <View style={{}}>
                    <FontAwesome5 name={'forward'} size={18} color={'#fff'} />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <ProgressBar
            progress={nowPlaying.progress_ms / nowPlaying.item.duration_ms}
            color={nowPlaying.device.name ? '#1db954' : '#fff'}
            // style={{width: '100%'}}
          />
        </View>
      )}
      {hasTRAKLIST && !nowPlaying && userCategory !== 'apple_music' && (
        <View style={{width: '100%', flex: 1}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image
              style={{
                height: '100%',
                width: 150,
                borderTopRightRadius: 15,
              }}
              source={{uri: player.image.uri}}
              resizeMethod="scale"
            />
            <View
              style={{
                // backgroundColor: 'orange',
                width: '100%',
                // alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 20,
              }}>
              <VHeader
                type="six"
                color={isLoggedIn ? '#fff' : '#fff'}
                text={player.title}
              />
              <VHeader
                type="six"
                color={isLoggedIn ? '#fff' : '#fff'}
                text={player.artist}
              />
              {player.device && (
                <View style={{flexDirection: 'row'}}>
                  <Fontisto
                    name="spotify"
                    size={15}
                    color={'#1db954'}
                    style={{marginRight: 5}}
                  />

                  <Caption
                    type="two"
                    color={'#1db954'}
                    text={`PLAYING FROM ${player.device}`}
                  />
                </View>
              )}
              <View
                style={{
                  marginTop: 5,
                  flexDirection: 'row',
                  backgroundColor: '#232323',
                  borderRadius: 6,
                  alignSelf: 'flex-start',
                  width: '35%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: 3,
                }}>
                {/*  */}
                {/*  */}
                <Pressable
                  onPress={() =>
                    handlePlayOnTRAKLIST({
                      type: 'back',
                      id: player.queue[
                        player.index - 1 !== -1
                          ? player.index - 1
                          : player.index
                      ].web.spotify?.id,
                    })
                  }>
                  <View
                    style={{
                      borderRadius: 10,
                    }}>
                    <FontAwesome5 name={'backward'} size={18} color={'#fff'} />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() =>
                    handlePlayOnTRAKLIST({
                      type: 'play',
                      id: player.id,
                    })
                  }>
                  <View
                    style={{
                      borderRadius: 8,
                      // borderWidth: 3,
                      // borderColor: '#fff',
                      backgroundColor: '#1db954',
                    }}>
                    <MaterialCommunityIcons
                      name={'play'}
                      size={27}
                      color={'#fff'}
                    />
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    handlePlayOnTRAKLIST({
                      type: 'forward',
                      id: player.queue[
                        player.index + 1 !== player.queue.length
                          ? player.index + 1
                          : player.index
                      ].web.spotify.id,
                    });
                  }}>
                  <View style={{}}>
                    <FontAwesome5 name={'forward'} size={18} color={'#fff'} />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
          <ProgressBar
            progress={userData?.currentTime / userData?.playableDuration}
            color={player.service === 'spotify' ? '#1db954' : '#fff'}
            // style={{width: '100%'}}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
