import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, useFirebase, useLITELISTState} from '../../app';

export const useCrypto = ({navigation, route}: any) => {
  const [selectedValue, setSelectedValue] = useState();
  const [isVisible, setIsVisible] = useState(true);

  const currency = [{label: 'stx', value: 'STX'}];

  const options = [
    {
      key: 'kenya',
      label: 'Kenya',
    },
    {
      key: 'uganda',
      label: 'Uganda',
    },
    {
      key: 'libya',
      label: 'Libya',
    },
    {
      key: 'morocco',
      label: 'Morocco',
    },
    {
      key: 'estonia',
      label: 'Estonia',
    },
  ];

  const onCancel = () => setIsVisible(false);
  const onSelect = () => setIsVisible(true);

  return {
    currency,
    selectedValue,
    setSelectedValue,
    options,
    isVisible,
    onSelect,
    onCancel,
  };
};
