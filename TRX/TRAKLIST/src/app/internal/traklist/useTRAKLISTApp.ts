import React, {useEffect, useState, useContext} from 'react';
import {colors} from '../../../core';
import axios from 'axios';
import {IStore, store} from '../../../stores';
import {useAPI, api} from '../../../api';
import {useAsyncStorage, asyncStorageIndex} from '../../../stores';
import {useSelector} from 'react-redux';

const {spotify} = api;

export const useTRAKLISTApp = () => {
  const {useGET} = useAPI();

  const [caughtCount, setCaughtCount] = useState<any>(0);
  const [called, setCalled] = useState<any>(false);
  const [count, setCount] = useState<any>(0);

  store.subscribe(() => {
    const state = store.getState();
    console.log('TRAKLIST APP STATE : ', state);
  });

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

  // const handleGetAppState = () => {
  //   const state = useSelector(state => state);
  //   console.log('TRAKLISTApp State', state);
  // };

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
    // handleGetAppState,
  };
};
