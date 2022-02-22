import {useState, useContext, useEffect} from 'react';

import {useProvider} from '../../../3.stores';

import {
  getRecommendedTracks,
  generate,
  getSeedArray,
  getStack,
} from './handlers';

export const useGenerate = () => {
  const [isUnavailable, setIsUnavailable] = useState(false);
  const [recommendations, setRecommendations] = useState<any>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleRecommendations();
  }, []);

  const {state} = useContext(useProvider);
  const tracks = state.loggedIn
    ? state.user_data.services.spotify.top_tracks
    : state.offline.likes;

  const handleRecommendations = () => {
    const randomTrackIndicies = generate(tracks);
    const seedArray = getSeedArray(tracks, randomTrackIndicies, state.loggedIn);
    console.log(
      '🚀 ~ file: useSwipeStack.ts ~ line 34 ~ handleRecommendations ~ seedArray',
      seedArray,
    );

    let data;
    if (state.user_data.likes?.length !== 0) {
      data = state.user_data?.likes?.filter((like: any) => {
        if (like['type'] === 'track') {
          return like;
        }
      });
    }

    let seedArrayOnline, concat, seeds;
    if (state.loggedIn && data) {
      const randomTrackIndiciesOnline = generate(data);

      seedArrayOnline = getSeedArray(
        data,
        randomTrackIndiciesOnline,
        state.loggedIn,
      ).slice(0, 2);

      concat = seedArray.concat(seedArrayOnline);

      seeds = concat.join();
    } else {
      seeds = seedArray.join();
    }

    const recommendedTracks: any = getRecommendedTracks(seeds, state);

    Promise.resolve(recommendedTracks).then(tracks => {
      const stack: any = tracks.success
        ? getStack(tracks.response, state)
        : handleReload();

      return Promise.resolve(stack).then(response => {
        return setRecommendations([...recommendations, ...response]);
      });
    });
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
