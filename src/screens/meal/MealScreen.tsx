import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {MealAdd} from './MealAdd';
import {MealDeleteButton, MealEdit} from './MealEdit';
import {MealList} from './MealList';
import {MealScreenParams} from './MealScreenParams';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function MealScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<MealScreenParams>();
  const {colors} = useTheme();

  console.log('Render MealScreen');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={MealList}
        options={{
          title: '',
          headerTitleStyle: {fontSize: 22},
          headerLeft: () => (
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {t('meals.headerTitle')}
            </Text>
          ),
        }}
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
