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

  const keys = handleGetState({index: 'keys'});
  const appToken = keys.spotify.appToken;
  const profile = handleGetState({index: 'profile'});
  const traklandProfile = profile.trakland;
  const spotify = traklandProfile.spotify;
  const apple_music = traklandProfile.apple_music;

  const recommendation = apple_music?.recommendations;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 32 ~ useGenerate ~ recommendation',
    recommendation,
  );
  const topTracks = spotify?.top_tracks;
  console.log(
    '🚀 ~ file: useGenerate.ts ~ line 33 ~ useGenerate ~ topTracks',
    recommendation !== null,
    recommendation,
  );

  const handleRecommendations = async () => {
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 45 ~ handleRecommendations ~ recommendations',
      recommendations,
    );
    const profileType =
      recommendation != null && topTracks.length != 0
        ? 'primary'
        : recommendation != null && topTracks.length == 0
        ? 'apple_music'
        : topTracks.length != 0 && recommendation == null
        ? 'spotify'
        : 'offline';
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 44 ~ handleRecommendations ~ profileType',
      profileType,
    );

    const SPOT = topTracks;
    const AM = recommendation;
    const TRAKseed = {SPOT, AM /** , SCLOUD, GEN */};
    const trakDemarcation = await handlePurgeSeed({
      seed: TRAKseed,
      profileType,
    });
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 38 ~ handleRecommendations ~ trakDemarcation',
      trakDemarcation,
    );

    const primaryTRAK = trakDemarcation.filter(
      TRAK => TRAK.player === 'primary',
    );
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 70 ~ handleRecommendations ~ primaryTRAK',
      primaryTRAK,
    );
    const secondarySpotifyTRAK = trakDemarcation.filter(
      TRAK => TRAK.player === 'secondary:spotify',
    );
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 74 ~ handleRecommendations ~ secondarySpotifyTRAK',
      secondarySpotifyTRAK,
    );
    const secondaryAppleMusicTRAK = trakDemarcation.filter(
      TRAK => TRAK.player === 'secondary:apple_music',
    );
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 78 ~ handleRecommendations ~ secondaryAppleMusicTRAK',
      secondaryAppleMusicTRAK,
    );

    const TRAK = {
      primary: primaryTRAK,
      secondary: {
        spotify: secondarySpotifyTRAK,
        apple_music: secondaryAppleMusicTRAK,
      },
    };

    const randomTrackIndicies = generate(primaryTRAK); // picks an array of random numbers in range within the number of tracks
    const seedArray = getSeedArray({
      tracks: primaryTRAK,
      indicies: randomTrackIndicies,
      state: true,
    }); // gets an array of ids

    const seeds = seedArray.join();
    const recommendedTracks: any = await getRecommendedTracks(seeds, appToken);
    console.log(
      '🚀 ~ file: useGenerate.ts ~ line 67 ~ handleRecommendations ~ recommendedTracks',
      recommendedTracks,
    );

    if (recommendedTracks.success) {
      const TRAK: any = await handleTranslateRecommendations(
        recommendedTracks.response,
        profileType,
      );
      console.log(
        '🚀 ~ file: useGenerate.ts ~ line 114 ~ handleRecommendations ~ primaryTRAK',
        primaryTRAK,
      );

      const primaryTRAKRecommendations = TRAK.filter(
        (TRAK: any) => TRAK.player === 'primary',
      );
      const secondarySpotifyTRAK = TRAK.filter(
        (TRAK: any) => TRAK.player === 'secondary:spotify',
      );
      console.log(
        '🚀 ~ file: useGenerate.ts ~ line 83 ~ handleRecommendations ~ primaryTRAKRecommendations',
        primaryTRAKRecommendations,
      );

      console.log(
        '🚀 ~ file: useGenerate.ts ~ line 77 ~ handleRecommendations ~ recommendations',
        recommendations,
      );

      const TRAKrecommendations =
        profileType == 'primary'
          ? primaryTRAKRecommendations
          : profileType == 'spotify'
          ? secondarySpotifyTRAK
          : secondarySpotifyTRAK;

      setRecommendations([...recommendations, ...TRAKrecommendations]);
    }
    // else alert('reload');
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
