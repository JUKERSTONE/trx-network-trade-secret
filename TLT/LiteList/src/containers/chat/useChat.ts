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
  const trakName = TRXProfile.trak_name;

  console.log('🚀 ~ file: useChat.ts ~ line 11 ~ useChat ~ route', route);
  const {handleRetrieveChat, handleSubmitChat, handleRetrieveUser} =
    useFirebase();
  const [chat, setChat] = useState<any>();
  const [chatHistory, setChatHistory] = useState<any>();

  const {
    params: {chatURI},
  } = route;

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
    const isMe = id === userId;

    const userProfile = await handleRetrieveUser(id);
    switch (isMe) {
      case false:
        navigation.navigate('MODAL', {
          type: 'user-profile',
          exchange: {
            active: true,
            item: userProfile,
          },
        });
        break;
      default:
        navigation.navigate('MODAL', {
          type: 'profile',
          exchange: {
            active: true,
            item: userProfile,
          },
        });
    }
  };

  return {
    handleChatText,
    handleSendChat,
    chatURI,
    chat,
    userId,
    handleAvatarPress,
    trakName,
  };
};
