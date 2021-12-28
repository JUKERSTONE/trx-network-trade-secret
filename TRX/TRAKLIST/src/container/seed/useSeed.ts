import React, {useEffect, useState, useContext} from 'react';
import {useAuthentication} from '../../authentication';
import {useTRAKLISTApp, useTRAKLISTState} from '../../app';

export const useSeed = () => {
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

  return {
    handleSearchQuery,
    searchResult,
  };
};
