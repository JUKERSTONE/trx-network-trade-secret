import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  useWindowDimensions,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {VHeader, Body, Caption} from '../../elements';

export const TRAKElement = ({TRAK}: any) => {
  console.log(
    '🚀 ~ file: TRAK.tsx ~ line 42 ~ TRAKElement ~ TRAK',
    TRAK?.meta.description.dom,
  );
  const description = TRAK?.meta.description.dom.children;
  console.log(
    '🚀 ~ file: TRAK.tsx ~ line 19 ~ TRAKElement ~ description',
    description,
  );

  // let bottom = false;
  // let descriptionArray: any = [];
  // if (description) {
  //   description.forEach((child: any) => {
  //     console.log(
  //       '🚀 ~ file: TRAK.tsx ~ line 28 ~ description.forEach ~ child',
  //       child.children,
  //     );
  //     // another one check
  //     // descriptionArray.push(child.children);
  //   });
  // }
  // console.log(JSON.stringify(descriptionArray), 'opweofh');

  return (
    <ScrollView>
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
            flex: 1,
          }}>
          <Image
            source={{uri: TRAK?.meta.thumbnail}}
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
          <VHeader
            numberOfLines={1}
            type="four"
            color={'#fff'}
            text={TRAK?.meta.title}
          />
          <Body
            numberOfLines={1}
            type="one"
            color={'#fff'}
            text={TRAK?.meta.artist}
            textAlign="right"
          />
          <Caption
            numberOfLines={1}
            type="one"
            color={'#fff'}
            text={TRAK?.meta.recording_location}
            textAlign="right"
          />
          <Caption
            numberOfLines={1}
            type="one"
            color={'#fff'}
            text={TRAK?.meta.release_date}
            textAlign="right"
          />
        </View>
      </View>
      <View style={{marginTop: 40, margin: 20}}>
        <Body numberOfLines={1} type="one" color={'#fff'} text={'producers'} />
        <FlatList
          horizontal
          listKey="TRAK5"
          data={TRAK?.meta.producer_artists}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  marginRight: 10,
                  alignItems: 'center',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: '#1A1A1A',
                }}>
                <Image
                  style={{height: 50, width: 50, borderRadius: 60}}
                  source={{uri: item.image_url}}
                />
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#fff'}
                  text={item.name}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>
      <View style={{marginTop: 40, margin: 20}}>
        <Body numberOfLines={1} type="one" color={'#fff'} text={'writers'} />
        <FlatList
          horizontal
          listKey="TRAK5"
          data={TRAK?.meta.writer_artists}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  marginRight: 10,
                  alignItems: 'center',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: '#1A1A1A',
                }}>
                <Image
                  style={{height: 50, width: 50, borderRadius: 60}}
                  source={{uri: item.image_url}}
                />
                <Body
                  numberOfLines={1}
                  type="one"
                  color={'#fff'}
                  text={item.name}
                />
              </View>
            );
          }}
          keyExtractor={(item, index) => '' + index}
        />
      </View>

      <FlatList
        listKey="TRAK98"
        style={{margin: 20, borderRadius: 20}}
        data={TRAK?.meta?.song_relationships}
        renderItem={({item, index}) => {
          if (item.songs.length == 0) {
            return <View />;
          }
          return (
            <View
              style={{
                marginRight: 20,
                // backgroundColor: '#1a1a1a',
                borderBottomWidth: 2,
                padding: 10,
              }}>
              <View
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                }}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'#1a1a1a'}
                  text={item.relationship_type}
                  textAlign="right"
                />
              </View>

              <FlatList
                horizontal
                listKey="TRAK3"
                data={item.songs}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        maxWidth: 200,
                        margin: 5,
                        alignItems: 'center',
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: '#1A1A1A',
                      }}>
                      <Image
                        style={{height: 50, width: 50, borderRadius: 60}}
                        source={{uri: item.song_art_image_thumbnail_url}}
                      />
                      <Body
                        numberOfLines={1}
                        type="one"
                        color={'#fff'}
                        text={item.full_title}
                      />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => '' + index}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />
      <FlatList
        listKey="TRAK"
        style={{margin: 20, borderRadius: 20}}
        data={TRAK?.meta?.custom_performances}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                marginRight: 20,
                // backgroundColor: '#1a1a1a',
                borderBottomWidth: 2,
                padding: 10,
              }}>
              <View
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                }}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'#1a1a1a'}
                  text={item.label}
                  textAlign="right"
                />
              </View>

              <FlatList
                horizontal
                listKey="TRAK3"
                data={item.artists}
                renderItem={({item, index}) => {
                  return (
                    <View
                      style={{
                        maxWidth: 200,
                        margin: 5,
                        alignItems: 'center',
                        borderRadius: 10,
                        padding: 10,
                        backgroundColor: '#1A1A1A',
                      }}>
                      <Image
                        style={{height: 50, width: 50, borderRadius: 60}}
                        source={{uri: item.image_url}}
                      />
                      <Body
                        numberOfLines={1}
                        type="one"
                        color={'#fff'}
                        text={item.name}
                      />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => '' + index}
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => '' + index}
      />

      {/* <Text>{JSON.stringify(TRAK)}</Text> */}
    </ScrollView>
  );
};
