import React from 'react';
import {View, Text, Modal, Pressable, SafeAreaView, Alert} from 'react-native';
import {styles} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ExchangeView,
  WalletExchangeView,
  DepositView,
  TrakMetaView,
  ForchainView,
} from '..';

export const TRXModalElement = ({
  modalVisible = false,
  setModalVisible,
  handleRequestClose,
  state,
  type,
  ...props
}: any) => {
  return (
    <SafeAreaView style={styles.modalView}>
      <View style={styles.body}>
        {type === 'exchange' && <ExchangeView state={state} {...props} />}
        {type === 'deposit' && <DepositView state={state} {...props} />}
        {type === 'trak-relationships' && (
          <TrakMetaView state={state} {...props} />
        )}
        {type === 'forchain' && <ForchainView state={state} {...props} />}
      </View>
    </SafeAreaView>
  );
};
