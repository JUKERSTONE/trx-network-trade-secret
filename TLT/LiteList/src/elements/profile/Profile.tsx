import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {VHeader, Body} from '../typography';
import {useLITELISTState} from '../../app';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const ProfileElement = ({item, isOwner}: any) => {
  return (
    <ScrollView style={{backgroundColor: '#1a1a1a'}}>
      <View style={{alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            padding: 10,
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: item.avatarURL}}
            style={{
              backgroundColor: '#1B4F26',
              height: 100,
              width: 100,
              borderRadius: 8,
            }}
          />
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={item.user_name}
              />
              <View style={{marginHorizontal: 5}}>
                <VHeader
                  numberOfLines={1}
                  type="four"
                  color={'#fff'}
                  text={'•'}
                />
              </View>

              <Body
                numberOfLines={1}
                type="one"
                color={'#fff'}
                text={'[' + item.trak_symbol + ']'}
              />
              <View style={{flexDirection: 'row', marginLeft: 3}}>
                <Ionicons name="ios-flame-sharp" size={20} color={'orange'} />
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: 'bold',
                    color: '#cecece',
                  }}>
                  {item.streak}
                </Text>
              </View>
            </View>

            <View style={{width: '90%'}}>
              <Body
                // numberOfLines={1}
                type="two"
                color={'#fff'}
                text={'"' + item.quotable + '"'}
              />
            </View>
            {!isOwner && (
              <View
                style={{
                  backgroundColor: 'green',
                  alignSelf: 'flex-start',
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 5,
                }}>
                <VHeader
                  // numberOfLines={1}
                  type="five"
                  color={'#fff'}
                  text={'FOLLOW'}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{height: 300}}>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'SUBSCRIPTIONS'}
            />
          </View>
          <FlatList
            horizontal
            data={[0, 0, 0, 0, 0, 0, 0, 0]}
            style={{height: 200}}
            // numColumns={3}
            renderItem={({item, index}: any) => {
              return (
                <View
                  style={{
                    backgroundColor: '#fff',
                    margin: 10,
                    width: 150,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>fe</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View>
        <View style={{width: '100%'}}>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'STREAMING'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 120,
                flex: 1,
                backgroundColor: '#fff',
                margin: 10,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/*  */}
              {/*  */}
              <Text>ef</Text>
            </View>
            <View
              style={{
                height: 120,
                flex: 1,
                backgroundColor: '#fff',
                margin: 10,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>ef</Text>
              {/*  */}
              {/*  */}
            </View>
          </View>
        </View>

        <View style={{width: '100%'}}>
          <View style={{marginLeft: 20, marginTop: 10}}>
            <VHeader
              numberOfLines={1}
              type="four"
              color={'#fff'}
              text={'ACTIVITY'}
            />
          </View>
          <FlatList
            data={[0, 0, 0, 0, 0, 0, 0, 0]}
            style={{backgroundColor: '#1a1a1a', width: '100%'}}
            renderItem={({item, index}: any) => {
              return (
                <View
                  style={{
                    backgroundColor: '#fff',
                    flex: 1,
                    margin: 10,
                    height: 150,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>fe</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View>
      </View>
    </ScrollView>
  );
};
