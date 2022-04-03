import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Button,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
// import {VHeader, Body} from '../../elements';

import {styles} from '../screen-wrapper/styles';
import {TokencyPicker, TokencyText} from './internal';

export const NFTRequestsElement = ({
  NFTRequests,
  handleNFTRequest,
  ...props
}: any) => {
  console.log(
    '🚀 ~ file: NFTRequests.tsx ~ line 24 ~ NFTRequests',
    NFTRequests,
  );
  if (NFTRequests == null) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height,
        }}>
        <ActivityIndicator color="blue" size="small" />
      </View>
    );
  } else if (NFTRequests.length == 0) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'whitesmoke',
            padding: 30,
          }}>
          Hey BERNIE!
        </Text>
        <Text style={{color: 'white'}}>Currently no nft requests</Text>
      </SafeAreaView>
    );
  }
  return (
    // <Text>{JSON.stringify(NFTRequests)}</Text>
    <FlatList
      listKey="NFTRequests"
      data={NFTRequests}
      renderItem={({item, index}: any) => {
        return (
          <Pressable
            onPress={() => handleNFTRequest({item})}
            style={{width: '100%'}}>
            <View
              style={{
                margin: 10,
              }}>
              <View
                style={{
                  height: 80,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    justifyContent: 'flex-end',
                    marginRight: 20,
                    // backgroundColor: 'blue',
                    flex: 1,
                  }}>
                  <Image
                    source={{uri: item.cover_art}}
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
                    alignItems: 'flex-end',
                    maxWidth: '60%',
                  }}>
                  {/* <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'#fff'}
                  text={item.title}
                /> */}
                  <Text>{item.title}</Text>
                  <Text>{item.artist}</Text>
                  {/* <Body
                  numberOfLines={1}
                  type="one"
                  color={'#fff'}
                  text={item.artist}
                  textAlign="right"
                /> */}
                </View>
              </View>
            </View>
          </Pressable>
        );
      }}
      keyExtractor={(item, index) => '' + index}
    />
  );
};
