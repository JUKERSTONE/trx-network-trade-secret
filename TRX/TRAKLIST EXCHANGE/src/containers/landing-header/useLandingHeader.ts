import React, {useEffect, useState, useContext} from 'react';
import {store, toggleExchangeView} from '../../stores';

export const useLandingHeader = ({navigation}: any) => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery]: any = useState('');

  const [option, setOption] = useState('track');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any>([]);
  const [called, setCalled] = useState(false);
  const [count, setCount] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [searchType, setSearchType] = useState('spotify');

  useEffect(() => {
    if (query.length > 0) {
      setIsSearching(true);
    } else setIsSearching(false);
  }, [query]);

  // const headerLeft = () => {
  //   alert(state.loggedIn);
  //   return state.loggedIn ? 'menu' : 'login';
  // };

  const handleDeposit = () => {
    navigation.navigate('MODAL', {
      type: 'deposit',
      exchange: {
        active: true,
      },
    });
  };

  return {
    isSearching,
    // headerLeft,
    handleDeposit,
  };
};
