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
  Platform,
} from 'react-native';
import MediaPlayer from 'react-native-video';
import {handleLikeTRAK, useLITELISTState} from '../../app';
import {useSelector} from 'react-redux';
import {VHeader, Body, Caption} from '..';
import {
  PlayerContext,
  setYoutubeOff,
  setYotubeTogglePause,
  store,
  setTraklistNext,
  setYoutubeId,
  handleMediaPlayerAction,
  appendLike,
  handleQueueControlsAction,
} from '../../stores';
import Toast from 'react-native-toast-message';
import YoutubePlayer from 'react-native-youtube-iframe';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ProgressBar, Colors} from 'react-native-paper';
import {APIKeys, api, useAPI} from '../../api';
import axios from 'axios';
import {handleAddTRX04} from '../../app/firebase/hooks/addTRX04';
import {handleStream} from '../../app/firebase/hooks/stream';
import {MenuView} from '@react-native-menu/menu';
import {AppState} from 'react-native';
import {useAppState} from '@react-native-community/hooks';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import {TRXPictureInPictureContainer} from '../../containers/trx-picture-in-picture';

export const TRAKLISTradioElement = () => {
  const {handleGetState} = useLITELISTState();
  const {useGET} = useAPI();

  const [liked, setLiked] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [hasStreamed, setHasStreamed] = useState(false);
  const [backgroundOverride, setBackgroundOverride] = useState<any>(null);

  const {userData, setUserData} = useContext(PlayerContext);
  const currentAppState = useAppState();

  const keys = handleGetState({index: 'keys'});

  const spotify = keys.spotify;
  const accessToken = spotify.accessToken;

  const playerRef = userData.playerRef;
  const youtubePlayerRef = userData.youtubePlayerRef;
  const navigationRef = userData.navigationRef;
  const currentTime = userData.currentTime;
  const playableDuration = userData.playableDuration;

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
    id,
    isrc,
    hidden,
    isPrimaryPlayer,
  } = useSelector((state: any) => state.player);

  const {TRX} = useSelector((state: any) => state.profile);
  // console.log(
  //   '🚀 ~ file: TRAKLISTradio.tsx ~ line 25 ~ TRAKLISTradioElement ~ player',
  //   player,
  // );
  const [miniYoutube, setMiniYoutube] = useState(youtubeMinimize);

  const handleAppStateChange = (nextAppState: any) => {
    if (nextAppState === 'active') {
      setBackgroundOverride(null);
    } else if (nextAppState === 'background') {
      setBackgroundOverride(false);
      setTimeout(() => {
        setBackgroundOverride(true);
      }, 100);
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (youtubeMinimize === true) {
      setMiniYoutube(false);
    }
  }, [youtubeMinimize]);

  useEffect(() => {
    if (0.35 <= elapsed && !hasStreamed) {
      setHasStreamed(true);
      handleStream({
        uri: `trx:04:${youtubeId.split('=')[1]}`,
        title: players.youtube.title,
        artist: players.youtube.artist,
        cover_art: players.youtube.cover_art,
        geniusId: players.youtube.geniusId,
      });
    }
  }, [elapsed]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const elapsed_sec = await youtubePlayerRef.current.getCurrentTime(); // this is a promise. dont forget to await
      const total_sec = await youtubePlayerRef.current.getDuration(); // this is a promise. dont forget to await

      setElapsed(elapsed_sec / total_sec);
    }, 100); // 100 ms refresh. increase it if you don't require millisecond precision

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const likeExists = false
      ? TRX.likes?.some(
          (like: any) => like.NFTFileName === /*trak*/ like.NFTFileName,
        )
      : TRX.likes?.some((like: any) => {
          return isrc && !youtubeId
            ? like.isrc === isrc
            : like.trx04?.split(':')[2] === youtubeId?.split('=')[1];
        });

    setLiked(likeExists ?? false);
    setElapsed(0);
    setHasStreamed(false);
  }, [title, players, youtubeId, isrc]);

  const upcomingTRAK = queue[index + 1];
  const currentTRAK = queue[index];

  const youtubePlayer = players.youtube;

  const handleGenius = async (geniusId: any) => {
    console.log(
      '🚀 ~ file: TRAKLISTradio.tsx:90 ~ handleGenius ~ geniusId:',
      geniusId,
    );
    const route = api.genius({method: 'songs', payload: {geniusId}});
    const token = APIKeys.genius.accessToken;
    const response = await useGET({route, token});
    console.log(
      '🚀 ~ file: TRAKLISTradio.tsx:93 ~ handleGenius ~ response:',
      response,
    );

    const trak = await Promise.resolve(response).then((res: any) => {
      const song = res.data.response.song;
      console.log('🚀 ~ file: useTRAKTab.ts ~ line 46 ~ trak ~ song', song);

      const meta = {
        genius_url: song.url,
        release_date: song.release_date,
        description: song.description,
        custom_performances: song.custom_performances, // use
        recording_location: song.recording_location,
        writer_artists: song.writer_artists,
        featured_artists: song.featured_artists,
        producer_artists: song.producer_artists,
        song_relationships: song.song_relationships,
        // artist : get from genius FOR socials
      };

      let centralized: any = [];
      let providers: any[] = [
        'apple_music',
        'soundcloud',
        'spotify',
        'youtube',
      ];

      const media = song.media;
      const hasAppleMusic = song.apple_music_id;
      const apple_music = hasAppleMusic ? {id: song.apple_music_id} : null;

      if (hasAppleMusic) {
        centralized.push('apple_music');
      }

      let trak: any = {
        artist: song.artist_names,
        title: song.title,
        thumbnail: song.song_art_image_thumbnail_url,
        apple_music,
        genius: {id: JSON.stringify(geniusId)},
        soundcloud: null,
        spotify: null,
        youtube: null,
      };

      media.map((media: any) => {
        switch (media.provider) {
          case 'soundcloud':
            centralized.push('soundcloud');
            trak[media.provider] = {url: media.url};
            break;
          case 'spotify':
            centralized.push('spotify');
            trak[media.provider] = {uri: media.native_uri};
            break;
          case 'youtube':
            centralized.push('youtube');
            trak[media.provider] = {url: media.url};
            break;
          default:
            trak[media.provider] = {url: media.url};
            break;
        }
      });

      let missingProviders: any = [];

      providers.map((provider: string) => {
        const hasProvider = centralized.includes(provider);
        if (!hasProvider) {
          missingProviders.push(provider);
        }
      });

      //

      const trakCandidate = {
        trak,
        meta,
        missingProviders,
        comments: [],
        likes: [],
      };
      console.log(
        '🚀 ~ file: useTRAKTab.ts ~ line 116 ~ Promise.resolve ~ trawwk',
        trakCandidate,
      );
      return trakCandidate;
    });
    console.log(
      '🚀 ~ file: useTRAKTab.ts ~ line 134 ~ handleTRAK ~ trak',
      trak.trak.youtube,
    );

    // play youtube

    console.log('🚀 ~ file: useTRAKTab.ts:230 ~ handleTRAK ~ trak:', trak);

    navigationRef.current.navigate('MODAL', {
      type: 'trak',
      exchange: {
        active: true,
        item: trak,
      },
    });
  };

  const handleLikePreview = async () => {
    const ids = id;
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 115 ~ handleTRAKInteraction ~ ids',
      ids,
    );
    const route = api.spotify({method: 'save-track', payload: {ids}});
    console.log(
      '🚀 ~ file: useSwipe.ts ~ line 83 ~ handleSwipedRight ~ route',
      route,
    );

    // alert(key);

    await axios
      .put(route, [ids], {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then(async () => {
        await handleLikeTRAK({
          trak: {
            title: title,
            artist: artist,
            cover_art: image.uri,
            isPreview: true,
            isrc: isrc,
            preview: source.uri,
          },
        }).then(() => {
          console.log(
            '🚀 ~ file: useSwipe.ts:213 ~ handleTRAKInteraction ~ action:',
          );

          const action = appendLike({
            title: title,
            artist: artist,
            cover_art: image.uri,
            isPreview: true,
            isrc: isrc,
            preview: source.uri,
          });
          store.dispatch(action);
        });
        Toast.show({
          type: 'success',
          text1: 'GLAD YOU LIKE IT!',
          text2: 'We added this song to your TRAKLIST™️.',
        });

        setLiked(true);
      })
      .catch(err => {
        // alert('- track not saved -');
        console.log(err, ' - track not saved');
        Toast.show({
          type: 'error',
          text1:
            "Error saving '" + !hidden
              ? players.spotify.item.artists[0].name
              : artist + ' - ' + !hidden
              ? players.spotify.item.name
              : title,
          text2: 'track not saved',
        });
      });

    console.log('🚀 ~ file: useSwipe.ts:213 ~ handleTRAKInteraction ~ action:');
  };

  const handleLike = async (geniusId: string) => {
    const route = api.genius({method: 'songs', payload: {geniusId}});
    const token = APIKeys.genius.accessToken;
    const response = await useGET({route, token});
    console.log(
      '🚀 ~ file: TRAKLISTradio.tsx:93 ~ handleGenius ~ response:',
      response,
    );

    const trak = await Promise.resolve(response).then(async (res: any) => {
      const song = res.data.response.song;
      console.log('🚀 ~ file: useTRAKTab.ts ~ line 46 ~ trak ~ song', song);

      const meta = {
        genius_url: song.url,
        release_date: song.release_date,
        description: song.description,
        custom_performances: song.custom_performances, // use
        recording_location: song.recording_location,
        writer_artists: song.writer_artists,
        featured_artists: song.featured_artists,
        producer_artists: song.producer_artists,
        song_relationships: song.song_relationships,
        // artist : get from genius FOR socials
      };

      let centralized: any = [];
      let providers: any[] = [
        'apple_music',
        'soundcloud',
        'spotify',
        'youtube',
      ];

      const media = song.media;
      const hasAppleMusic = song.apple_music_id;
      const apple_music = hasAppleMusic ? {id: song.apple_music_id} : null;

      if (hasAppleMusic) {
        centralized.push('apple_music');
      }

      let trak: any = {
        artist: song.artist_names,
        title: song.title,
        thumbnail: song.song_art_image_thumbnail_url,
        apple_music,
        genius: {id: JSON.stringify(geniusId)},
        soundcloud: null,
        spotify: null,
        youtube: null,
      };

      media.map((media: any) => {
        switch (media.provider) {
          case 'soundcloud':
            centralized.push('soundcloud');
            trak[media.provider] = {url: media.url};
            break;
          case 'spotify':
            centralized.push('spotify');
            trak[media.provider] = {uri: media.native_uri};
            break;
          case 'youtube':
            centralized.push('youtube');
            trak[media.provider] = {url: media.url};
            break;
          default:
            trak[media.provider] = {url: media.url};
            break;
        }
      });

      let missingProviders: any = [];

      providers.map((provider: string) => {
        const hasProvider = centralized.includes(provider);
        if (!hasProvider) {
          missingProviders.push(provider);
        }
      });

      const trakCandidate = {
        trak,
        meta,
        missingProviders,
        comments: [],
        likes: [],
      };
      console.log(
        '🚀 ~ file: useTRAKTab.ts ~ line 116 ~ Promise.resolve ~ trawwk',
        trakCandidate,
      );
      return trakCandidate;
    });

    await handleAddTRX04({trak}).then(async trakURI => {
      await handleLikeTRAK({
        trak: {
          title: players.youtube.title,
          artist: players.youtube.artist,
          cover_art: players.youtube.cover_art,
          isPreview: false,
          trx04: trakURI,
          geniusId: players.youtube.geniusId,
        },
      }).then(() => {
        console.log(
          '🚀 ~ file: useSwipe.ts:213 ~ handleTRAKInteraction ~ action:',
        );

        const action = appendLike({
          title: players.youtube.title,
          artist: players.youtube.artist,
          cover_art: players.youtube.cover_art,
          isPreview: false,
          trx04: trakURI,
          preview: null,
          geniusId: players.youtube.geniusId,
        });
        store.dispatch(action);
      });
      Toast.show({
        type: 'success',
        text1: 'GLAD YOU LIKE IT!',
        text2: 'We added this song to your TRAKLIST™️.',
      });

      setLiked(true);
    });
  };

  return (
    <>
      <MediaPlayer
        ref={playerRef}
        onEnd={() => {
          if (players.local.path) {
            // end local or play next
          } else !repeat ? userData.swiperRef.current.swipeTop() : null;
        }}
        playInBackground={true}
        playWhenInactive={true}
        pictureInPicture={true}
        // source={{uri: players.local.path}}
        // audioOnly={true}
        // paused={false}
        source={players.local.path ? {uri: players.local.path} : source}
        audioOnly={true}
        paused={
          youtubeId ? true : players.local.path ? players.local.paused : paused
        }
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
                text2: upcomingTRAK?.artist + ' - ' + upcomingTRAK?.title,
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
        onError={error => {
          alert('err');
          console.error('Error playing video:', error);
        }}
      />
      <View style={{backgroundColor: '#000'}}>
        <View style={{backgroundColor: '#fff'}}>
          <ProgressBar
            progress={isrc ? currentTime / playableDuration : elapsed}
            color={isrc ? '#1DA1F2' : '#1db954'}
            style={{
              backgroundColor: '#fff',
              height: 5,
              borderRadius: 10,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (youtubeId) {
              setMiniYoutube(!miniYoutube);
            } else {
              if (
                navigationRef.current?.getCurrentRoute().name ===
                'LIST_DASHBOARD'
              ) {
                navigationRef.current.navigate('SWIPE.');
              } else {
                navigationRef.current.navigate('TRX');
              }
              Toast.show({
                type: 'success',
                text1: 'BROWSE TRAKSTAR™ - FIND MUSIC',
                text2:
                  'You can start by pressing the releases in "New this week!"',
              });
            }
          }}>
          <View
            style={{
              height: 70,
              width: '100%',
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'space-between',
              // paddingHorizontal: 40,
              // flexDirection: 'row',
              paddingRight: 55,
            }}>
            {/* <ProgressBar progress={0.5} color={Colors.amber100} /> */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <FastImage
                source={{
                  uri: youtubeId
                    ? players?.youtube?.cover_art
                    : players.local.path
                    ? players.local.cover_art
                    : image.uri,
                  priority: FastImage.priority.high,
                }}
                style={{
                  height: 70,
                  width: 140,
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
                        : players.local.path
                        ? players.local.paused
                          ? 'play'
                          : 'pause'
                        : !source.uri
                        ? 'exclamation'
                        : paused
                        ? 'play'
                        : 'pause'
                    }
                    size={25}
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

              <View style={{width: '40%'}}>
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
                  </>
                ) : players.local.path ? (
                  <>
                    <VHeader
                      numberOfLines={2}
                      type="six"
                      color={'#1a1a1a'}
                      text={`${players.local.artist} - ${players.local.title}`}
                    />
                    <Caption
                      numberOfLines={1}
                      type="two"
                      color={'#232323'}
                      text={'TRAKSTAR™ PREMIUM'}
                    />
                  </>
                ) : (
                  <>
                    <VHeader
                      numberOfLines={2}
                      type="six"
                      color={'#1a1a1a'}
                      text={`${
                        source.uri ? 'PREVIEW :' : 'RESTRICTED!'
                      } ${artist} - ${title}`}
                    />
                    {!youtubeId && (
                      <Caption
                        numberOfLines={1}
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

              <View
                style={{
                  alignItems: 'center',
                  marginLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 60,
                }}>
                {players.local.path ? (
                  <MaterialCommunityIcons
                    name={'download'}
                    size={27}
                    color={'#1db954'}
                  />
                ) : (
                  <Pressable
                    onPress={
                      youtubeId
                        ? () => handleLike(players.youtube.geniusId)
                        : handleLikePreview
                    }>
                    <MaterialCommunityIcons
                      name={liked ? 'cards-heart' : 'cards-heart-outline'}
                      size={27}
                      color={youtubeId ? '#1db954' : '#1DA1F2'}
                    />
                  </Pressable>
                )}
                <View>
                  <MenuView
                    title="TRAKSTAR OPTIONS"
                    onPressAction={async ({nativeEvent}) => {
                      console.log(
                        '🚀 ~ file: TRAKLISTradio.tsx:800 ~ TRAKLISTradioElement ~ nativeEvent:',
                        nativeEvent,
                      );
                      console.warn(JSON.stringify(nativeEvent));

                      switch (nativeEvent.event) {
                        case 'restart':
                          !youtubeId
                            ? playerRef.current.seek(0)
                            : youtubePlayerRef.current.seekTo(0);
                          break;
                        case 'back':
                          const action = handleQueueControlsAction({
                            playbackState: 'back',
                          });
                          store.dispatch(action);
                          break;
                        case 'PiP':
                          if (isPrimaryPlayer) {
                            userData.PiP1Ref.current.injectJavaScript(`
                          if (!window.trakStarVideo) {
                            window.trakStarVideo = document.getElementsByTagName('video')[0];
                          }
                          
                          if (window.trakStarVideo) {
                            window.trakStarVideo.requestPictureInPicture().then(() => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiated successfully.'
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            }).catch(error => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiation failed: ' + error.message
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            });
                          } else {
                            const message = {
                              eventType: 'enablePiP',
                              data: 'No video element found.'
                            };
                            window.ReactNativeWebView.postMessage(JSON.stringify(message));
                          }
                          true;  
                        `);
                          } else {
                            userData.PiP2Ref.current.injectJavaScript(`
                          if (!window.trakStarVideo) {
                            window.trakStarVideo = document.getElementsByTagName('video')[0];
                          }
                          
                          if (window.trakStarVideo) {
                            window.trakStarVideo.requestPictureInPicture().then(() => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiated successfully.'
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            }).catch(error => {
                              const message = {
                                eventType: 'enablePiP',
                                data: 'PiP initiation failed: ' + error.message
                              };
                              window.ReactNativeWebView.postMessage(JSON.stringify(message));
                            });
                          } else {
                            const message = {
                              eventType: 'enablePiP',
                              data: 'No video element found.'
                            };
                            window.ReactNativeWebView.postMessage(JSON.stringify(message));
                          }
                          true;  
                        `);
                          }
                          break;
                        case 'explore':
                          if (navigationRef.current.isReady()) {
                            navigationRef.current.navigate('MODAL', {
                              type: 'match-trak',
                              exchange: {
                                active: true,
                                item: {
                                  title: title,
                                  artist: artist,
                                },
                              },
                            });
                          }
                          break;
                        case 'info':
                          handleGenius(players.youtube.geniusId);
                          break;
                        case 'block_artist':
                          Toast.show({
                            type: 'info',
                            text2:
                              'Blocking artists relating to "' +
                              (!youtubeId ? artist : players.youtube.artist) +
                              '"',
                            text1: `We'll keep this in mind`,
                          });
                          break;
                        case 'block_song':
                          Toast.show({
                            type: 'info',
                            text2:
                              'Blocking titles related to "' +
                              (!youtubeId ? title : players.youtube.title) +
                              '"',
                            text1: `We'll keep this in mind`,
                          });
                          break;
                        case 'share':
                          const imageBase64 = await RNFetchBlob.config({
                            fileCache: true,
                          })
                            .fetch(
                              'GET',
                              !youtubeId
                                ? image.uri
                                : players.youtube.cover_art,
                            )
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

                          const options: any = {
                            title: 'TRAKLITE',
                            message:
                              "TRAKLIST | Have you heard '" + !youtubeId
                                ? title
                                : players.youtube.title + "' by " + !youtubeId
                                ? title
                                : players.youtube.artist +
                                  '?\n Discover this and much more on TRAKSTAR.\n',
                            urls: [
                              `data:image/png;base64,${imageBase64}`,
                              'https://apps.apple.com/gb/app/trakstar/id1636470089',
                            ],
                          };
                          Share.open(options)
                            .then(res => {
                              console.log(res);
                            })
                            .catch(err => {
                              err && console.log(err);
                            });
                          break;
                        default:
                          break;
                      }
                    }}
                    actions={[
                      {
                        id: 'PiP',
                        title: 'Picture in Picture',
                        titleColor: '#46F289',
                        subtitle: 'Share action on SNS',
                        image: Platform.select({
                          ios: 'pip.swap',
                          android: 'ic_menu_share',
                        }),
                        imageColor: '#1a1a1a',
                        // state: 'on',
                      },
                      {
                        id: 'share',
                        title: 'Share',
                        titleColor: '#46F289',
                        subtitle: 'Share action on SNS',
                        image: Platform.select({
                          ios: 'square.and.arrow.up',
                          android: 'ic_menu_share',
                        }),
                        imageColor: '#db7e29',
                        // state: 'on',
                      },
                      {
                        id: !youtubeId ? 'explore' : 'info',
                        title: !youtubeId ? 'Explore' : 'Info',
                        image: Platform.select({
                          ios: 'cursor.rays',
                          android: 'ic_menu_delete',
                        }),
                        imageColor: '#fff',
                      },
                      {
                        title: 'Playback',
                        id: 'add',
                        titleColor: '#2367A2',
                        image: Platform.select({
                          ios: 'play',
                          android: 'ic_menu_add',
                        }),
                        imageColor: '#2367A2',
                        subactions: [
                          {
                            id: 'repeat',
                            title: 'Loop',

                            image: Platform.select({
                              ios: 'repeat.1',
                              android: 'ic_menu_delete',
                            }),
                            imageColor: '#2367A2',
                          },
                          {
                            id: 'back',
                            title: 'Step back',
                            image: Platform.select({
                              ios: 'backward.end.alt',
                              android: 'ic_menu_delete',
                            }),
                            imageColor: '#2367A2',
                          },
                          {
                            id: 'restart',
                            title: 'Restart',

                            image: Platform.select({
                              ios: 'arrow.counterclockwise',
                              android: 'ic_menu_delete',
                            }),
                            imageColor: '#2367A2',
                          },
                        ],
                      },
                      {
                        id: 'destructive',
                        title: 'Block',
                        attributes: {
                          destructive: true,
                        },
                        titleColor: 'red',
                        image: Platform.select({
                          ios: 'waveform.path.badge.minus',
                          android: 'ic_menu_delete',
                        }),
                        imageColor: 'red',
                        subactions: [
                          {
                            id: 'block_artist',
                            title: 'Artist',
                            titleColor: 'rgba(250,180,100,0.5)',
                            subtitle: 'State is mixed',
                            image: Platform.select({
                              ios: 'trash',
                              android: 'ic_menu_today',
                            }),
                            attributes: {
                              destructive: true,
                            },
                            state: 'mixed',
                          },
                          {
                            id: 'block_song',
                            title: 'Song',
                            attributes: {
                              destructive: true,
                            },
                            image: Platform.select({
                              ios: 'trash',
                              android: 'ic_menu_delete',
                            }),
                            state: 'mixed',
                          },
                        ],
                      },
                    ]}
                    // shouldOpenOnLongPress={true}
                  >
                    <View>
                      <MaterialCommunityIcons
                        name={'dots-horizontal-circle'}
                        size={27}
                        color={'#1db954'}
                      />
                    </View>
                  </MenuView>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* {youtubeId && !players.local.path && (
          <YoutubePlayer
            ref={youtubePlayerRef}
            height={!miniYoutube ? 0 : 220}
            // height={0}
            play={
              backgroundOverride ?? (!!youtubeId && !players.youtube.paused)
            }
            videoId={youtubeId?.split('=')[1]}
            onChangeState={event => {
              console.log(
                '🚀 ~ file: TRAKLISTradio.tsx:1042 ~ TRAKLISTradioElement ~ event:',
                event,
              );
              if (event == 'ended') {
                if (isTraklist) {
                  const action = setTraklistNext({});
                  store.dispatch(action);
                } else {
                  const action = setYoutubeOff({});
                  store.dispatch(action);
                  setMiniYoutube(false);
                }
              } else if (event == 'PiP status') {
                alert(JSON.stringify(event));
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
        )} */}
        <TRXPictureInPictureContainer isTraklist={isTraklist} />
      </View>
    </>
  );
};
