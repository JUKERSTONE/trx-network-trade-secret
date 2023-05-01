import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {useLITELISTState} from '../..';
import {useSelector} from 'react-redux';
import {useGenerate} from '../../.../../app';

const {handleGetState} = useLITELISTState();

export const useRegen = ({navigation, route}: any) => {
  const {query} = route.params;
  const keys = useSelector((state: any) => state.keys);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(0);
  const [seed, setSeed] = useState<any>([]);

  const {
    handleRecommendations,
    // recommendations,
    progress,
    // handleReload,
  } = useGenerate();

  useEffect(() => {
    handleRegenerate();
  }, []);

  useEffect(() => {
    if (4 - selected === 0) {
      handleTriggerRecommendations();
    }
  }, [seed]);

  const handleTriggerRecommendations = async () => {
    console.log(
      "🚀 ~ file: useRegen.ts:31 ~ handleRecommendations ~ seed.join(','):",
      seed.join(','),
    );
    const recommendations = await axios
      .get(
        'https://api.spotify.com/v1' +
          '/recommendations?limit=15&seed_tracks=' +
          seed.join(','),

        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + keys.spotify.appToken,
          },
        },
      )
      .then(({data: {tracks}}: any) => {
        console.log('🚀 ~ file: useRegen.ts:44 ~ .then ~ tracks:', tracks);
        return tracks;
      })
      .catch((err: any) => {
        console.log('🚀 ~ file: useRegen.ts:46 ~ .then ~ err:', err);
      });
    console.log(
      '🚀 ~ file: useRegen.ts:42 ~ handleRecommendations ~ recommendations:',
      recommendations,
    );
    alert('naviagte back to swipe with recs');
    // await handleRecommendations(true, recommendations);
    // navigation.goBack();/
  };

  const handleRegenerate = async () => {
    const tracks = await axios
      .get(
        'https://api.spotify.com/v1' +
          '/search?query=' +
          query +
          '&type=' +
          'track' +
          '&market=US&offset=0&limit=20',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + keys.spotify.appToken,
          },
        },
      )
      .then(
        ({
          data: {
            tracks: {items},
          },
        }: any) => {
          return items;
        },
      );
    setResults(tracks);
  };

  const handleSelect = ({item}: any) => {
    console.log('🚀 ~ file: useRegen.ts:48 ~ handleSelect ~ item:', item);
    setSeed([...seed, item.id]);
    setSelected(selected => selected + 1);
    //
  };

  return {
    results,
    selected,
    handleSelect,
  };
};
