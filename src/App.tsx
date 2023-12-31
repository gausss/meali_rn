import React, {useEffect, useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useColorScheme} from 'react-native';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {TourGuideProvider} from 'rn-tourguide';
import {
  MEAL_STORAGE_KEY,
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
  const {t} = useTranslation();
  const dark = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator<AppStackParams>();

  return (
    <TourGuideProvider
      {...{
        androidStatusBarVisible: true,
        borderRadius: 4,
        persistTooltip: true,
        backdropColor: 'rgba(0, 0, 0, 0.6)',
        labels: {
          previous: t('guide.back'),
          next: t('guide.next'),
          skip: t('guide.skip'),
          finish: t('guide.finish'),
        },
      }}>
      <NavigationContainer theme={dark ? Dark : Light}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            orientation: 'portrait',
            navigationBarColor: dark
              ? DarkTheme.colors.card
              : DefaultTheme.colors.card,
          }}>
          <Stack.Screen
            name="Home"
            component={gestureHandlerRootHOC(Home)}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TourGuideProvider>
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
  const [meals, mealDispatch] = useReducer(mealReducer, []);

  useEffect(() => {
    AsyncStorage.getItem(MEAL_STORAGE_KEY).then(value => {
      if (value) {
        mealDispatch({
          type: 'restore',
          meals: JSON.parse(value),
        });
      }
    });
  }, []);

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

  return (
    <MealsContext.Provider value={meals}>
      <MealsDispatchContext.Provider value={mealDispatch}>
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
