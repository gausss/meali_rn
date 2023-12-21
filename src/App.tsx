import React, {useReducer} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useColorScheme} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  MealsContext,
  MealsDispatchContext,
  mealReducer,
} from './domain/MealContext';
import MealScreen from './screens/meal/MealScreen';
import Plan from './screens/plan/PlanScreen';
import {Dark, Light} from './shared/GlobalStyles';

export default function App(): React.JSX.Element {
  const {t} = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const Tab = createBottomTabNavigator();
  const [meals, dispatch] = useReducer(mealReducer, []);

  console.log('Render App');
  return (
    <NavigationContainer theme={isDarkMode ? Dark : Light}>
      <MealsContext.Provider value={meals}>
        <MealsDispatchContext.Provider value={dispatch}>
          <Tab.Navigator initialRouteName="Plan">
            <Tab.Screen
              name="Plan"
              component={Plan}
              options={{
                headerShown: false,
                title: t('plan.tabTitle'),
                tabBarIcon: ({size, color}) => (
                  <Icon name="calendar-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Meals"
              component={MealScreen}
              options={{
                headerShown: false,
                title: t('meals.tabTitle'),
                tabBarIcon: ({size, color}) => (
                  <Icon name="restaurant-outline" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </MealsDispatchContext.Provider>
      </MealsContext.Provider>
    </NavigationContainer>
  );
}
