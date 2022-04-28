import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useConnect = ({navigation}: any) => {
  const {useGoogle, useSpotify /*useMusicKit*/} = useAuthentication();
  const {authorizeGoogle, refreshedState, revokeState} = useGoogle();
  const {authorizeSpotify, isAuthenticatedSpotify} = useSpotify();
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useState();

  const handleNavigateNext = () => {
    navigation.navigate('DETAILS', {
      profile: {
        isAuthenticatedSpotify,
        spotifyRefreshToken,
      },
    });
  };

  const handleNavigateSignIn = () => {
    navigation.navigate('SIGN_IN');
  };

  const handleAuthorizeSpotify = async () => {
    const refreshToken = await authorizeSpotify();
    setSpotifyRefreshToken(refreshToken);
  };

  return {
    handleAuthorizeSpotify,
    authorizeGoogle,
    isAuthenticatedSpotify,
    handleNavigateNext,
    handleNavigateSignIn,
  };
};
