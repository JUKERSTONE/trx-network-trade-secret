import auth from '@react-native-firebase/auth';
import {
  store,
  setTRXProfile,
  useAsyncStorage,
  asyncStorageIndex,
} from '../../../stores';
import {api, useAPI} from '../../../api';
import firestore from '@react-native-firebase/firestore';
import {useTRAKLISTState} from '../../useTRAKLISTState';

const {handleGetState} = useTRAKLISTState();

const keys = handleGetState({index: 'keys'});
const accessToken = keys.trx.accessToken;

export const handleGetUserProfile = ({userId}: any) => {
  const {useGET} = useAPI();
  let profile: any;
  return firestore()
    .collection('users')
    .where('id', '==', userId)
    .limit(1)
    .get()
    .then((data: any) => {
      let user: any = [];
      data.forEach((doc: any) => {
        user.push(doc.data());
      });
      profile = user[0];
      const user_name = profile.user_name;
      const route = api.bernie({
        method: 'get_user_wallet', //wallet
      });
      const userWallet = useGET({route, token: accessToken});
      return userWallet;
    })
    .then(userWallet => {
      return (profile = {
        ...profile,
        wallet: userWallet.data,
      });
    });
};
