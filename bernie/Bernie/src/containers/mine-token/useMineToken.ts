import React, {useEffect, useState, useContext} from 'react';

export const useMineToken = () => {
  const [query, setQuery] = useState<any>();

  const handleInputChange = (text: string) => {
    setQuery(text);
  };

  const handleAction = () => {
    // alert('pop');
  };

  return {
    handleInputChange,
    handleAction,
  };
};
