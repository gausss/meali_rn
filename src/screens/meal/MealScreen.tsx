import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {MealAdd} from './MealAdd';
import {MealDeleteButton, MealEdit} from './MealEdit';
import {MealList} from './MealList';
import {MealScreenParams} from './MealScreenParams';

export default function MealScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<MealScreenParams>();

  console.log('Render MealScreen');
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
      <Stack.Screen
        name="Edit"
        component={MealEdit}
        options={{
          presentation: 'modal',
          title: t('meals.edit'),
          headerRight: () => <MealDeleteButton />,
        }}
      />
    </Stack.Navigator>
  );
}
