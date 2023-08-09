import React, {useState, useRef, useEffect} from 'react';

import {INTEFACE_} from './internal';
import {
  PlayerContext,
  setLocalPlayer,
  setPopQueue,
  store,
  useAsyncStorage,
} from '../stores';
import {RADIO_, APP_BROWSER_} from '../components';
import {createNavigationContainerRef} from '@react-navigation/native';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';
import {useEffectAsync} from './hooks';
import Toast from 'react-native-toast-message';

export const TRAKLIST_APP = ({handleTheme, user}: any) => {
  const {config, fs} = RNFetchBlob;

  const [userData, setUserData] = useState({
    user,
    handleTheme,
    currentTime: 1,
    playableDuration: 1,
    swiperRef: useRef(null),
    browserRef: useRef(null),
    playerRef: useRef(null),
    youtubePlayerRef: useRef(null),
    navigationRef: useRef(null),
  });

  const {downloadQueue} = useSelector((state: any) => state.downloads);
  console.log('🚀 ~ file: TRAKLIST.tsx:26 ~ downloadQueue:', downloadQueue);

  const {handleStore} = useAsyncStorage();

  useEffectAsync(async () => {
    console.log('🚀 ~ file: TRAKLIST.tsx:27 ~ downloadQueue:', downloadQueue);
    console.log(
      '🚀 ~ file: TRAKLIST.tsx:25 ~ downloadQueue:',
      downloadQueue[0],
    );
    const downloads = fs.dirs.DownloadDir;
    return config({
      // add this option that makes response data to be stored as a file,
      // this is much more performant.
      path: downloadQueue[0].trakPath,
      appendExt: 'mp4',
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: false,
        path: downloads + '/' + 'tom' + '.mp4',
      },
    })
      .fetch('GET', downloadQueue[0].downloadableYTUrl)
      .progress({interval: 250}, (received, total) => {
        console.log('progress', received / total);
        console.log((received / total) * 100, 'eree');
      })
      .then(res => {
        console.log(
          '🚀 ~ file: useProfile.ts:978 ~ handleDownload ~ res:',
          res,
        );
        // async storage

        const action1 = setPopQueue();
        store.dispatch(action1);

        Toast.show({
          type: 'info',
          text1: 'Okayyyyy!??!!',
          text2: `You can now play ${downloadQueue[0].title} by ${downloadQueue[0].artist} offline`,
        });
      })
      .catch(err => {
        console.log(
          '🚀 ~ file: useProfile.ts:985 ~ handleDownload ~ err:',
          err,
        );
      });
  }, [downloadQueue]);

  return (
    <PlayerContext.Provider value={{userData, setUserData}}>
      <INTEFACE_ />
      <RADIO_ />
      {/* <DOWNLOADER_ /> */}
    </PlayerContext.Provider>
  );
};
