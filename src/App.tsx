import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from "react-native-vector-icons/Ionicons";
import MealTab from './Meals';
import Plan from './Plan';


export default function App(): React.JSX.Element {
  const { t } = useTranslation();
  const theme = useTheme();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator initialRouteName="Plan">
        <Tab.Screen name="Plan" component={Plan} options={{
          headerShown: false,
          title: t('plan.tabTitle'),
          tabBarIcon: ({ size, color }) => {
            {
              return <Icon name='calendar-outline' size={size} color={color} />
            }
          }
        }} />
        <Tab.Screen name="Meals" component={MealTab} options={{
          headerShown: false,
          title: t('meals.tabTitle'),
          tabBarIcon: ({ size, color }) => {
            {
              return <Icon name='restaurant-outline' size={size} color={color} />
            }
          }
        }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer >
  );
}