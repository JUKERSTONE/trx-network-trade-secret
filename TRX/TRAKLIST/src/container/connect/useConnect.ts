import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useConnect = ({navigation}: any) => {
  const {useGoogle, useSpotify /*useMusicKit*/} = useAuthentication();
  const {authorizeGoogle, refreshedState, revokeState} = useGoogle();
  const {authorizeSpotify, isAuthenticatedSpotify} = useSpotify();

  const handleNavigateNext = () => {
    navigation.navigate('DETAILS', {
      profile: {
        isAuthenticatedSpotify,
      },
    });
  };

  const handleNavigateSignIn = () => {
    navigation.navigate('SIGN_IN');
  };

  return {
    authorizeSpotify,
    authorizeGoogle,
    isAuthenticatedSpotify,
    handleNavigateNext,
    handleNavigateSignIn,
  };
};
