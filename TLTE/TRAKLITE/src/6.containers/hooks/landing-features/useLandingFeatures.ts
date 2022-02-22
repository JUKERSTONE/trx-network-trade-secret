import React, {useEffect, useState, useContext} from 'react';

export const useLandingFeatures = (props: any) => {
  const {navigation} = props;
  const features: any[] = [
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
      title: 'PARTIES.',
      // navigation: () => navigation.navigate('Parties'),
      navigation: () => alert('Exclusive to EMBASSY 403'),
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media',
      title: 'LIBRARY.',
      // navigation: () => navigation.navigate('Tickets'),
      navigation: () =>
        alert(
          'Your Spotify, Apple Music and Soundcloud library in one place...',
        ),
    },
    {
      image:
        'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man.png?alt=media&token=0ab13253-25d4-4459-8494-cbe5298ccdb4',
      title: 'TICKETS.',
      // navigation: () => navigation.navigate('Tickets'),
      navigation: () => alert('"TRXKLIST TICKETS" available real soon...'),
    },
  ];

  return {
    features,
  };
};
