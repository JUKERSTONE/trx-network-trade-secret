import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
} from 'react-native';

export const SeedElement = ({
  navigation,
  handleSearchQuery,
  searchResult,
}: any) => {
  const {width, height} = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <View>
      <Text>Seed</Text>
      <View>
        <TextInput
          autoCorrect={false}
          style={{backgroundColor: 'red', padding: 20}}
          onChangeText={handleSearchQuery}
        />
      </View>
      <View>
        <FlatList
          data={searchResult}
          renderItem={({item}) => (
            <View>
              <Text>{item.name}</Text>
              {/*  */}
              {/*  */}
              {/*  */}
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <Button title="next" onPress={() => navigation.navigate('PAYWALL')} />
    </View>
  );
};
