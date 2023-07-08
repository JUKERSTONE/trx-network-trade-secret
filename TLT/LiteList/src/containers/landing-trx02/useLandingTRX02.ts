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

export const useLandingTRX02 = ({navigation, route}: any) => {
  const [trx02, setTRX02] = useState([]);
  const [mappedtrx002, setMappedtrx002] = useState<any>(null);

  useEffectAsync(async () => {
    const trx02 = await handleGetTRX02();
    console.log(
      '🚀 ~ file: useLandingTRX02.ts:25 ~ useEffectAsync ~ trx02:',
      trx02,
    );

    const mappedtrx002 = trx02.map((trak: any) => ({
      uri: trak.coverArtUrl,
      captionTop: trak.title,
      captionBottom: trak.artists.artist,
    }));
    setMappedtrx002(mappedtrx002);
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
    data: mappedtrx002,
    handleTRAK,
  };
};
