import {
  View,
  Text,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MediaPlayer from 'react-native-video';
import {store} from '../../stores';
import {ProgressBar, Colors} from 'react-native-paper';
import {VHeader, Body, Caption} from '../typography';
import {useLITELISTState} from '../../app';

export const TRXPlayer = ({ref, handleMedia}: any) => {
  const [playback, setPlayback] = useState<any>(store.getState().player);
  const [progress, setProgress] = useState<any>(store.getState());

  const {currentTime = 0, playableDuration = 390} = progress;
  store.subscribe(() => {
    const state = store.getState();
    const playback = state.player;
    setPlayback(playback);
  });

  const {handleGetState} = useLITELISTState();
  const player = handleGetState({index: 'player'});

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
  } = playback;
  const available = title && source.uri;

  return (
    <>
      {hasPlayer && (
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#1a1a1a',
            width: Dimensions.get('window').width,
            padding: 5,
          }}>
          <View style={{width: '100%', padding: 10}}>
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
                  color="#1B3926"
                  text={hidden ? 'HIDE' : artist + ' - ' + title}
                  numberOfLines={1}
                />
                <MaterialIcons
                  name={hidden ? 'arrow-drop-down' : 'arrow-drop-up'}
                  size={15}
                  color={'#1B3926'}
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
                          backgroundColor: repeat ? '#1B3926' : '#fff',
                          borderRadius: 10,
                          padding: 3,
                        }}>
                        <MaterialIcons
                          name={repeat ? 'replay' : 'shuffle'}
                          size={22}
                          color={repeat ? '#fff' : '#1B3926'}
                          style={{paddingTop: 1}}
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
                            backgroundColor: paused ? '#fff' : '#1B3926',
                            borderRadius: 10,
                            borderWidth: 3,
                            borderColor: '#fff',
                          }}>
                          <MaterialCommunityIcons
                            name={paused ? 'play' : 'pause'}
                            size={30}
                            color={paused ? '#1B3926' : '#fff'}
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
                            color="#1B3926"
                            text="NOT AVAILABLE."
                            numberOfLines={1}
                          />
                        </View>
                      )}
                    </Pressable>
                  </View>

                  <View style={{paddingLeft: 20}}>
                    <Pressable onPress={() => handleMedia('mute')}>
                      <View
                        style={{
                          backgroundColor: available
                            ? muted
                              ? '#fff'
                              : '#1B3926'
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
                <View
                  style={{
                    // backgroundColor: 'blue',
                    width: '100%',
                    marginVertical: 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <View style={{flex: 5, padding: 10}}>
                    <ProgressBar
                      progress={currentTime / playableDuration}
                      color={'#cecece'}
                      style={{backgroundColor: '#1B3926'}}
                    />
                  </View>
                </View>
                {/* REMOTE */}
                {hidden && (
                  <View
                    style={{
                      padding: 4,
                      borderRadius: 3,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '100%',
                      }}>
                      <View>
                        <VHeader
                          type="four"
                          color="#fff"
                          text={artist}
                          numberOfLines={1}
                        />
                      </View>
                      <View>
                        <VHeader
                          type="five"
                          color="#cecece"
                          text={title}
                          numberOfLines={1}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </ImageBackground>
            {/* )} */}
          </View>
        </View>
      )}
      <MediaPlayer
        ref={ref}
        playInBackground={true}
        source={source}
        audioOnly={true}
        paused={paused}
        muted={muted}
        controls={false}
        ignoreSilentSwitch="ignore"
        repeat={repeat}
        onProgress={progressData => setProgress(progressData)}
      />
    </>
  );
};
