import React, {FC} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  Text,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {VHeader, BHeader, Body, Caption} from '../typography';
import {TrendingCard} from '../trending-card/TrendingCard';
import {TRAKCard} from '../trak-card/TRAKCard';

export const RegenElement = ({results, selected, handleSelect}: any) => {
  console.log('🚀 ~ file: Regen.tsx:10 ~ RegenElement ~ results:', results);
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', margin: 20}}>
        <VHeader
          numberOfLines={1}
          type="four"
          color={'#fff'}
          text={`Please select ${4 - selected} more tracks`}
        />
      </View>
      <FlatList
        style={{flex: 1}}
        data={results}
        renderItem={({item, index}: any) => {
          console.log('🚀 ~ file: Regen.tsx:28 ~ RegenElement ~ item:', item);
          return (
            <TouchableOpacity onPress={() => handleSelect({item})}>
              <TRAKCard
                rank={++index}
                artwork={item.album.images[0].url}
                title={item.name}
                artist={item.artists[0].name}
                status={'falling'}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
