import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {VHeader, Body, Caption} from '../typography';
import Entypo from 'react-native-vector-icons/Entypo';
import {ProgressBar, Colors, ActivityIndicator} from 'react-native-paper';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import Fontisto from 'react-native-vector-icons/Fontisto';

export const ProductElement = ({
  route: {
    params: {item},
  },
  handlePurchaseProduct,
  handleNavigateBakset,
  handleUpdateBasket,
}: any) => {
  const [imagesInit, setImagesInit] = useState(false);
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  console.log('🚀 ~ file: Product.tsx:11 ~ ProductElement ~ item:', item);

  useEffect(() => {
    setTimeout(() => {
      setImagesInit(true);
    }, 1000);
  });

  return (
    <ParallaxScrollView
      backgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={300}
      stickyHeaderHeight={150}
      renderForeground={() => (
        <View>
          {imagesInit ? (
            <Carousel
              // layout={'stack'}
              // layoutCardOffset={30}
              data={item.images}
              renderItem={({item}: any) => {
                console.log('🚀 ~ file: Product.tsx:55 ~ item:', item);

                return (
                  <Image
                    style={{
                      height: 250,
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
          ) : (
            <View
              style={{
                height: 250,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color="primary" />
            </View>
          )}
        </View>
      )}>
      <View style={{margin: 15}}>
        <View style={{marginBottom: 10}}>
          <VHeader type="three" color="#232323" text={item.product} />
          <Caption type="one" color="#cecece" text={item.brand} />
        </View>

        <Text style={{color: '#1a1a1a', marginBottom: 5}}>
          {item.price + ' GBP'}
        </Text>
        <Text style={{color: '#1a1a1a'}}>{item.description}</Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          {item.sizes.map((size: any) => (
            <TouchableOpacity onPress={() => setSelectedSize(size)}>
              <View
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: selectedSize === size ? 'green' : '#232323',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 5,
                  borderRadius: 10,
                }}>
                <Text style={{color: '#ffff'}}>{size}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() =>
              handleUpdateBasket({
                thumbnail: item.images[0],
                product: item.product,
                brand: item.brand,
                size: selectedSize,
                price: item.price,
                quantity: 1,
              })
            }
            style={{
              width: 80,
              height: '100%',
              backgroundColor: '#cecece',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderRadius: 15,
              padding: 5,
            }}>
            <View style={{marginRight: 5}}>
              <VHeader type="four" color="#1a1a1a" text={'ADD'} />
            </View>
            <VHeader type="three" color="#1a1a1a" text={'+'} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            style={{
              height: 60,
              // width: '100%',
              flex: 1,
              backgroundColor: 'green',
              margin: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
            }}
            onPress={handlePurchaseProduct}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Entypo name="shopping-basket" size={35} color={'#fff'} />
            </View>
            <View style={{flex: 2, paddingLeft: 15}}>
              <VHeader type="four" color="#fff" text={'Purchase now!'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: 60,
              flex: 1,
              backgroundColor: 'green',
              margin: 10,
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 10,
            }}
            onPress={handleNavigateBakset}>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Entypo name="shopping-basket" size={35} color={'#fff'} />
            </View>
            <View style={{flex: 2, paddingLeft: 15}}>
              <VHeader type="four" color="#fff" text={'Go to Checkout!'} />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={Object.keys(item.details)}
            renderItem={obj => {
              console.log('🚀 ~ file: Product.tsx:140 ~ detail:', obj.item);

              return (
                <View style={{padding: 5}}>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#1a1a1a',
                      padding: 8,
                      borderRadius: 7,
                    }}>
                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                      {obj.item}
                    </Text>
                  </View>
                  <View style={{flex: 2, marginTop: 10}}>
                    <Text
                      style={{
                        color: '#232323',
                        textAlign: 'right',
                        fontWeight: 'bold',
                      }}>
                      {item.details[obj.item]}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
};
