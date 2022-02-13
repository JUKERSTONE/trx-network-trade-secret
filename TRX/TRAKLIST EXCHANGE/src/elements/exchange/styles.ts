import {StyleSheet} from 'react-native';
import {colors} from '../../core';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    padding: 20,
    borderBottomRightRadius: 30,
    borderBottomColor: '#fff',
    backgroundColor: '#1a1a1a',
  },
  header: {
    alignItems: 'center',
    // backgroundColor: '#fff',
    padding: 5,
    paddingHorizontal: 10,
    // borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 15,
    borderBottomColor: '#cecece',

    borderBottomWidth: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  inputWrapper: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 9,
  },
});
