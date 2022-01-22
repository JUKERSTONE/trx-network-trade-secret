import React, {useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body, Caption, Paragraph} from '../typography';

export const WalletView = ({wallet = [], data, handleNavigateTRAK}: any) => {
  const [trak, setTRAK] = useState({});
  console.log('🚀 ~ file: WalletView.tsx ~ line 7 ~ WalletView ~ data', data);
  return (
    <AlphabetList
      data={wallet}
      style={{backgroundColor: '#fff'}}
      indexLetterStyle={{
        color: 'green',
      }}
      renderCustomItem={item => {
        const title = item.value;
        const trak = data.find((element: any) => element.title === title);
        setTRAK(trak);
        return (
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Pressable onPress={handleNavigateTRAK}>
              <View
                style={{
                  margin: 10,
                  backgroundColor: 'green',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    height: 200,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      marginRight: 20,
                      flex: 1,
                    }}>
                    <Image
                      source={{uri: trak.thumbnail}}
                      style={{
                        backgroundColor: '#1B4F26',
                        height: '100%',
                        width: '100%',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginRight: 25,
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxWidth: '60%',
                    }}>
                    <VHeader
                      numberOfLines={1}
                      type="four"
                      color={'#fff'}
                      text={trak.title}
                    />
                    <Body
                      numberOfLines={1}
                      type="one"
                      color={'#cecece'}
                      text={trak.artist}
                      textAlign="right"
                    />
                    <View style={{flexDirection: 'row'}}>
                      <Caption
                        numberOfLines={1}
                        type="two"
                        color={'#cecece'}
                        text={trak.label}
                        textAlign="right"
                      />
                      <Caption
                        numberOfLines={1}
                        type="two"
                        color={'#cecece'}
                        text={' • '}
                        textAlign="right"
                      />
                      <Caption
                        numberOfLines={1}
                        type="two"
                        color={'#cecece'}
                        text={trak.tier}
                        textAlign="right"
                      />
                      {/*  */}
                      {/*  */}
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        );
      }}
      renderCustomSectionHeader={section => {
        return (
          <View
            style={{
              backgroundColor: 'whitesmoke',
              padding: 10,
              borderBottomWidth: 2,
              borderBottomColor: 'green',
              shadowOffset: {
                width: 10,
                height: 5,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowColor: 'green',
            }}>
            <Text style={{fontSize: 25, color: 'green'}}>{section.title}</Text>
          </View>
        );
      }}
    />
  );
};
