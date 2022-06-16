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
import {Alert} from 'react-native';

export const useGenerate = () => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [recommendations, setRecommendations] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    handleRecommendations();
  }, []);

  const profile = handleGetState({index: 'profile'});
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 25 ~ useGenerate ~ profile',
    profile,
  );
  const traklandProfile = profile.trakland;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 26 ~ useGenerate ~ traklandProfile',
    traklandProfile,
  );
  const TRXProfile = profile.TRX;
  const userCategory = TRXProfile.userCategory;
  const keys = handleGetState({index: 'keys'});
  const appToken = keys.spotify.appToken;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 30 ~ useGenerate ~ userCategory',
    userCategory,
  );
  const spotify = traklandProfile.spotify;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 35 ~ useGenerate ~ spotify',
    spotify,
  );
  const apple_music = traklandProfile.apple_music;

  const recommendation = apple_music?.recommendations;
  const topTracks = spotify?.top_tracks;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 40 ~ useGenerate ~ topTracks',
    topTracks,
  );

  const handleRecommendations = async () => {
    const SPOT = topTracks;
    const AM = recommendation;
    const TRAKseed = {SPOT, AM /** , SCLOUD, GEN */};
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 44 ~ handleRecommendations ~ TRAKseed',
      TRAKseed,
    );
    const trakDemarcation = await handlePurgeSeed({
      seed: TRAKseed,
      userCategory,
    });
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 52 ~ handleRecommendations ~ trakDemarcation',
      trakDemarcation,
    );

    // let trak;
    // switch (userCategory) {
    //   case 'primary':
    //     trak = trakDemarcation.filter(TRAK => TRAK.player === 'primary');
    //     break;
    //   case 'spotify':
    //     trak = trakDemarcation.filter(TRAK => TRAK.player === 'spotify');
    //     break;
    //   case 'apple_music':
    //     trak = trakDemarcation.filter(TRAK => TRAK.player === 'apple_music');
    //     break;
    // }
    // console.log(
    //   '🚀 ~ file: useGenerate.ts ~ line 107 ~ handleRecommendations ~ trak',
    //   trak,
    // );

    const randomTrackIndicies = generate(trakDemarcation); // picks an array of random numbers in range within the number of tracks
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 63 ~ handleRecommendations ~ randomTrackIndicies',
      randomTrackIndicies,
    );
    const seedArray = getSeedArray({
      tracks: trakDemarcation,
      indicies: randomTrackIndicies,
      state: true,
      userCategory,
    }); // gets an array of ids
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 76 ~ handleRecommendations ~ seedArray',
      seedArray,
    );

    const seeds = seedArray.join();
    const recommendedTracks: any = await getRecommendedTracks(seeds, appToken);
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 71 ~ handleRecommendations ~ recommendedTracks',
      recommendedTracks,
    );

    if (recommendedTracks.success) {
      const TRAK: any = await handleTranslateRecommendations(
        recommendedTracks.response,
        userCategory,
      );
      console.log(
        '🚀 ~ file: useGenerate.ts ~ line 82 ~ handleRecommendations ~ TRAK',
        TRAK,
      );

      // const primaryTRAKRecommendations = TRAK.filter(
      //   (TRAK: any) => TRAK.player === 'primary',
      // );
      // const secondarySpotifyTRAK = TRAK.filter(
      //   (TRAK: any) => TRAK.player === 'secondary:spotify',
      // );

      // const TRAKrecommendations =
      //   userCategory == 'primary'
      //     ? primaryTRAKRecommendations
      //     : userCategory == 'spotify'
      //     ? secondarySpotifyTRAK
      //     : secondarySpotifyTRAK;

      setRecommendations([...recommendations, ...TRAK]);
    } else handleRecommendations();
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
