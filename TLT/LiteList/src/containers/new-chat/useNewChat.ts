import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {toggleTRAKRelationshipsView, store} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';

export const useNewChat = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const {handleSearchUsers, handleSetChat} = useFirebase();
  const [users, setUsers] = useState<any>([]);
  const [chat, setChat] = useState<string[]>([userId]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const users = await handleSearchUsers('query');
    setUsers(users);
  };

  const handleAddUser = (userId: string) => {
    setChat([...chat, userId]);
  };

  const handleCreateChat = async (type: string) => {
    const chatURI = await handleSetChat(chat, type);
    console.log(
      '🚀 ~ file: useNewChat.ts ~ line 31 ~ handleCreateChat ~ chatURI',
      chatURI,
    );
    navigation.navigate('CHAT', {chatURI});
  };

  return {
    users,
    handleCreateChat,
    handleAddUser,
  };
};
