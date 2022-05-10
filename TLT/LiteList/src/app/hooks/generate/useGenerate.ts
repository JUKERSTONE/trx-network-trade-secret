import {useState, useContext, useEffect} from 'react';

import {
  getRecommendedTracks,
  generate,
  getSeedArray,
  getStack,
  handlePurgeSeed,
  handleTranslateRecommendations,
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

  const keys = handleGetState({index: 'keys'});
  const appToken = keys.spotify.appToken;
  const profile = handleGetState({index: 'profile'});
  const traklandProfile = profile.trakland;
  const spotify = traklandProfile.spotify;
  const apple_music = traklandProfile.apple_music;
  const recommendation = apple_music.recommendations;
  const topTracks = spotify.top_tracks;

  const SPOT = topTracks;
  const AM = recommendation;
  const TRAKseed = {SPOT, AM /** , SCLOUD, GEN */};

  const handleRecommendations = async () => {
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 32 ~ useGenerate ~ TRAKseed',
      TRAKseed,
    );

    const trakDemarcation = await handlePurgeSeed({seed: TRAKseed});
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 34 ~ handleRecommendations ~ trakDemarcation',
      trakDemarcation,
    );

    const primaryTRAK = trakDemarcation.filter(
      TRAK => TRAK.player === 'primary',
    );
    const secondarySpotifyTRAK = trakDemarcation.filter(
      TRAK => TRAK.player === 'secondary:spotify',
    );
    const secondaryAppleMusicTRAK = trakDemarcation.filter(
      TRAK => TRAK.player === 'secondary:apple_music',
    );

    const TRAK = {
      primary: primaryTRAK,
      secondary: {
        spotify: secondarySpotifyTRAK,
        apple_music: secondaryAppleMusicTRAK,
      },
    };
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 56 ~ handleRecommendations ~ TRAK',
      TRAK,
    );

    // _________

    const randomTrackIndicies = generate(primaryTRAK); // picks an array of random numbers in range within the number of tracks
    const seedArray = getSeedArray({
      tracks: primaryTRAK,
      indicies: randomTrackIndicies,
      state: true,
    }); // gets an array of ids
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 75 ~ handleRecommendations ~ seedArray',
      seedArray,
    );
    const seeds = seedArray.join();
    const recommendedTracks: any = await getRecommendedTracks(seeds, appToken);
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 83 ~ handleRecommendations ~ recommendedTracks',
      recommendedTracks.response,
    );

    if (recommendedTracks.success) {
      const primaryTRAK = await handleTranslateRecommendations(
        recommendedTracks.response,
      );

      const primaryTRAKRecommendations = primaryTRAK.filter(
        TRAK => TRAK.player === 'primary',
      );
      console.log(
        '🚀 ~ file: useGenerate.ts ~ line 104 ~ handleRecommendations ~ primaryTRAKRecommendations',
        primaryTRAKRecommendations,
      );
      setRecommendations(primaryTRAKRecommendations);
    } else alert('needs a rerun');

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
