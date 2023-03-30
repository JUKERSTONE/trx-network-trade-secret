import {useContext, useState, useEffect} from 'react';
import {Linking} from 'react-native';
import axios from 'axios';
import {api, useAPI} from '../../api';
import {handleTrending} from '../../app';

export const useLandingNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    handleGetNews();
  }, []);

  const handleGetNews = async () => {
    const trending = await handleTrending();
    setNews(trending.news);
  };

  const handleShareNews = (item: any) => {
    alert('share news');
  };

  return {
    news,
    handleShareNews,
    // share,
  };
};
