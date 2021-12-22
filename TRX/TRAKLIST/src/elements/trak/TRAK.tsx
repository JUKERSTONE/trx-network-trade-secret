import React, {useState} from 'react';
import {View, Text, Button, useWindowDimensions} from 'react-native';
export const TRAKElement = ({routes}: any) => {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Text>wf</Text>
    </View>
  );
};
