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
    // <FlatList
    //   horizontal
    //   // scrollEnabled={false}
    //   // listKey="TRAK98"
    //   showsHorizontalScrollIndicator={false}
    //   style={{backgroundColor: '#1a1a1a', marginVertical: 10}}
    //   contentContainerStyle={{
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flex: 1,
    //   }}
    //   data={data}
    //   renderItem={({item}) => (
    //     <TouchableOpacity
    //       onPress={() =>
    //         item.title !== 'TRX-00'
    //           ? props.navigation.navigate(item.navigationPath)
    //           : alert('available on the next release!')
    //       }>
    //       <View
    //         style={{
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           marginBottom: 5,
    //         }}>
    //         <VHeader
    //           numberOfLines={1}
    //           type="six"
    //           color={'#ff8e98'}
    //           text={item.subtitle}
    //         />
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'column',
    //           marginHorizontal: 10,
    //           alignItems: 'center',
    //         }}>
    //         <Image
    //           source={{uri: item.image}}
    //           style={{
    //             height: 30,
    //             width: 100,
    //             borderRadius: 5,
    //             backgroundColor: '#ff8e98',
    //           }}
    //         />
    //       </View>
    //     </TouchableOpacity>
    //   )}
    // />

    <Image
      style={{
        width: '100%',
        height: 60,
      }}
      source={require('../../core/poster_mark_black.png')}
    />
  );
};
