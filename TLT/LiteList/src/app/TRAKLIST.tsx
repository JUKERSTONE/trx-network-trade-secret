import React, {useState, useRef} from 'react';

import {INTEFACE_} from './internal';
import {PlayerContext} from '../stores';
import {RADIO_, APP_BROWSER_} from '../components';

export const TRAKLIST_APP = ({handleTheme, user}: any) => {
  const [userData, setUserData] = useState({
    currentTime: 1,
    playableDuration: 1,
    swiperRef: useRef(null),
    browserRef: useRef(null),
    playerRef: useRef(null),
  });

  return (
    <PlayerContext.Provider value={{userData, setUserData}}>
      <INTEFACE_ handleTheme={handleTheme} user={user} />
      <RADIO_ />
    </PlayerContext.Provider>
  );
};
