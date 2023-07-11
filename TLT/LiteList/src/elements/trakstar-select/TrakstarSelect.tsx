import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {VHeader, Body, BHeader, Caption} from '../typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
// import {number} from '@storybook/addon-knobs';

interface TrendingCardProps {
  rank?: number;
  artwork: string;
  title: string;
  artist: string;
  detail1?: string;
  detail2?: string;
  status?: 'same' | 'rising' | 'falling';
  handleDetail1?: any;
  handleDetail2?: any;
  isDynamic?: any;
  colors?: any;
  hasLiked?: any;
  trak?: any;
  backgroundColor?: any;
  nolTitle?: any;
  nolArtist?: any;
  width?: any;
  height?: any;
  handleGenius?: any;
}

export const TrakstarSelect: React.FC<TrendingCardProps> = ({
  rank,
  artwork,
  title,
  artist,
  status,
  detail1,
  handleDetail1,
  handleDetail2,
  isDynamic,
  colors,
  hasLiked,
  backgroundColor,
  trak,
  nolTitle = 2,
  nolArtist = 2,
  width = 70,
  height = '100%',
  detail2,
  handleGenius,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor,
        marginVertical: 5,
        borderRadius: 5,
      }}>
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 5,
          flexDirection: 'row',
        }}>
        <View style={{marginRight: 5, alignItems: 'center'}}>
          <Entypo name="dots-three-vertical" size={20} color={'#1db954'} />
        </View>
        <TouchableOpacity onPress={handleGenius}>
          <Image
            style={{
              height: 20,
              width: 20,
              borderRadius: 8,
              marginHorizontal: 10,
              borderWidth: 1,
              borderColor: '#1a1a1a',
            }}
            source={{
              uri: 'https://p.kindpng.com/picc/s/41-415864_rap-genius-logo-png-transparent-png.png',
            }}
          />
        </TouchableOpacity>
        <View style={{marginRight: 5, alignItems: 'center'}}>
          <Entypo name="controller-play" size={30} color={'#1db954'} />
        </View>
      </View>
      {/* <View style={{flexDirection: 'column', backgroundColor: 'red'}}> */}
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            margin: 15,
            justifyContent: 'center',
            width: '65%',
          }}>
          <VHeader
            type="four"
            color={isDynamic ? colors.background : '#fff'}
            text={artist}
            textAlign="right"
            numberOfLines={nolArtist}
          />
          <Caption
            textAlign="right"
            type="one"
            color={isDynamic ? colors.background : '#cecece'}
            text={title}
            numberOfLines={nolTitle}
          />
          {hasLiked && (
            <Caption
              textAlign="right"
              type="one"
              color={'#1db'}
              text={trak?.TRAK?.likes?.length + ' like(s)'}
              numberOfLines={2}
            />
          )}
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            {detail1 && (
              <TouchableOpacity onPress={handleDetail1}>
                <View
                  style={{
                    backgroundColor: '#2323',
                    padding: 4,
                    borderRadius: 3,
                    alignSelf: 'flex-end',
                    margin: 3,
                  }}>
                  <Caption
                    type="two"
                    color="#fc3c44"
                    text={detail1!}
                    textAlign="right"
                    numberOfLines={1}
                  />
                </View>
              </TouchableOpacity>
            )}
            {detail2 && (
              <TouchableOpacity onPress={handleDetail2}>
                <View
                  style={{
                    backgroundColor: '#2323',
                    padding: 4,
                    borderRadius: 3,
                    alignSelf: 'flex-end',
                    margin: 3,
                  }}>
                  <Caption
                    type="two"
                    color="green"
                    text={detail2!}
                    textAlign="right"
                    numberOfLines={1}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Image
          style={{
            height,
            width,
            borderRadius: 10,
            backgroundColor: '#fff',
            alignSelf: 'flex-end',
          }}
          source={{
            uri: artwork,
          }}
        />
      </View>
      {/* </View> */}
    </View>
  );
};
