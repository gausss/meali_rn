/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Meals from './Meals';
import Plan from './Plan';

const Tab = createBottomTabNavigator();

export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Plan">
        <Tab.Screen name="Plan" component={Plan} options={{
          tabBarIcon: ({ focused, color, size }) => {{
            return <Icon name='calendar-outline' size={size} color={color} />
          }}
        }} />
        <Tab.Screen name="Meals" component={Meals} options={{
          tabBarIcon: ({ focused, color, size }) => {{
            return <Icon name='restaurant-outline' size={size} color={color} />
          }}
        }}/>
      </Tab.Navigator>
    </NavigationContainer >
  );
}