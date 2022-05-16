import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {api, useAPI, APIKeys} from '../../api';

export const useCredits = () => {
  const {useGET} = useAPI();
  const [trak, setTRAK] = useState();

  return {};
};
