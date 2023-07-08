import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {ForYouElement} from '../../elements';
import {useForYou} from './useForYou';
import {ScrollView} from 'react-native-gesture-handler';

export const ForYouContainer = ({
  query,
  navigation,
  modal,
  item,
  ...props
}: any) => {
  const {...useForYouProps} = useForYou({
    query: modal ? `${item.artist} - ${item.title}` : query,
    navigation,
  });
  return (
    <ScrollView>
      <ForYouElement modal={modal} item={item} {...useForYouProps} {...props} />
    </ScrollView>
  );
};
