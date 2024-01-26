import {RouteProp, useRoute, useTheme} from '@react-navigation/native';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {GlobalStyles} from '../../shared/Styles';
import {Value} from '../../shared/Value';
import {PlanScreenParams} from './PlanScreenParams';

export function ShowMeal(): React.JSX.Element {
  const {t} = useTranslation();
  const {dark, colors} = useTheme();
  const route = useRoute<RouteProp<PlanScreenParams, 'Meal'>>();
  const localMeal = route.params.meal;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        ingredientRow: {
          height: 50,
          padding: 10,
          paddingRight: 25,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        },
        insetList: {
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12
        },
        ingredientRemove: {
          backgroundColor: dark ? '#444444' : '#cccccc',
          borderRadius: 25
        },
        ingredientAdd: {
          padding: 12,
          alignItems: 'center'
        }
      }),
    [dark]
  );

  return (
    <ScrollView style={GlobalStyles.viewContainer}>
      <Value label={t('meals.name')} value={localMeal.name} />
      <Value
        label={t('meals.complexity.name')}
        value={t(`meals.complexity.${localMeal.complexity}`)}
      />
      <Value label={t('meals.reference')} value={localMeal.reference} />
      <Value
        label={t('meals.ingredient.title')}
        value={localMeal.ingredients
          ?.map(ingredient => ingredient.name)
          ?.join('\n')}
      />
    </ScrollView>
  );
}
