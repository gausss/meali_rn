import {useTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';
import {GlobalStyles} from '../../shared/Styles';
import {BuyScreenParams, MealScreenParams} from './BuyScreenParams';
import {IngredientDetail} from './IngredientDetail';
import {MealDetail} from './MealDetail';
import {MealList} from './MealList';
import {BuyList} from './BuyList';

export default function BuyScreen(): React.JSX.Element {
  const {t} = useTranslation();
  const Stack = createNativeStackNavigator<BuyScreenParams>();
  const {colors} = useTheme();

  const buyTitle = () => (
    <Text
      style={{
        ...GlobalStyles.statusBarTitle,
        color: colors.text
      }}>
      {t('buy.title')}
    </Text>
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={BuyList}
        options={{
          title: '',
          headerTitleStyle: {fontSize: 22},
          headerStyle: {backgroundColor: colors.background},
          headerShadowVisible: false,
          headerLeft: buyTitle
        }}
      />
    </Stack.Navigator>
  );
}
