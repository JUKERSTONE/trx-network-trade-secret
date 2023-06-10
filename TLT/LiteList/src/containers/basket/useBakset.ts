import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import {
  store,
  handleToggleCheckout,
  increaseQuantity,
  decreaseQuantity,
} from '../../stores';
import {useLITELISTState, useFirebase} from '../../app';
import {useAPI} from '../../api';
import {useStripe} from '@stripe/stripe-react-native';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

export const useBasket = ({navigation, route, handleNewSummary}: any) => {
  const {handleGetState} = useLITELISTState();
  const profile = handleGetState({index: 'profile'});
  const TRXProfile = profile.TRX;
  const userId = TRXProfile.id;
  const trakName = TRXProfile.trak_name;
  const {basket} = useSelector((state: any) => state.checkout);

  useEffect(() => {
    handleNewSummary(basket);
  }, [basket]);

  const handleIncreaseQuantity = (item: any) => {
    const action = increaseQuantity(item);
    store.dispatch(action);
  };

  const handleDecreaseQuantity = (item: any) => {
    const action = decreaseQuantity(item);
    store.dispatch(action);
  };

  return {
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  };
};
