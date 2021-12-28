import React from 'react';
import {View, Text, useWindowDimensions, ImageBackground} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {VHeader, Paragraph} from '../typography';

export const PayWallElement = ({data}: any) => {
  const {width, height} = useWindowDimensions();

  const _renderItem = ({item, index}: any) => {
    return (
      <ImageBackground
        source={{uri: item.imageURL}}
        resizeMode="cover"
        imageStyle={{
          borderRadius: 15,
        }}
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderRadius: 15,
          justifyContent: 'space-around',
          padding: 20,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            opacity: 0.85,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* header */}
          <VHeader
            numberOfLines={1}
            type="three"
            color={'#fff'}
            text={item.title}
          />
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: '#fff',
            marginVertical: 30,
            borderRadius: 15,
            opacity: 0.7,
          }}>
          {/* body */}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'green',
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <VHeader
            numberOfLines={1}
            type="three"
            color={'#fff'}
            text={`SUBSCRIBE`}
          />
          <Paragraph
            numberOfLines={1}
            type="two"
            color={'#fff'}
            text={'£ ' + item.price + ' / per month'}
          />
        </View>
      </ImageBackground>
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
        // layout={'stack'}
        layoutCardOffset={30}
        data={data}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width * 0.75}
      />
    </View>
  );
};
