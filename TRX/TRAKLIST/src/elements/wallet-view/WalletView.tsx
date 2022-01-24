import React, {useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body, Caption, Paragraph} from '../typography';

export const WalletView = ({
  wallet = [],
  data,
  handleNavigateTRAK,
  isExchange,
  handleTRAKExchange,
  handleTRAKRedeem,
}: any) => {
  console.log('🚀 ~ file: WalletView.tsx ~ line 7 ~ WalletView ~ data', data);
  return (
    <AlphabetList
      data={wallet}
      style={{backgroundColor: '#fff'}}
      indexLetterStyle={{
        color: 'green',
      }}
      renderCustomItem={item => {
        console.log(
          '🚀 ~ file: WalletView.tsx ~ line 17 ~ WalletView ~ item',
          item,
        );
        const title = item.value;
        const trak = data.find((element: any) => element?.title === title);
        console.log(
          '🚀 ~ file: WalletView.tsx ~ line 23 ~ WalletView ~ trak',
          trak,
        );
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
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      maxWidth: '60%',
                      paddingVertical: 30,
                    }}>
                    <View
                      style={{
                        backgroundColor: '#1a1a1a',
                        padding: 8,
                        borderRadius: 5,
                        opacity: 0.9,
                        width: '100%',
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
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 2,
                          // backgroundColor: 'red',
                          width: '100%',
                          justifyContent: 'flex-end',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: '#fff',
                          }}>
                          {trak.label}
                        </Text>
                        <Caption
                          numberOfLines={1}
                          type="one"
                          color={'#fff'}
                          text={' • '}
                          textAlign="center"
                        />
                        <Text
                          numberOfLines={1}
                          style={{
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            color: '#fff',
                          }}>
                          {trak.tier}
                        </Text>
                        {/*  */}
                        {/*  */}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // width: '100%',
                      }}>
                      <Pressable
                        onPress={() => handleTRAKExchange({trak})}
                        style={{
                          backgroundColor: '#000',
                          padding: 10,
                          margin: 5,
                          borderRadius: 5,
                        }}>
                        <View style={{alignItems: 'center'}}>
                          <Text style={{color: 'green'}}>Exchange</Text>
                        </View>
                      </Pressable>
                      {!isExchange && (
                        <Pressable
                          onPress={() => handleTRAKRedeem({trak})}
                          style={{
                            backgroundColor: '#000',
                            margin: 5,
                            padding: 10,
                            borderRadius: 5,
                          }}>
                          <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{color: 'green'}}>Redeem</Text>
                          </View>
                        </Pressable>
                      )}
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
