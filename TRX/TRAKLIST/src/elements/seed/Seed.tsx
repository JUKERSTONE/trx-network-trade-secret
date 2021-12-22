import React, {useState} from 'react';
import {View, Text, Button, useWindowDimensions, TextInput} from 'react-native';

export const SeedElement = ({navigation, result, handleSearch}: any) => {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Text>Seed</Text>
      <View>
        <TextInput
          style={{backgroundColor: 'red', padding: 20}}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <Text>{result}</Text>
      </View>
      <Button title="next" onPress={() => navigation.navigate('PAYWALL')} />
    </View>
  );
};
