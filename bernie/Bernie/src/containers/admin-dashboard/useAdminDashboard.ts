import React, {useEffect, useState, useContext} from 'react';

export const useAdminDashboard = ({navigation}: any) => {
  const handleNavigateTrending = () => {
    navigation.navigate('TLT_TRENDING');
  };

  const handleNavigateNews = () => {};

  return {
    handleNavigateTrending,
    handleNavigateNews,
  };
};
