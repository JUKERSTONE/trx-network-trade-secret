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
  chat,
}: any) => {
  console.log('🚀 ~ file: NewChat.tsx ~ line 25 ~ users', users);
  return (
    <View style={{alignItems: 'center', flex: 1}}>
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

      <Button title="create chat" onPress={() => handleCreateChat(item)} />
      <FlatList
        data={users}
        style={{width: '100%', padding: 10}}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            item,
            users,
          );
          console.log('vrwerfq', users.includes(item.id));
          return (
            <Pressable onPress={() => handleAddUser(item.id)}>
              <View
                style={{
                  backgroundColor: '#fff',
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: '80%',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    {chat.includes(item.id) === true && (
                      <View style={{marginRight: 10}}>
                        <VHeader
                          type="two"
                          color={
                            chat.includes(item.id) === true
                              ? 'green'
                              : '#1a1a1a'
                          }
                          text={'•'}
                        />
                      </View>
                    )}
                    <VHeader
                      type="four"
                      color={
                        chat.includes(item.id) === true ? 'green' : '#1a1a1a'
                      }
                      text={item.user_name + ' '}
                    />
                    <Body
                      type="two"
                      color="grey"
                      text={`[${item.trak_symbol}]`}
                      // textAlign="right"
                    />
                  </View>
                </View>
                <Image
                  style={{
                    height: 80,
                    width: 80,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                  }}
                  source={{
                    uri: item.avatarURL,
                  }}
                />
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
