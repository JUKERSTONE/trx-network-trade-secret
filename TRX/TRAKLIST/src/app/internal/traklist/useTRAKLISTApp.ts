import React, {useEffect, useState, useContext} from 'react';
import {colors} from '../../../core';

export const useTRAKLISTApp = () => {
  const handleTheme = () => {
    const isDarkMode = false;
    const theme = {
      dark: isDarkMode,
      colors: {
        primary: colors.light.primary,
        background: isDarkMode ? colors.dark.primary : colors.light.primary,
        card: colors.dark.primary,
        text: '#fff',
        border: 'whitesmoke',
        notification: 'purple',
      },
    };
    return theme;
  };
  return {
    handleTheme,
  };
};
