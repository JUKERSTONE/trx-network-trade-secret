import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
export const PaywallScreen = () => {
  const {width, height} = useWindowDimensions();
  const _renderItem = ({item, index}: any) => {
    return (
      <View style={{backgroundColor: 'red', flex: 1}}>
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
        backgroundColor: 'blue',
      }}>
      <Carousel
        data={[
          {title: 'free'},
          {title: 'basic'},
          {title: 'pro'},
          {title: 'musichead'},
        ]}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
      />
    </View>
  );
};
