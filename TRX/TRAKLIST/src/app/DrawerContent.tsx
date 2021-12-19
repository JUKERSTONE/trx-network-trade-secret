import React, {useContext} from 'react';
import {SafeAreaView, Dimensions, Pressable} from 'react-native';

import {Drawer} from 'react-native-paper';

export const DrawerContent = ({...props}) => {
  return (
    <SafeAreaView>
      <Drawer.Section title="OPTIONS.">
        <Drawer.Item
          style={{backgroundColor: '#fff'}}
          //   icon={({color}) => (
          //     <MaterialIcons name="swipe" color={color} size={20} />
          //   )}
          label="swipe"
          //   onPress={() => {
          //     navigation.navigate('MainTab', {screen: 'SWIPE'});
          //   }}
        />
      </Drawer.Section>
    </SafeAreaView>
  );
};

export default DrawerContent;
