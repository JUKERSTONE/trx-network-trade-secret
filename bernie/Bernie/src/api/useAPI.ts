import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

export const useAPI = () => {
  const GET = ({route, token}: any) => {
    return axios.get(route, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
  };

  return {
    GET,
  };
};
