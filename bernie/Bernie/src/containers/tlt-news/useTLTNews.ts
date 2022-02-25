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

export const useTLTNews = () => {
  const [news, setNews] = useState<any>(null);
  const [card1, setCard1] = useState<any>({
    rank: 1,
    header: null,
    subHeader: null,
    url: null,
    image: null,
  });
  const [card2, setCard2] = useState<any>({
    rank: 2,
    header: null,
    subHeader: null,
    url: null,
    image: null,
  });
  const [card3, setCard3] = useState<any>({
    rank: 3,
    header: null,
    subHeader: null,
    url: null,
    image: null,
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

    setNews(trends);
  };

  const handleCard1 = ({name, text}: any) => {
    switch (name) {
      case 'header':
        setCard1({...card1, [name]: text});
        break;
      case 'subHeader':
        setCard1({...card1, [name]: text});
        break;
      case 'image':
        setCard1({...card1, [name]: text});
        break;
      case 'url':
        setCard1({...card1, [name]: text});
        break;
      default:
        break;
    }
  };

  const handleCard2 = ({name, text}: any) => {
    switch (name) {
      case 'header':
        setCard2({...card2, [name]: text});
        break;
      case 'subHeader':
        setCard2({...card2, [name]: text});
        break;
      case 'image':
        setCard2({...card2, [name]: text});
        break;
      case 'url':
        setCard2({...card2, [name]: text});
        break;
      default:
        break;
    }
  };

  const handleCard3 = ({name, text}: any) => {
    switch (name) {
      case 'header':
        setCard3({...card3, [name]: text});
        break;
      case 'subHeader':
        setCard3({...card3, [name]: text});
        break;
      case 'image':
        setCard3({...card3, [name]: text});
        break;
      case 'url':
        setCard3({...card3, [name]: text});
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const data = [card1, card2, card3];
    console.log(
      '🚀 ~ file: useTLTTrending.ts ~ line 283 ~ handleSubmit ~ data',
      data,
    );

    const route = routes.bernie({method: 'news'});

    const requests = await POST({
      route,
      token: accessToken,
      tokenType: 'Bearer',
      body: data,
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
    news,
  };
};
