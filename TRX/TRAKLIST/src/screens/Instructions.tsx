import React from 'react';
import {View, Text, Button} from 'react-native';

export const InstructionsScreen = ({...props}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>Instructions</Text>
      <Button
        onPress={() => props.navigation.navigate('PAYWALL')}
        title="next"
      />
    </View>
  );
};
