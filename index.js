/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import './i18n';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
