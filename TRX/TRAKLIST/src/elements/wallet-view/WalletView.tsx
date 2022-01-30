import React, {useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body, Caption, Paragraph} from '../typography';
import {colors} from '../../core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const WalletView = ({
  wallet = [],
  data,
  handleNavigateTRAK,
  isExchange,
  handleExchange,
  handleTRAKRedeem,
}: any) => {
  console.log('🚀 ~ file: WalletView.tsx ~ line 7 ~ WalletView ~ data', data);
  return (
    <AlphabetList
      data={wallet}
      indexLetterStyle={{
        color: 'green',
      }}
      renderCustomItem={(item: any) => {
        console.log('🚀 ~ file: WalletView.tsx ~ line 22 ~ item', item);
        const isNFT = 'NFT' === item.key.split(':')[0];
        const key = item.key;
        const trak = data.find((element: any) => {
          if (isNFT) {
            return element?.nftURI === key;
          }
          return element?.trakURI === key;
        });
        return (
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Pressable onPress={handleNavigateTRAK}>
              <View
                style={{
                  marginHorizontal: 13,
                  marginTop: 10,
                  backgroundColor: '#1a1a1a',
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
                      source={{
                        uri: isNFT ? trak.nft.trakIMAGE : trak?.thumbnail,
                      }}
                      style={{
                        backgroundColor: '#1B4F26',
                        height: '100%',
                        width: '100%',
                        borderBottomLeftRadius: 10,
                        borderTopLeftRadius: 10,
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
                        text={isNFT ? trak.nft.trakTITLE : trak?.title}
                      />
                      <Body
                        numberOfLines={1}
                        type="one"
                        color={'#cecece'}
                        text={isNFT ? trak.nft.trakARTIST : trak?.artist}
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
                          {isNFT ? 'NFT' : trak?.label}
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
                          {isNFT ? `${trak.nft.trakIPO} TRX` : trak?.tier}
                        </Text>
                        {/*  */}
                        {/*  */}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        // backgroundColor: 'red',
                        // width: '100%',
                      }}>
                      <Pressable
                        onPress={() => handleExchange({trak})}
                        style={{
                          backgroundColor: '#fff',
                          padding: 5,
                          margin: 5,
                          borderRadius: 5,
                        }}>
                        <View
                          style={{alignItems: 'center', flexDirection: 'row'}}>
                          <MaterialCommunityIcons
                            name={'swap-horizontal'}
                            size={25}
                            color={'green'}
                            style={{
                              opacity: 0.9,
                              paddingTop: 0,
                              marginRight: 5,
                            }}
                          />
                          <Text style={{color: 'green', fontWeight: 'bold'}}>
                            EXCHANGE
                          </Text>
                        </View>
                      </Pressable>
                      {!isExchange && (
                        <Pressable
                          onPress={() => handleTRAKRedeem({trak})}
                          style={{
                            backgroundColor: '#fff',
                            margin: 5,
                            padding: 5,
                            borderRadius: 5,
                          }}>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            {/* swap-horizontal */}
                            <MaterialIcons
                              name={'redeem'}
                              size={20}
                              color={'green'}
                              style={{
                                opacity: 0.9,
                                paddingTop: 0,
                                marginRight: 5,
                              }}
                            />
                            <Text style={{color: 'green', fontWeight: 'bold'}}>
                              REDEEM
                            </Text>
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
              backgroundColor: '#1d995F',
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
            <Text style={{fontSize: 25, color: '#fff'}}>{section.title}</Text>
          </View>
        );
      }}
    />
  );
};
