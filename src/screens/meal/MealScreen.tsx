import {useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import {GlobalStyles} from '../../shared/Styles';
import {IngredientDetail} from './IngredientDetail';
import {MealDetail} from './MealDetail';
import {MealList} from './MealList';
import {MealScreenParams} from './MealScreenParams';

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
      <Stack.Screen
        name="Ingredient"
        component={IngredientDetail}
        options={{
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
}
