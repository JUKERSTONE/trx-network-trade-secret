
import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';

export const useInstructions = ({navigation, route}: any) => {
  console.log(
    '🚀 ~ file: useInstructions.ts ~ line 5 ~ useInstructions ~ route',
    route,
  );
  const handleNavigateNext = () => {
    const {
      params: {profile},
    } = route;
    console.log(
      '🚀 ~ file: useInstructions.ts ~ line 13 ~ handleNavigateNext ~ profile',
      profile,
    );
    navigation.navigate('PAYWALL', {
      screen: 'SUBSCRIPTIONS',
      params: {
        profile: {
          ...profile,
        },
      },
    });
    // navigation.navigate('PAYWALL', {
    //   profile: {
    //     ...profile,
    //   },
    // });
  };

  return {
    handleNavigateNext,
  };
};
