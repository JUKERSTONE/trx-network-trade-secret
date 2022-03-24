import {handleSpotifyAPI, handleBernieAPI, handleWalterAPI} from './handlers';

export const api = {
  spotify: handleSpotifyAPI,
  bernie: handleBernieAPI,
  walter: handleWalterAPI,
};
