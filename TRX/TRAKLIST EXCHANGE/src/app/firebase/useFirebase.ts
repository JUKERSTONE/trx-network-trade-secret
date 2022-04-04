import React, {useEffect, useState, useContext} from 'react';
import {
  handleRegister,
  handleSignIn,
  handleGetUserProfile,
  handleStreakRewards,
} from './hooks';

export const useFirebase = () => {
  return {
    handleRegister,
    handleSignIn,
    handleGetUserProfile,
    handleStreakRewards,
  };
};
