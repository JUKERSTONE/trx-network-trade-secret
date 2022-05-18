import React from 'react';
import {View, Text, Modal, Pressable, SafeAreaView, Alert} from 'react-native';
import {styles} from './styles';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  // ExchangeView,
  // WalletExchangeView,
  // DepositView,
  TrakMetaView,
  // ProfileView,
  // ForchainView,
} from '..';

import {
  ProfileContainer,
  TRAKContainer,
  StoriesContainer,
  NewChatContainer,
} from '../../containers';

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
        {type === 'profile' && <ProfileContainer isOwner {...props} />}
        {type === 'user-profile' && <ProfileContainer {...props} />}
        {type === 'trak' && <TRAKContainer {...props} />}
        {type === 'story-view' && <StoriesContainer {...props} />}
        {type === 'chat' && <NewChatContainer {...props} />}
        {type === 'trak-relationships' && (
          <TrakMetaView state={state} {...props} />
        )}
        {/* {type === 'forchain' && <ForchainView state={state} {...props} />} */}
      </View>
    </SafeAreaView>
  );
};
