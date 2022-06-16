import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, useFirebase, useLITELISTState} from '../../app';

export const useChat = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  console.log('🚀 ~ file: useChat.ts ~ line 11 ~ useChat ~ route', route);
  const {handleRetrieveChat, handleSubmitChat, handleRetrieveUser} =
    useFirebase();
  const [chat, setChat] = useState<any>();
  const [chatHistory, setChatHistory] = useState<any>();

  const {
    params: {chatURI},
  } = route;

  console.log('🚀 ~ file: useChat.ts ~ line 20 ~ useChat ~ chatURI', chatURI);
  const handleChatText = (text: string) => {
    setChat(text);
  };

  const handleSendChat = () => {
    if (chat != '') {
      handleSubmitChat({chat, chatURI});
      setChat('');
    }
  };

  const handleAvatarPress = async (id: string) => {
    const userProfile = await handleRetrieveUser(id);
    navigation.navigate('MODAL', {
      type: 'profile',
      exchange: {
        active: true,
        item: userProfile,
      },
    });
  };

  return {
    handleChatText,
    handleSendChat,
    chatURI,
    chat,
    userId,
    handleAvatarPress,
  };
};
