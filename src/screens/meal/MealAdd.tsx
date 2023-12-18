import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Meal} from '../../domain/Meal';
import {ActionButton} from '../../shared/ActionButton';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Input} from '../../shared/Input';
import {Select} from '../../shared/Select';
import {MealScreenParams} from './MealScreenParams';
import {MealsDispatchContext} from '../../domain/MealReducer';

export function MealAdd(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const [addMeal, setAddMeal] = useState({} as Partial<Meal>);
  const dispatch = useContext(MealsDispatchContext);

  console.log('Render MealAdd');
  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        placeholder={t('meals.name')}
        onChangeText={value => {
          setAddMeal(meal => ({...meal, name: value}));
        }}
      />
      <Select
        defaultButtonText={t('meals.complexity.name')}
        data={['EASY', 'HARD']}
        rowTextForSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        buttonTextAfterSelection={item => {
          return t(`meals.complexity.${item}`);
        }}
        onSelect={selectedItem => {
          setAddMeal(meal => ({...meal, complexity: selectedItem}));
        }}
      />
      <View style={GlobalStyles.viewCentered}>
        <ActionButton
          name="add-outline"
          disabled={!addMeal.name || !addMeal.complexity}
          onPress={() => {
            dispatch({type: 'add', meal: addMeal as Meal});
            navigation.navigate('List');
          }}>
          {t('meals.save')}
        </ActionButton>
      </View>
    </View>
  );
}
