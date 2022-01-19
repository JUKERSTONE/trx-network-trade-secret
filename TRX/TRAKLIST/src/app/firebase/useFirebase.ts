import React, {useEffect, useState, useContext} from 'react';
import {handleRegister, handleSignIn} from './hooks';

export const useFirebase = () => {
  return {
    handleRegister,
    handleSignIn,
  };
};
