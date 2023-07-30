import React, {useState, useRef} from 'react';

import {INTEFACE_} from './internal';
import {PlayerContext} from '../stores';
import {RADIO_, APP_BROWSER_} from '../components';
import {createNavigationContainerRef} from '@react-navigation/native';

export const TRAKLIST_APP = ({handleTheme, user}: any) => {
  const [userData, setUserData] = useState({
    user,
    handleTheme,
    currentTime: 1,
    playableDuration: 1,
    swiperRef: useRef(null),
    browserRef: useRef(null),
    playerRef: useRef(null),
    navigationRef: useRef(null),
  });

  return (
    <PlayerContext.Provider value={{userData, setUserData}}>
      <INTEFACE_ />
      <RADIO_ />
    </PlayerContext.Provider>
  );
};
