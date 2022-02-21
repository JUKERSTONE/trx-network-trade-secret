import React, {useEffect, useState} from 'react';
import {TRAKLIST} from './internal';
import {useTRAKLISTApp} from '.';
import {store, setFirebaseProfile, setTRXProfile} from '../stores';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useFirebase} from './firebase';

export const TRAKLISTApp = () => {
  const {handleTheme} = useTRAKLISTApp();
  const {handleGetUserProfile} = useFirebase();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    // auth().signOut();

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);

    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        const payload = user._user;
        const userId = payload.uid;
        const profile = await handleGetUserProfile({
          userId,
        });
        const TRXaction = setTRXProfile(profile);
        store.dispatch(TRXaction);
        const FBaction = setFirebaseProfile(payload);
        store.dispatch(FBaction);
    }
    if (initializing) setInitializing(false);
  };

  if (initializing) return null;
  return (
    <Provider store={store}>
      <TRAKLIST handleTheme={handleTheme} user={user} />
    </Provider>
  );
};
