import React, {useState} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body, Caption, Paragraph} from '../typography';
import {colors} from '../../core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const WalletTabElement = ({
  wallet = [],
  data,
  handleNavigateTRAK,
  isExchange,
  handleExchange,
  handleNavigateNFT,
  handleTRAKRedeem,
}: any) => {
  return (
    <AlphabetList
      data={wallet}
      indexLetterStyle={{
        color: '#000',
      }}
      renderCustomItem={(item: any) => {
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
            key={key}
            style={{
              justifyContent: 'center',
              marginHorizontal: 13,
              marginVertical: 10,
              backgroundColor: '#1a1a1a',
              borderRadius: 10,
              height: 200,
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
                backgroundColor: '#1a1a1a',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '60%',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: '#1a1a1a',
                  opacity: 0.9,
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
                }}>
                {!isExchange && isNFT ? (
                  <Pressable
                    onPress={() => handleNavigateNFT({trak})}
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
                        ACCESS
                      </Text>
                    </View>
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => handleNavigateTRAK({trak})}
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
                <Pressable
                  onPress={() => handleExchange({trak})}
                  style={{
                    backgroundColor: '#fff',
                    padding: 5,
                    margin: 5,
                    borderRadius: 5,
                  }}>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
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
              </View>
            </View>
          </View>
        );
      }}
      renderCustomSectionHeader={section => {
        return (
          <View
            style={{
              backgroundColor: '#fff',
              padding: 10,
              // borderTopWidth: 2,
              borderBottomWidth: 2,
              borderTopColor: '#cecece',
              borderBottomColor: 'grey',
              shadowOffset: {
                width: 10,
                height: 5,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              shadowColor: 'green',
            }}>
            <Text style={{fontSize: 25, color: '#1d995F'}}>
              {section.title}
            </Text>
          </View>
        );
      }}
    />
  );
};
