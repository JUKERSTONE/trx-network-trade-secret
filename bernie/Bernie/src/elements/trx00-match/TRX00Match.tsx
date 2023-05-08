import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
// import {VHeader, Body} from '../../elements';

export const TRX00MatchElement = ({previews, handleMatch, ...props}: any) => {
  return (
    <FlatList
      data={previews}
      style={{height: 200}}
      // numColumns={3}
      renderItem={({item, index}: any) => {
        console.log('🚀 ~ file: Profile.tsx ~ line 251 ~ item', item);
        const type = item.info;
        return (
          <TouchableOpacity
            style={{margin: 5}}
            onPress={() => handleMatch({reference: item})}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <Image
                  source={{uri: item.cover_art}}
                  style={{height: 100, width: 100, marginRight: 20}}
                />
              </View>
              <View>
                <Text>{item.title}</Text>
                <Text>{item.artist}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => '' + index}
    />
  );
};
