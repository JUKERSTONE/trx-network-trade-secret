import React, {useEffect, useState, useContext} from 'react';
import {useAPI, APIKeys, routes} from '../../api';

export const useMineToken = () => {
  const [query, setQuery] = useState<any>();
  const {GET} = useAPI();
  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  const handleAction = () => {
    const route = routes.genius({method: 'search', payload: query});
    const token = APIKeys.genius.accessToken;

    const response = GET({route, token});
    console.log(
      '🚀 ~ file: useMineToken.ts ~ line 16 ~ handleAction ~ response',
      response,
    );
  };

  return {
    handleInputChange,
    handleAction,
  };
};
