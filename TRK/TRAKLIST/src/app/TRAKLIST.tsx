import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TRAKLISTNavigation} from './internal';
import {useTRAKLIST} from './useTRAKLISTApp';
import auth from '@react-native-firebase/auth';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLIST();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
  console.log("🚀 ~ file: TRAKLIST.tsx ~ line 19 ~ onAuthStateChanged ~ user", user)
    setUser(user);
    switch (user) {
      case null:
        // delete redux data
        break;
      default:
      // handleGetUserProfile(user);
    }
    if (initializing) setInitializing(false);
  };

  if (initializing) return null;

  return <TRAKLISTNavigation handleTheme={handleTheme} user={user} />;
};
