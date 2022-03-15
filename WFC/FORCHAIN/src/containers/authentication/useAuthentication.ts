import {useState} from 'react';
import {toggleExchangeView, store} from '../../stores';

export const useAuthentication = ({navigation}: any) => {
  const [phrase, setPhrase] = useState('');
  const handleChangeText = (text: any) => {
    setPhrase(text);
  };

  const handleNavigateForchain = () => {
    alert(phrase);
  };

  return {
    handleChangeText,
    handleNavigateForchain,
  };
};
