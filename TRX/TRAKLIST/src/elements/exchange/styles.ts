import {StyleSheet} from 'react-native';
import {colors} from '../../core';

export const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    // borderRadius: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  title: {
    color: colors.light.primary,
    fontWeight: 'bold',
  },
  inputWrapper: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 9,
  },
});
