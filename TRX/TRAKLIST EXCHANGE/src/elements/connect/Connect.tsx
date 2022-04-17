import React from 'react';
import {View, Image, Button, Dimensions, TouchableOpacity} from 'react-native';
// @ts-ignore
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {VHeader, BHeader, Body, Caption} from '../../elements';

export const ConnectElement = ({
  authorizeSpotify,
  authorizeGoogle,
  isAuthenticatedSpotify,
  handleNavigateNext,
  handleNavigateSignIn,
  navigation,
}: any) => {
  return (
    <ParallaxScrollView
      backgroundColor={'#1a1a1a'}
      parallaxHeaderHeight={200}
      stickyHeaderHeight={150}
      renderBackground={() => (
        <LinearGradient colors={['#1a1a1a', '#000']}>
          <View
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomWidth: 1.8,
              // borderColor: '#fff',
            }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                marginTop: 3,
                borderRadius: 8,
              }}
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/traklist-7b38a.appspot.com/o/happy_girl.png?alt=media&token=b056459c-f5b5-4430-a7dc-a21e48d357df',
              }}
            />

            {/*  */}
          </View>
        </LinearGradient>
      )}>
      <View
        style={{
          backgroundColor: '#1a1a1a',
          height: '100%',
          padding: 10,
        }}>
        <View style={{marginBottom: 8}}>
          <VHeader type="three" color="#cecece" text={'WELCOME TO TRX.'} />
          <Caption
            type="one"
            color="#cecece"
            text={'Lets start by connecting to services.'}
          />
        </View>
        <View>
          <TouchableOpacity onPress={() => authorizeSpotify()}>
            <View
              style={{
                backgroundColor: '#58d464',
                margin: 5,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  height: 60,
                  width: '100%',
                  borderRadius: 8,
                }}
                source={{
                  uri: 'https://www.scdn.co/i/_global/open-graph-default.png',
                }}
              />
            </View>
          </TouchableOpacity>
          <Caption
            type="one"
            color="#FF6B6B"
            text={'* mandatory'}
            textAlign="right"
          />
        </View>
        <TouchableOpacity onPress={() => authorizeGoogle()}>
          <View
            style={{
              backgroundColor: '#fff',
              margin: 5,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: 60,
                width: '100%',
                borderRadius: 8,
              }}
              source={{
                uri: 'https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => authorizeGoogle()}>
          <View
            style={{
              backgroundColor: '#000',
              margin: 5,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{
                height: 60,
                width: '100%',
                borderRadius: 8,
              }}
              source={{
                uri: 'https://img.olhardigital.com.br/wp-content/uploads/2019/02/20190222045717.jpg',
              }}
            />
          </View>
        </TouchableOpacity>
        {/* <Button title="google" onPress={() => authorizeGoogle()} /> */}
        {/* <Button title="apple music" onPress={() => initialize()} /> */}
        {isAuthenticatedSpotify && (
          <Button
            disabled={!isAuthenticatedSpotify}
            title="NEXT"
            onPress={handleNavigateNext}
          />
        )}
        <TouchableOpacity onPress={handleNavigateSignIn}>
          <View
            style={{
              backgroundColor: '#fff',
              margin: 5,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 15,
            }}>
            <Caption
              type="one"
              color="#1a1a1a"
              text={'ALREADY HAVE AN ACCOUNT'}
              textAlign="right"
            />
          </View>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
};
