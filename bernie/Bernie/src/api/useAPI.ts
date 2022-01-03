import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

export const useAPI = () => {
  const GET = ({route, token}: any) => {
    const hasAuthorization = token;
    let authorizationLiteral: string = 'Bearer ' + token;

    console.log(
      '🚀 ~ file: useAPI.ts ~ line 14 ~ GET ~ authorizationLiteral',
      authorizationLiteral,
    );
    // alert(JSON.stringify(authorizationLiteral));

    const Authorization = hasAuthorization ? authorizationLiteral : '';
    return axios.get(route, {
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
    });
  };

  const POST = ({route, token, body}: any) => {
    const hasAuthorization = token;
    let authorizationLiteral: string = 'Basic ' + token;

    console.log(
      '🚀 ~ file: useAPI.ts ~ line 14 ~ GET ~ authorizationLiteral',
      authorizationLiteral,
    );
    // alert(JSON.stringify(authorizationLiteral));

    const Authorization = hasAuthorization ? authorizationLiteral : '';

    return axios.post(route, body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization,
      },
    });
  };

  return {
    GET,
    POST,
  };
};
