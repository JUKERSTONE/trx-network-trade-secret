import React, {FC} from 'react';
import {View, TouchableOpacity, useWindowDimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {VHeader} from '../typography';

export const CollectionsElement = ({data}: any) => {
  const {width, height} = useWindowDimensions();

  const _renderItem = ({item, index}: any) => (
    <View style={{backgroundColor: '#1db954', height: 200, borderRadius: 10}} />
  );

  return (
    <View style={{padding: 10}}>
      <View style={{marginBottom: 10}}>
        <VHeader
          numberOfLines={1}
          type="four"
          color={'#fff'}
          text={'Explore TRAKSTAR collections...'}
        />
      </View>
      <Carousel
        // layout={'stack'}
        layoutCardOffset={30}
        // data={data}
        data={['data', 'fee', 'ferwfer']}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
      />
    </View>
  );
};
