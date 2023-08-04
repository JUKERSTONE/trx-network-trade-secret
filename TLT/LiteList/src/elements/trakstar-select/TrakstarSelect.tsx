import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import {VHeader, Body, BHeader, Caption, Paragraph} from '../typography';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// import {number} from '@storybook/addon-knobs';
import * as Progress from 'react-native-progress';

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
  handleLike?: any;
  likes?: any;
  isTRX?: any;
  isProfile?: boolean;
  hasDownload?: boolean;
  handleDownload?: any;
  isDownloading?: any;
  isDownloaded?: any;
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
  handleLike,
  likes,
  isTRX,
  isProfile,
  hasDownload,
  handleDownload,
  isDownloading,
  isDownloaded,
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
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 20,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {hasDownload && (
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}
              onPress={handleDownload}>
              <View>
                {!isDownloading ? (
                  <Ionicons
                    name={
                      isDownloaded ? 'cloud-download' : 'cloud-download-outline'
                    }
                    size={20}
                    color={'#1db954'}
                  />
                ) : (
                  <Progress.Circle size={30} indeterminate={true} />
                )}
              </View>
            </Pressable>
          )}
          {likes && (
            <Pressable onPress={handleLike}>
              <View style={{justifyContent: 'center'}}>
                <MaterialCommunityIcons
                  name={'cards-heart'}
                  size={21}
                  color={'#1db954'}
                />
              </View>
            </Pressable>
          )}
        </View>

        {!isProfile && (
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
        )}
      </View>

      {/* <View style={{flexDirection: 'column', backgroundColor: 'red'}}> */}
      <View style={{flexDirection: 'row', flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            width: '60%',
            marginRight: 15,
          }}>
          <VHeader
            type="five"
            color={isDynamic ? colors.background : '#fff'}
            text={title}
            textAlign="right"
            numberOfLines={nolTitle}
          />
          <Caption
            textAlign="right"
            type="two"
            color={isDynamic ? colors.background : '#cecece'}
            text={artist}
            numberOfLines={nolArtist}
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
          <View style={{}}>
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
        <ImageBackground
          style={{
            height,
            width,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
          imageStyle={{
            height,
            width,
            borderRadius: 10,
            backgroundColor: '#fff',
          }}
          source={{
            uri: artwork,
          }}>
          {isProfile && (
            <Image
              resizeMode="center"
              style={{
                height: 25,
                width: 25,
                borderTopLeftRadius: 8,
                borderBottomRightRadius: 8,
              }}
              source={
                !isTRX
                  ? {
                      uri: 'https://yt3.googleusercontent.com/gDCwhZGxgUY2Psz0NciwaxgVukw3MWf_f6T4OhymWkRQBdN8UGmGwsVhqiUjde98Dh8meWEE0g=s900-c-k-c0x00ffffff-no-rj',
                    }
                  : require('../../core/icon_circle_green.png')
              }
            />
          )}
        </ImageBackground>
      </View>
      {/* </View> */}
    </View>
  );
};
