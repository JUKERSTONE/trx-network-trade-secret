import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTApp, useTRAKLISTState} from '../../app';

export const useSeed = ({navigation, route}: any) => {
  console.log('🚀 ~ file: useSeed.ts ~ line 6 ~ useSeed ~ route', route);
  const [searchResult, setSearchResult] = useState<any>();
  const {handleSearch} = useTRAKLISTApp();
  const {handleGetState} = useTRAKLISTState();
  const result = handleGetState({index: 'search'});

  const handleSearchQuery = (query: any) => {
    setSearchResult(null);
    const resultsPromise = handleSearch(query);
    console.log(
      '🚀 ~ file: useSeed.ts ~ line 12 ~ handleSearchQuery ~ res',
      resultsPromise,
    );

    Promise.resolve(resultsPromise).then(response => {
      const items = response.data.tracks.items;
      setSearchResult(items);
    });
  };

  const handleNavigateNext = () => {
    const {
      params: {profile},
    } = route;
    console.log(
      '🚀 ~ file: useSeed.ts ~ line 29 ~ handleNavigateNext ~ profile',
      profile,
    );
    navigation.navigate('INSTRUCTIONS', {
      profile: {
        ...profile,
        likes: [],
      },
    });
  };

  return {
    handleSearchQuery,
    searchResult,
    handleNavigateNext,
  };
};
