import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import {useLITELISTState} from '../../app';

export const useProfile = ({navigation, route}: any) => {
  const [profile, setProfile] = useState();
  const {useGET} = useAPI();

  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    const profile = handleGetState({index: 'profile'});
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 14 ~ useEffect ~ profile',
      profile,
    );
    const TRXProfile = profile.TRX;
    console.log(
      '🚀 ~ file: useProfile.ts ~ line 15 ~ useEffect ~ TRXProfile',
      TRXProfile,
    );
    setProfile(TRXProfile);
  }, []);

  return {
    profile,
  };
};
