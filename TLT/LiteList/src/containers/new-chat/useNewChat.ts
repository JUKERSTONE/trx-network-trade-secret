import React, {useEffect, useState, useContext} from 'react';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';

export const useNewChat = ({navigation, route}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;

  const {handleSearchUsers, handleSetChat} = useFirebase();
  const [loading, setLoading] = useState(false);
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
    if (!chat.includes(userId)) {
      setChat([...chat, userId]);
    } else {
      const removedUser = chat.filter(item => item != userId);
      setChat([...removedUser]);
    }
  };

  const handleCreateChat = async (type: string) => {
    setLoading(true);
    const {success, data} = await handleSetChat(chat, type);

    setTimeout(() => {
      switch (success) {
        case true:
          const chatURI = data;
          const action = handleMediaPlayerAction({
            playbackState: 'chat-uri',
            chatURI,
          });
          store.dispatch(action);
          setLoading(false);
          navigation.navigate('CHAT', {chatURI});
          break;
        case false:
          alert(data);
          break;
      }
    }, 1000);
  };

  return {
    users,
    handleCreateChat,
    handleAddUser,
    chat,
    loading,
  };
};
