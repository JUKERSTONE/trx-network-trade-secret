import React, {useEffect, useState, useContext} from 'react';
import {colors} from '../../../core';
import axios from 'axios';
import {IStore} from '../../../stores';
import {useAPI, api} from '../../../api';
import {useAsyncStorage, asyncStorageIndex} from '../../../stores';

const {spotify} = api;
// const route = spotify({
//   method: 'search',
//   payload: {
//     type: 'track',
//     query: 'test',
//   },
// });
// console.log('🚀 ~ file: useTRAKLISTApp.ts ~ line 9 ~ route', route);

export const useTRAKLISTApp = () => {
  const {useGET} = useAPI();
  // const {handleGet} = useAsyncStorage();
  // handleGet({key: asyncStorageIndex.accessTokenSpotify});

  const [caughtCount, setCaughtCount] = useState<any>(0);
  const [called, setCalled] = useState<any>(false);
  const [count, setCount] = useState<any>(0);

  const handleTheme = () => {
    const isDarkMode = false;
    const theme = {
      dark: isDarkMode,
      colors: {
        primary: colors.light.primary,
        background: isDarkMode ? colors.dark.primary : colors.light.primary,
        card: colors.dark.primary,
        text: '#fff',
        border: 'whitesmoke',
        notification: 'purple',
      },
    };
    return theme;
  };

  const handleSearch = () => {
    //
    //
  };

  const handleRequest = (query: any) => {
    const index = query.length;
    if (caughtCount === count && caughtCount != 0 && count != 0) {
      // TIME TO MAKE A REQUEST
      setCalled(true);
    } else {
      setCalled(false);
      // USER IS TYPING TOO FAST. NO NEED TO MAKE A REQUEST
      setTimeout(() => {
        if (!called) {
          if (index === IStore.index[IStore.index.length - 1]) {
            // TIME TO MAKE A REQUEST

            const route = spotify({
              method: 'search',
              payload: {
                type: 'track',
                query: 'test',
              },
            });
            useGET({route, token: ''});
          }
        }
      }, 1000);
    }
  };

  return {
    handleTheme,
    handleSearch,
  };
};
