import React, {useEffect, useState, useContext} from 'react';
import {useLITELISTState} from '../../app';
import {useFirebase} from '../../app';

export const useSocial = ({navigation, route}: any) => {
  const {handleAddStory} = useFirebase();

  const data = [
    {
      image: 'user.image',
      user: 'user.meloID',
    },
    {
      imagwe: 'user.image',
      uswer: 'user.meloID',
    },
    {
      imdfage: 'user.image',
      useer: 'user.meloID',
    },
  ];

  const ITEM_WIDTH = 90;
  const ITEM_HEIGHT = 100;
  const STICKY_ITEM_WIDTH = 24;
  const STICKY_ITEM_HEIGHT = 24;
  const STICKY_ITEM_BACKGROUNDS = ['#222', '#000'];
  const SEPARATOR_SIZE = 10;
  const BORDER_RADIUS = 40;

  return {
    data,
    ITEM_WIDTH,
    ITEM_HEIGHT,
    STICKY_ITEM_WIDTH,
    STICKY_ITEM_HEIGHT,
    STICKY_ITEM_BACKGROUNDS,
    SEPARATOR_SIZE,
    BORDER_RADIUS,
    handleAddStory,
  };
};
