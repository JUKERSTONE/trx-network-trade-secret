import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {VHeader, Body, Caption} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProgressBar, Colors} from 'react-native-paper';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';

export const ProductElement = ({
  route: {
    params: {item},
  },
  handlePurchaseProduct,
}: any) => {
  console.log('🚀 ~ file: Product.tsx:11 ~ ProductElement ~ item:', item);
  return (
    <ParallaxScrollView
      backgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={150}
      renderForeground={() => (
        <LinearGradient colors={['#1a1a1a', '#000']}>
          <Carousel
            // layout={'stack'}
            layoutCardOffset={30}
            data={item.images}
            renderItem={({item}: any) => {
              console.log('🚀 ~ file: Product.tsx:55 ~ item:', item);

              return (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    marginTop: 3,
                    borderRadius: 8,
                  }}
                  source={{
                    uri: item,
                  }}
                />
              );
            }}
            sliderWidth={Dimensions.get('screen').width}
            itemWidth={Dimensions.get('screen').width * 0.75}
          />
        </LinearGradient>
      )}>
      <View
        style={{
          backgroundColor: '#1a1a1a',
          height: '100%',
          padding: 10,
        }}>
        <View style={{padding: 4}}>
          <VHeader type="three" color="#cecece" text={item.product} />
          <Caption type="one" color="#cecece" text={item.brand} />
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Caption type="one" color="#cecece" text={`£${item.price}`} />

            <TouchableOpacity onPress={handlePurchaseProduct}>
              <View
                style={{
                  height: 30,
                  width: 100,
                  backgroundColor: 'green',
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#fff'}}>BUY</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{margin: 15}}>
            <Text style={{color: '#fff'}}>{item.description}</Text>
            {/* <Text style={{color: '#fff'}}>{item.sizes}</Text> */}
            {/* <Text style={{color: '#fff'}}>{item.details}</Text> */}
          </View>
        </View>
      </View>
    </ParallaxScrollView>
  );
};
