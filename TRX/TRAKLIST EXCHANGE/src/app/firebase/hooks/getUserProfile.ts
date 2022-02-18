import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';

export const handleGetUserProfile = ({userId}: any) => {
  const {useGET} = useAPI();
  let profile: any;
  return firestore()
    .collection('users')
    .where('id', '==', userId)
    .limit(1)
    .get()
    .then((data: any) => {
      console.log(
        '🚀 ~ file: getUserProfile.ts ~ line 18 ~ .then ~ data',
        data,
      );
      let user: any = [];
      data.forEach((doc: any) => {
        user.push(doc.data());
      });
      profile = user[0];
      const user_name = profile.user_name;
      const route = api.bernie({
        method: 'get_user_wallet', //wallet
        payload: {
          user_name,
        },
      });
      const userWallet = useGET({route});
      return userWallet;
    })
    .then(userWallet => {
      return (profile = {
        ...profile,
        wallet: userWallet.data,
      });
    });
};
