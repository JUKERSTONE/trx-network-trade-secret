import {APIKeys} from '../../';

export const genius = ({method, payload}: any) => {
  const base = 'https://api.genius.com';
  const token = APIKeys.genius.accessToken;
  const {query, geniusId} = payload;
  console.log('🚀 ~ file: genius.ts ~ line 7 ~ genius ~ payload', payload);

  console.log(
    '🚀 ~ file: genius.ts ~ line 11 ~ genius ~ `${base}/search?q=${query}&access_token=${token}`',
    `${base}/search?q=${query}&access_token=${token}`,
  );
  switch (method) {
    case 'search':
      return `${base}/search?q=${query}`;
    case 'songs':
      return `${base}/songs/${geniusId}`;
  }
};
