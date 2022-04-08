import React from 'react';
import {View, Text} from 'react-native';
import {ListsElement} from '../../elements';
import {useLists} from './useLists';

export const ListsContainer = ({navigation, ...props}: any) => {
  console.log(
    '🚀 ~ file: WalLists.tsx ~ line 7 ~ WalLists ~ navigation',
    navigation,
  );
  const {...useListsProps} = useLists({navigation});
  return <ListsElement {...useListsProps} {...props} />;
};
