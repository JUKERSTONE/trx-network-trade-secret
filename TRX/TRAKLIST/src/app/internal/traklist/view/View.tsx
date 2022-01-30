import React, {useState} from 'react';
import {View, StatusBar, Text} from 'react-native';
import {colors} from '../../../../core';
import {TRXModal} from '../../../../elements';
import {useTRAKLISTState} from '../../../';
import {toggleExchangeView, store} from '../../../../stores';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const TRAKLISTView = ({isDarkMode, children, ...props}: any) => {
  const [modalState, setModalState] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? colors.dark.primary : colors.light.primary,
  };

  store.subscribe(() => {
    const state = store.getState();
    const modalState = state.modal;
    console.log(
      '🚀 ~ file: View.tsx ~ line 24 ~ store.subscribe ~ modalState',
      modalState,
    );
    setModalState(modalState);
    console.log('TRAKLIST APP STATE : ', state);
  });

  return (
    <View style={[{flex: 1}, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {children}
      <View
        style={{
          marginTop: 5,
          backgroundColor: '#1d995F',
          height: 80,
          flexDirection: 'row',
          opacity: 0.8,
        }}>
        <View style={{flex: 1, padding: 10}}>
          {/* replace view */}
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderBottomLeftRadius: 30,
            }}
          />
        </View>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>song title</Text>
          <Text>song artist</Text>
        </View>
        <View style={{flex: 1, padding: 10, flexDirection: 'row'}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            <MaterialCommunityIcons
              name={'play-circle'}
              size={25}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name={'replay-circle-filled'}
              size={25}
              color={'whitesmoke'}
              style={{opacity: 0.9, paddingTop: 0}}
            />
          </View>
        </View>
      </View>
      <TRXModal
        {...props}
        handleRequestClose={() => {
          let modal;
          if (modalState?.type === 'exchange') {
            modal = {
              type: '',
              exchange: {
                active: false,
              },
            };
          } else if (modalState?.type === 'wallet-exchange') {
            modal = {
              type: '',
              exchange: {
                active: false,
              },
            };
          } else if (modalState?.type === 'deposit') {
            modal = {
              type: '',
              exchange: {
                active: false,
              },
            };
          }
          const action = toggleExchangeView(modal);
          store.dispatch(action);
        }}
        type={modalState?.type}
        state={modalState}
        modalVisible={modalState?.exchange?.active}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};
