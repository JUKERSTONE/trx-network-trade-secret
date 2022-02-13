import {SafeAreaView, Text, Button} from 'react-native';
import React from 'react';

export const TRXDistributionScreen = ({...props}) => {
  return (
    <SafeAreaView>
      <Button
        title="redeem"
        onPress={() => props.navigation.navigate('REDEEM')}
      />
      <Button title="mint" onPress={() => props.navigation.navigate('MINT')} />
    </SafeAreaView>
  );
};
