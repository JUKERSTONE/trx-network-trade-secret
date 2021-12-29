import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {signIn, store} from '../../stores';

export const usePayWall = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setTimeout(() => {
      const data = [
        {
          id: 'free',
          title: 'FREE',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/sonar.png?alt=media',
          TRAK: {
            tier: {
              tier1: null,
              tier2: null,
              tier3: 5,
              tier4: 25,
            },
            trak: {
              track: 30,
              artist: null,
              album: null,
            },
          },
          price: 0,
          currency: 'GBP',
        },
        {
          id: 'basic',
          title: 'BASIC',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man.png?alt=media',
          TRAK: {
            tier: {
              tier1: null,
              tier2: 5,
              tier3: 15,
              tier4: 40,
            },
            trak: {
              track: 45,
              artist: 10,
              album: 5,
            },
          },
          price: 4.33,
          currency: 'GBP',
        },
        {
          id: 'pro',
          title: 'PRO',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/euphoric_man%402x.png?alt=media',
          TRAK: {
            tier: {
              tier1: null,
              tier2: 10,
              tier3: 20,
              tier4: 60,
            },
            trak: {
              track: 65,
              artist: 15,
              album: 10,
            },
          },
          price: 9.33,
          currency: 'GBP',
        },
        {
          id: 'musichead',
          title: 'MUSICHEAD',
          imageURL:
            'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
          TRAK: {
            tier: {
              tier1: 5,
              tier2: 10,
              tier3: 25,
              tier4: 60,
            },
            trak: {
              track: 70,
              artist: 15,
              album: 15,
            },
          },
          price: 14.33,
          currency: 'GBP',
        },
      ];
      setData(data);
    }, 400);
  }, []);

  const handleSubscribe = ({id}: any) => {
    console.log(
      '🚀 ~ file: usePayWall.ts ~ line 100 ~ handleSubscribe ~ id',
      id,
    );

    // send subscription data back
    // dispatch authentication action
    const action = signIn();
    store.dispatch(action);
  };

  return {
    data,
    handleSubscribe,
  };
};
