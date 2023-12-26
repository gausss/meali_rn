import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Ingredient} from '../../domain/Meal';
import {Button} from '../../shared/Button';
import {Input} from '../../shared/Input';
import {Select} from '../../shared/Select';
import {GlobalStyles} from '../../shared/Styles';
import {MealScreenParams} from './MealScreenParams';

export function IngredientDetail(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'Ingredient'>>();
  const [localIngredient, setLocalIngredient] = useState<Partial<Ingredient>>(
    {},
  );

  console.log('Render MealEdit');
  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        label={t('meals.ingredient.name')}
        autoFocus={true}
        onChangeText={value => {
          setLocalIngredient({...localIngredient, name: value});
        }}
      />

      <Input
        label={t('meals.ingredient.count')}
        inputMode="numeric"
        onChangeText={value => {
          setLocalIngredient({...localIngredient, count: Number(value)});
        }}
      />
      <Select
        label={t('meals.ingredient.unit')}
        data={['GRM', 'ML', 'UNIT']}
        rowTextForSelection={item => {
          return t(`meals.ingredient.unitType.${item}`);
        }}
        buttonTextAfterSelection={item => {
          return t(`meals.ingredient.unitType.${item}`);
        }}
        onSelect={selectedItem => {
          setLocalIngredient({...localIngredient, unit: selectedItem});
        }}
      />

      <View style={GlobalStyles.viewCentered}>
        <Button
          label={t('meals.add')}
          disabled={
            !(
              localIngredient.name &&
              localIngredient.count &&
              localIngredient.unit
            )
          }
          onPress={() => {
            route.params.updateIngredient(localIngredient as Ingredient);
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}
