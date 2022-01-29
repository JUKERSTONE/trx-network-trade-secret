import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, Alert} from 'react-native';
import {WalletView} from '../';
import {useTRAKLISTState} from '../../app/';
import {VHeader, Body} from '../';

export const ExchangeView = ({state}: any) => {
  const thumbnail = state.exchange.trak.thumbnail;
  const title = state.exchange.trak.title;
  const artist = state.exchange.trak.artist;
  console.log(
    '🚀 ~ file: ExchangeView.tsx ~ line 11 ~ ExchangeView ~ title',
    title,
  );
  console.log(
    '🚀 ~ file: ExchangeView.tsx ~ line 11 ~ ExchangeView ~ thumbnail',
    thumbnail,
  );
  console.log(
    '🚀 ~ file: ExchangeView.tsx ~ line 8 ~ ExchangeView ~ state',
    state,
  );
  const {handleGetState} = useTRAKLISTState();
  const [wallet, setWallet] = useState();
  const [trak, setTRAK] = useState();
  useEffect(() => {
    const profile: any = handleGetState({index: 'profile'});
    const TRXProfile = profile.TRX;
    const trak = TRXProfile?.trak;

    const wallet = trak?.map((trak: any) => ({
      value: trak.title,
      key: trak.trakURI,
    }));
    console.log('🚀 ~ file: ExchangeView.tsx ~ line 19 ~ wal ~ wallet', wallet);

    setWallet(wallet);
    setTRAK(trak);
  }, []);

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{backgroundColor: 'transparent'}}>
        <View
          style={{
            margin: 10,
          }}>
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
                // backgroundColor: 'blue',
                flex: 1,
              }}>
              <Image
                source={{uri: thumbnail}}
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
                text={title}
              />
              <Body
                numberOfLines={1}
                type="one"
                color={'#fff'}
                text={artist}
                textAlign="right"
              />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <WalletView
          wallet={wallet}
          data={trak}
          isExchange
          handleExchange={({trak}: any) => {
            Alert.alert(
              'Pending TRX Exchange',
              `You are about to swap '${title}' by ${artist} for '${trak.title}' by ${trak.artist}`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'EXCHANGE', onPress: () => alert('bernie time')},
              ],
            );
          }}
        />
      </View>
    </View>
  );
};
