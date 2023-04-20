import React, {useEffect, useState, useContext} from 'react';

export const useAdminDashboard = ({navigation}: any) => {
  const handleNavigateTrending = () => {
    navigation.navigate('TLT_TRENDING');
  };

  const handleNavigateNews = () => {
    navigation.navigate('TLT_NEWS');
  };

  const handleNavigateOriginalRanker = () => {
    navigation.navigate('OG_RANKER');
  };

  return {
    handleNavigateTrending,
    handleNavigateNews,
    handleNavigateOriginalRanker,
  };
};
