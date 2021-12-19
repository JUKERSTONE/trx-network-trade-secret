import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useConnect = () => {
  const {useGoogle, useSpotify /*useMusicKit*/} = useAuthentication();
  const {authorizeGoogle, refreshedState, revokeState} = useGoogle();
  const {authorizeSpotify, isAuthenticatedSpotify} = useSpotify();

  return {
    authorizeSpotify,
    authorizeGoogle,
    isAuthenticatedSpotify,
  };
};
