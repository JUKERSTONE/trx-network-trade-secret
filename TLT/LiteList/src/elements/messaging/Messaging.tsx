import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  Animated,
  Alert,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import {VHeader, Body, Paragraph, BHeader, Caption} from '../typography';
import {useSelector} from 'react-redux';
import moment from 'moment';
// @ts-ignore
import StickyItemFlatList from '@gorhom/sticky-item';

export const MessagingElement = ({
  handleNewChat,
  handleNewGroupChat,
  handleChatNavigation,
}: any) => {
  const chats = useSelector((state: any) => state.messaging.chats);
  console.log('🚀 ~ file: Messaging.tsx ~ line 26 ~ chats', chats);

  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1, alignItems: 'center'}}>
      <Button title="new chat" onPress={() => handleNewChat('single')} />
      <Button title="new group chat" onPress={() => handleNewChat('group')} />
      <Text style={{color: '#fff'}}>recent chats here and below</Text>
      <FlatList
        data={Object.keys(chats)}
        style={{height: '100%', width: '100%'}}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            chats[item],
            chats[item].lastMessage,
          );

          const lastMessage = chats[item].lastMessage;

          const {chat, sentAt, username, avatar} = lastMessage;

          return (
            <Pressable onPress={() => handleChatNavigation(item)}>
              <View style={{flex: 3, flexDirection: 'column', margin: 8}}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      margin: 15,
                      justifyContent: 'space-around',
                      alignItems: 'flex-end',
                      maxWidth: '60%',
                    }}>
                    <VHeader
                      type="five"
                      color="white"
                      text={'@' + username}
                      textAlign="right"
                    />
                    <Body
                      type="two"
                      color="#cecece"
                      text={chat}
                      textAlign="right"
                      numberOfLines={1}
                    />
                  </View>
                  <Image
                    style={{
                      height: 80,
                      width: '100%',
                      borderRadius: 10,
                      backgroundColor: '#fff',
                    }}
                    source={{
                      uri: avatar,
                    }}
                  />
                </View>
              </View>
              <View style={{alignItems: 'flex-end', paddingRight: 5}}>
                {/* <Text style={{color: '#fff'}}>{moment(sentAt).fromNow()}</Text> */}
                <Caption
                  type="two"
                  color="white"
                  text={moment(sentAt).fromNow()}
                  textAlign="right"
                />
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};
