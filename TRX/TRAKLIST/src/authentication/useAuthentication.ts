import React, {useEffect, useState, useContext} from 'react';
// import {useMusicKit} from './music-kit';
import {useGoogle} from './google';
import {useSpotify} from './spotify';
export const useAuthentication = () => {
  const {isAuthenticatedSpotify} = useSpotify();
  // const {isAuthenticatedGoogle} = useGoogle();
  const [hasAuthenticationRequirements, setHasAuthenticationRequirements] =
    useState(false);

  return {
    // useMusicKit,
    useGoogle,
    useSpotify,
    hasAuthenticationRequirements,
  };
};
