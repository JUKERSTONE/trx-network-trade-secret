import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useGenerate, useFirebase, useLITELISTState} from '../../app';
import {Keyboard} from 'react-native';

export const useRemote = ({navigation, route, chatURI}: any) => {
  const {handleRetrieveChat, handleSubmitChat} = useFirebase();
  const [chat, setChat] = useState<any>();

  const handleChatText = (text: string) => {
    setChat(text);
  };

  const handleSendChat = () => {
    if (chat != '') {
      Keyboard.dismiss();
      handleSubmitChat({chat, chatURI});
      setChat('');
    }
  };

  return {
    handleChatText,
    handleSendChat,
    chat,
  };
};
