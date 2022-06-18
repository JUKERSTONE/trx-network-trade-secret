import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
// @ts-ignore
import AppleMusic from '@bouncyapp/react-native-apple-music';

export const useConnect = ({navigation}: any) => {
  const {useGoogle, useSpotify /*useMusicKit*/} = useAuthentication();
  const {authorizeGoogle, refreshedState, revokeState} = useGoogle();
  const {authorizeSpotify, isAuthenticatedSpotify = false} = useSpotify();
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState();
  const [spotifyAccessToken, setSpotifyAccessToken] = useState();
  const [isAuthenticatedAppleMusic, setIsAuthenticatedAppleMusic] =
    useState(false);

  useEffect(() => {
    handleAuthorizeAppleMusic();
  });

  const handleNavigateNext = () => {
    navigation.navigate('DETAILS', {
      profile: {
        isAuthenticatedSpotify,
        spotifyRefreshToken,
        spotifyAccessToken,
        userCategory:
          isAuthenticatedAppleMusic && isAuthenticatedSpotify
            ? 'primary'
            : isAuthenticatedAppleMusic && !isAuthenticatedSpotify
            ? 'apple_music'
            : !isAuthenticatedAppleMusic && isAuthenticatedSpotify
            ? 'spotify'
            : 'offline',
      },
    });
  };

  const handleNavigateSignIn = () => {
    navigation.navigate('SIGN_IN');
  };

  const handleAuthorizeSpotify = async () => {
    const {refreshToken, accessToken} = await authorizeSpotify();
    setSpotifyRefreshToken(refreshToken);
    setSpotifyAccessToken(accessToken);
  };

  const handleAuthorizeAppleMusic = async () => {
    const AppleMusicKeyId = 'MBVSJA2QBU';
    const AppleMusicTeamId = '3J39XKJXT5';
    const AppleMusicPrivateKey =
      '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgDnVAe5C0dO1ouzHu\nfEJpHLfb4KsL3kAa5JVOLdcoiu+gCgYIKoZIzj0DAQehRANCAATvYaFa0e/LgWb2\noIwX1OOpBilYle616YJmPDhgNLvtb4YoiDCqIEdSdgcRzEM5rnnLFwc1evaYPyOb\neX8ghAKf\n-----END PRIVATE KEY-----';
    await AppleMusic.initialize(
      AppleMusicKeyId,
      AppleMusicTeamId,
      AppleMusicPrivateKey,
    );

    const isLoggedIn = await AppleMusic.login()
      .then(() => {
        setIsAuthenticatedAppleMusic(true);
        return 'Apple Music Subcription Found.';
      })
      .catch(() => {
        setIsAuthenticatedAppleMusic(false);
        return 'No Apple Music Subcription Found.';
      });

    alert(JSON.stringify(isLoggedIn));
  };

  return {
    handleAuthorizeSpotify,
    authorizeGoogle,
    isAuthenticatedSpotify,
    handleNavigateNext,
    handleNavigateSignIn,
    handleAuthorizeAppleMusic,
    isAuthenticatedAppleMusic,
  };
};
