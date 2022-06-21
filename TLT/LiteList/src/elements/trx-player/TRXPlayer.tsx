import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  Button,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef, useContext} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MediaPlayer from 'react-native-video';
import {store, PlayerContext} from '../../stores';

import {VHeader, Body, Caption} from '../typography';
import {useLITELISTState} from '../../app';
import {RemoteElement} from '../../elements';
import {useSelector} from 'react-redux';
import {RemoteComponent} from '../../components';
import * as Animatable from 'react-native-animatable';

export const TRXPlayer = ({ref, handleMedia, mode}: any) => {
  console.log('🚀 ~ file: TRXPlayer.tsx ~ line 22 ~ TRXPlayer ~ mode', mode);
  // const [playback, setPlayback] = useState<any>(store.getState().player);
  // const [typing, setTyping] = useState(false);
  const [progress, setProgress] = useState<any>(store.getState());
  const [time, setTime] = useState(0);

  const {
    userData: {currentTime, playableDuration},
    setUserData,
  } = useContext(PlayerContext);

  const playback = useSelector((state: any) => state.player);

  // const {currentTime = 0, playableDuration = 390} = progress;
  // store.subscribe(() => {
  //   const state = store.getState();
  //   const playback = state.player;
  //   setPlayback(playback);
  // });

  const {handleGetState} = useLITELISTState();
  const player = handleGetState({index: 'player'});
  console.log(
    '🚀 ~ file: TRXPlayer.tsx ~ line 38 ~ TRXPlayer ~ player',
    player,
  );

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
  } = player;
  console.log(
    '🚀 ~ file: TRXPlayer.tsx ~ line 56 ~ TRXPlayer ~ chatURI,',
    chatURI,
  );
  const available = title && source.uri;
  // const chatRef: any = useRef(chatInputRef);

  // useEffect(() => {
  //   alert(isTyping);
  // }, [isTyping]);

  // return () => {
  //   clearTimeout(timerId);
  // };
  // useEffect(() => {
  //   setTime(0);
  //   const timerId = setTimeout(() => setTime(time + 1), 1000);
  //   clearTimeout(timerId);

  //   setTimeout(() => setTime(time + 1), 1000);
  // }, [source]);

  useEffect(() => {
    console.log('🚀 ~ file: TRXPlayer.tsx ~ line 88 ~ TRXPlayer ~ time', time);
  }, [time]);
  const id = setTimeout(() => {
    setTime(time + 1);
  }, 1000);

  // useEffect(() => {
  //   setTime(0);

  //   clearTimeout(id);
  // }, [source]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // useEffect(() => {
  //   alert(isKeyboardVisible);
  // }, [isKeyboardVisible]);

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
                  backgroundColor: '#fff',
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
                  color="#1a1a1a"
                  text={
                    mode !== 'chat'
                      ? hidden
                        ? 'HIDE'
                        : artist + ' - ' + title
                      : hidden
                      ? artist + ' - ' + title
                      : 'CHAT'
                  }
                  numberOfLines={1}
                />
                <MaterialIcons
                  name={hidden ? 'arrow-drop-down' : 'arrow-drop-up'}
                  size={15}
                  color={'#1a1a1a'}
                  style={{paddingTop: 1}}
                />
              </View>
            </Pressable>
            <ImageBackground
              source={{uri}}
              style={{
                height: !hidden ? 80 : 140,
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
                  borderRadius: 8,
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
                  <View style={{paddingRight: 20}}>
                    <Pressable onPress={() => handleMedia('repeat')}>
                      <View
                        style={{
                          backgroundColor: repeat ? '#1a1a1a' : '#fff',
                          borderRadius: 10,
                          padding: 3,
                        }}>
                        <MaterialIcons
                          name={repeat ? 'replay' : 'shuffle'}
                          size={22}
                          color={repeat ? '#fff' : '#1a1a1a'}
                          style={{paddingTop: 1}}
                        />
                      </View>
                    </Pressable>
                  </View>

                  <View style={{paddingRight: 20}}>
                    <Pressable onPress={() => alert('coming soon')}>
                      <View
                        style={{
                          borderRadius: 10,
                          padding: 8,
                        }}>
                        <FontAwesome5
                          name={'backward'}
                          size={18}
                          color={'#fff'}
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
                      onPress={source ? () => handleMedia('pause') : null}
                      style={{paddingHorizontal: 15}}>
                      {available && (
                        <View
                          style={{
                            backgroundColor: paused ? '#fff' : '#1a1a1a',
                            borderRadius: 10,
                            borderWidth: 3,
                            borderColor: '#fff',
                          }}>
                          <MaterialCommunityIcons
                            name={paused ? 'play' : 'pause'}
                            size={30}
                            color={paused ? '#1a1a1a' : '#fff'}
                            style={{paddingTop: 0}}
                          />
                        </View>
                      )}
                      {!available && (
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
                            text="NOT AVAILABLE."
                            numberOfLines={1}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View style={{paddingLeft: 20}}>
                    <Pressable onPress={() => alert('coming soon')}>
                      <View
                        style={{
                          borderRadius: 10,
                          padding: 8,
                        }}>
                        <FontAwesome5
                          name={'forward'}
                          size={18}
                          color={'#fff'}
                          style={{paddingTop: 1, paddingRight: 2}}
                        />
                      </View>
                    </Pressable>
                  </View>

                  <View style={{paddingLeft: 20}}>
                    <Pressable onPress={() => handleMedia('mute')}>
                      <View
                        style={{
                          backgroundColor: available
                            ? muted
                              ? '#fff'
                              : '#1a1a1a'
                            : 'red',
                          borderRadius: 10,
                          padding: 3,
                        }}>
                        <MaterialIcons
                          name={muted ? 'volume-mute' : 'volume-up'}
                          size={22}
                          color={muted ? 'grey' : '#fff'}
                          style={{paddingTop: 1}}
                        />
                      </View>
                    </Pressable>
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
                  // handleIsFocussed={(isTyping: boolean) => {
                  //   // alert(isTyping + ' wow');
                  //   setIsTyping(isTyping);
                  // }}
                  // setTyping={setTyping}
                  // inputRef={inputRef}
                  // chatInputRef={(isFocused: boolean) => setFocused(isFocused)}
                />
              </View>
            </ImageBackground>
          </View>
        )}
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};
