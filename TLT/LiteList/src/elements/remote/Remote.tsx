import {View, Text, TextInput, Pressable, Keyboard} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {VHeader, Body, Caption} from '../typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProgressBar, Colors} from 'react-native-paper';

export const RemoteElement = ({
  hidden,
  artist,
  title,
  mode,
  handleChatText,
  handleSendChat,
  chat,
  currentTime,
  playableDuration,
  isMMS,
  spotifyPlayer,
}: // inputRef,
// setTyping,
// chatInputRef,
// chatURI,
any) => {
  console.log('🚀 ~ file: Remote.tsx ~ line 24 ~ spotifyPlayer', spotifyPlayer);
  console.log('🚀 ~ file: Remote.tsx ~ line 23 ~ chat', chat);
  const [isFocussed, setIsFocussed] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const inputRef: any = useRef();

  return (
    <>
      {mode == 'default' && (
        <View
          style={{
            // backgroundColor: 'blue',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{flex: 5, padding: 10}}>
            <ProgressBar
              progress={
                spotifyPlayer && !hidden
                  ? spotifyPlayer.progress_ms ??
                    100 / spotifyPlayer?.item?.duration_ms ??
                    1000
                  : currentTime / playableDuration
              }
              color={'#cecece'}
              style={{
                backgroundColor: spotifyPlayer && !hidden ? '#1db954' : 'grey',
                height: 5,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      )}
      {spotifyPlayer && !hidden ? (
        <>
          <View
            style={{
              marginBottom: mode === 'chat' ? 10 : 0,
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
                  text={spotifyPlayer.item?.artists[0].name}
                  numberOfLines={1}
                />
              </View>
              <View>
                <VHeader
                  type="five"
                  color="#cecece"
                  text={spotifyPlayer.item?.name}
                  numberOfLines={1}
                />
              </View>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{
            marginBottom: mode === 'chat' ? 10 : 0,
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

      {mode == 'chat' && (
        <View
          style={{
            // backgroundColor: 'blue',
            width: '100%',
            marginVertical: 2,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{flex: 5, padding: 10}}>
            <ProgressBar
              progress={currentTime / playableDuration}
              color={'#cecece'}
              style={{
                backgroundColor: 'grey',
                height: 5,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      )}

      {mode === 'chat' && hidden && (
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
                paddingHorizontal: 10,
                borderRadius: 8,
                marginRight: 20,
              }}
              multiline={false}
              // value={chat}
            />
            <Pressable
              onPress={() =>
                isMMS && chat.length != 0
                  ? handleSendChat()
                  : alert('send some text with the trak')
              }
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
              <Ionicons name="options" color={'#FFF'} size={15} />
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};
