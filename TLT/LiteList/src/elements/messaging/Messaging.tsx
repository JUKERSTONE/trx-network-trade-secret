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
  StyleSheet,
  TextInput,
} from 'react-native';
import {VHeader, Body, Paragraph, BHeader, Caption} from '../typography';
import {useSelector} from 'react-redux';
import moment from 'moment';
// @ts-ignore
import StickyItemFlatList from '@gorhom/sticky-item';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const MessagingElement = ({
  handleNewChat,
  handleNewGroupChat,
  handleChangeText,
  handleChatNavigation,
}: any) => {
  const chats = useSelector((state: any) => state.messaging.chats);
  console.log('🚀 ~ file: Messaging.tsx ~ line 26 ~ chats', chats);

  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1, alignItems: 'center'}}>
      <View
        style={{
          // backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            width: 100,
            padding: 5,
            borderRadius: 8,
            marginRight: 10,
          }}>
          <MaterialIcons name="person-add" size={25} color={'#1a1a1a'} />
          <Pressable
            onPress={() => handleNewChat('single')}
            style={{marginLeft: 5}}>
            <VHeader type="five" color="#1a1a1a" text={'new chat'} />
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#fff',
            padding: 3,
            borderRadius: 8,
            paddingHorizontal: 5,
          }}>
          <MaterialIcons name="group-add" size={30} color={'#1a1a1a'} />
          <Pressable
            onPress={() => handleNewChat('group')}
            style={{marginLeft: 5}}>
            <VHeader type="five" color="#1a1a1a" text={'new group'} />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          borderWidth: 4,
          borderColor: '#0000',
          borderRadius: 11,
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            width: '80%',
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
              <VHeader type="five" color={'#1a1a1a'} text={'search'} />
            </View>
            <TextInput
              style={{
                // color: props.color,
                fontSize: 14,
                fontWeight: '500',
                paddingLeft: 16,
                paddingBottom: 20,
              }}
              onChangeText={handleChangeText}
              // value={query}
            />
          </View>
        </View>
      </View>
      <View style={{marginVertical: 8}}>
        <VHeader
          type="five"
          color="white"
          text={'RECENT CHATS HERE AND BELOW'}
          textAlign="right"
        />
      </View>
      <FlatList
        data={Object.keys(chats)}
        style={{height: '100%', width: '100%'}}
        renderItem={({item, index}) => {
          console.log(
            '🚀 ~ file: TRAKTab.tsx ~ line 37 ~ TRAKTabElement ~ item',
            chats[item],
            chats[item].lastMessage,
          );

          const serializedLastMessage = chats[item].lastMessage;

          const {chat, sentAt, username, avatar} = JSON.parse(
            serializedLastMessage,
          );

          return (
            <Pressable onPress={() => handleChatNavigation(item)}>
              <View
                style={{
                  flex: 3,
                  flexDirection: 'column',
                  margin: 8,
                  width: '80%',
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 40,
                      backgroundColor: '#fff',
                    }}
                    source={{
                      uri: avatar,
                    }}
                  />
                  <View
                    style={{
                      margin: 15,
                      justifyContent: 'space-around',
                      alignItems: 'flex-start',
                      flex: 1,
                    }}>
                    <VHeader
                      type="five"
                      color="white"
                      text={username}
                      textAlign="right"
                    />
                    <Body
                      type="two"
                      color="#cecece"
                      text={'@' + username + ' : ' + chat}
                      textAlign="right"
                      numberOfLines={1}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      paddingRight: 5,
                      // backgroundColor: 'blue',
                    }}>
                    <Caption
                      type="two"
                      color="white"
                      text={moment(sentAt).fromNow()}
                      textAlign="right"
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};
