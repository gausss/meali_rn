import React, {useReducer} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import {Dark, Light} from './shared/Styles';

export type AppStackParams = {
  Home: undefined;
};

export default function App(): React.JSX.Element {
  const dark = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator<AppStackParams>();

  console.log('Render App');
  return (
    <NavigationContainer theme={dark ? Dark : Light}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          navigationBarColor: dark
            ? DarkTheme.colors.card
            : DefaultTheme.colors.card,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type HomeTabParams = {
  Plan: undefined;
  Meals: undefined;
};

export function Home(): React.JSX.Element {
  const {t} = useTranslation();
  const dark = useColorScheme() === 'dark';
  const Tab = createBottomTabNavigator<HomeTabParams>();
  const [meals, dispatch] = useReducer(mealReducer, []);

  const planTabIcon = ({size, color, focused}) => (
    <Icon
      name={focused ? 'calendar' : 'calendar-outline'}
      size={size}
      color={color}
    />
  );
  const mealTabIcon = ({size, color, focused}) => (
    <Icon
      name={focused ? 'restaurant' : 'restaurant-outline'}
      size={size}
      color={color}
    />
  );

  console.log('Render Home');
  return (
    <MealsContext.Provider value={meals}>
      <MealsDispatchContext.Provider value={dispatch}>
        <Tab.Navigator initialRouteName="Plan">
          <Tab.Screen
            name="Plan"
            component={Plan}
            options={{
              headerShown: false,
              title: t('plan.tabTitle'),
              tabBarActiveTintColor: dark ? 'white' : 'black',
              tabBarIcon: planTabIcon,
            }}
          />
          <Tab.Screen
            name="Meals"
            component={MealScreen}
            options={{
              headerShown: false,
              title: t('meals.tabTitle'),
              tabBarActiveTintColor: dark ? 'white' : 'black',
              tabBarIcon: mealTabIcon,
            }}
          />
        </Tab.Navigator>
      </MealsDispatchContext.Provider>
    </MealsContext.Provider>
  );
}
