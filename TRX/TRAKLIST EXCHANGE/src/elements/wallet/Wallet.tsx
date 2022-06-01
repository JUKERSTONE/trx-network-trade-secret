import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Dimensions,
  Button,
  SafeAreaView,
} from 'react-native';
import {AlphabetList} from 'react-native-section-alphabet-list';
import {VHeader, Body} from '../typography';
import {TabView, TabBar} from 'react-native-tab-view';
import {NFTWalletTabElement} from '../nft-wallet-tab';
import {TRAKWalletTabElement} from '../trak-wallet-tab';
import {colors} from '../../core';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const WalletElement = ({
  nftWallet = [],
  trakWallet = [],
  nft,
  trak,
  handleNavigateTRAK,
  handleNavigateNFT,
  handleExchange,
  handleConnectWallet,
  hasForchain,
  profile,
  handleReload,
  refreshing,
  setRefreshing,
  handleRefresh,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'TRAK'},
    {key: 'second', title: 'NFT'},
    {key: 'third', title: 'ACTIVITY'},
  ]);

  if (nft == null)
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1a1a1a',
        }}>
        <View style={{padding: 30}}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'whitesmoke',
              paddingBottom: 10,
            }}>
            ONE MOMENT PLEASE...
          </Text>
          <ActivityIndicator color="green" size="large" />
        </View>
        <View>
          <Text style={{color: 'white'}}>Taking too long?</Text>
          <Button title="reload" onPress={handleReload} />
        </View>
      </SafeAreaView>
    );
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', backgroundColor: '#1a1a1a'}}>
        <View
          style={{
            padding: 10,
            width: '100%',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: profile.avatarURL}}
            style={{
              backgroundColor: '#1B4F26',
              height: 80,
              width: 150,
              borderRadius: 10,
            }}
          />
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              {/* <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}}>
                {profile.user_name}
              </Text> */}
              <VHeader
                numberOfLines={1}
                type="four"
                color={'#fff'}
                text={profile.trak_name}
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
                text={'[' + profile.trak_symbol + ']'}
              />
              <View style={{flexDirection: 'row', marginLeft: 3}}>
                <Ionicons name="ios-flame-sharp" size={20} color={'orange'} />
                <Text
                  style={{fontSize: 11, fontWeight: 'bold', color: '#cecece'}}>
                  {profile.streak}
                </Text>
              </View>
            </View>

            <View style={{width: '90%'}}>
              <Body
                // numberOfLines={1}
                type="two"
                color={'#fff'}
                text={'"' + profile.quotable + '"'}
              />
            </View>
          </View>
        </View>
      </View>
      <TabView
        navigationState={{index, routes}}
        style={{backgroundColor: '#1a1a1a'}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <TRAKWalletTabElement // TRAK Wallet
                  wallet={trakWallet}
                  items={trak}
                  handleNavigateTRAK={handleNavigateTRAK}
                  handleNavigateNFT={handleNavigateNFT}
                  handleExchange={handleExchange}
                  hasForchain={hasForchain}
                  handleConnectWallet={handleConnectWallet}
                />
              );
            case 'second':
              return (
                <NFTWalletTabElement // NFT Wallet
                  wallet={nftWallet}
                  items={nft}
                  handleNavigateTRAK={handleNavigateTRAK}
                  handleNavigateNFT={handleNavigateNFT}
                  handleExchange={handleExchange}
                  hasForchain={hasForchain}
                  handleConnectWallet={handleConnectWallet}
                  refreshing={refreshing}
                  setRefreshing={setRefreshing}
                  onRefresh={handleRefresh}
                />
              );

            case 'third':
              return (
                <SafeAreaView
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#1a1a1a',
                  }}>
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'whitesmoke',
                      padding: 30,
                    }}>
                    COMING SOON...
                  </Text>
                </SafeAreaView>
              );
            default:
              return <View />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: colors.dark.primary}}
            renderLabel={({route, focused, color}) => (
              <Text style={{color, fontSize: 15, fontWeight: 'bold'}}>
                {route.title}
              </Text>
            )}
            indicatorStyle={{backgroundColor: '#fff'}}
          />
        )}
      />
    </View>
  );
};
