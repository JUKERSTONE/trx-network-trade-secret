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
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';

const {handleGetState} = useT4AState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useRedeem = ({navigation, route}: any) => {
  const [audioURL, setAudioURL] = useState<any>();
  const [imageURL, setImageURL] = useState<any>();
  const [nftValue, setNFTValue] = useState<any>();
  const [nftCopies, setNFTCopies] = useState<any>();
  const {useGET, usePOST} = useAPI();

  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userID = TRXProfile.id;
  console.log('🚀 ~ file: useRedeem.ts ~ line 13 ~ useRedeem ~ userID', userID);

  const trak = route.params.trak;
  console.log('🚀 ~ file: useRedeem.ts ~ line 24 ~ useRedeem ~ trak', trak);
  const trakID = trak.trakID;
  const NFTFileName = trak.artist + '_' + trak.title + '_' + userID;
  console.log('🚀 ~ file: useRedeem.ts ~ line 8 ~ useRedeem ~ trakID', trak);

  const handleNavigateNext = async () => {
    const route = api.bernie({method: 'request_nft'});

    const payload = {
      userID,
      trakID,
      NFTFileName,
      proof: 'test',
      type: 'track',
      trakIMAGE: imageURL,
      trakAUDIO: audioURL,
      trakIPO: nftValue,
      trakCOPIES: nftCopies,
      title: trak.title,
      artist: trak.artist,
      thumbnail: trak.thumbnail,
    };
    console.log(
      '🚀 ~ file: useRedeem.ts ~ line 50 ~ handleNavigateNext ~ payload',
      payload,
    );

    const response: any = await usePOST({
      route,
      payload,
      token: 'Bearer ' + accessToken,
    });
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
        .ref('nft/trx-00/' + NFTFileName + '/audio')
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

  const handleUploadImage = async () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async image => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;

      if (imageUri == null) {
        return null;
      }

      const uploadUri: any = imageUri;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      const extension = filename.split('.').pop();
      const name = filename.split('.').slice(0, -1).join('.');

      filename = name + Date.now() + '.' + extension;

      setUploading(true);
      setTransferred(0);

      const upload: any = storage()
        .ref('nft/trx-00/' + NFTFileName + '/image')
        .putFile(uploadUri, {contentType: 'image/jpeg'});

      upload.on('state_changed', (snapshot: any) => {
        console.log(
          `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
        );
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

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
              setImageURL(downloadURL);
            });
            break;
          case storage.TaskState.ERROR:
            alert('ERROR : Try again');
        }
      });
    });
  };

  const handleNFTCopiesInput = (text: string) => {
    setNFTCopies(text);
  };

  const handleNFTValueInput = (text: string) => {
    setNFTValue(text);
  };

  return {
    handleNavigateNext,
    handleUploadAudio,
    handleUploadImage,
    handleNFTCopiesInput,
    handleNFTValueInput,
  };
};
