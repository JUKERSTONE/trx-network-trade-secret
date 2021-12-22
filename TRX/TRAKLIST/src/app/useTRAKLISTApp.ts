import React, {useEffect, useState, useContext} from 'react';
import {colors} from '../core';
import axios from 'axios';
import {IStore, store} from '../stores';
import {useAPI, api} from '../api';
import {useAsyncStorage, asyncStorageIndex} from '../stores';
import {useSelector} from 'react-redux';
import {useTRAKLISTState} from './internal';

const {spotify} = api;
const {handleGetState} = useTRAKLISTState();

export const useTRAKLISTApp = () => {
  const {useGET} = useAPI();

  const [caughtCount, setCaughtCount] = useState<any>(0);
  const [called, setCalled] = useState<any>(false);
  const [count, setCount] = useState<any>(0);
  const [response, setResponse] = useState<any>(null);

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

  const handleSearch = (query: any) => {
    const state = handleGetState({index: 'keys'});
    const {
      spotify: {accessToken},
    } = state;

    IStore.index.push(query.length);
    setCount(count + 1);
    setTimeout(() => {
      setCaughtCount(caughtCount + 1);

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
              const response = useGET({route, token: accessToken});
              Promise.resolve(response).then(response => {
                setResponse(response.data);
              });
            }
          }
        }, 1000);
      }
    }, 300);
  };

  return {
    handleTheme,
    handleSearch,
  };
};
