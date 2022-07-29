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
import {store, setTRAKLIST} from '../../../stores';

export const useGenerate = () => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [recommendations, setRecommendations] = useState<any>([]);
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
      '🚀 ~ file: useGenerate.ts ~ line 61 ~ handleRecommendations ~ TRAKseed',
      TRAKseed,
    );

    setProgress(3 / 8);
    // 1.
    const trakDemarcation = await handlePurgeSeed({
      seed: TRAKseed,
      userCategory,
    });

    // if trak demarcation is less than 3, reload

    if (trakDemarcation!.length < 3) {
      alert(
        'whoops. you ran into a bug - please close and reopen the app until we get this fixed',
      );
    }

    setProgress(4 / 8);

    // 2.
    const randomTrackIndicies = generate(trakDemarcation); // picks an array of random numbers in range within the number of tracks

    setProgress(5 / 8);

    // 3.
    const seedArray = getSeedArray({
      tracks: trakDemarcation,
      indicies: randomTrackIndicies,
      state: true,
      userCategory,
    }); // gets an array of ids

    setProgress(6 / 8);

    // 4.
    const seeds = seedArray.join();
    const recommendedTracks: any = await getRecommendedTracks(seeds, appToken);

    setProgress(7 / 8);

    // 5
    if (recommendedTracks.success) {
      const TRAK: any = await handleTranslateRecommendations(
        recommendedTracks.response,
        userCategory,
      );

      setProgress(8 / 8);
      // setTimeout(() => {
      const action = setTRAKLIST({traklist: TRAK});
      store.dispatch(action);
      // }, 800);
    } else handleRecommendations();
  };

  // const handleReload = () => {
  //   setRecommendations([]);
  //   handleRecommendations();
  //   if (recommendations) setIsUnavailable(false);
  // };

  return {
    handleRecommendations,
    isUnavailable,
    setIsUnavailable,
    // handleReload,
    progress,
  };
};
