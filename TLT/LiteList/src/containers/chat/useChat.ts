import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, useFirebase} from '../../app';

export const useChat = ({navigation, route}: any) => {
  console.log('🚀 ~ file: useChat.ts ~ line 11 ~ useChat ~ route', route);
  const {handleRetrieveChat, handleSubmitChat} = useFirebase();
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
    handleSubmitChat({chat, chatURI});
  };

  return {
    handleChatText,
    handleSendChat,
    chatURI,
  };
};
