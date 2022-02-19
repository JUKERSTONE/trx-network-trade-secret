import {View, Text, FlatList, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {api, useAPI} from '../../api';
import {VHeader, Body, Caption} from '../typography';

export const ProductView = ({nftID}: any) => {
  console.log(
    '🚀 ~ file: ProductView.tsx ~ line 6 ~ ProductView ~ nftID',
    nftID,
  );
  const [products, setProducts] = useState(null);

  useEffect(() => console.log(products, 'gergiuy'), []);

  const {useGET} = useAPI();

  useEffect(() => {
    const route = api.bernie({method: 'get_nft_merchandise', payload: {nftID}});
    console.log(
      '🚀 ~ file: ProductView.tsx ~ line 12 ~ useEffect ~ route',
      route,
    );

    const response = useGET({route});
    console.log(
      '🚀 ~ file: ProductView.tsx ~ line 22 ~ useEffect ~ response',
      response,
    );

    Promise.resolve(response).then((response: any) => {
      const data = response.data;
      setProducts(data);
    });

    // const test = handleGetProducts(route!);
    // console.log(
    //   '🚀 ~ file: ProductView.tsx ~ line 21 ~ useEffect ~ test',
    //   test,
    // );
  }, []);

  //   const handleGetProducts = async (route: string) => {
  //     console.log(
  //       '🚀 ~ file: ProductView.tsx ~ line 28 ~ handleGetProducts ~ route',
  //       route,
  //     );
  //     const response = await useGET(route);
  //     console.log(
  //       '🚀 ~ file: ProductView.tsx ~ line 33 ~ handleGetProducts ~ response',
  //       response,
  //     );
  //     return response;
  //     //
  //   };

  return (
    <View style={{backgroundColor: 'blue', height: '100%', padding: 10}}>
      <FlatList
        listKey="TRAK"
        data={products}
        renderItem={({item}: any) => (
          <Pressable /*onPress={() => handleExchange({item})}*/>
            <View
              style={{
                backgroundColor: '#1a1a1a',
                padding: 10,
                marginHorizontal: 5,
                borderBottomColor: '#cecece',
                borderRadius: 10,
                marginBottom: 5,
              }}>
              <View
                style={{
                  height: 100,
                  flexDirection: 'row',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    marginRight: 20,
                    flex: 1,
                  }}>
                  <Image
                    source={{uri: item.thumbnail}}
                    style={{
                      backgroundColor: '#1B4F26',
                      height: '100%',
                      width: '100%',
                      borderRadius: 5,
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    maxWidth: '60%',
                  }}>
                  <VHeader
                    numberOfLines={1}
                    type="four"
                    color={'#fff'}
                    text={item.title}
                  />
                  <Body
                    numberOfLines={1}
                    type="one"
                    color={'#fff'}
                    text={item.price}
                    textAlign="right"
                  />
                  <View style={{flexDirection: 'row', marginTop: 3}}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        paddingVertical: 3,
                        paddingHorizontal: 8,
                        borderRadius: 3,
                        marginRight: 5,
                      }}>
                      <Caption
                        numberOfLines={1}
                        type="one"
                        color={'green'}
                        text={'BUY'}
                        textAlign="right"
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: 'green',
                        paddingVertical: 3,
                        paddingHorizontal: 8,
                        borderRadius: 3,
                      }}>
                      <Caption
                        numberOfLines={1}
                        type="one"
                        color={'#fff'}
                        text={'TRX'}
                        textAlign="right"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
