import React, {useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';
import {RegisterConnectTabElement} from '../register-content-tab';

const {width, height} = useWindowDimensions();

export const RegisterElement = ({routes}: any) => {
  const [index, setIndex] = useState(0);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={({route}) => {
        switch (route.key) {
          case 'first':
            return <RegisterConnectTabElement />;
          case 'second':
            return <View />;
          case 'third':
            return <View />;
          default:
            return <View />;
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{width, height}}
    />
  );
};
