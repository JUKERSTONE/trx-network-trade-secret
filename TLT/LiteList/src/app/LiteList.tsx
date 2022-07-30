import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {TRAKLIST} from './internal';
import {useLITELISTApp, handleServices, handleChats} from '../app';
import auth from '@react-native-firebase/auth';
import {
  store,
  setSpotifyClientToken,
  setAuthentication,
  PlayerContext,
} from '../stores';
import {useFirebase} from './firebase';
import axios from 'axios';
import {api, useAPI} from '../api';
import {Base64} from '../core';
import {SPOTIFY_ACCOUNTS_KEY} from '../auth';
import {Provider} from 'react-redux';
import {RADIO} from '../components';
import {Events} from '../elements';

const queryString = require('query-string');

export const LiteListApp = ({handleTheme, user}: any) => {
  const [userData, setUserData] = useState({
    currentTime: 1,
    playableDuration: 1,
    swiperRef: useRef(null),
  });
  return (
    <PlayerContext.Provider value={{userData, setUserData}}>
      {/** use context */}
      <TRAKLIST handleTheme={handleTheme} user={user} />
      <RADIO />
    </PlayerContext.Provider>
  );
};
