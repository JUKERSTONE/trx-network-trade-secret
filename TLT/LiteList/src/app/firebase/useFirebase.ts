import React, {useEffect, useState, useContext} from 'react';

import {
  handleRegister,
  handleSignIn,
  handleListenUserProfile,
  handleStreakRewards,
  handleSpotifyService,
  handleAppleMusicService,
  handleAddStory,
  handleSearchUsers,
} from './hooks';

export const useFirebase = () => {
  return {
    handleRegister,
    handleSignIn,
    handleListenUserProfile,
    handleStreakRewards,
    handleSpotifyService,
    handleAppleMusicService,
    handleAddStory,
    handleSearchUsers,
  };
};
