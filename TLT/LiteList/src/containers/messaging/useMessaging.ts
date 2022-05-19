import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import {useFirebase} from '../../app';
import {useLITELISTState} from '../../app';
import {useSelector} from 'react-redux';

export const useMessaging = ({navigation, route}: any) => {
  const {handleRetrieveUser} = useFirebase();

  const handleNewChat = (type: 'single' | 'group') => {
    navigation.navigate('MODAL', {
      type: 'chat',
      exchange: {
        active: true,
        item: type,
      },
    });
  };

  const handleChatNavigation = (chatURI: any) => {
    navigation.navigate('CHAT', {
      chatURI,
    });
  };

  return {
    handleNewChat,
    handleChatNavigation,
    // handleGetUser,
  };
};
