import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  useWindowDimensions,
  TextInput,
  FlatList,
  Pressable,
  Image,
  SafeAreaView,
} from 'react-native';

import {VHeader, Body, LandingHeader} from '..';

export const NewChatElement = ({
  item,
  handleUserNavigation,
  users,
  handleAddUser,
  handleCreateChat,
}: any) => {
  return (
    <View style={{alignItems: 'center', flex: 1}}>
      <SafeAreaView>
        <View
          style={{
            borderWidth: 3,
            borderColor: 'transparent',
            borderRadius: 11,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              width: 327,
              borderRadius: 8,
              borderWidth: 1,
              // borderColor: props.borders.inner,
              backgroundColor: 'whitesmoke',
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  // color: props.labelColor,
                  paddingLeft: 16,
                  // marginBottom: 8,
                  paddingTop: 15,
                  marginTop: 10,
                }}>
                <VHeader type="five" color={'grey'} text={'search'} />
              </View>
              <TextInput
                style={{
                  // color: props.color,
                  fontSize: 14,
                  fontWeight: '500',
                  paddingLeft: 16,
                  paddingBottom: 20,
                }}
                // onChangeText={handleChangeText}
                // value={text}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>

      <Button title="create chat" onPress={() => handleCreateChat(item)} />
      <FlatList
        data={users}
        style={{height: '100%'}}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            item,
          );
          // const result = item.result;
          return (
            // <Pressable onPress={() => handleUserNavigation(item)}>
            <View style={{flex: 3, flexDirection: 'column', margin: 10}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    margin: 15,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    maxWidth: '70%',
                  }}>
                  <VHeader
                    type="five"
                    color="white"
                    text={item.user_name}
                    textAlign="right"
                  />
                  <Body
                    type="two"
                    color="#cecece"
                    text={item.trak_symbol}
                    textAlign="right"
                  />
                  <Pressable onPress={() => handleAddUser(item.id)}>
                    <Body
                      type="two"
                      color="green"
                      text={'ADD'}
                      textAlign="right"
                    />
                  </Pressable>
                </View>
                <Image
                  style={{
                    height: 80,
                    width: '100%',
                    borderRadius: 10,
                    backgroundColor: '#fff',
                  }}
                  source={{
                    uri: item.avatarURL,
                  }}
                />
              </View>
            </View>
            // </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
