import React from 'react';
import {TextInput, SafeAreaView, ImageBackground, FlatList} from 'react-native';
// @ts-ignore
import {TrendingCard} from '../trending-card/TrendingCard';
import {View, Text, Pressable} from 'react-native';
import {VHeader, Body} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

export const ChatElement = ({
  handleChatText,
  handleSendChat,
  chatURI,
  ...props
}: any) => {
  console.log('🚀 ~ file: Chat.tsx ~ line 16 ~ chatURI', chatURI);
  const chats = useSelector((state: any) => state.messaging.chats);
  console.log('🚀 ~ file: Chat.tsx ~ line 17 ~ chats', chats);
  // const chatArray = Object.keys(chats)
  // console.log('🚀 ~ file: Chat.tsx ~ line 17 ~ chats', chats);
  console.log('🚀 ~ file: Chat.tsx ~ line 22 ~ chats[chatURI]', chats[chatURI]);
  const messages = chats[chatURI]?.messages;
  console.log('🚀 ~ file: Chat.tsx ~ line 20 ~ messages', messages);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flex: 4}}>
        <FlatList
          data={messages}
          style={{height: '100%', width: '100%'}}
          renderItem={({item, index}) => {
            console.log(
              '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
              item,
            );
            return (
              <View
                style={{
                  flex: 3,
                  flexDirection: 'column',
                  margin: 10,
                  backgroundColor: '#fff',
                  padding: 20,
                }}>
                <Text>{item.message}</Text>
                <Text>{item.username}</Text>
                <Text>{item.sentAt}</Text>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          flexDirection: 'row',
          padding: 10,
        }}>
        <TextInput
          onChangeText={handleChatText}
          style={{
            backgroundColor: '#fff',
            flex: 1,
            margin: 15,
            borderRadius: 10,
          }}
        />
        <Pressable
          onPress={handleSendChat}
          style={{
            height: 30,
            width: 30,
            backgroundColor: 'green',
            alignSelf: 'center',
          }}></Pressable>
      </View>
    </View>
  );
};
