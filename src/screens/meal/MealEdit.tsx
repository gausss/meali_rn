import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Button, View} from 'react-native';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Input} from '../../shared/Input';
import {MainButton} from '../../shared/MainButton';
import {Select} from '../../shared/Select';
import {MealScreenParams} from './MealScreenParams';

export function MealEdit(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();
  const route = useRoute<RouteProp<MealScreenParams, 'Edit'>>();
  const {editMeal, editIndex} = route.params;

  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        placeholder={t('meals.name')}
        onChangeText={value => (editMeal.name = value)}
        defaultValue={editMeal.name}
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
          editMeal.complexity = selectedItem;
        }}
        defaultValue={editMeal.complexity}
      />

      <View style={GlobalStyles.viewCentered}>
        <MainButton
          name="add-outline"
          onPress={() => {
            navigation.navigate({
              name: 'List',
              params: {
                editMeal: editMeal,
                editIndex: editIndex,
              },
              merge: true,
            });
          }}>
          {t('meals.save')}
        </MainButton>
      </View>
    </View>
  );
}

export function MealDeleteButton(): React.JSX.Element {
  const {t} = useTranslation();
  const route = useRoute<RouteProp<MealScreenParams, 'Edit'>>();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();

  return (
    <Button
      onPress={() =>
        navigation.navigate({
          name: 'List',
          params: {
            editMeal: undefined,
            editIndex: route.params.editIndex,
          },
          merge: true,
        })
      }
      title={t('meals.delete')}
      color="red"
    />
  );
}