import React, {useEffect, useState, useContext} from 'react';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import {Platform} from 'react-native';
import {routes, useAPI} from '../../api';
import {useBERNIEState} from '../../app';

const {handleGetState} = useBERNIEState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

const {POST, GET} = useAPI();

export const useTLTTrending = () => {
  const [trending, setTrending] = useState<any>(null);
  const [card1, setCard1] = useState<any>({
    rank: 1,
    artist: null,
    title: null,
    image: null,
    status: 'null',
  });
  const [card2, setCard2] = useState<any>({
    rank: 2,
    artist: null,
    title: null,
    image: null,
    status: 'null',
  });
  const [card3, setCard3] = useState<any>({
    rank: 3,
    artist: null,
    title: null,
    image: null,
    status: 'null',
  });

  useEffect(() => {
    handleGetTrends();
  }, []);

  const handleGetTrends = async () => {
    const route = routes.bernie({method: 'trending'});
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 44 ~ handleGetTrends ~ route',
      route,
    );
    const trending: any = await GET({
      route,
    });
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 50 ~ handleGetTrends ~ trending',
      trending,
    );

    const trends = trending.data;

    setTrending(trends);
  };

  const handleCard1 = ({name, text}: any) => {
    switch (name) {
      case 'artist':
        setCard1({...card1, [name]: text});
        break;
      case 'title':
        setCard1({...card1, [name]: text});
        break;
      case 'status':
        setCard1({...card1, [name]: text});
        break;
      case 'image':
        setCard1({...card1, [name]: text});
        break;
      default:
        break;
    }
  };

  const handleCard2 = ({name, text}: any) => {
    switch (name) {
      case 'artist':
        setCard2({...card2, [name]: text});
        break;
      case 'title':
        setCard2({...card2, [name]: text});
        break;
      case 'status':
        setCard2({...card2, [name]: text});
      case 'image':
        setCard2({...card2, [name]: text});
        break;
    }
  };

  const handleCard3 = ({name, text}: any) => {
    switch (name) {
      case 'artist':
        setCard3({...card3, [name]: text});
        break;
      case 'title':
        setCard3({...card3, [name]: text});
        break;
      case 'status':
        setCard3({...card3, [name]: text});
      case 'image':
        setCard3({...card2, [name]: text});
        break;
    }
  };

  const handleSubmit = async () => {
    const data = {
      one: card1,
      two: card2,
      three: card3,
    };
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 283 ~ handleSubmit ~ data',
      data,
    );

    const route = routes.bernie({method: 'trending'});

    const requests = await POST({
      route,
      token: accessToken,
      tokenType: 'Bearer',
      body: {
        one: card1,
        two: card2,
        three: card3,
      },
      ContentType: 'application/json',
    });
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 296 ~ handleSubmit ~ data',
      data,
    );
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 265 ~ handleSubmit ~ requests',
      requests,
    );
  };

  return {
    card1,
    card2,
    card3,
    handleCard1,
    handleCard2,
    handleCard3,
    handleSubmit,
    trending,
  };
};
