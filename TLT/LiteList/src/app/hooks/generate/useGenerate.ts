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
    const trakDemarcation = await handlePurgeSeed({seed: TRAKseed});

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

    const randomTrackIndicies = generate(primaryTRAK); // picks an array of random numbers in range within the number of tracks
    const seedArray = getSeedArray({
      tracks: primaryTRAK,
      indicies: randomTrackIndicies,
      state: true,
    }); // gets an array of ids

    const seeds = seedArray.join();
    const recommendedTracks: any = await getRecommendedTracks(seeds, appToken);

    if (recommendedTracks.success) {
      const primaryTRAK = await handleTranslateRecommendations(
        recommendedTracks.response,
      );

      const primaryTRAKRecommendations = primaryTRAK.filter(
        TRAK => TRAK.player === 'primary',
      );

      setRecommendations(primaryTRAKRecommendations);
    } else alert('needs a rerun');
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
