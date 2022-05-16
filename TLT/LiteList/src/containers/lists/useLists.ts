import React, {useEffect, useState, useContext} from 'react';
// import {useAuthentication} from '../../authentication';
import {useAPI, api} from '../../api';
import {useLITELISTState} from '../..';
import {IStore} from '../../stores';
import axios from 'axios';
import {SPOTIFY_SEARCH, MUSIXMATCH_GET_LYRICS} from '../../api';
import {SOUNDCLOUD_SEARCH_TRACKS} from '../../api/soundcloud';
import {SOUNDCLOUD_OAUTH_KEY} from '../../auth/';

const {handleGetState} = useLITELISTState();
const keys = handleGetState({index: 'keys'});
const appToken = keys.spotify.appToken;

export const useLists = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState<any>('');
  const [count, setCount] = useState<any>(0);

  const [caughtCount, setCaughtCount] = useState<any>(0);
  const [called, setCalled] = useState<any>(false);
  // const [searchResults, setSearchResults] = useState<any>([]);
  // const [option, setOption] = useState<any>('track');
  // const [searchType, setSearchType] = useState<any>('spotify');
  // const [results, setResults] = useState<any>([]);

  useEffect(() => {
    if (query.length === 0) {
      // alert('no length');
      setIsSearching(false);
    } else {
      // alert('length');
      setIsSearching(true);
    }
    // alert(isSearch);
  }, [query]);

  const handleChangeText = (text: string) => {
    IStore.index.push(text.length);
    setCount(count + 1);
    setTimeout(() => {
      setCaughtCount(caughtCount + 1);
      handleRequest(text);
    }, 300);
  };

  const handleRequest = (query: any) => {
    const index = query.length;
    if (caughtCount === count && caughtCount != 0 && count != 0) {
      // TIME TO MAKE A REQUEST
      // ENGINE DOES NOT MAKE REQUEST IF THE USER IS ALREADY IN CACHE
      // if (!IndexStore.cache.has(query)) {
      //   setTerm(query);
      // }
      setCalled(true);
    } else {
      setCalled(false);
      // USER IS TYPING TOO FAST. NO NEED TO MAKE A REQUEST
      setTimeout(() => {
        if (!called) {
          if (index === IStore.index[IStore.index.length - 1]) {
            // TIME TO MAKE A REQUEST
            // setRequestSignal(requestSignal + 1);

            setQuery(query);

            // ENGINE DOES NOT MAKE REQUEST IF THE USER IS ALREADY IN CACHE
            // if (!IndexStore.cache.has(query)) {
            //   setTerm(query);
            // }
          }
        }
      }, 1000);
    }
  };

  return {
    // handleConnect,
    handleChangeText,
    isSearching,
    // results,
    query,
  };
};
