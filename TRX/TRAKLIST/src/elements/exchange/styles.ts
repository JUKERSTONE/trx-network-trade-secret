import {StyleSheet} from 'react-native';
import {colors} from '../../core';

export const styles = StyleSheet.create({
  container: {
    // margin: 5,
    marginBottom: 5,
    padding: 20,
    // borderRadius: 20,
    borderBottomRightRadius: 30,
    // borderBottomWidth: 2,
    borderBottomColor: '#fff',
    backgroundColor: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    // backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: '#cecece',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputWrapper: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 9,
  },
});
