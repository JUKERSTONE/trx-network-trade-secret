import {View, Text, TextInput, Pressable, Keyboard} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {VHeader, Body, Caption} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const RemoteElement = ({
  hidden,
  artist,
  title,
  mode,
  handleChatText,
  handleSendChat,
  chat,
}: // inputRef,
// setTyping,
// chatInputRef,
// chatURI,
any) => {
  const [isFocussed, setIsFocussed] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const inputRef: any = useRef();

  return (
    <>
      {mode === 'default' && (
        <>
          {hidden && (
            <View
              style={{
                padding: 4,
                borderRadius: 3,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '100%',
                }}>
                <View>
                  <VHeader
                    type="four"
                    color="#fff"
                    text={artist}
                    numberOfLines={1}
                  />
                </View>
                <View>
                  <VHeader
                    type="five"
                    color="#cecece"
                    text={title}
                    numberOfLines={1}
                  />
                </View>
              </View>
            </View>
          )}
        </>
      )}
      {mode === 'chat' && (
        <>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              value={chat}
              ref={inputRef}
              onSubmitEditing={() => {
                alert('yo');
                setOnFocus(false);
              }}
              onFocus={() => setOnFocus(true)}
              onChangeText={handleChatText}
              placeholder="Type a message..."
              style={{
                flex: 3,
                backgroundColor: '#fff',
                flexDirection: 'row',
                padding: 25,
                borderRadius: 8,
                marginRight: 20,
              }}
              // value={chat}
            />
            <Pressable
              onPress={handleSendChat}
              style={{
                // flex: 1,

                height: '80%',
                // width: 40,
                backgroundColor: 'green',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                padding: 10,
                flexDirection: 'row',
              }}>
              <Ionicons
                name="checkmark-done-circle-sharp"
                color={'#fff'}
                size={20}
              />
              <VHeader
                type="five"
                color="#fff"
                text={'SEND'}
                numberOfLines={1}
              />
            </Pressable>
            <Pressable
              onPress={handleSendChat}
              style={{
                height: '80%',
                width: 30,
                backgroundColor: 'green',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderLeftWidth: 1,
                borderLeftColor: '#cecece',
                padding: 5,
              }}>
              <Ionicons name="options" color={'#fff'} size={15} />
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};
