import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {Complexity, Meal} from '../../domain/Meal';
import {Input} from '../../shared/Input';
import {MainButton} from '../../shared/MainButton';
import {Select} from '../../shared/Select';
import {MealScreenParams} from './MealScreenParams';

export function MealAdd(): React.JSX.Element {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<MealScreenParams>>();

  const [name, setName] = useState('');
  const [complex, setComplex] = useState<Complexity>();

  return (
    <View style={styles.container}>
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
          setComplex(selectedItem);
        }}
      />

      <View style={styles.viewStyleCenter}>
        <MainButton
          name="add-outline"
          onPress={() =>
            navigation.navigate({
              name: 'List',
              params: {
                newMeal: new Meal(name, [], complex),
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

const styles = StyleSheet.create({
  viewStyleCenter: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 25,
    padding: 25,
    gap: 20,
  },
});
