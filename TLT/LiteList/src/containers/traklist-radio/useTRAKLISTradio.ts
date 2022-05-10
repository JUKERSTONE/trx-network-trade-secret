import {toggleExchangeView, store, setAuthentication} from '../../stores';
import {useLITELISTState} from '../../app';
import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';

export const useTRAKLISTradio = ({navigation}: any) => {
  const {handleGetState} = useLITELISTState();

  useEffect(() => {
    const {mode, paused, muted, repeat, source, image, title, artist} =
      handleGetState({index: 'player'});
    console.log(
      '🚀 ~ file: TraklistRadio.tsx ~ line 9 ~ TRAKLISTradio ~ mode, paused, muted, repeat, source, image, title, artis',
      mode,
      paused,
      muted,
      repeat,
      source,
      image,
      title,
      artist,
    );
  }, []);

  return {
    // handleDeposit,
    // handleGoBack,
    // isLoggedIn,
    // handleAuthentication,
  };
};
