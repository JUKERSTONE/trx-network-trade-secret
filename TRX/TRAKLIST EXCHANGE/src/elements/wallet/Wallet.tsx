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
import {WalletTabElement} from '../wallet-tab';
import {colors} from '../../core';

export const WalletElement = ({
  wallet = [],
  trak,
  handleNavigateTRAK,
  handleNavigateNFT,
  handleExchange,
  handleConnectWallet,
  hasForchain,
}: any) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'WALLET'},
    {key: 'second', title: 'ACTIVITY'},
  ]);

  if (!hasForchain) {
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
          FORCHAIN Wallet Not Connected
        </Text>
        <Button title="CONNECT" onPress={handleConnectWallet} />
      </SafeAreaView>
    );
  }

  if (trak == null)
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('screen').height,
        }}>
        <ActivityIndicator color="blue" size="small" />
      </View>
    );
  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', margin: 10}}>
        <View
          style={{
            height: 200,
            width: '80%',
            backgroundColor: '#1a1a1a',
            borderRadius: 10,
          }}
        />
      </View>
      <TabView
        navigationState={{index, routes}}
        style={{backgroundColor: '#1d995F'}}
        renderScene={({route}) => {
          switch (route.key) {
            case 'first':
              return (
                <WalletTabElement
                  wallet={wallet}
                  data={trak}
                  handleNavigateTRAK={handleNavigateTRAK}
                  handleNavigateNFT={handleNavigateNFT}
                  handleExchange={handleExchange}
                />
              );
            case 'second':
              return <View style={{backgroundColor: 'blue', flex: 1}} />;
            case 'third':
              return <View style={{backgroundColor: 'red', flex: 1}} />;
            default:
              return <View />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{backgroundColor: colors.light.primary}}
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
