import React from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  FlatList,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import {styles} from '../screen-wrapper/styles';
import {TokencyPicker, TokencyText, TokencyAction} from './internal';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const MineTokenElement = ({
  TRAKCollection,
  modalVisible,
  setModalVisible,
  handleMintTRAK,
  seed,
  setSeed,
  handleSeed,
  ...props
}: any) => {
  return (
    <>
      <View style={{backgroundColor: 'grey'}}>
        <View>
          <TokencyText name="TRAK Mine Query" {...props} />
          <TokencyAction name="SURF THE CONTENT ENGINE" {...props} />
        </View>
        <View
          style={{
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <FlatList
            listKey="TRAK"
            contentContainerStyle={{
              paddingBottom: 400,
              paddingTop: 5,
              alignItems: 'center',
              justifyContent: 'space-around',
              // backgroundColor: '#cecece',
              borderRadius: 20,
            }}
            numColumns={2}
            data={TRAKCollection}
            renderItem={({item}) => {
              const {meta, trak} = item;
              return (
                <TouchableOpacity onPress={() => handleSeed({item})}>
                  <ImageBackground
                    source={{uri: meta?.thumbnail}}
                    imageStyle={{borderRadius: 10}}
                    style={{
                      height: 150,
                      width: 150,
                      margin: 10,
                      borderRadius: 10,
                      backgroundColor: 'blue',
                      justifyContent: 'flex-end',
                    }}>
                    <View
                      style={{
                        height: '30%',
                        backgroundColor: '#1a1a1a',
                        opacity: 0.8,
                        borderRadius: 10,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Text style={{color: '#cecece'}} numberOfLines={1}>
                        {meta?.title}
                      </Text>
                      <Text
                        style={{color: '#cecece', fontWeight: 'bold'}}
                        numberOfLines={1}>
                        {meta?.artist}
                      </Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => '' + index}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <View
              style={{
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonMint]}
                onPress={() => handleMintTRAK()}>
                <Text style={styles.textStyle}>MINT</Text>
              </Pressable>
            </View> */}
            {/*  */}
            <ImageBackground
              source={{uri: seed?.meta?.thumbnail}}
              style={{
                height: 400,
                backgroundColor: 'grey',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                justifyContent: 'space-between',
              }}
              imageStyle={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
              <View style={{alignItems: 'flex-end'}}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                  <FontAwesome5 name="window-close" color={'#fff'} size={20} />
                </Pressable>
              </View>

              <View
                style={{
                  backgroundColor: '#1a1a1a',
                  opacity: 0.7,
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text style={{color: '#fff'}} numberOfLines={1}>
                  {seed?.meta?.title}
                </Text>
                <Text
                  style={{color: '#fff', fontWeight: 'bold'}}
                  numberOfLines={1}>
                  {seed?.meta?.artist}
                </Text>
              </View>
            </ImageBackground>
            <View style={{backgroundColor: 'transparent', flex: 1}}>
              <Text style={{alignSelf: 'center', paddingTop: 5}}>
                Missing Properties
              </Text>
              <FlatList
                listKey="TRAK"
                data={seed?.missingProviders}
                renderItem={({item}: any) => (
                  <>
                    <TokencyText name={item + ' ID'} {...props} />
                    <TokencyAction name="SET" {...props} />
                  </>
                )}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonMint]}
              onPress={() => handleMintTRAK({seed})}>
              <Text style={styles.textStyle}>MINT</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '90%',
  },
  button: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#1a1a1a',
    opacity: 0.7,
  },
  buttonMint: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
