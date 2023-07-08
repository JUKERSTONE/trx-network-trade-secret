import React from 'react';
import {
  Button,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Image} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const LandingTRXCategoriesElement = ({data, ...props}: any) => {
  return (
    <FlatList
      horizontal
      // scrollEnabled={false}
      // listKey="TRAK98"
      showsHorizontalScrollIndicator={false}
      style={{backgroundColor: '#1a1a1a', marginTop: 10}}
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => props.navigation.navigate(item.navigationPath)}>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 10,
            }}>
            <Image
              source={{uri: item.image}}
              style={{height: 120, width: 120, borderRadius: 10}}
            />
            <View
              style={{
                marginTop: 5,
                paddingHorizontal: 7,
              }}>
              <VHeader
                numberOfLines={1}
                type="six"
                color={'#fff'}
                text={item.subtitle}
              />
              <VHeader
                numberOfLines={1}
                type="six"
                color={'#fff'}
                text={item.title}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
