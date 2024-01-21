import React, { useEffect, useReducer } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { TooltipProps, TourGuideProvider } from 'rn-tourguide';
import { BuyContext, BuyDispatchContext, buyReducer } from './context/BuyContext';
import {
  MEAL_STORAGE_KEY,
  MealsContext,
  MealsDispatchContext,
  mealReducer
} from './context/MealContext';
import {
  PLAN_STORAGE_KEY,
  PlanContext,
  PlanDispatchContext,
  planReducer
} from './context/PlanContext';
import BuyScreen from './screens/buy/BuyScreen';
import MealScreen from './screens/meal/MealScreen';
import PlanScreen from './screens/plan/PlanScreen';
import { Dark, Light } from './shared/Styles';
import { TourModal } from './shared/TourModal';
import { Plan } from './domain/Plan';

export type AppStackParams = {
  Home: undefined;
};

export default function App(): React.JSX.Element {
  const { t } = useTranslation();
  const dark = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator<AppStackParams>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TourGuideProvider
        {...{
          androidStatusBarVisible: true,
          borderRadius: 4,
          persistTooltip: true,
          backdropColor: dark
            ? 'rgba(255, 255, 255, 0.4)'
            : 'rgba(0, 0, 0, 0.5)',
          tooltipComponent: (props: TooltipProps) => (
            <TourModal {...props}></TourModal>
          ),
          maskOffset: 10,
          labels: {
            previous: t('guide.back'),
            next: t('guide.next'),
            skip: t('guide.skip'),
            finish: t('guide.finish')
          }
        }}>
        <NavigationContainer theme={dark ? Dark : Light}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              orientation: 'portrait',
              navigationBarColor: dark
                ? DarkTheme.colors.card
                : DefaultTheme.colors.card
            }}>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TourGuideProvider>
    </GestureHandlerRootView>
  );
}

export type HomeTabParams = {
  PlanTab: undefined;
  MealTab: undefined;
  BuyTab: undefined;
};

export function Home(): React.JSX.Element {
  const { t } = useTranslation();
  const dark = useColorScheme() === 'dark';
  const Tab = createBottomTabNavigator<HomeTabParams>();
  const [meals, mealDispatch] = useReducer(mealReducer, []);
  const [plan, planDispatch] = useReducer(planReducer, {} as Plan);
  const [buyList, buyListDispatch] = useReducer(buyReducer, []);

  useEffect(() => {
    buyListDispatch({ type: 'regenerate', plan: plan })
  }, [plan]);

  useEffect(() => {
    AsyncStorage.getItem(MEAL_STORAGE_KEY).then(value => {
      if (value) {
        mealDispatch({
          type: 'restore',
          meals: JSON.parse(value)
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(PLAN_STORAGE_KEY).then(value => {
      if (value) {
        planDispatch({
          type: 'restore',
          plan: JSON.parse(value)
        });
      }
    });
  }, []);

  const planTabIcon = ({ size, color, focused }) => (
    <Icon
      name={focused ? 'calendar' : 'calendar-outline'}
      size={size}
      color={color}
    />
  );
  const mealTabIcon = ({ size, color, focused }) => (
    <Icon
      name={focused ? 'restaurant' : 'restaurant-outline'}
      size={size}
      color={color}
    />
  );
  const buyTabIcon = ({ size, color, focused }) => (
    <Icon
      name={focused ? 'receipt' : 'receipt-outline'}
      size={size}
      color={color}
    />
  );

  return (
    <MealsContext.Provider value={meals}>
      <MealsDispatchContext.Provider value={mealDispatch}>
        <PlanContext.Provider value={plan}>
          <PlanDispatchContext.Provider value={planDispatch}>
            <BuyContext.Provider value={buyList}>
              <BuyDispatchContext.Provider value={buyListDispatch}>
                <Tab.Navigator initialRouteName="PlanTab">
                  <Tab.Screen
                    name="PlanTab"
                    component={PlanScreen}
                    options={{
                      headerShown: false,
                      title: t('plan.tabTitle'),
                      tabBarActiveTintColor: dark ? 'white' : 'black',
                      tabBarIcon: planTabIcon
                    }}
                  />
                  <Tab.Screen
                    name="MealTab"
                    component={MealScreen}
                    options={{
                      headerShown: false,
                      title: t('meals.tabTitle'),
                      tabBarActiveTintColor: dark ? 'white' : 'black',
                      tabBarIcon: mealTabIcon
                    }}
                  />
                  <Tab.Screen
                    name="BuyTab"
                    component={BuyScreen}
                    options={{
                      headerShown: false,
                      title: t('buy.tabTitle'),
                      tabBarActiveTintColor: dark ? 'white' : 'black',
                      tabBarIcon: buyTabIcon
                    }}
                  />
                </Tab.Navigator>
              </BuyDispatchContext.Provider>
            </BuyContext.Provider>
          </PlanDispatchContext.Provider>
        </PlanContext.Provider>
      </MealsDispatchContext.Provider>
    </MealsContext.Provider>
  );
}
