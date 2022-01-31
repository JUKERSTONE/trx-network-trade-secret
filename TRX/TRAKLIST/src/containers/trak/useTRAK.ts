import React, {useEffect, useState, useContext} from 'react';

export const useTRAK = () => {
  const routes = useState([
    {key: 'first', title: 'SONGS'},
    {key: 'second', title: 'ARTISTS'},
    {key: 'third', title: 'ALBUMS'},
  ]);

  return {
    routes,
  };
};
