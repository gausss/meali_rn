import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, View} from 'react-native';
import {MealsContext, MealsDispatchContext} from '../../domain/MealReducer';
import {ActionButton} from '../../shared/ActionButton';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Input} from '../../shared/Input';
import {Select} from '../../shared/Select';
import {MealScreenParams} from './MealScreenParams';

export function MealEdit(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'Edit'>>();
  const dispatch = useContext(MealsDispatchContext);
  const editMeal = useContext(MealsContext)[route.params.index];

  const [editedMeal, setEditedMeal] = useState({...editMeal});

  console.log('Render MealEdit');
  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        placeholder={t('meals.name')}
        onChangeText={value => {
          setEditedMeal(meal => ({...meal, name: value}));
        }}
        defaultValue={editedMeal.name}
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
          setEditedMeal(meal => ({...meal, complexity: selectedItem}));
        }}
        defaultValue={editedMeal.complexity}
      />

      <View style={GlobalStyles.viewCentered}>
        <ActionButton
          name="add-outline"
          disabled={!editedMeal.name || !editedMeal.complexity}
          onPress={() => {
            dispatch({
              type: 'edit',
              meal: editedMeal,
              index: route.params.index,
            });
            navigation.navigate('List');
          }}>
          {t('meals.save')}
        </ActionButton>
      </View>
    </View>
  );
}

export function MealDeleteButton(): React.JSX.Element {
  const {t} = useTranslation();
  const route = useRoute<RouteProp<MealScreenParams, 'Edit'>>();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const dispatch = useContext(MealsDispatchContext);

  return (
    <Button
      onPress={() => {
        dispatch({
          type: 'delete',
          index: route.params.index,
        });
        navigation.navigate('List');
      }}
      title={t('meals.delete')}
      color="red"
    />
  );
}
