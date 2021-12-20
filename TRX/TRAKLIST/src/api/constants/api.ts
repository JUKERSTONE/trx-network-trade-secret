import {handleSpotifyAPI} from './handlers';

export const api = {
  spotify: ({method, payload}: any) => handleSpotifyAPI({method, payload}),
};
