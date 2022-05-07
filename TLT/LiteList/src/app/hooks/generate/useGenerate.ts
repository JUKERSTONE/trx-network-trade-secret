import {useState, useContext, useEffect} from 'react';

import {
  getRecommendedTracks,
  generate,
  getSeedArray,
  getStack,
  handlePurgeSeed,
} from './handlers';
import {useLITELISTState} from '../../useLITELISTState';

export const useGenerate = () => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [recommendations, setRecommendations] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    handleRecommendations();
  }, []);

  const profile = handleGetState({profile: 'top_tracks'});
  const traklandProfile = profile.trakland;
  const spotify = traklandProfile.spotify;
  const topTracks = spotify.top_tracks;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 26 ~ useGenerate ~ topTracks',
    topTracks,
  );

  const handleRecommendations = () => {
    // const SPOT = {
    //   TRAK: topTracks,
    // };
    // const TRAKseed = {SPOT /** , AM, SCLOUD, GEN */};
    // const trakDemarcation = handlePurgeSeed({seed: TRAKseed});
    // const primaryTRAK = trakDemarcation.primary;
    // const secondaryTRAK = trakDemarcation.secondary;
    // const randomTrackIndicies = generate(tracks); // picks an array of random numbers in range within the number of tracks
    // const seedArray = getSeedArray(tracks, randomTrackIndicies, state.loggedIn); // gets an array of ids
    // let data;
    // // gets TRAKLIST likes from backend and filters them for trak.type==='track
    // if (state.user_data.likes?.length !== 0) {
    //   data = state.user_data?.likes?.filter((like: any) => {
    //     if (like['type'] === 'track') {
    //       return like;
    //     }
    //   });
    // }
    // // does the same thing for online TRAK
    // let seedArrayOnline, concat, seeds;
    // if (state.loggedIn && data) {
    //   const randomTrackIndiciesOnline = generate(data);
    //   seedArrayOnline = getSeedArray(
    //     data,
    //     randomTrackIndiciesOnline,
    //     state.loggedIn,
    //   ).slice(0, 2);
    //   // Puts them together
    //   concat = seedArray.concat(seedArrayOnline);
    //   //  Serializes them
    //   seeds = concat.join();
    // } else {
    //   seeds = seedArray.join();
    // }
    // // And they're off.
    // const recommendedTracks: any = getRecommendedTracks(seeds, state);
    // // Here you go
    // Promise.resolve(recommendedTracks).then(tracks => {
    //   const stack: any = tracks.success
    //     ? getStack(tracks.response, state)
    //     : handleReload();
    //   return Promise.resolve(stack).then(response => {
    //     return setRecommendations([...recommendations, ...response]);
    //   });
    // });
  };

  const handleReload = () => {
    setRecommendations([]);
    handleRecommendations();
    if (recommendations) setIsUnavailable(false);
  };

  return {
    handleRecommendations,
    recommendations,
    setRecommendations,
    isUnavailable,
    setIsUnavailable,
    handleReload,
  };
};
