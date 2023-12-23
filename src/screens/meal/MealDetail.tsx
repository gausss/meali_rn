import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {MealsContext, MealsDispatchContext} from '../../domain/MealContext';
import {Button} from '../../shared/Button';
import {GlobalStyles} from '../../shared/Styles';
import {Input} from '../../shared/Input';
import {Select} from '../../shared/Select';
import {MealScreenParams} from './MealScreenParams';
import {Meal} from '../../domain/Meal';

export function MealDetail(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'Detail'>>();
  const dispatch = useContext(MealsDispatchContext);
  const meals = useContext(MealsContext);
  const editIndex = route.params.index;

  const [localMeal, setLocalMeal] = useState(
    editIndex !== undefined ? meals[editIndex] : ({} as Meal),
  );

  console.log('Render MealEdit');
  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        label={t('meals.name')}
        onChangeText={value => {
          setLocalMeal(meal => ({...meal, name: value}));
        }}
        defaultValue={localMeal.name}
      />
      <Select
        label={t('meals.complexity.name')}
        data={['EASY', 'HARD']}
        rowTextForSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        buttonTextAfterSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        onSelect={selectedItem => {
          setLocalMeal(meal => ({...meal, complexity: selectedItem}));
        }}
        defaultValue={localMeal.complexity}
      />

      <View style={GlobalStyles.viewCentered}>
        <Button
          name=""
          disabled={!localMeal.name || !localMeal.complexity}
          onPress={() => {
            if (editIndex !== undefined) {
              dispatch({
                type: 'edit',
                meal: localMeal,
                index: editIndex,
              });
            } else {
              dispatch({
                type: 'add',
                meal: localMeal,
              });
            }
            navigation.navigate('List');
          }}>
          {t('save')}
        </Button>
        {editIndex !== undefined ? (
          <Button
            name=""
            backgroundColor="#c1535d"
            onPress={() => {
              dispatch({
                type: 'delete',
                index: editIndex,
              });
              navigation.navigate('List');
            }}>
            {t('delete')}
          </Button>
        ) : null}
      </View>
    </View>
  );
}
