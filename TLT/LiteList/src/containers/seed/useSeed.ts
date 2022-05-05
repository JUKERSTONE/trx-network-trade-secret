import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTApp, useLITELISTState} from '../../app';

export const useSeed = ({navigation, route}: any) => {
  const [searchResult, setSearchResult] = useState<any>();
  const {handleSearch} = useTRAKLISTApp();
  const {handleGetState} = useLITELISTState();
  const result = handleGetState({index: 'search'});

  const handleSearchQuery = (query: any) => {
    setSearchResult(null);
    const resultsPromise = handleSearch(query);

    Promise.resolve(resultsPromise).then((response: any) => {
      const items = response.data.tracks.items;
      setSearchResult(items);
    });
  };

  const handleNavigateNext = () => {
    const {
      params: {profile},
    } = route;

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
