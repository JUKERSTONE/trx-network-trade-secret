import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {api, useAPI} from '../../api';
import {
  useLITELISTState,
  handleAppendTRAKLIST,
  useEffectAsync,
  handleGetTRX01,
  handleGetTRX02,
} from '../../app';

import {store, handleMediaPlayerAction} from '../../stores';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {handleTrakStarListenAgain} from '../../app/firebase/getTrakstarListenAgain';

export const useLandingListenAgain = ({navigation, route}: any) => {
  const [trx02, setTRX02] = useState([]);
  const [listenAgain, setListenAgain] = useState<any>(null);

  useEffectAsync(async () => {
    const trending = await handleTrakStarListenAgain();

    const mappedtrx002 = trending.map((trak: any) => ({
      uri: trak.cover_art,
      captionTop: trak.title,
      captionBottom: trak.artist,
      nav: trak.trakURI,
    }));

    setListenAgain(mappedtrx002);
  }, []);

  const handleTRAK = async ({trak}: any) => {
    Alert.alert(`TRX ORIGINAL TRACK`, `${trak.artist} - ${trak.title}`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Play Song',
        onPress: async () => {
          console.log(
            '🚀 ~ file: useOriginals.ts:67 ~ handleTRAK ~ trak:',
            trak,
          );
          Toast.show({
            type: 'success',
            text1: 'Playing TRX Original Track',
            text2: `${trak.artist} - ${trak.title}`,
          });

          const action = handleMediaPlayerAction({
            playbackState: 'source',
            uri: trak.trakAUDIO,
            url: trak.cover_art,
            artist: trak.artist,
            title: trak.title,
            mode: 'header',
            id: {
              spotify: null,
              apple_music: null,
              traklist: trak.NFTFileName,
            },
            isrc: null,
          });
          store.dispatch(action);
        },
      },
      // {
      //   text: 'Save Song',
      //   onPress: async () => {
      //     console.log(
      //       '🚀 ~ file: useOriginals.ts:114 ~ onPress: ~ trak:',
      //       trak,
      //     );
      //     // check if already liked
      //     const likeExists = await handleLikeExists({trak});
      //     console.log(
      //       '🚀 ~ file: useOriginals.ts:120 ~ onPress: ~ likeExists:',
      //       likeExists,
      //     );

      //     if (likeExists) {
      //       alert('already liked');
      //     } else {
      //       handleLikeTRAK({trak}).then(() => {
      //         const action = appendLike(trak);
      //         store.dispatch(action);
      //       });
      //     }
      //   },
      // },
      // {
      //   text: 'Buy Merchandise',
      //   onPress: async () => {
      //     alert('Coming soon');
      //   },
      // },
    ]);
  };

  return {
    data: listenAgain,
    handleTRAK,
  };
};
