/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {TRAKLITEInterfaceHOC, LiteListApp} from './src';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => TRAKLITEInterfaceHOC(LiteListApp));
