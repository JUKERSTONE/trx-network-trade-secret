import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {store, toggleExchangeView} from '../../stores';
import {useT4AState} from '../../app';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {handleNormalizePath, handleStoreAudio} from './handlers';
import storage from '@react-native-firebase/storage';

export const useRedeem = ({navigation, route}: any) => {
  const [audioURL, setAudioURL] = useState<any>();
  const {useGET, usePOST} = useAPI();
  const {handleGetState} = useT4AState();

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userID = TRXProfile.id;
  console.log('🚀 ~ file: useRedeem.ts ~ line 13 ~ useRedeem ~ userID', userID);

  const trak = route.params.trak;
  console.log('🚀 ~ file: useRedeem.ts ~ line 24 ~ useRedeem ~ trak', trak);
  const trakID = trak.trakID;
  const audioFileName = trak.artist + '_' + trak.title + '_' + userID;
  console.log('🚀 ~ file: useRedeem.ts ~ line 8 ~ useRedeem ~ trakID', trak);

  const handleNavigateNext = async () => {
    const verify = {
      userID,
      trakID,
      audioFileName,
      proof: '',
    };
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 20 ~ handleNavigateNext ~ verify',
      verify,
    );

    const route = api.bernie({method: 'request_nft'});
    console.log(
      '🚀 ~ file: useExchange.ts ~ line 10 ~ useEffect ~ route',
      route,
    );

    const payload = {
      userID,
      trakID,
      audioFileName,
      audioURL,
      proof: 'test',
      type: 'track',
      trakIMAGE: 'ef',
      trakAUDIO: 'ef',
      trakIPO: 30.3,
      trakCOPIES: 100,
      title: trak.title,
      artist: trak.artist,
      thumbnail: trak.thumbnail,
    };
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 50 ~ handleNavigateNext ~ payload',
      payload,
    );

    const response: any = await usePOST({route, payload});
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 36 ~ handleNavigateNext ~ response',
      response,
    );
  };

  const handleUploadAudio = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
        type: [DocumentPicker.types.audio],
      });

      let path = file.uri;
      const normalizedPath: any = handleNormalizePath(path);
      const result = await RNFetchBlob.fs.readFile(normalizedPath, 'base64');

      const upload: any = storage()
        .ref('nft/trx-00/audio/' + audioFileName)
        .putString(result, 'base64', {contentType: 'audio/mp3'});

      await upload.on('state_changed', (snapshot: any) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload ' + progress + '% done');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED:
            console.log('Upload Paused');
            break;
          case storage.TaskState.RUNNING:
            console.log('Upload Running');
            break;
          case storage.TaskState.SUCCESS:
            upload.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
              console.log('File available at ', downloadURL);
              setAudioURL(downloadURL);
            });
            break;
          case storage.TaskState.ERROR:
            alert('ERROR : Try again');
        }
      });
    } catch (e) {
      console.log(
        '🚀 ~ file: useRedeem.ts ~ line 72 ~ handleUploadAudio ~ e',
        e,
      );
    }
  };

  return {
    handleNavigateNext,
    handleUploadAudio,
  };
};
