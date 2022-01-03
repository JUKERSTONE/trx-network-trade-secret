import {APIKeys} from '../..';

export const spotify = ({method, payload}: any) => {
  const base = 'https://api.spotify.com/v1';
  const id = payload?.id;
  console.log('🚀 ~ file: genius.ts ~ line 7 ~ genius ~ payload', payload);

  // console.log(
  //   '🚀 ~ file: genius.ts ~ line 11 ~ genius ~ `${base}/search?q=${query}&access_token=${token}`',
  //   `${base}/search?q=${query}&access_token=${token}`,
  // );
  switch (method) {
    case 'track':
      return `${base}/tracks/${id}`;
    case 'token':
      return `https://accounts.spotify.com/api/token`;
  }
};
