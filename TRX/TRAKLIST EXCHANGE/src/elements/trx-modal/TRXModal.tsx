import React from 'react';
import {View, Text, Modal, Pressable, SafeAreaView, Alert} from 'react-native';
import {styles} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ExchangeView, WalletExchangeView, DepositView, TrakMetaView} from '..';

interface TTraklistModal {
  modalVisible: any;
  setModalVisible: any;
  state: any;
  type: string;
  handleRequestClose: () => void;
}

export const TRXModalElement: React.FC<TTraklistModal> = ({
  modalVisible = false,
  setModalVisible,
  handleRequestClose,
  state,
  type,
  ...props
}) => {
  console.log('🚀 ~ file: TRXModal.tsx ~ line 24 ~ state', props);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleRequestClose}>
      <SafeAreaView style={styles.modalView}>
        <View style={styles.header}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleRequestClose}>
            <MaterialCommunityIcons
              name="close-circle"
              size={22}
              color="#fff"
            />
          </Pressable>
        </View>
        <View style={styles.body}>
          {type === 'exchange' && <ExchangeView state={state} {...props} />}
          {type === 'deposit' && <DepositView state={state} {...props} />}
          {type === 'trak-relationships' && (
            <TrakMetaView state={state} {...props} />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};
