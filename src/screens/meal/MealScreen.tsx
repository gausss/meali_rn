import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {MealList} from './MealList';
import {MealScreenParams} from './MealScreenParams';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {GlobalStyles} from '../../shared/Styles';
import {MealDetail} from './MealDetail';

export default function MealScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<MealScreenParams>();
  const {colors} = useTheme();

  const mealTitle = () => (
    <Text
      style={{
        ...GlobalStyles.statusBarTitle,
        color: colors.text,
      }}>
      {t('meals.headerTitle')}
    </Text>
  );

  console.log('Render MealScreen');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={MealList}
        options={{
          title: '',
          headerTitleStyle: {fontSize: 22},
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerLeft: mealTitle,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={MealDetail}
        options={{
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          title: t('meals.detail'),
        }}
      />
    </Stack.Navigator>
  );
}
