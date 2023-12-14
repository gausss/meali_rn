/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { NativeModules, Platform, useColorScheme } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Meals from './Meals';
import Plan from './Plan';


export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const deviceLang = Platform.select({
    ios: NativeModules.SettingsManager?.settings?.AppleLocale || NativeModules.SettingsManager?.settings?.AppleLanguages[0],
    android: NativeModules.I18nManager.localeIdentifier,
  });
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Plan">
        <Tab.Screen name="Plan" component={Plan} options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            {
              return <Icon name='calendar-outline' size={size} color={color} />
            }
          }
        }} />
        <Tab.Screen name="Meals" component={Meals} options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            {
              return <Icon name='restaurant-outline' size={size} color={color} />
            }
          }
        }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer >
  );
}