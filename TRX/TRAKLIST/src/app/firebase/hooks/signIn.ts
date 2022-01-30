import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';

export const handleSignIn = ({email, password}: any) => {
  const {handleStore} = useAsyncStorage();
  const {useGET} = useAPI();

  return auth()
    .signInWithEmailAndPassword(email, password)
    .then((data: any) => {
      const idToken = data.user.getIdTokenResult();
      return idToken;
    })
    .then((idToken: any) => {
      // get TRX Profile
      firestore()
        .collection('users')
        .where('email_address', '==', email)
        .get()
        .then((data: any) => {
          let user: any[] = [];
          data.forEach((doc: any) => {
            user.push(doc.data());
          });
          return user[0];
        })
        .then(profile => {
          const user_name = profile.user_name;
          const route = api.bernie({
            method: 'get_user_wallet', //wallet
            payload: {
              user_name,
            },
          });
          const userWallet = useGET({route});
          console.log(
            '🚀 ~ file: signIn.ts ~ line 42 ~ .then ~ userWallet',
            userWallet,
          );
          return {profile, userWallet};
        })
        .then(({profile, userWallet}) => {
          Promise.resolve(userWallet).then(response => {
            profile.wallet = response.data;

            const payload = profile;
            const action = setTRXProfile(payload);
            store.dispatch(action);

            const key = asyncStorageIndex.profile;
            handleStore({key, value: payload});
          });
        });
    })
    .catch(err => {
      // @ts-ignore
      alert('error');
      console.error(err.code);
    });
};
