import auth from '@react-native-firebase/auth';
import {store} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';

const {useGET} = useAPI();

export const handleRegister = ({TRXProfile}: any) => {
  console.log(
    '🚀 ~ file: register.ts ~ line 6 ~ handleRegister ~ TRXProfile',
    TRXProfile,
  );

  const {
    email_address,
    isAuthenticatedSpotify,
    location,
    password,
    phone_number,
    quotable,
    subscription,
    trak_name,
    trak_symbol,
    user_name,
  } = TRXProfile;

  return auth()
    .createUserWithEmailAndPassword(email_address, password)
    .then(data => {
      const id = data.user.uid;
      console.log('User account created & signed in!', email_address, password);

      return firestore()
        .collection('users')
        .add({
          id,
          email_address,
          isAuthenticatedSpotify,
          location,
          password,
          phone_number,
          quotable,
          subscription,
          trak_name,
          trak_symbol,
          user_name,
        })
        .then(() => {
          const route = api.bernie({
            method: 'raffle',
            payload: {
              subscription,
              user_name,
            },
          });
          const response = useGET({route});
          console.log(
            '🚀 ~ file: register.ts ~ line 58 ~ .then ~ response',
            response,
          );
          console.log('User added!');
        });
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        return 'That email address is already in use!';
      }

      if (error.code === 'auth/invalid-email') {
        return 'That email address is invalid!';
      }

      console.error(error);
    });
};
