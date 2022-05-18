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
} from 'react-native';
import {VHeader, Paragraph, BHeader} from '../typography';
import {useSelector} from 'react-redux';

// @ts-ignore
import StickyItemFlatList from '@gorhom/sticky-item';

export const MessagingElement = ({
  handleNewChat,
  handleNewGroupChat,
  recentChats,
  handleChatNavigation,
}: any) => {
  console.log('🚀 ~ file: Messaging.tsx ~ line 23 ~ recentChats', recentChats);

  const chats = useSelector((state: any) => state.messaging.chats);

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
            item,
          );
          return (
            <Pressable onPress={() => handleChatNavigation(item)}>
              <View
                style={{
                  flex: 3,
                  flexDirection: 'column',
                  margin: 10,
                  backgroundColor: '#fff',
                  padding: 20,
                }}>
                <Text>{item}</Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
