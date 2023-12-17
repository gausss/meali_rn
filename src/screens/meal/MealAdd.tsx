import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {Complexity, Meal} from '../../domain/Meal';
import {GlobalStyles} from '../../shared/GlobalStyles';
import {Input} from '../../shared/Input';
import {MainButton} from '../../shared/MainButton';
import {Select} from '../../shared/Select';
import {MealScreenParams} from './MealScreenParams';

export function MealAdd(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();

  const [name, setName] = useState('');
  const [complexity, setComplexity] = useState<Complexity>();

  return (
    <View style={GlobalStyles.viewContainer}>
      <Input
        placeholder={t('meals.name')}
        onChangeText={value => setName(value)}
        defaultValue={name}
      />
      <Input placeholder={t('meals.ingredients')} />
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
          setComplexity(selectedItem);
        }}
      />

      <View style={GlobalStyles.viewCentered}>
        <MainButton
          name="add-outline"
          onPress={() =>
            navigation.navigate({
              name: 'List',
              params: {
                newMeal: new Meal(name, [], complexity),
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
