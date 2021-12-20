import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

export const useAPI = () => {
  const useGET = ({route, token}: any) => {
    axios.get(route, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  };

  return {
    useGET,
  };
};
