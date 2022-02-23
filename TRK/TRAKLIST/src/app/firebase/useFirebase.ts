import React, {useEffect, useState, useContext} from 'react';
import {handleRegister, handleSignIn, handleGetUserProfile} from './hooks';

export const useFirebase = () => {
  return {
    handleRegister,
    handleSignIn,
    handleGetUserProfile,
  };
};
