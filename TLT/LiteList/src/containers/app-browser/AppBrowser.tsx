import React from 'react';
import {View, Text} from 'react-native';
import {AppBrowserElement} from '../../elements';
import {useAppBrowser} from './useAppBrowser';

export const AppBrowserContainer = ({navigation, route, ...props}: any) => {
  const {...useAppBrowserProps} = useAppBrowser();
  return <AppBrowserElement {...useAppBrowserProps} {...props} />;
};
