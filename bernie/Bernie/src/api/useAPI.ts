import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

export const useAPI = () => {
  const GET = ({route, token}: any) => {
    const hasAuthorization = token;
    let authorizationLiteral: string = 'Bearer ' + token;

    const Authorization = hasAuthorization ? authorizationLiteral : '';
    return axios.get(route, {
      headers: {
        'Content-Type': 'application/json',
        Authorization,
      },
    });
  };

  const POST = ({
    route,
    token,
    body,
    ContentType = 'application/x-www-form-urlencoded',
  }: any) => {
    const hasAuthorization = token;
    let authorizationLiteral: string = 'Basic ' + token;
    // alert(hasAuthorization);

    const Authorization = hasAuthorization ? authorizationLiteral : '';

    return axios.post(route, body, {
      headers: {
        'Content-Type': ContentType,
        Authorization,
      },
    });
  };

  return {
    GET,
    POST,
  };
};
