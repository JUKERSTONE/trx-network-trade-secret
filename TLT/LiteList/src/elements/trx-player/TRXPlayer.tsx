import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  Button,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MediaPlayer from 'react-native-video';
import {store, PlayerContext, handleQueueControlsAction} from '../../stores';
import Toast from 'react-native-toast-message';

import {VHeader, Body, Caption} from '../typography';
import {useLITELISTState} from '../../app';
import {RemoteElement} from '../../elements';
import {useSelector} from 'react-redux';
import {RemoteComponent} from '../../components';
import * as Animatable from 'react-native-animatable';
import {api, useAPI} from '../../api';

export const TRXPlayer = ({
  ref,
  handleMedia,
  handleFANCLUB,
  handleControls,
  mode,
  navigation,
  handlePlayOnTRAKLIST,
  ...props
}: any) => {
  // console.log('🚀 ~ file: TRXPlayer.tsx ~ line 36 ~ props', props);
  const [spotifyPlayer, setSpotifyPlayer] = useState<any>();

  const {
    userData: {currentTime, playableDuration, swiperRef},
    setUserData,
  } = useContext(PlayerContext);

  const {usePOST, useGET} = useAPI();

  console.log('🚀 ~ file: TRXPlayer.tsx ~ line 44 ~ swiperRef', swiperRef);
  // console.log(
  //   '🚀 ~ file: TRXPlayer.tsx ~ line 45 ~ currentTime, playableDuration',
  //   currentTime,
  //   playableDuration,
  // );
  // console.log('🚀 ~ file: TRXPlayer.tsx ~ line 45 ~ swiperRef', swiperRef);

  const playback = useSelector((state: any) => state.player);

  const {handleGetState} = useLITELISTState();
  const player = useSelector((state: any) => state.player);
  const keys = handleGetState({index: 'keys'});
  const spotifyKey = keys.spotify.accessToken;

  const hasPlayer = Object.keys(player.source).length !== 0;

  const {
    paused,
    muted,
    repeat,
    source,
    image: {uri},
    title,
    artist,
    hidden,
    chatURI,
    id,
    isMMS,
  } = player;

  useEffect(() => {
    //
    //

    handleGetSpotifyPlayer();
  }, [player]);

  const handleGetSpotifyPlayer = async () => {
    const route = api.spotify({method: 'get-playback'});

    const response = await useGET({route, token: keys.spotify.accessToken});
    console.log(
      '🚀 ~ file: TRXPlayer.tsx ~ line 92 ~ handleGetSpotifyPlayer ~ response',
      response,
    );

    setSpotifyPlayer(response.data);
  };
  // const available = title && source.uri;
  const isUnavailable = title && !source.uri;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  if (isUnavailable) {
    console.log(
      '🚀 ~ file: TRXPlayer.tsx ~ line 80 ~ setTimeout ~ swiperRef',
      swiperRef,
    );
    Toast.show({
      type: 'error',
      text1: "TRAKLIST couldn't find a preview",
      text2: artist + ' - ' + title,
    });
    setTimeout(() => {
      swiperRef?.current?.swipeTop();
    }, 3000);
  }
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={{
        flex: mode === 'chat' && isKeyboardVisible === true ? 1 : 0,
        // paddingBottom: 30,
      }}>
      <Animatable.View animation={'bounceIn'}>
        {hasPlayer && (
          <View
            style={{
              width: '100%',
              padding: 10,
              flexDirection: 'column',
              backgroundColor: '#1a1a1a',
            }}>
            <Pressable onPress={() => handleMedia('toggle-view')}>
              <View
                style={{
                  backgroundColor: !hidden ? '#1db954' : '#333333',
                  width: '100%',
                  height: 30,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <VHeader
                  type="five"
                  color={'#fff'}
                  text={
                    mode !== 'chat'
                      ? hidden
                        ? 'TRAKLIST'
                        : 'SPOTIFY'
                      : hidden
                      ? artist + ' - ' + title
                      : 'CHAT'
                  }
                  numberOfLines={1}
                />
                {isMMS && (
                  <VHeader
                    type="six"
                    color={isMMS ? 'green' : '#fff'}
                    text={'  [ ATTACHMENTS ]'}
                    numberOfLines={1}
                  />
                )}
                <MaterialIcons
                  name={hidden ? 'arrow-drop-down' : 'arrow-drop-up'}
                  size={15}
                  color={isMMS ? 'green' : '#fff'}
                  style={{paddingTop: 1}}
                />
              </View>
            </Pressable>
            <ImageBackground
              source={
                spotifyPlayer && !hidden
                  ? spotifyPlayer.item.album.images
                  : {uri}
              }
              style={{
                height: 140,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              imageStyle={{
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                borderWidth: 3,
                borderColor: 'whitesmoke',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 10,
                  backgroundColor: '#1a1a1a',
                  padding: 15,
                  opacity: 0.85,
                  width: '100%',
                  height: '100%',
                }}>
                {/* {mode === 'default' && ( */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 4,
                  }}>
                  {/*  */}
                  {/*  */}
                  {/*  */}
                  <>
                    <View style={{paddingRight: 20}}>
                      <Pressable
                        onPress={
                          spotifyPlayer && !hidden
                            ? () => alert(3)
                            : () => handleMedia('mute')
                        }>
                        <View
                          style={{
                            backgroundColor: !isUnavailable
                              ? muted
                                ? '#fff'
                                : '#1a1a1a'
                              : 'red',
                            borderRadius: 10,
                            padding: 3,
                          }}>
                          <MaterialIcons
                            name={
                              spotifyPlayer && !hidden
                                ? 'speaker-group'
                                : muted
                                ? 'volume-mute'
                                : 'volume-up'
                            }
                            size={22}
                            color={
                              spotifyPlayer && !hidden
                                ? '#1db954'
                                : repeat
                                ? '#fff'
                                : muted
                                ? 'grey'
                                : '#fff'
                            }
                            style={{paddingTop: 1}}
                          />
                        </View>
                      </Pressable>
                    </View>

                    <View style={{paddingRight: 20}}>
                      <Pressable
                        onPress={
                          spotifyPlayer && !hidden
                            ? () =>
                                handlePlayOnTRAKLIST({
                                  id: player.queue[
                                    player.index - 1 !== -1
                                      ? player.index - 1
                                      : player.index
                                  ].web.spotify.id,
                                  type: 'back',
                                })
                            : source
                            ? () => {
                                Promise.resolve(
                                  swiperRef.current.goBackFromBottom(),
                                )
                                  .then(() => {
                                    const action = handleQueueControlsAction({
                                      playbackState: 'back',
                                    });
                                    store.dispatch(action);
                                  })
                                  .catch(() => {
                                    alert('err');
                                  });
                              }
                            : null
                        }>
                        <View
                          style={{
                            borderRadius: 10,
                            padding: 8,
                          }}>
                          <FontAwesome5
                            name={'backward'}
                            size={18}
                            color={
                              spotifyPlayer && !hidden
                                ? '#1db954'
                                : repeat
                                ? '#fff'
                                : '#1a1a1a'
                            }
                            style={{paddingTop: 1, paddingRight: 2}}
                          />
                        </View>
                      </Pressable>
                    </View>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        borderRightWidth: 2,
                        borderLeftWidth: 2,
                        borderColor: 'grey',
                        flexDirection: 'row',
                      }}>
                      <Pressable
                        onPress={
                          spotifyPlayer && !hidden
                            ? () =>
                                handlePlayOnTRAKLIST({
                                  id: spotifyPlayer.item.id,
                                  type: 'play',
                                })
                            : source
                            ? () => handleMedia('pause')
                            : null
                        }
                        style={{paddingHorizontal: 15}}>
                        {!isUnavailable && (
                          <View
                            style={{
                              backgroundColor: paused ? '#fff' : '#1a1a1a',
                              borderRadius: 10,
                              borderWidth: 3,
                              borderColor:
                                spotifyPlayer && !hidden
                                  ? '#1db954'
                                  : repeat
                                  ? '#fff'
                                  : '#fff',
                            }}>
                            <MaterialCommunityIcons
                              name={
                                spotifyPlayer && !hidden
                                  ? spotifyPlayer.item.is_playing
                                    ? 'pause'
                                    : 'play'
                                  : paused
                                  ? 'play'
                                  : 'pause'
                              }
                              size={30}
                              color={
                                spotifyPlayer && !hidden
                                  ? '#1db954'
                                  : repeat
                                  ? '#fff'
                                  : paused
                                  ? '#1a1a1a'
                                  : '#fff'
                              }
                              style={{paddingTop: 0}}
                            />
                          </View>
                        )}
                        {isUnavailable && (
                          <View
                            style={{
                              backgroundColor: '#fff',
                              paddingVertical: 3,
                              paddingHorizontal: 5,
                              borderWidth: 4,
                              borderColor: '#fff',
                              borderRadius: 5,
                            }}>
                            <VHeader
                              type="six"
                              color="#1a1a1a"
                              text="NO SOUND."
                              numberOfLines={1}
                            />
                          </View>
                        )}
                      </Pressable>
                    </View>

                    <View style={{paddingLeft: 20}}>
                      <Pressable
                        onPress={
                          spotifyPlayer && !hidden
                            ? () =>
                                handlePlayOnTRAKLIST({
                                  id: player.queue[
                                    player.index + 1 !== player.queue.length
                                      ? player.index + 1
                                      : player.index
                                  ].web.spotify.id,
                                  type: 'forward',
                                })
                            : source
                            ? () => {
                                Promise.resolve(swiperRef.current.swipeRight())
                                  .then(() => {
                                    // const action = handleQueueControlsAction({
                                    //   playbackState: 'next',
                                    // });
                                    // store.dispatch(action);
                                  })
                                  .catch(() => {
                                    alert('err');
                                  });
                                //
                              }
                            : null
                        }>
                        <View
                          style={{
                            borderRadius: 10,
                            padding: 8,
                          }}>
                          <FontAwesome5
                            name={'forward'}
                            size={18}
                            color={
                              spotifyPlayer && !hidden
                                ? '#1db954'
                                : repeat
                                ? '#fff'
                                : '#1a1a1a'
                            }
                            style={{paddingTop: 1, paddingRight: 2}}
                          />
                        </View>
                      </Pressable>
                    </View>
                  </>

                  <View style={{paddingLeft: 20}}>
                    <View
                      style={{
                        backgroundColor: repeat ? '#1a1a1a' : '#fff',
                        borderRadius: 8,
                        padding: 3,
                      }}>
                      <Pressable
                        onPress={() => {
                          isMMS
                            ? alert(
                                'You have an attachment pending. \nSend a message to unloop this preview',
                              )
                            : handleMedia('repeat');
                        }}>
                        {repeat ? (
                          <MaterialCommunityIcons
                            name={'repeat-once'}
                            size={22}
                            color={
                              spotifyPlayer && !hidden
                                ? '#1db954'
                                : repeat
                                ? '#fff'
                                : '#1a1a1a'
                            }
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name={'repeat-off'}
                            size={22}
                            color={
                              spotifyPlayer && !hidden
                                ? '#1db954'
                                : repeat
                                ? '#fff'
                                : '#1a1a1a'
                            }
                          />
                        )}
                      </Pressable>
                    </View>
                  </View>
                </View>
                {/* )} */}

                {/* REMOTE */}
                <RemoteComponent
                  mode={mode}
                  hidden={hidden}
                  title={title}
                  artist={artist}
                  chatURI={chatURI}
                  currentTime={currentTime}
                  playableDuration={playableDuration}
                  isMMS={isMMS}
                  player={isMMS ? player : null}
                  spotifyPlayer={spotifyPlayer}
                />
              </View>
            </ImageBackground>
          </View>
        )}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};
