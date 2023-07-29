import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import MediaPlayer from 'react-native-video';
import {useLITELISTState} from '../../app';
import {useSelector} from 'react-redux';
import {VHeader, Body, Caption} from '..';
import {
  PlayerContext,
  setYoutubeOff,
  setYotubeTogglePause,
  store,
  setTraklistNext,
} from '../../stores';
import Toast from 'react-native-toast-message';
import YoutubePlayer from 'react-native-youtube-iframe';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ProgressBar, Colors} from 'react-native-paper';

export const TRAKLISTradioElement = () => {
  const {handleGetState} = useLITELISTState();
  // const youtubeId = trak?.youtube?.url?.split('=');
  const {userData, setUserData} = useContext(PlayerContext);

  console.log('🚀 ~ file: Swipe.tsx ~ line 44 ~ userData', userData);
  const playerRef = userData.playerRef;

  // const {mode, paused, muted, repeat, source, image, title, artist} =
  //   handleGetState({index: 'player'});

  const {
    mode,
    paused,
    muted,
    players,
    repeat,
    source,
    image,
    cover_art,
    uri,
    title,
    artist,
    queue,
    index,
    youtubeId,
    youtubeMinimize,
    isTraklist,
    traklistIndex,
    traklist,
  } = useSelector((state: any) => state.player);
  // console.log(
  //   '🚀 ~ file: TRAKLISTradio.tsx ~ line 25 ~ TRAKLISTradioElement ~ player',
  //   player,
  // );
  const [miniYoutube, setMiniYoutube] = useState(youtubeMinimize);

  useEffect(() => {
    if (youtubeMinimize === true) {
      setMiniYoutube(false);
    }
  }, [youtubeMinimize]);

  const upcomingTRAK = queue[index + 1];
  const currentTRAK = queue[index];

  const youtubePlayer = players.youtube;

  return (
    <>
      <MediaPlayer
        ref={playerRef}
        onEnd={() => (!repeat ? userData.swiperRef.current.swipeTop() : null)}
        playInBackground={true}
        source={source}
        audioOnly={true}
        paused={youtubeId ? true : paused}
        muted={muted}
        controls={false}
        ignoreSilentSwitch="ignore"
        repeat={repeat}
        onProgress={progressData => {
          console.log(
            '🚀 ~ file: TRAKLISTradio.tsx ~ line 48 ~ TRAKLISTradioElement ~ progressData',
            progressData,
          );
          if (progressData.currentTime > 15 && progressData.currentTime < 17) {
            if (!repeat) {
              Toast.show({
                type: 'success',
                text1: 'Coming up on TRAKLIST...',
                text2: upcomingTRAK.artist + ' - ' + upcomingTRAK.title,
              });
            } else {
              Toast.show({
                type: 'success',
                text1: 'Looping...',
                text2: artist + ' - ' + title,
              });
            }
          }
          setUserData({...userData, ...progressData});
        }}
      />
      <View style={{backgroundColor: '#000'}}>
        <TouchableOpacity
          onPress={() =>
            youtubeId
              ? setMiniYoutube(!miniYoutube)
              : alert(
                  'This is a preview..\n Stream the full song by clicking the green logo in the swipe tab (not this screen).',
                )
          }>
          <View
            style={{
              height: 70,
              width: '100%',
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'space-between',
              // paddingHorizontal: 40,
              // flexDirection: 'row',
              paddingRight: 70,
            }}>
            {/* <ProgressBar progress={0.5} color={Colors.amber100} /> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={{
                  uri: youtubeId ? players?.youtube?.cover_art : image.uri,
                }}
                style={{
                  height: 70,
                  width: 90,
                  backgroundColor: '#cecece',
                }}
              />

              <Pressable
                onPress={() => {
                  const action = setYotubeTogglePause({});
                  store.dispatch(action);
                }}>
                <View style={{alignItems: 'center', marginLeft: 5}}>
                  <MaterialCommunityIcons
                    name={
                      youtubeId
                        ? players.youtube.paused
                          ? 'play'
                          : 'pause'
                        : paused
                        ? 'play'
                        : 'pause'
                    }
                    size={26}
                    color="#1db954"
                  />
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  if (youtubeId) {
                    const action = setTraklistNext({});
                    store.dispatch(action);
                  } else {
                    userData.swiperRef.current.swipeTop();
                  }
                }}>
                <View style={{alignItems: 'center', marginRight: 10}}>
                  <MaterialCommunityIcons
                    name={'fast-forward'}
                    size={25}
                    color="#1db954"
                  />
                </View>
              </Pressable>
              <View style={{width: '60%'}}>
                {youtubeId ? (
                  <>
                    <VHeader
                      numberOfLines={2}
                      type="six"
                      color={'#1a1a1a'}
                      text={
                        youtubePlayer &&
                        youtubePlayer.title &&
                        youtubePlayer?.title?.trim() !== ''
                          ? `${youtubeId ? 'PLAYING' : 'LAST PLAYED'}, ${
                              youtubePlayer?.artist
                            } - ${youtubePlayer?.title} `
                          : !youtubeId
                          ? 'BROWSE TRAKSTAR™ - FIND MUSIC'
                          : miniYoutube
                          ? 'MINIMIZE'
                          : 'TRAKSTAR VIDEO'
                      }
                    />
                    {!youtubeId && (
                      <Caption
                        numberOfLines={2}
                        type="two"
                        color={'#232323'}
                        text={`${
                          source.uri ? 'PREVIEW' : 'NO SOUND'
                        } : ${artist} - ${title}`}
                      />
                    )}
                  </>
                ) : (
                  <>
                    <VHeader
                      numberOfLines={1}
                      type="six"
                      color={'#1a1a1a'}
                      text={`${
                        source.uri ? 'PREVIEW' : 'NO SOUND'
                      } : ${artist} - ${title}`}
                    />
                    {!youtubeId && (
                      <Caption
                        numberOfLines={2}
                        type="two"
                        color={'#232323'}
                        text={
                          youtubePlayer &&
                          youtubePlayer.title &&
                          youtubePlayer?.title?.trim() !== ''
                            ? `${youtubeId ? 'PLAYING' : 'LAST PLAYED'}, ${
                                youtubePlayer?.artist
                              } - ${youtubePlayer?.title} `
                            : !youtubeId
                            ? 'BROWSE TRAKSTAR™ - FIND MUSIC'
                            : miniYoutube
                            ? 'MINIMIZE'
                            : 'TRAKSTAR VIDEO'
                        }
                      />
                    )}
                  </>
                )}
              </View>
              <View style={{alignItems: 'center', marginLeft: 20}}>
                <MaterialCommunityIcons
                  name="cards-heart-outline"
                  size={22}
                  color="#1db954"
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {youtubeId && (
          <YoutubePlayer
            height={!miniYoutube ? 0 : 220}
            play={!!youtubeId && !players.youtube.paused}
            videoId={youtubeId?.split('=')[1]}
            onChangeState={event => {
              if (event == 'ended') {
                if (isTraklist) {
                  const action = setTraklistNext({});
                  store.dispatch(action);
                } else {
                  const action = setYoutubeOff({});
                  store.dispatch(action);
                  setMiniYoutube(false);
                }
              }
            }}
            onError={error => {
              if (error === 'video_not_found') {
                Toast.show({
                  type: 'error',
                  text1: 'Warning',
                  text2: 'Sorry! Media is restricted',
                });
              } else if (error === 'embed_not_allowed') {
                Toast.show({
                  type: 'error',
                  text1: 'Warning',
                  text2: 'Sorry! Media is restricted',
                });
              }
            }}
          />
        )}
      </View>
    </>
  );
};
