import {APIKeys} from '../..';

export const spotify = ({method, payload}: any) => {
  const base = 'https://api.spotify.com/v1';
  const id = payload?.id;

  switch (method) {
    case 'track':
      return `${base}/tracks/${id}`;
    case 'token':
      return `https://accounts.spotify.com/api/token`;
  }
};
