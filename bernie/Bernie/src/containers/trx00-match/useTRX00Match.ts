import React, {useEffect, useState, useContext} from 'react';
import {routes, useAPI} from '../../api';
import storage from '@react-native-firebase/storage';
import {useBERNIEState, handleAcceptTRAK, handleGetPreviews} from '../../app';

export const useTRX00Match = ({navigation, route}: any) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    handlePreviews();
  }, []);

  const handlePreviews = async () => {
    const previews: any = await handleGetPreviews();
    console.log(
      '🚀 ~ file: useTRX00Match.ts:10 ~ useEffect ~ previews:',
      previews,
    );
    setPreviews(previews);
  };

  const handleMatch = ({reference}: any) => {
    console.log(
      '🚀 ~ file: useTRX00Match.ts:23 ~ handleMatch ~ reference:',
      reference,
    );
    navigation.navigate('GeniusMatch', {
      reference,
    });
  };

  return {
    previews,
    handleMatch,
  };
};
