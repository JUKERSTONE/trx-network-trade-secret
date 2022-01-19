import React, {useEffect, useState, useContext} from 'react';
import {useFirebase} from '../../app';

export const useSignIn = () => {
  const {handleSignIn} = useFirebase();
  const [signIn, setSignIn] = useState<any>({
    email: null,
    password: null,
  });

  useEffect(() => {
    console.log(
      '🚀 ~ file: useSignIn.ts ~ line 12 ~ useSignIn ~ signIn',
      signIn,
    );
  }, [signIn]);

  const handleSignInChange = ({text, type}: any) => {
    switch (type) {
      case 'email':
        setSignIn({...signIn, email: text});
        break;
      case 'password':
        setSignIn({...signIn, password: text});
        break;
    }
  };

  const handleSignInEvent = () => {
    const token = handleSignIn({
      email: signIn.email,
      password: signIn.password,
    });
    Promise.resolve(token).then(response => {
      const data: any = response;
      const token = data.token;
      console.log(
        '🚀 ~ file: useSignIn.ts ~ line 36 ~ Promise.resolve ~ data',
        token,
      );
    });
  };
  return {
    handleSignInChange,
    handleSignInEvent,
  };
};
