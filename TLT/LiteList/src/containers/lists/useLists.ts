import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useAPI, api} from '../../api';
import {useLITELISTState} from '../..';

const {handleGetState} = useLITELISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const useLists = () => {
  return {
    // handleConnect,
  };
};
