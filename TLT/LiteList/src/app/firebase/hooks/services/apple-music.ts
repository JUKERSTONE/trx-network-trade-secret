import auth from '@react-native-firebase/auth';
import {
  store,
  setTRAKLANDProfile,
  useAsyncStorage,
  asyncStorageIndex,
  storeKeysTRX,
} from '../../../../stores';
import {api, useAPI} from '../../../../api';
import firestore from '@react-native-firebase/firestore';
import {
  spotifyRefresh,
  spotifyProfileRefresh,
  appleMusicProfileRefresh,
} from '../../../hooks';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const handleAppleMusicService = async () => {
  const AppleMusicKeyId = 'MBVSJA2QBU';
  const AppleMusicTeamId = '3J39XKJXT5';
  const AppleMusicPrivateKey =
    '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgDnVAe5C0dO1ouzHu\nfEJpHLfb4KsL3kAa5JVOLdcoiu+gCgYIKoZIzj0DAQehRANCAATvYaFa0e/LgWb2\noIwX1OOpBilYle616YJmPDhgNLvtb4YoiDCqIEdSdgcRzEM5rnnLFwc1evaYPyOb\neX8ghAKf\n-----END PRIVATE KEY-----';
  await AppleMusic.initialize(
    AppleMusicKeyId,
    AppleMusicTeamId,
    AppleMusicPrivateKey,
  );

  const isLoggedIn = await AppleMusic.login().catch(() => {
    alert('No Apple Music Subcription Found.');
    return {};
  });

  switch (isLoggedIn) {
    case true:
      const newData: any = await appleMusicProfileRefresh();
      console.log(
        '🚀 ~ file: apple-music.ts ~ line 38 ~ handleAppleMusicService ~ newData',
        newData,
      );

      if (newData.success) {
        const apple_music = newData.data;
        return apple_music;
      } else {
        alert('Apple music data retrieve unsuccessful');
        return;
      }
    default:
      return null;
  }
};
