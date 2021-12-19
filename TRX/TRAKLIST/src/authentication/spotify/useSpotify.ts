import React, {useEffect, useState, useContext} from 'react';
import {authorize, refresh, revoke} from 'react-native-app-auth';

export const useSpotify = () => {
  const [isAuthenticatedSpotify, setIsAuthenticatedSpotify] = useState(false);

  const config = {
    clientId: '29dec26a7f304507b4a9d9bcf0ef210b', // available on the app page
    clientSecret: '1d27af3b5c4946c1a411657ca50490d0', // click "show client secret" to see this
    redirectUrl: 'com.trxklist://oauthredirect/', // the redirect you defined after creating the app
    scopes: [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-library-modify',
      'user-library-read',
      'streaming',
      'user-read-recently-played',
      'user-follow-modify',
      'user-top-read',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-follow-read',
      'user-modify-playback-state',
    ], // the scopes you need to access
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const authorizeSpotify = () => {
    const result: any = authorize(config);

    Promise.resolve(result).then(response => {
      const token = {
        accessToken: response.accessToken,
        accessTokenExpirationDate: response.accessToken,
        refreshToken: response.accessToken,
      };
      console.log(
        '🚀 ~ file: useSpotify.ts ~ line 39 ~ Promise.resolve ~ token',
        token,
      );

      //
      setIsAuthenticatedSpotify(true);
    });
  };
  return {
    authorizeSpotify,
    isAuthenticatedSpotify,
  };
};
