/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';

const Stack = createNativeStackNavigator();

export default function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home', headerStyle: {
              backgroundColor: 'transparent',
            },
            headerTitleStyle: {
              color: 'white'
            },
            headerTransparent: true,
            headerBlurEffect: 'dark'
          }}
        />
        <Stack.Screen
          name="Plan"
          component={Home}
          options={{ title: 'Plan' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}