import {View, Image} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {Body, VHeader} from '../typography';

export const TrakMetaView = ({state}: any) => {
  console.log(
    '🚀 ~ file: TrakMetaView.tsx ~ line 5 ~ TrakMetaView ~ state',
    state,
  );

  const songRelationships = state.trakRelationships.songRelationships;
  return (
    <FlatList
      listKey="TRAK98"
      style={{borderRadius: 20}}
      data={songRelationships}
      renderItem={({item, index}) => {
        if (item.songs.length == 0) {
          return <View />;
        }
        return (
          <View
            style={{
              borderBottomWidth: 2,
              padding: 10,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}>
              <Body
                numberOfLines={1}
                type="two"
                color={'#fff'}
                text={item.relationship_type}
              />
            </View>

            <FlatList
              listKey="TRAK3"
              data={item.songs}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      paddingBottom: 10,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 10,
                        marginRight: 10,
                      }}
                      source={{uri: item.song_art_image_thumbnail_url}}
                    />
                    <Body type="two" color={'#fff'} text={item.full_title} />
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
  );
};
