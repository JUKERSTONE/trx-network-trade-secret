import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {api, useAPI} from '../../api';
import {
  toggleTRAKRelationshipsView,
  store,
  handleMediaPlayerAction,
} from '../../stores';
import {
  useGenerate,
  useFirebase,
  useLITELISTState,
  handleSearchUsers,
} from '../../app';

export const useCrypto = ({navigation, route}: any) => {
  const [selectedValue, setSelectedValue] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const [recipient, setRecipient] = useState({key: null, label: null});
  const [users, setUsers] = useState([
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
  ]);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    const usersData = await handleSearchUsers('');
    const users = usersData.map((user: any) => {
      return {
        key: user.stacks_public_key,
        label: user.trak_name,
      };
    });
    console.log('🚀 ~ file: useSendCrypto.ts ~ line 33 ~ users ~ users', users);
    setUsers(users);
  };

  const currency = [{label: 'stx', value: 'STX'}];

  const options = users;

  const handleCancel = () => setIsVisible(false);
  const handleChooseRecipient = () => setIsVisible(true);

  const handleSelectReceipient = (picked: any) => {
    setRecipient(picked);
    setIsVisible(false);
  };

  const handleSubmitTransaction = () => {
    alert('Submit Transaction');
  };

  return {
    currency,
    selectedValue,
    setSelectedValue,
    options,
    handleCancel,
    handleChooseRecipient,
    handleSelectReceipient,
    isVisible,
    recipient,
    handleSubmitTransaction,
  };
};
