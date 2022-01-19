import auth from '@react-native-firebase/auth';
import {store, setTRXProfile} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';

export const handleSignIn = ({email, password}: any) => {
  return auth()
    .signInWithEmailAndPassword(email, password)
    .then((data: any) => {
      const idToken = data.user.getIdTokenResult();
      return idToken;
    })
    .then((idToken: any) => {
      // request user trak from bernie
    })
    .then((idToken: any) => {
      // request user like from trx
    })
    .then((idToken: any) => {
      // get TRX Profile
      firestore()
        .collection('users')
        .where('email_address', '==', email)
        .get()
        .then((data: any) => {
          console.log('🚀 ~ file: signIn.ts ~ line 20 ~ .then ~ data', data);
          let user: any[] = [];
          data.forEach((doc: any) => {
            user.push(doc.data());
          });
          console.log('🚀 ~ file: signIn.ts ~ line 21 ~ .then ~ user', user[0]);
          return user[0];
        })
        .then(profile => {
          const payload = profile;
          console.log(
            '🚀 ~ file: TRAKLIST.tsx ~ line 39 ~ onAuthStateChanged ~ payload',
            payload,
          );
          const action = setTRXProfile(payload);
          store.dispatch(action);
        });
    })
    .catch(err => {
      // @ts-ignore
      alert('error');
      console.error(err.code);
    });
};
