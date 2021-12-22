import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTApp} from '../../app';

export const useSeed = () => {
  const {handleSearch} = useTRAKLISTApp();

  return {
    handleSearch,
  };
};
