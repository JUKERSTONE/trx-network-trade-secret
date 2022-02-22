import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  store,
  setFirebaseProfile,
  asyncStorageIndex,
  useAsyncStorage,
  setTRXProfile,
  storeKeysTRX,
} from '../stores';
import {Provider} from 'react-redux';
import {T4AView, T4A} from './internal';
import auth from '@react-native-firebase/auth';
import {useT4AApp} from '.';
import firestore from '@react-native-firebase/firestore';

export const T4AApp = () => {
  const {handleTheme} = useT4AApp();
  const {handleGet} = useAsyncStorage();
  const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = async (user: any) => {
    setUser(user);
    console.log(
      '🚀 ~ file: T4A.tsx ~ line 52 ~ onAuthStateChanged ~ user',
      user,
    );
    const email = user._user.email;
    console.log(
      '🚀 ~ file: T4A.tsx ~ line 59 ~ onAuthStateChanged ~ email',
      email,
    );
    switch (user) {
      case null:
        // delete redux data
        break;
      default:
        firestore()
          .collection('users')
          .where('email_address', '==', email)
          .get()
          .then((data: any) => {
            console.log('🚀 ~ file: T4A.tsx ~ line 73 ~ .then ~ data', data);
            let user: any[] = [];
            data.forEach((doc: any) => {
              user.push(doc.data());
              console.log(
                '🚀 ~ file: T4A.tsx ~ line 76 ~ data.forEach ~ doc.data()',
                doc.data(),
              );
            });
            return user[0];
          })

          .then(profile => {
            console.log(
              '🚀 ~ file: T4A.tsx ~ line 81 ~ onAuthStateChanged ~ profile',
              profile,
            );
            const payload = profile;

            const action = setTRXProfile(payload);
            store.dispatch(action);
            const action_2 = storeKeysTRX(idToken.token);
            store.dispatch(action_2);
            // const key = asyncStorageIndex.profile;
            // handleStore({key, value: payload});
          });

        const idToken = await auth()
          .currentUser?.getIdToken(true)
          .then((token: any) => token);
        const payload = user._user;

        const action = setFirebaseProfile(payload);
        store.dispatch(action);

        const action_2 = storeKeysTRX(idToken);
        store.dispatch(action_2);
    }
    if (initializing) setInitializing(false);
  };

  return (
    <Provider store={store}>
      <T4AView isDarkMode={isDarkMode}>
        <T4A handleTheme={handleTheme} user={user} />
      </T4AView>
    </Provider>
  );
};
