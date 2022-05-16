import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {api, useAPI, APIKeys} from '../../api';

export const useUSERSTab = ({navigation, query}: any) => {
  const {useGET} = useAPI();
  const {handleSearchUsers} = useFirebase();
  const [trak, setTRAK] = useState();
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleSearch = async (query: string) => {
    const users = await handleSearchUsers(query);

    setUsers(users);
  };

  const handleUserNavigation = (item: any) => {
    navigation.navigate('MODAL', {
      type: 'user-profile',
      exchange: {
        active: true,
        item,
      },
    });
  };

  return {
    trak,
    users,
    handleUserNavigation,
  };
};
