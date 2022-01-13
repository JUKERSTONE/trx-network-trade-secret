import React, {useEffect, useState, useContext} from 'react';
import {handleRegister} from './hooks';

export const useFirebase = () => {
  return {
    handleRegister,
  };
};
