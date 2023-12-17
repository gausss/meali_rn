import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {MealScreenParams} from './MealScreenParams';
import {MealList} from './MealList';
import {MealAdd} from './MealAdd';

export default function MealScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<MealScreenParams>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={MealList}
        options={{title: t('meals.tabTitle')}}
      />
      <Stack.Screen
        name="Add"
        component={MealAdd}
        options={{
          presentation: 'modal',
          title: t('meals.create'),
        }}
      />
    </Stack.Navigator>
  );
}
