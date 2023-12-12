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

import Home from './Home';


const Tab = createBottomTabNavigator();

export default function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator initialRouteName="Plan">
        <Tab.Screen name="Plan" component={Home} options={{
          tabBarIcon: ({ focused, color, size }) => {{
            return <Icon name='calendar-outline' size={size} color={color} />
          }}
        }} />
        <Tab.Screen name="Meals" component={Home} options={{
          tabBarIcon: ({ focused, color, size }) => {{
            return <Icon name='pizza-outline' size={size} color={color} />
          }}
        }}/>
        <Tab.Screen name="Buy" component={Home} options={{
          tabBarIcon: ({ focused, color, size }) => {{
            return <Icon name='cart-outline' size={size} color={color} />
          }}
        }}/>
      </Tab.Navigator>
    </NavigationContainer >
  );
}