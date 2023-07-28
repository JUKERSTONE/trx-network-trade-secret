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
import {VHeader, Body} from '..';
import {PlayerContext, setYoutubeOff, store} from '../../stores';
import Toast from 'react-native-toast-message';
import YoutubePlayer from 'react-native-youtube-iframe';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
    title,
    artist,
    queue,
    index,
    youtubeId,
    youtubeMinimize,
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
        paused={paused}
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
      <View style={{backgroundColor: '#1db954'}}>
        <TouchableOpacity onPress={() => setMiniYoutube(!miniYoutube)}>
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: '#1db954',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 40,
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: '#cecece',
                  borderRadius: 10,
                }}
              />
              <View style={{marginLeft: 10}}>
                <VHeader
                  type="six"
                  color={'#fff'}
                  text={
                    youtubePlayer &&
                    youtubePlayer.title &&
                    youtubePlayer?.title?.trim() !== ''
                      ? `${youtubeId ? 'PLAYING' : 'LAST PLAYED'}, ${
                          youtubePlayer?.artist
                        } - ${youtubePlayer?.title} `
                      : !youtubeId
                      ? 'SEARCH ANY SONG IN THE SHOP TAB'
                      : miniYoutube
                      ? 'MINIMIZE'
                      : 'TRAKSTAR VIDEO'
                  }
                />
                {/* <VHeader
                  type="six"
                  color={'#fff'}
                  text={
                    youtubePlayer &&
                    youtubePlayer.title &&
                    youtubePlayer?.title?.trim() !== ''
                      ? `${youtubeId ? 'PLAYING' : 'LAST PLAYED'}, ${
                          youtubePlayer?.artist
                        } - ${youtubePlayer?.title} `
                      : !youtubeId
                      ? 'SEARCH ANY SONG IN THE SHOP TAB'
                      : miniYoutube
                      ? 'MINIMIZE'
                      : 'TRAKSTAR VIDEO'
                  }
                /> */}
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={25}
                color="#fff"
              />
            </View>
          </View>
        </TouchableOpacity>
        {youtubeId && (
          <YoutubePlayer
            height={!miniYoutube ? 0 : 220}
            play={!!youtubeId}
            videoId={youtubeId.split('=')[1]}
            onChangeState={event => {
              if (event == 'ended') {
                const action = setYoutubeOff({});
                store.dispatch(action);
                setMiniYoutube(false);
              }
            }}
          />
        )}
      </View>
    </>
  );
};
