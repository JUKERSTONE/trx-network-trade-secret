import React, {useState} from 'react';
import {View, Text, Button, useWindowDimensions} from 'react-native';
import {TabView} from 'react-native-tab-view';

export const TRAKElement = ({routes}: any) => {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Text>wf</Text>
      <TabView
        navigationState={{index, routes}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <View style={{flex: 1, backgroundColor: 'red'}}>
                  <Text>fgw</Text>
                </View>
              );
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
    </View>
  );
};
