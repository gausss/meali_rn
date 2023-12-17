import {
  NavigationProp,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Meal} from '../../domain/Meal';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Input} from '../../shared/Input';
import {MainButton} from '../../shared/MainButton';
import {Select} from '../../shared/Select';
import {MealScreenParams} from './MealScreenParams';
import Icon from 'react-native-vector-icons/Ionicons';

export function MealAdd(): React.JSX.Element {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();

  const [addMeal, setAddMeal] = useState({} as Meal);

  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        placeholder={t('meals.name')}
        onChangeText={value =>
          setAddMeal(meal => {
            meal.name = value;
            return meal;
          })
        }
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
          setAddMeal(meal => {
            meal.complexity = selectedItem;
            return meal;
          });
        }}
      />

      <View style={GlobalStyles.viewCentered}>
        <MainButton
          name="add-outline"
          onPress={() =>
            navigation.navigate({
              name: 'List',
              params: {
                newMeal: addMeal,
              },
              merge: true,
            })
          }>
          {t('meals.save')}
        </MainButton>
      </View>
    </View>
  );
}
