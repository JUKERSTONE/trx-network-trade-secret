import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  useLITELISTState,
  handleAppendTRAKLIST,
  useEffectAsync,
  handleGetTRX01,
} from '../../app';

export const useLandingTRX01 = ({navigation, route}: any) => {
  const [trx01, setTRX01] = useState([]);
  const [mappedtrx001, setMappedtrx001] = useState<any>(null);

  useEffect(() => {
    const mappedtrx001 = trx01.map((trak: any) => ({
      uri: trak.coverArtUrl,
      captionTop: trak.title,
      captionBottom: trak.bots.artist,
    }));
    setMappedtrx001(mappedtrx001);
  }, [trx01]);

  useEffectAsync(async () => {
    const trx01 = await handleGetTRX01();
    console.log(
      '🚀 ~ file: useLandingTRX01.ts:15 ~ useEffectAsync ~ trx01:',
      trx01,
    );
    setTRX01(trx01);
  }, []);

  return {
    data: mappedtrx001,
  };
};
