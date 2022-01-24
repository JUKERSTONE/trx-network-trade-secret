import React from 'react';
import {View, Text, Modal, Pressable, SafeAreaView, Alert} from 'react-native';
import {styles} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ExchangeView} from '../';

interface TTraklistModal {
  modalVisible: any;
  setModalVisible: any;
  state: any;
  type: string;
  handleRequestClose: () => void;
}

export const TRXModal: React.FC<TTraklistModal> = ({
  modalVisible = false,
  setModalVisible,
  handleRequestClose,
  state,
  type,
  ...props
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleRequestClose}>
      {/*  */}
      <SafeAreaView style={styles.modalView}>
        <View
          style={{
            marginVertical: 10,
            alignSelf: 'flex-end',
          }}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={handleRequestClose}>
            {/* <Text style={styles.textStyle}>X</Text> */}
            {/* <VHeader type="fice" color="#fff" text={'X'} numberOfLines={1} /> */}
            <MaterialCommunityIcons
              name="close-circle"
              size={22}
              color="#fff"
              // style={{paddingTop: 1}}
            />
          </Pressable>
        </View>
        {type === 'exchange' && <ExchangeView {...props} />}
      </SafeAreaView>
      {/*  */}
    </Modal>
  );
};
