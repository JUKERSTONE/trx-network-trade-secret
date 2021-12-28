import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

export const PayWallElement = ({data}: any) => {
  const {width, height} = useWindowDimensions();

  const _renderItem = ({item, index}: any) => {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text /*style={styles.title}*/>{item.title}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
      }}>
      <Carousel
        data={data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
      />
    </View>
  );
};
